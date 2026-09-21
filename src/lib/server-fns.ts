import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getArticleFn = createServerFn({ method: "GET" })
  .validator(
    z.object({
      path: z.string().min(1).max(400),
      title: z.string().max(120).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { fetchArticle } = await import("./fetch-source.server");
    return fetchArticle(data.path, data.title ?? "查經資料");
  });

export const getIndexFn = createServerFn({ method: "GET" })
  .validator(
    z.object({
      path: z.string().min(1).max(400),
      title: z.string().max(120).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { fetchIndex } = await import("./fetch-source.server");
    return fetchIndex(data.path, data.title ?? "目錄");
  });

export const analyzePeopleFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      bookName: z.string().min(1).max(40),
      from: z.number().int().min(1).max(150),
      to: z.number().int().min(1).max(150),
    }),
  )
  .handler(async ({ data }) => {
    const { analyzePeople } = await import("./ai-people.server");
    return analyzePeople(data);
  });

export const generatePortraitFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1).max(40),
      role: z.string().max(80),
      look: z.string().max(240),
      style: z.enum(["icon", "ink", "oil", "illum", "mosaic"]),
    }),
  )
  .handler(async ({ data }) => {
    const { generatePortrait } = await import("./ai-people.server");
    return generatePortrait(data);
  });
