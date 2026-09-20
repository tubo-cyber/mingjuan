const CHAT_URL = "https://api.x.ai/v1/chat/completions";
const IMAGE_URL = "https://api.x.ai/v1/images/generations";
const EDIT_URL = "https://api.x.ai/v1/images/edits";
const VIDEO_URL = "https://api.x.ai/v1/videos/generations";

function key(): string | null {
  return process.env.XAI_API_KEY?.trim() || null;
}

export function aiAvailable(): boolean {
  return Boolean(key());
}

async function xfetch(url: string, body: unknown, timeoutMs = 90000): Promise<Response> {
  const k = key();
  if (!k) throw new Error("AI 功能在此环境暂不可用");
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${k}`,
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

export async function chatJson(args: {
  system: string;
  user: string;
  maxTokens?: number;
}): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  if (!key()) return { ok: false, error: "AI 功能在此环境暂不可用" };
  const res = await xfetch(CHAT_URL, {
    model: "grok-4.5",
    temperature: 0.2,
    max_tokens: args.maxTokens ?? 1800,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: args.system },
      { role: "user", content: args.user },
    ],
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, error: `模型错误 ${res.status}${err ? `: ${err.slice(0, 180)}` : ""}` };
  }
  const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const text = body.choices?.[0]?.message?.content ?? "";
  if (!text) return { ok: false, error: "模型没有返回内容" };
  return { ok: true, text };
}

export async function chatText(args: {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  maxTokens?: number;
}): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  if (!key()) return { ok: false, error: "AI 功能在此环境暂不可用" };
  const res = await xfetch(CHAT_URL, {
    model: "grok-4.5",
    temperature: 0.25,
    max_tokens: args.maxTokens ?? 900,
    messages: [{ role: "system", content: args.system }, ...args.messages],
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, error: `模型错误 ${res.status}${err ? `: ${err.slice(0, 180)}` : ""}` };
  }
  const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return { ok: true, text: body.choices?.[0]?.message?.content ?? "" };
}

type ImageResult = { ok: true; b64: string; mime: string } | { ok: false; error: string };

function pickImage(json: unknown): { b64?: string; url?: string } {
  const j = json as {
    data?: { b64_json?: string; url?: string }[];
    url?: string;
    b64_json?: string;
  };
  const first = j.data?.[0];
  return {
    b64: first?.b64_json ?? j.b64_json,
    url: first?.url ?? j.url,
  };
}

async function urlToB64(url: string): Promise<{ b64: string; mime: string } | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  const mime = res.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  const buf = Buffer.from(await res.arrayBuffer());
  return { b64: buf.toString("base64"), mime };
}

async function normalizeImage(json: unknown): Promise<ImageResult> {
  const { b64, url } = pickImage(json);
  if (b64) return { ok: true, b64, mime: "image/jpeg" };
  if (url) {
    const got = await urlToB64(url);
    if (got) return { ok: true, b64: got.b64, mime: got.mime };
  }
  return { ok: false, error: "生图没有返回可用图像" };
}

export async function generateImage(args: {
  prompt: string;
  aspectRatio?: string;
}): Promise<ImageResult> {
  if (!key()) return { ok: false, error: "AI 功能在此环境暂不可用" };
  const res = await xfetch(
    IMAGE_URL,
    {
      model: "grok-imagine-image-2.0",
      prompt: args.prompt,
      n: 1,
      aspect_ratio: args.aspectRatio ?? "3:4",
      resolution: "1k",
      response_format: "b64_json",
    },
    120000,
  );
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, error: `生图失败 ${res.status}${err ? `: ${err.slice(0, 200)}` : ""}` };
  }
  return normalizeImage(await res.json());
}

export async function editImage(args: {
  prompt: string;
  images: string[];
  aspectRatio?: string;
}): Promise<ImageResult> {
  if (!key()) return { ok: false, error: "AI 功能在此环境暂不可用" };
  const refs = args.images.slice(0, 5).map((src) => ({
    url: src.startsWith("data:") ? src : `data:image/jpeg;base64,${src}`,
    type: "image_url",
  }));
  const body: Record<string, unknown> = {
    model: "grok-imagine-image-2.0",
    prompt: args.prompt,
    aspect_ratio: args.aspectRatio ?? "3:4",
    resolution: "1k",
    response_format: "b64_json",
  };
  if (refs.length === 1) body.image = refs[0];
  else body.images = refs;
  const res = await xfetch(EDIT_URL, body, 120000);
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, error: `改图失败 ${res.status}${err ? `: ${err.slice(0, 200)}` : ""}` };
  }
  return normalizeImage(await res.json());
}

export async function startVideo(args: {
  prompt: string;
  imageDataUrl: string;
}): Promise<{ ok: true; requestId: string } | { ok: false; error: string }> {
  if (!key()) return { ok: false, error: "AI 功能在此环境暂不可用" };
  const res = await xfetch(
    VIDEO_URL,
    {
      model: "grok-imagine-video-1.5",
      prompt: args.prompt,
      image: { url: args.imageDataUrl },
      duration: 6,
    },
    60000,
  );
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { ok: false, error: `视频失败 ${res.status}${err ? `: ${err.slice(0, 200)}` : ""}` };
  }
  const json = (await res.json()) as { request_id?: string; id?: string };
  const requestId = json.request_id ?? json.id;
  if (!requestId) return { ok: false, error: "视频任务没有返回编号" };
  return { ok: true, requestId };
}

export async function pollVideo(
  requestId: string,
): Promise<
  | { ok: true; status: "done"; url: string }
  | { ok: true; status: "processing" }
  | { ok: false; error: string }
> {
  const k = key();
  if (!k) return { ok: false, error: "AI 功能在此环境暂不可用" };
  if (!/^[a-zA-Z0-9_-]+$/.test(requestId)) return { ok: false, error: "编号不合法" };
  const res = await fetch(`https://api.x.ai/v1/videos/${requestId}`, {
    headers: { Authorization: `Bearer ${k}` },
  });
  if (!res.ok) return { ok: false, error: `查询失败 ${res.status}` };
  const json = (await res.json()) as {
    status?: string;
    video?: { url?: string };
    url?: string;
  };
  const status = json.status ?? "processing";
  if (status === "done") {
    const url = json.video?.url ?? json.url;
    if (!url) return { ok: false, error: "视频完成但没有地址" };
    return { ok: true, status: "done", url };
  }
  if (status === "failed" || status === "expired") {
    return { ok: false, error: `视频${status}` };
  }
  return { ok: true, status: "processing" };
}

export function dataUrlFrom(b64: string, mime = "image/jpeg"): string {
  if (b64.startsWith("data:")) return b64;
  return `data:${mime};base64,${b64}`;
}
