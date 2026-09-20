import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BOOK_BY_ID, KINDS, articlePath, indexPath } from "@/lib/catalog";
import { getIndexFn } from "@/lib/server-fns";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/book/$bookId")({
  loader: async ({ params }) => {
    const book = BOOK_BY_ID[params.bookId];
    if (!book) throw new Error("查無此書卷");
    const idx = await getIndexFn({ data: { path: indexPath(book), title: book.name } });
    return { extras: idx.links.filter((l) => l.pdf || /BT/i.test(l.href)) };
  },
  component: BookPage,
});

function BookPage() {
  const { bookId } = Route.useParams();
  const { extras } = Route.useLoaderData();
  const book = BOOK_BY_ID[bookId];
  const script = usePrefs((s) => s.script);
  const name = script === "S" ? book.nameS : book.name;
  const specials = [
    { chap: 0, label: "導論" },
    ...Array.from({ length: book.chapters }, (_, i) => ({ chap: i + 1, label: String(i + 1).padStart(2, "0") })),
    { chap: book.chapters + 1, label: "綜合" },
  ];

  return (
    <AppShell
      title={name}
      back={
        <Link to="/" className="grid size-11 place-items-center text-muted">
          <ChevronLeft className="size-5" />
        </Link>
      }
    >
      <p className="mb-4 text-sm text-muted">
        共 {book.chapters} 章 · 點章節即讀註解，也可改選其他資料類型
      </p>
      <Link
        to="/studio/$bookId"
        params={{ bookId: book.id }}
        className="mb-4 flex min-h-12 items-center justify-between rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 text-sm"
      >
        <span>整理本卷人物並繪像</span>
        <span className="text-muted">開</span>
      </Link>
      <div className="mb-4 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <Link
            key={k.code}
            to="/read/$bookId/$kind/$chap"
            params={{ bookId: book.id, kind: k.code, chap: "1" }}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted"
          >
            {k.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
        {specials.map((s) => (
          <Link
            key={s.chap}
            to="/read/$bookId/$kind/$chap"
            params={{ bookId: book.id, kind: "C", chap: String(s.chap) }}
            className="grid min-h-11 place-items-center rounded-[length:var(--radius-md)] border border-border bg-surface text-sm"
          >
            {s.label}
          </Link>
        ))}
      </div>
      {extras.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-xs font-medium tracking-wide text-muted">電子書與圖表</h2>
          <ul className="space-y-1">
            {extras.slice(0, 40).map((l) => (
              <li key={l.href + l.text}>
                <Link
                  to="/view"
                  search={{ path: l.href }}
                  className="block rounded-[length:var(--radius-md)] px-2 py-2 text-sm hover:bg-surface"
                >
                  {l.text}
                  {l.pdf ? <span className="ml-2 text-xs text-faint">PDF</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </AppShell>
  );
}
