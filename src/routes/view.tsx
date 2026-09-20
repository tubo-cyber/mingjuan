import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { ChevronLeft, Star } from "lucide-react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { AskDrawer } from "@/components/ask-drawer";
import { ReaderView } from "@/components/reader-view";
import { getArticleFn } from "@/lib/server-fns";
import { blocksToText } from "@/lib/article-text";
import { useLibrary } from "@/lib/prefs";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  path: z.string(),
});

export const Route = createFileRoute("/view")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ path: search.path }),
  loader: async ({ deps }) => {
    const article = await getArticleFn({ data: { path: deps.path, title: "查經資料" } });
    return { article, path: deps.path };
  },
  component: ViewPage,
});

function ViewPage() {
  const { article, path } = Route.useLoaderData();
  const href = `/view?path=${encodeURIComponent(path)}`;
  const pushHistory = useLibrary((s) => s.pushHistory);
  const toggleStar = useLibrary((s) => s.toggleStar);
  const starred = useLibrary((s) => s.stars.some((x) => x.href === href));
  const source = useMemo(() => blocksToText(article.blocks), [article.blocks]);

  useEffect(() => {
    pushHistory({ href, title: article.title });
  }, [href, article.title, pushHistory]);

  return (
    <AppShell
      title={article.title}
      back={
        <Link to="/" className="grid size-11 place-items-center">
          <ChevronLeft className="size-5" />
        </Link>
      }
      action={
        <div className="flex">
          <AskDrawer title={article.title} source={source} />
          <button type="button" className="grid size-11 place-items-center" onClick={() => toggleStar({ href, title: article.title })}>
            <Star className={cn("size-5", starred ? "fill-accent text-accent" : "text-muted")} />
          </button>
        </div>
      }
    >
      {article.isPdf ? (
        <div>
          <p className="mb-4 text-sm text-muted">這是 PDF 檔，請開啟原文閱讀。</p>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-[length:var(--radius-md)] bg-fg px-4 text-sm text-bg"
          >
            開啟 PDF
          </a>
        </div>
      ) : (
        <ReaderView title={article.title} blocks={article.blocks} />
      )}
    </AppShell>
  );
}
