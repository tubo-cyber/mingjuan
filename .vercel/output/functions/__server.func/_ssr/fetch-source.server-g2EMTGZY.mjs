import { a as ORIGIN } from "./catalog-BxauapDR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetch-source.server-g2EMTGZY.js
var ENTITIES = {
	nbsp: " ",
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	ndash: "–",
	mdash: "—",
	hellip: "…",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”"
};
function decodeEntities(s) {
	return s.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&([a-zA-Z]+);/g, (_, n) => ENTITIES[n] ?? `&${n};`);
}
function scoreDecoded(s) {
	const fffd = (s.match(/\uFFFD/g) ?? []).length;
	return (s.match(/[\u4e00-\u9fff]/g) ?? []).length * 4 - fffd * 12;
}
function decodePage(buf) {
	const bytes = new Uint8Array(buf);
	const sniff = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, 2800));
	const charset = /charset\s*=\s*["']?([\w-]+)/i.exec(sniff)?.[1]?.toLowerCase() ?? "";
	const tryDec = (label) => {
		try {
			return new TextDecoder(label, { fatal: false }).decode(bytes);
		} catch {
			return "";
		}
	};
	const utf8 = tryDec("utf-8");
	const candidates = [{
		label: "utf-8",
		text: utf8
	}];
	if (charset.includes("big5") || charset.includes("gb") || scoreDecoded(utf8) < 40) {
		candidates.push({
			label: "big5",
			text: tryDec("big5")
		});
		candidates.push({
			label: "gbk",
			text: tryDec("gbk")
		});
	} else candidates.push({
		label: "big5",
		text: tryDec("big5")
	});
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
var FIELD_CODE = /\{\s*\\?\*?\\?\s*(?:Section|TOC|HYPERLINK|INCLUDETEXT|INCLUDEPICTURE|PAGEREF|REF|SEQ|XE|TC|RD)[^}]*\}/gi;
function stripFieldCodes(s) {
	return s.replace(FIELD_CODE, "").replace(/\{\\Section:[^}]*\}/gi, "").replace(/\{\\?Section:TopicID=\d+\}/gi, "").replace(/Section:TopicID=\d+/gi, "");
}
function stripJunk(html) {
	let out = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<xml[\s\S]*?<\/xml>/gi, "").replace(/<\/?(?:o|v|w|m|st1):[^>]*>/gi, "");
	for (let i = 0; i < 8; i++) {
		const next = out.replace(/<span[^>]*(?:mso-hide\s*:\s*all|display\s*:\s*none)[^>]*>[\s\S]*?<\/span>/gi, "");
		if (next === out) break;
		out = next;
	}
	return stripFieldCodes(out);
}
function extractLinks(html, basePath) {
	const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
	const links = [];
	const seen = /* @__PURE__ */ new Set();
	const re = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
	let m;
	while (m = re.exec(body)) {
		let href = m[1].trim();
		if (!href || href.startsWith("javascript:") || href.startsWith("#") || href.startsWith("mailto:")) continue;
		const text = decodeEntities(m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ")).trim();
		if (!text) continue;
		if (/返回|首頁|首页|簡體|简体|繁體|繁体|^EN$/.test(text) && text.length < 16) continue;
		if (/^https?:/i.test(href) && !href.includes("ccbiblestudy.org")) continue;
		href = href.replace(/^https?:\/\/(?:www\.)?ccbiblestudy\.org\//i, "");
		if (href.startsWith("../") || !href.includes("/")) href = resolveRelative(basePath, href);
		href = href.split("?")[0];
		if (seen.has(href + text)) continue;
		seen.add(href + text);
		links.push({
			href,
			text,
			pdf: /\.pdf$/i.test(href)
		});
	}
	return links;
}
function resolveRelative(basePath, href) {
	const clean = href.replace(/^\.\//, "");
	const dir = basePath.replace(/\/[^/]+$/, "/");
	if (clean.startsWith("../") || clean.includes("/../")) {
		const parts = dir.split("/").filter(Boolean);
		const segs = clean.split("/");
		for (const s of segs) if (s === "..") parts.pop();
		else if (s && s !== ".") parts.push(s);
		return parts.join("/");
	}
	return dir + clean;
}
var SKIP_LINE = /返回首頁|返回首页|返回本書|返回本书|返回講道|返回讲道|返回本|個人專欄|个人专栏/;
var LABELS = "呂振中譯|吕振中译|原文直譯|原文直译|原文字義|原文字义|背景註解|背景注解|文意註解|文意注解|靈意註解|灵意注解|問題改正|问题改正|話中之光|话中之光|串珠";
function tidyLine(line) {
	return stripFieldCodes(line).replace(/[ \t\u00a0]+/g, " ").trim();
}
function parseArticle(html, fallbackTitle) {
	const raw = stripJunk(html);
	const lines = decodeEntities((raw.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? raw).replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<\/h[1-6]>/gi, "\n").replace(/<\/div>/gi, "\n").replace(/<\/tr>/gi, "\n").replace(/<\/li>/gi, "\n").replace(/<[^>]+>/g, " ")).split(/\n+/).map(tidyLine).filter((l) => l.length > 0 && !SKIP_LINE.test(l) && !/^[|〔〕﹝﹞\s]+$/.test(l) && !/TopicID\s*=/i.test(l) && !/^\{/.test(l));
	const blocks = [];
	let title = fallbackTitle;
	let tookTitle = false;
	const labelRe = new RegExp(`^[〔﹝【\\[]?(${LABELS})[〕﹞】\\]]?`);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!tookTitle && line.length < 48 && /(註解|注解|拾穗|例證|例证|信息|綱目|纲目|第.+[章篇])/.test(line)) {
			title = line.replace(/^[〔﹝]|[〕﹞]$/g, "");
			blocks.push({
				t: "title",
				text: title
			});
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
			blocks.push({
				t: "verse",
				ref: verseOnly[1].replace(/\s+/g, ""),
				quote: quote || void 0
			});
			continue;
		}
		if (/^[壹貳參叁肆伍陸柒捌玖拾]+、/.test(line)) {
			blocks.push({
				t: "h",
				text: line
			});
			continue;
		}
		const lab = labelRe.exec(line);
		if (lab) {
			const rest = line.slice(lab[0].length).trim().replace(/^「/, "").replace(/」$/, "");
			blocks.push({
				t: "note",
				label: lab[1],
				text: rest
			});
			continue;
		}
		if (line.length < 2) continue;
		blocks.push({
			t: "p",
			text: line
		});
	}
	if (!tookTitle) blocks.unshift({
		t: "title",
		text: fallbackTitle
	});
	return {
		title,
		blocks
	};
}
var ALLOW = /^(Old Testament|New Testament|Topics|individual|intro|index-|Reference)/i;
function assertSafePath(path) {
	let p = path.replace(/^\/+/, "").replace(/\\/g, "/");
	try {
		p = decodeURIComponent(p);
	} catch {}
	if (p.includes("..") || /^(https?:)?\/\//i.test(p) || p.includes("\\")) throw new Error("不合法的路徑");
	if (!ALLOW.test(p)) throw new Error("不合法的路徑");
	if (!/\.(htm|html|pdf)$/i.test(p) && !/index/i.test(p)) throw new Error("不合法的路徑");
	return p;
}
function encodePath(path) {
	return path.split("/").map((seg) => encodeURIComponent(seg)).join("/");
}
var cache = /* @__PURE__ */ new Map();
var TTL = 12e5;
function cached(key, fn) {
	const hit = cache.get(key);
	if (hit && Date.now() - hit.at < TTL) return Promise.resolve(hit.value);
	return fn().then((value) => {
		if (value.status === 200) cache.set(key, {
			at: Date.now(),
			value
		});
		return value;
	});
}
function missPayload(url, fallbackTitle, status) {
	return {
		title: fallbackTitle,
		blocks: [{
			t: "p",
			text: `原文頁面暫時無法取得（${status}）。可改試其他章節或資料類型。`
		}],
		sourceUrl: url,
		isPdf: false,
		status
	};
}
function commentaryAlts(path) {
	const alts = [];
	const m = path.match(/^(.*\/)(\d{2})([CA])([TSE])(\d+\.htm)$/i);
	if (!m) return alts;
	const other = m[3].toUpperCase() === "C" ? "A" : "C";
	alts.push(`${m[1]}${m[2]}${other}${m[4]}${m[5]}`);
	return alts;
}
async function loadHtml(path) {
	const url = `${ORIGIN}/${encodePath(path)}`;
	const res = await fetch(url, {
		headers: {
			"User-Agent": "MingJuanBibleReader/1.0",
			Accept: "text/html,application/xhtml+xml"
		},
		redirect: "follow"
	});
	if (!res.ok) return {
		status: res.status,
		url
	};
	return {
		status: 200,
		url,
		buf: await res.arrayBuffer()
	};
}
async function fetchArticle(path, fallbackTitle) {
	const safe = assertSafePath(path);
	return cached(`a:${safe}`, async () => {
		if (/\.pdf$/i.test(safe)) return {
			title: fallbackTitle,
			blocks: [],
			sourceUrl: `${ORIGIN}/${encodePath(safe)}`,
			isPdf: true,
			status: 200
		};
		let hit = await loadHtml(safe);
		if (!hit.buf) for (const alt of commentaryAlts(safe)) try {
			const other = await loadHtml(assertSafePath(alt));
			if (other.buf) {
				hit = other;
				break;
			}
		} catch {}
		if (!hit.buf) return missPayload(hit.url, fallbackTitle, hit.status);
		const parsed = parseArticle(decodePage(hit.buf), fallbackTitle);
		return {
			title: parsed.title,
			blocks: parsed.blocks,
			sourceUrl: hit.url,
			isPdf: false,
			status: 200
		};
	});
}
function extractEbookLinks(html, basePath) {
	const block = html.match(/"books"\s*:\s*\[([\s\S]*?)\]\s*[,}]/);
	if (!block) return [];
	const items = [...block[1].matchAll(/\{[^}]+\}/g)];
	const dir = basePath.replace(/\/[^/]+$/, "/");
	const links = [];
	for (const item of items) {
		const chunk = item[0];
		const title = /"title"\s*:\s*"([^"]+)"/.exec(chunk)?.[1];
		const hrefRaw = /"href"\s*:\s*"([^"]+)"/.exec(chunk)?.[1];
		const author = /"author"\s*:\s*"([^"]*)"/.exec(chunk)?.[1] ?? "";
		if (!title || !hrefRaw) continue;
		const href = hrefRaw.includes("/") ? hrefRaw : dir + hrefRaw;
		const label = author ? `${title} · ${author}` : title;
		links.push({
			href,
			text: label,
			pdf: /\.pdf$/i.test(href)
		});
	}
	return links;
}
async function fetchIndex(path, fallbackTitle) {
	const safe = assertSafePath(path);
	return cached(`i:${safe}`, async () => {
		const url = `${ORIGIN}/${encodePath(safe)}`;
		const res = await fetch(url, {
			headers: {
				"User-Agent": "MingJuanBibleReader/1.0",
				Accept: "text/html,application/xhtml+xml"
			},
			redirect: "follow"
		});
		if (!res.ok) return {
			title: fallbackTitle,
			links: [],
			sourceUrl: url,
			status: res.status
		};
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
		return {
			title: fallbackTitle,
			links,
			sourceUrl: url,
			status: 200
		};
	});
}
//#endregion
export { fetchArticle, fetchIndex };
