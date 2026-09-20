import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Palette, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AskDrawer } from "@/components/ask-drawer";
import { ReaderView } from "@/components/reader-view";
import { SceneStrip } from "@/components/scene-strip";
import { BOOK_BY_ID, KINDS, articlePath, type KindCode } from "@/lib/catalog";
import { getArticleFn } from "@/lib/server-fns";
import { blocksToText } from "@/lib/article-text";
import { useCast } from "@/lib/cast-store";
import { useLibrary, usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/read/$bookId/$kind/$chap")({
  loader: async ({ params }) => {
    const book = BOOK_BY_ID[params.bookId];
    if (!book) throw new Error("查無此書卷");
    const kind = params.kind as KindCode;
    const chap = Number(params.chap);
    const path = articlePath(book, kind, chap, "T");
    const title = chapterTitle(book.name, kind, chap, book.chapters);
    const article = await getArticleFn({ data: { path, title } });
    return { article };
  },
  component: ReadPage,
});

function chapterTitle(name: string, kind: KindCode, chap: number, total: number) {
  const k = KINDS.find((x) => x.code === kind)?.name ?? "";
  if (chap === 0) return `${name}導論${k}`;
  if (chap === total + 1) return `${name}綜合${k}`;
  return `${name}第${chap}章${k}`;
}

function ReadPage() {
  const { bookId, kind, chap } = Route.useParams();
  const { article } = Route.useLoaderData();
  const book = BOOK_BY_ID[bookId];
  const script = usePrefs((s) => s.script);
  const n = Number(chap);
  const k = kind as KindCode;
  const max = book.chapters + 1;
  const prev = n > 0 ? n - 1 : null;
  const next = n < max ? n + 1 : null;
  const href = `/read/${bookId}/${kind}/${chap}`;
  const pushHistory = useLibrary((s) => s.pushHistory);
  const toggleStar = useLibrary((s) => s.toggleStar);
  const starred = useLibrary((s) => s.stars.some((x) => x.href === href));
  const [live, setLive] = useState(article);
  const peopleAll = useCast((s) => s.people);
  const people = peopleAll.filter((p) => p.bookId === bookId && p.confirmed);

  useEffect(() => {
    setLive(article);
  }, [article]);

  useEffect(() => {
    if (script === "T") return;
    let alive = true;
    const path = articlePath(book, k, n, script);
    getArticleFn({ data: { path, title: article.title } }).then((a) => {
      if (alive && a.status === 200) setLive(a);
    });
    return () => {
      alive = false;
    };
  }, [script, book, k, n, article.title]);

  useEffect(() => {
    pushHistory({ href, title: live.title });
  }, [href, live.title, pushHistory]);

  const name = script === "S" ? book.nameS : book.name;
  const source = useMemo(() => blocksToText(live.blocks), [live.blocks]);
  const marks = people.map((p) => ({ id: p.id, name: p.name, aliases: p.aliases }));

  if (live.isPdf) {
    return (
      <AppShell
        title={live.title}
        back={
          <Link to="/book/$bookId" params={{ bookId }} className="grid size-11 place-items-center">
            <ChevronLeft className="size-5" />
          </Link>
        }
      >
        <KindBar bookId={bookId} chap={chap} current={k} />
        <p className="mb-4 text-sm text-muted">此項為 PDF 譯文檔，請開啟原文。</p>
        <a
          href={live.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center rounded-[length:var(--radius-md)] bg-fg px-4 text-sm text-bg"
        >
          開啟 PDF
        </a>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={`${name} ${n === 0 ? "導" : n > book.chapters ? "綜" : n}`}
      back={
        <Link to="/book/$bookId" params={{ bookId }} className="grid size-11 place-items-center">
          <ChevronLeft className="size-5" />
        </Link>
      }
      action={
        <div className="flex items-center">
          <AskDrawer title={live.title} source={source} />
          <Link
            to="/studio/$bookId"
            params={{ bookId }}
            className="grid size-11 place-items-center text-muted"
            aria-label="绘像"
          >
            <Palette className="size-5" />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center"
            onClick={() => toggleStar({ href, title: live.title })}
            aria-label="收藏"
          >
            <Star className={cn("size-5", starred ? "fill-accent text-accent" : "text-muted")} />
          </button>
        </div>
      }
    >
      <KindBar bookId={bookId} chap={chap} current={k} />
      {n >= 1 && n <= book.chapters ? (
        <SceneStrip bookId={bookId} bookName={name} chapter={n} passage={source} />
      ) : null}
      <ReaderView title={live.title} blocks={live.blocks} marks={marks} />
      <div className="mt-10 flex items-center justify-between gap-3">
        {prev !== null ? (
          <Link
            to="/read/$bookId/$kind/$chap"
            params={{ bookId, kind, chap: String(prev) }}
            className="inline-flex min-h-11 items-center gap-1 rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
          >
            <ChevronLeft className="size-4" />
            上一章
          </Link>
        ) : (
          <span />
        )}
        {next !== null ? (
          <Link
            to="/read/$bookId/$kind/$chap"
            params={{ bookId, kind, chap: String(next) }}
            className="inline-flex min-h-11 items-center gap-1 rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
          >
            下一章
            <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </div>
      <p className="mt-8 text-center text-[11px] text-faint">資料來源：華人基督徒查經資料網站 · 僅重排版面</p>
    </AppShell>
  );
}

function KindBar({ bookId, chap, current }: { bookId: string; chap: string; current: KindCode }) {
  return (
    <div className="mb-6 -mx-1 flex gap-1 overflow-x-auto pb-1">
      {KINDS.map((item) => (
        <Link
          key={item.code}
          to="/read/$bookId/$kind/$chap"
          params={{ bookId, kind: item.code, chap }}
          className={cn(
            "shrink-0 rounded-full px-3 py-2 text-xs",
            current === item.code ? "bg-fg text-bg" : "bg-surface text-muted border border-border",
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
