import { ART_STYLES, type StyleId } from "./people";

export type AnalyzedPerson = {
  name: string;
  role: string;
  look: string;
  chapters: string;
};

function apiKey(): string | undefined {
  return process.env.XAI_API_KEY?.trim() || undefined;
}

export async function analyzePeople(input: {
  bookName: string;
  from: number;
  to: number;
}): Promise<{ ok: true; people: AnalyzedPerson[] } | { ok: false; error: string }> {
  const key = apiKey();
  if (!key) return { ok: false, error: "此環境尚未開放圖像與分析功能" };

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      max_tokens: 700,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "你是聖經人物助理。只輸出 JSON 陣列，不要 markdown。每項欄位：name(繁體中文名)、role(一句身份)、look(英文外貌提示，供畫像用)、chapters(如 12–25)。最多 8 位在指定章節真正出場的重要人物。不要虛構次要路人。",
        },
        {
          role: "user",
          content: `書卷：${input.bookName}；章節：第 ${input.from} 章到第 ${input.to} 章。列出重要人物。`,
        },
      ],
    }),
  });
  if (!res.ok) return { ok: false, error: `分析失敗（${res.status}）` };
  const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = body.choices?.[0]?.message?.content ?? "[]";
  const jsonText = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    const m = jsonText.match(/\[[\s\S]*\]/);
    if (!m) return { ok: false, error: "無法解析人物名單" };
    parsed = JSON.parse(m[0]);
  }
  if (!Array.isArray(parsed)) return { ok: false, error: "無法解析人物名單" };
  const people: AnalyzedPerson[] = parsed
    .slice(0, 8)
    .map((row) => {
      const r = row as Record<string, unknown>;
      return {
        name: String(r.name ?? "").trim(),
        role: String(r.role ?? "").trim(),
        look: String(r.look ?? "historically plausible ancient portrait").trim(),
        chapters: String(r.chapters ?? "").trim(),
      };
    })
    .filter((p) => p.name.length > 0);
  return { ok: true, people };
}

export async function generatePortrait(input: {
  name: string;
  role: string;
  look: string;
  style: StyleId;
}): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const key = apiKey();
  if (!key) return { ok: false, error: "此環境尚未開放圖像功能" };

  const style = ART_STYLES.find((s) => s.id === input.style) ?? ART_STYLES[0];
  const prompt = [
    `Respectful biblical portrait of ${input.name}, ${input.role}.`,
    input.look,
    style.prompt,
    "Single figure, chest-up or three-quarter, historically plausible clothing of the biblical world.",
    "No modern clothes, no logos, no watermark, no text, no title, no frame caption.",
    "Tasteful, museum-quality, not caricature, not sensual.",
  ].join(" ");

  const res = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "grok-imagine-image",
      prompt,
      n: 1,
      resolution: "1k",
      response_format: "url",
    }),
  });
  if (!res.ok) return { ok: false, error: `繪製失敗（${res.status}）` };
  const body = (await res.json()) as { data?: { url?: string }[] };
  const url = body.data?.[0]?.url;
  if (!url) return { ok: false, error: "沒有收到圖像" };
  return { ok: true, url };
}
