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
