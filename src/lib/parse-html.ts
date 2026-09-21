export type Block =
  | { t: "title"; text: string }
  | { t: "h"; text: string }
  | { t: "verse"; ref: string; quote?: string }
  | { t: "note"; label: string; text: string }
  | { t: "p"; text: string }
  | { t: "link"; href: string; text: string; pdf?: boolean };

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-zA-Z]+);/g, (_, n) => ENTITIES[n] ?? `&${n};`);
}

function scoreDecoded(s: string): number {
  const fffd = (s.match(/\uFFFD/g) ?? []).length;
  const cjk = (s.match(/[\u4e00-\u9fff]/g) ?? []).length;
  return cjk * 4 - fffd * 12;
}

export function decodePage(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const sniff = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, 2800));
  const charset = /charset\s*=\s*["']?([\w-]+)/i.exec(sniff)?.[1]?.toLowerCase() ?? "";

  const tryDec = (label: string) => {
    try {
      return new TextDecoder(label, { fatal: false }).decode(bytes);
    } catch {
      return "";
    }
  };

  const utf8 = tryDec("utf-8");
  const candidates: { label: string; text: string }[] = [{ label: "utf-8", text: utf8 }];
  if (charset.includes("big5") || charset.includes("gb") || scoreDecoded(utf8) < 40) {
    candidates.push({ label: "big5", text: tryDec("big5") });
    candidates.push({ label: "gbk", text: tryDec("gbk") });
  } else {
    candidates.push({ label: "big5", text: tryDec("big5") });
  }

  let best = utf8;
  let bestScore = scoreDecoded(utf8);
  for (const c of candidates) {
    if (!c.text) continue;
    const sc = scoreDecoded(c.text);
    if (sc > bestScore) {
      best = c.text;
      bestScore = sc;
    }
  }
  return best;
}

/** Word 匯出隱藏欄位，剝標籤後會蓋在正文上。 */
const FIELD_CODE =
  /\{\s*\\?\*?\\?\s*(?:Section|TOC|HYPERLINK|INCLUDETEXT|INCLUDEPICTURE|PAGEREF|REF|SEQ|XE|TC|RD)[^}]*\}/gi;

function stripFieldCodes(s: string): string {
  return s
    .replace(FIELD_CODE, "")
    .replace(/\{\\Section:[^}]*\}/gi, "")
    .replace(/\{\\?Section:TopicID=\d+\}/gi, "")
    .replace(/Section:TopicID=\d+/gi, "");
}

function stripJunk(html: string): string {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<xml[\s\S]*?<\/xml>/gi, "")
    .replace(/<\/?(?:o|v|w|m|st1):[^>]*>/gi, "");

  for (let i = 0; i < 8; i++) {
    const next = out.replace(
      /<span[^>]*(?:mso-hide\s*:\s*all|display\s*:\s*none)[^>]*>[\s\S]*?<\/span>/gi,
      "",
    );
    if (next === out) break;
    out = next;
  }
  return stripFieldCodes(out);
}

export type IndexLink = { href: string; text: string; pdf: boolean };

export function extractLinks(html: string, basePath: string): IndexLink[] {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const links: IndexLink[] = [];
  const seen = new Set<string>();
  const re = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    let href = m[1].trim();
    if (!href || href.startsWith("javascript:") || href.startsWith("#") || href.startsWith("mailto:"))
      continue;
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ")).trim();
    if (!text) continue;
    if (/返回|首頁|首页|簡體|简体|繁體|繁体|^EN$/.test(text) && text.length < 16) continue;
    if (/^https?:/i.test(href) && !href.includes("ccbiblestudy.org")) continue;
    href = href.replace(/^https?:\/\/(?:www\.)?ccbiblestudy\.org\//i, "");
    if (href.startsWith("../") || !href.includes("/")) {
      href = resolveRelative(basePath, href);
    }
    href = href.split("?")[0];
    if (seen.has(href + text)) continue;
    seen.add(href + text);
    links.push({ href, text, pdf: /\.pdf$/i.test(href) });
  }
  return links;
}

function resolveRelative(basePath: string, href: string): string {
  const clean = href.replace(/^\.\//, "");
  const dir = basePath.replace(/\/[^/]+$/, "/");
  if (clean.startsWith("../") || clean.includes("/../")) {
    const parts = dir.split("/").filter(Boolean);
    const segs = clean.split("/");
    for (const s of segs) {
      if (s === "..") parts.pop();
      else if (s && s !== ".") parts.push(s);
    }
    return parts.join("/");
  }
  return dir + clean;
}

const SKIP_LINE =
  /返回首頁|返回首页|返回本書|返回本书|返回講道|返回讲道|返回本|個人專欄|个人专栏/;

const LABELS =
  "呂振中譯|吕振中译|原文直譯|原文直译|原文字義|原文字义|背景註解|背景注解|文意註解|文意注解|靈意註解|灵意注解|問題改正|问题改正|話中之光|话中之光|串珠";

function tidyLine(line: string): string {
  return stripFieldCodes(line)
    .replace(/[ \t\u00a0]+/g, " ")
    .trim();
}

export function parseArticle(html: string, fallbackTitle: string): { title: string; blocks: Block[] } {
  const raw = stripJunk(html);
  const body = raw.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? raw;
  const withBreaks = body
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/li>/gi, "\n");
  const text = decodeEntities(withBreaks.replace(/<[^>]+>/g, " "));
  const lines = text
    .split(/\n+/)
    .map(tidyLine)
    .filter(
      (l) =>
        l.length > 0 &&
        !SKIP_LINE.test(l) &&
        !/^[|〔〕﹝﹞\s]+$/.test(l) &&
        !/TopicID\s*=/i.test(l) &&
        !/^\{/.test(l),
    );

  const blocks: Block[] = [];
  let title = fallbackTitle;
  let tookTitle = false;
  const labelRe = new RegExp(`^[〔﹝【\\[]?(${LABELS})[〕﹞】\\]]?`);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      !tookTitle &&
      line.length < 48 &&
      /(註解|注解|拾穗|例證|例证|信息|綱目|纲目|第.+[章篇])/.test(line)
    ) {
      title = line.replace(/^[〔﹝]|[〕﹞]$/g, "");
      blocks.push({ t: "title", text: title });
      tookTitle = true;
      continue;
    }

    const verseOnly = line.match(/^【([^】]+)】\s*(.*)$/);
    if (verseOnly) {
      let quote = verseOnly[2].replace(/^[「『"]/, "").replace(/[」』"]$/, "").trim();
      if (!quote && lines[i + 1] && /^[「『"]/.test(lines[i + 1])) {
        quote = lines[i + 1].replace(/^[「『"]/, "").replace(/[」』"]$/, "").trim();
        i += 1;
      }
      blocks.push({ t: "verse", ref: verseOnly[1].replace(/\s+/g, ""), quote: quote || undefined });
      continue;
    }

    if (/^[壹貳參叁肆伍陸柒捌玖拾]+、/.test(line)) {
      blocks.push({ t: "h", text: line });
      continue;
    }

    const lab = labelRe.exec(line);
    if (lab) {
      const rest = line.slice(lab[0].length).trim().replace(/^「/, "").replace(/」$/, "");
      blocks.push({ t: "note", label: lab[1], text: rest });
      continue;
    }

    if (line.length < 2) continue;
    blocks.push({ t: "p", text: line });
  }

  if (!tookTitle) {
    blocks.unshift({ t: "title", text: fallbackTitle });
  }
  return { title, blocks };
}
