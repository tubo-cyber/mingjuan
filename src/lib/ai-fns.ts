import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BOOK_BY_ID, articlePath } from "./catalog";
import { MODESTY, stylePrompt } from "./art-styles";

function clip(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n) + "…";
}

function blocksToText(
  blocks: { t: string; text?: string; ref?: string; quote?: string; label?: string }[],
): string {
  return blocks
    .map((b) => {
      if (b.t === "verse") return `【${b.ref}】${b.quote ?? ""}`;
      if (b.t === "note") return `〔${b.label}〕${b.text ?? ""}`;
      return b.text ?? "";
    })
    .filter(Boolean)
    .join("\n");
}

export const extractPeopleFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      bookId: z.string(),
      from: z.number().int().min(1).max(150),
      to: z.number().int().min(1).max(150),
    }),
  )
  .handler(async ({ data }) => {
    const { chatJson, aiAvailable } = await import("./xai.server");
    if (!aiAvailable()) return { ok: false as const, error: "AI 功能在此环境暂不可用" };
    const book = BOOK_BY_ID[data.bookId];
    if (!book) return { ok: false as const, error: "查无此书卷" };
    const from = Math.min(data.from, data.to);
    const to = Math.max(data.from, data.to);
    const { fetchArticle } = await import("./fetch-source.server");
    const intro = await fetchArticle(articlePath(book, "C", 0, "T"), `${book.name}導論`);
    const source = clip(`# ${intro.title}\n${blocksToText(intro.blocks)}`, 9000);
    const result = await chatJson({
      maxTokens: 1600,
      system:
        "你是谨慎的圣经教师。只根据用户提供的经文注解摘录，并对照该卷该段圣经记载，列出真正推动叙事的重心人物。不要列族谱里一长串仅出现一次的名字。不要发明经文没有的外貌细节；外貌只能写经文或注解明确说过的，否则写“经文未细写外貌，请按古代近东常民、端庄服饰来画”。用 JSON。",
      user: `书卷：${book.name}（${book.abbr}）第 ${from} 至 ${to} 章。\n\n注解摘录：\n${source}\n\n请输出 JSON：{"people":[{"id":"slug-en","name":"繁体中文惯用名","aliases":["别名"],"role":"一句身份","chapters":[出现章号],"importance":"为何是重心而非族谱路人","bibleLook":"经文/注解对外貌或气质的记载，没有就如实说明","portraitBrief":"给画家的端庄人物设定，成人，历史可信"}]}。people 最多 8 个。id 用英文短横线，稳定可复用（如 abraham, sarah, joseph）。`,
    });
    if (!result.ok) return result;
    try {
      const parsed = JSON.parse(result.text) as {
        people?: {
          id: string;
          name: string;
          aliases?: string[];
          role?: string;
          chapters?: number[];
          importance?: string;
          bibleLook?: string;
          portraitBrief?: string;
        }[];
      };
      const skip = /^(神|上帝|耶和華|耶和华|父神|主神|真神)$/;
      const people = (parsed.people ?? [])
        .filter((p) => !skip.test((p.name ?? "").trim()))
        .slice(0, 8).map((p) => ({
        id: String(p.id || p.name).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"),
        name: p.name,
        aliases: (p.aliases ?? []).slice(0, 6),
        role: p.role ?? "",
        chapters: (p.chapters ?? []).filter((n) => n >= from && n <= to).slice(0, 12),
        importance: p.importance ?? "",
        bibleLook: p.bibleLook ?? "",
        portraitBrief: p.portraitBrief ?? "",
      }));
      return { ok: true as const, people, bookName: book.name, from, to };
    } catch {
      return { ok: false as const, error: "人物名单解析失败，请再试一次" };
    }
  });

export const makePortraitFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1).max(40),
      brief: z.string().max(800),
      look: z.string().max(600),
      styleId: z.string(),
      lockedImage: z.string().max(1_800_000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { generateImage, editImage, dataUrlFrom, aiAvailable } = await import("./xai.server");
    if (!aiAvailable()) return { ok: false as const, error: "AI 功能在此环境暂不可用" };
    const style = stylePrompt(data.styleId);
    const prompt = `${MODESTY}
Single portrait of the biblical figure ${data.name}.
Biblical notes on appearance: ${data.look}
Character brief: ${data.brief}
Art direction: ${style}
Half-length or three-quarter portrait, facing the viewer slightly, calm expression, readable face, plain ancient backdrop, no text, no watermark, no collage.`;
    const out = data.lockedImage
      ? await editImage({ prompt: `${prompt}\nKeep the SAME face, age, hair, skin, and identity as the reference portrait. Only refresh pose/lighting within the chosen style.`, images: [data.lockedImage], aspectRatio: "3:4" })
      : await generateImage({ prompt, aspectRatio: "3:4" });
    if (!out.ok) return out;
    return { ok: true as const, dataUrl: dataUrlFrom(out.b64, out.mime) };
  });

export const makeSceneFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      bookName: z.string(),
      chapter: z.number().int(),
      passage: z.string().max(4000),
      styleId: z.string(),
      people: z
        .array(
          z.object({
            name: z.string(),
            image: z.string().max(1_800_000),
          }),
        )
        .max(4),
    }),
  )
  .handler(async ({ data }) => {
    const { generateImage, editImage, dataUrlFrom, aiAvailable } = await import("./xai.server");
    if (!aiAvailable()) return { ok: false as const, error: "AI 功能在此环境暂不可用" };
    const style = stylePrompt(data.styleId);
    const names = data.people.map((p) => p.name).join("、") || "场景中的人物";
    const prompt = `${MODESTY}
Narrative illustration of ${data.bookName} chapter ${data.chapter}.
Figures who MUST keep identity from the reference portraits: ${names}.
Passage cues: ${clip(data.passage, 1200)}
Art direction: ${style}
Wide story scene, historically plausible setting, modest clothing, no text, no speech bubbles, no modern objects. If references are provided, every named person must match those faces exactly.`;
    const out =
      data.people.length > 0
        ? await editImage({
            prompt,
            images: data.people.map((p) => p.image),
            aspectRatio: "16:9",
          })
        : await generateImage({ prompt, aspectRatio: "16:9" });
    if (!out.ok) return out;
    return { ok: true as const, dataUrl: dataUrlFrom(out.b64, out.mime) };
  });

export const askStudyFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      question: z.string().min(1).max(600),
      title: z.string().max(120),
      source: z.string().max(12000),
      history: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
        .max(8)
        .optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { chatText, aiAvailable } = await import("./xai.server");
    if (!aiAvailable()) return { ok: false as const, error: "AI 功能在此环境暂不可用" };
    const system = `你是明卷查经的助读。必须：
1. 优先依据用户提供的「本页注解与经文摘录」作答。
2. 若摘录不足，只能补充圣经里清楚的平行经文，并标明出处。
3. 不确定或注解有争议时，要明说，不要武断。
4. 不可编造原文、不可编造注释者没写过的话。
5. 用繁体中文，条理清楚，适当引用【章节】。
6. 不谈与经文无关的内容，不作灵媒式预言。
当前篇名：${data.title}`;
    const messages = [
      ...(data.history ?? []).map((h) => ({ role: h.role, content: h.content })),
      {
        role: "user" as const,
        content: `【本页摘录】\n${clip(data.source, 10000)}\n\n【问题】\n${data.question}`,
      },
    ];
    return chatText({ system, messages, maxTokens: 900 });
  });

export const startClipFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      image: z.string().max(1_800_000),
      name: z.string().max(40),
    }),
  )
  .handler(async ({ data }) => {
    const { startVideo, aiAvailable } = await import("./xai.server");
    if (!aiAvailable()) return { ok: false as const, error: "AI 功能在此环境暂不可用" };
    return startVideo({
      imageDataUrl: data.image,
      prompt: `Gentle cinematic motion of this still biblical portrait of ${data.name}: slow camera push-in, fabric and hair move slightly in desert wind, reverent lighting, no extra characters, no text.`,
    });
  });

export const pollClipFn = createServerFn({ method: "POST" })
  .validator(z.object({ requestId: z.string().min(4).max(80) }))
  .handler(async ({ data }) => {
    const { pollVideo, aiAvailable } = await import("./xai.server");
    if (!aiAvailable()) return { ok: false as const, error: "AI 功能在此环境暂不可用" };
    return pollVideo(data.requestId);
  });
