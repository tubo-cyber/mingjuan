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
const TTL = 1000 * 60 * 15;

function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return Promise.resolve(hit.value as T);
  return fn().then((value) => {
    cache.set(key, { at: Date.now(), value });
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

export async function fetchArticle(path: string, fallbackTitle: string): Promise<ArticlePayload> {
  const safe = assertSafePath(path);
  return cached(`a:${safe}`, async () => {
    const url = `${ORIGIN}/${encodePath(safe)}`;
    const isPdf = /\.pdf$/i.test(safe);
    if (isPdf) {
      return {
        title: fallbackTitle,
        blocks: [],
        sourceUrl: url,
        isPdf: true,
        status: 200,
      } satisfies ArticlePayload;
    }
    const res = await fetch(url, {
      headers: { "User-Agent": "MingJuanBibleReader/1.0", Accept: "text/html" },
      redirect: "follow",
    });
    if (!res.ok) {
      return {
        title: fallbackTitle,
        blocks: [{ t: "p", text: `原文頁面暫時無法取得（${res.status}）。可改試其他章節或資料類型。` }],
        sourceUrl: url,
        isPdf: false,
        status: res.status,
      } satisfies ArticlePayload;
    }
    const buf = await res.arrayBuffer();
    const html = decodePage(buf);
    const parsed = parseArticle(html, fallbackTitle);
    return {
      title: parsed.title,
      blocks: parsed.blocks,
      sourceUrl: url,
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

export async function fetchIndex(path: string, fallbackTitle: string): Promise<IndexPayload> {
  const safe = assertSafePath(path);
  return cached(`i:${safe}`, async () => {
    const url = `${ORIGIN}/${encodePath(safe)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "MingJuanBibleReader/1.0", Accept: "text/html" },
      redirect: "follow",
    });
    if (!res.ok) {
      return { title: fallbackTitle, links: [], sourceUrl: url, status: res.status };
    }
    const html = decodePage(await res.arrayBuffer());
    const links = extractLinks(html, safe);
    return { title: fallbackTitle, links, sourceUrl: url, status: 200 };
  });
}
