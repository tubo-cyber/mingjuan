import { ORIGIN } from "./catalog";
import { decodePage, extractLinks, parseArticle, type Block, type IndexLink } from "./parse-html";

const ALLOW =
  /^(Old Testament|New Testament|Topics|individual|intro|index-|Reference)/i;

export function assertSafePath(path: string): string {
  let p = path.replace(/^\/+/, "").replace(/\\/g, "/");
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep */
  }
  if (p.includes("..") || /^(https?:)?\/\//i.test(p) || p.includes("\\")) {
    throw new Error("不合法的路徑");
  }
  if (!ALLOW.test(p)) {
    throw new Error("不合法的路徑");
  }
  if (!/\.(htm|html|pdf)$/i.test(p) && !/index/i.test(p)) {
    throw new Error("不合法的路徑");
  }
  return p;
}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

type CacheEntry = { at: number; value: unknown };
const cache = new Map<string, CacheEntry>();
const TTL = 1000 * 60 * 20;

function cached<T extends { status: number }>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return Promise.resolve(hit.value as T);
  return fn().then((value) => {
    if (value.status === 200) cache.set(key, { at: Date.now(), value });
    return value;
  });
}

export type ArticlePayload = {
  title: string;
  blocks: Block[];
  sourceUrl: string;
  isPdf: boolean;
  status: number;
};

function missPayload(url: string, fallbackTitle: string, status: number): ArticlePayload {
  return {
    title: fallbackTitle,
    blocks: [{ t: "p", text: `原文頁面暫時無法取得（${status}）。可改試其他章節或資料類型。` }],
    sourceUrl: url,
    isPdf: false,
    status,
  };
}

function commentaryAlts(path: string): string[] {
  const alts: string[] = [];
  const m = path.match(/^(.*\/)(\d{2})([CA])([TSE])(\d+\.htm)$/i);
  if (!m) return alts;
  const other = m[3].toUpperCase() === "C" ? "A" : "C";
  alts.push(`${m[1]}${m[2]}${other}${m[4]}${m[5]}`);
  return alts;
}

async function loadHtml(path: string): Promise<{ status: number; url: string; buf?: ArrayBuffer }> {
  const url = `${ORIGIN}/${encodePath(path)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "MingJuanBibleReader/1.0",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });
  if (!res.ok) return { status: res.status, url };
  return { status: 200, url, buf: await res.arrayBuffer() };
}

export async function fetchArticle(path: string, fallbackTitle: string): Promise<ArticlePayload> {
  const safe = assertSafePath(path);
  return cached(`a:${safe}`, async () => {
    const isPdf = /\.pdf$/i.test(safe);
    if (isPdf) {
      return {
        title: fallbackTitle,
        blocks: [],
        sourceUrl: `${ORIGIN}/${encodePath(safe)}`,
        isPdf: true,
        status: 200,
      } satisfies ArticlePayload;
    }

    let hit = await loadHtml(safe);
    if (!hit.buf) {
      for (const alt of commentaryAlts(safe)) {
        try {
          const other = await loadHtml(assertSafePath(alt));
          if (other.buf) {
            hit = other;
            break;
          }
        } catch {
          /* skip illegal alt */
        }
      }
    }
    if (!hit.buf) return missPayload(hit.url, fallbackTitle, hit.status);

    const html = decodePage(hit.buf);
    const parsed = parseArticle(html, fallbackTitle);
    return {
      title: parsed.title,
      blocks: parsed.blocks,
      sourceUrl: hit.url,
      isPdf: false,
      status: 200,
    } satisfies ArticlePayload;
  });
}

export type IndexPayload = {
  title: string;
  links: IndexLink[];
  sourceUrl: string;
  status: number;
};

function extractEbookLinks(html: string, basePath: string): IndexLink[] {
  const block = html.match(/"books"\s*:\s*\[([\s\S]*?)\]\s*[,}]/);
  if (!block) return [];
  const items = [...block[1].matchAll(/\{[^}]+\}/g)];
  const dir = basePath.replace(/\/[^/]+$/, "/");
  const links: IndexLink[] = [];
  for (const item of items) {
    const chunk = item[0];
    const title = /"title"\s*:\s*"([^"]+)"/.exec(chunk)?.[1];
    const hrefRaw = /"href"\s*:\s*"([^"]+)"/.exec(chunk)?.[1];
    const author = /"author"\s*:\s*"([^"]*)"/.exec(chunk)?.[1] ?? "";
    if (!title || !hrefRaw) continue;
    const href = hrefRaw.includes("/") ? hrefRaw : dir + hrefRaw;
    const label = author ? `${title} · ${author}` : title;
    links.push({ href, text: label, pdf: /\.pdf$/i.test(href) });
  }
  return links;
}

export async function fetchIndex(path: string, fallbackTitle: string): Promise<IndexPayload> {
  const safe = assertSafePath(path);
  return cached(`i:${safe}`, async () => {
    const url = `${ORIGIN}/${encodePath(safe)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "MingJuanBibleReader/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      return { title: fallbackTitle, links: [], sourceUrl: url, status: res.status };
    }
    const html = decodePage(await res.arrayBuffer());
    const fromAnchors = extractLinks(html, safe);
    const ebooks = extractEbookLinks(html, safe);
    const seen = new Set(fromAnchors.map((l) => l.href + l.text));
    const links = [...fromAnchors];
    for (const l of ebooks) {
      if (seen.has(l.href + l.text)) continue;
      seen.add(l.href + l.text);
      links.push(l);
    }
    return { title: fallbackTitle, links, sourceUrl: url, status: 200 };
  });
}
