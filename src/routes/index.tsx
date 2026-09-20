import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BOOKS } from "@/lib/catalog";
import { useLibrary, usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [q, setQ] = useState("");
  const script = usePrefs((s) => s.script);
  const history = useLibrary((s) => s.history);
  const stars = useLibrary((s) => s.stars);
  const navigate = useNavigate();

  const ot = useMemo(() => filterBooks("ot", q), [q]);
  const nt = useMemo(() => filterBooks("nt", q), [q]);

  return (
    <AppShell>
      <section className="mb-6">
        <p className="font-display text-2xl font-semibold tracking-wide">明卷查經</p>
        <p className="mt-1 text-sm text-muted">原站資料重排 · 手機也能順讀</p>
      </section>

      <label className="mb-6 flex min-h-12 items-center gap-2 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3">
        <Search className="size-4 text-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋書卷，如 創世記、羅馬書"
          className="h-12 w-full bg-transparent text-base outline-none placeholder:text-faint"
        />
      </label>

      {history[0] ? (
        <button
          type="button"
          onClick={() => navigate({ to: history[0].href as never })}
          className="mb-6 flex w-full items-center justify-between rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 py-3 text-left"
        >
          <div>
            <p className="text-xs text-faint">繼續閱讀</p>
            <p className="mt-0.5 font-medium">{history[0].title}</p>
          </div>
          <span className="text-sm text-muted">開</span>
        </button>
      ) : null}

      {stars.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-2 text-xs font-medium tracking-wide text-muted">收藏</h2>
          <div className="flex flex-col gap-1">
            {stars.slice(0, 6).map((s) => (
              <button
                key={s.href}
                type="button"
                onClick={() => navigate({ to: s.href as never })}
                className="rounded-[length:var(--radius-md)] px-2 py-2 text-left text-sm hover:bg-surface"
              >
                {s.title}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <BookSection title="舊約" books={ot} script={script} />
      <BookSection title="新約" books={nt} script={script} />
    </AppShell>
  );
}

function filterBooks(t: "ot" | "nt", q: string) {
  const needle = q.trim().toLowerCase();
  return BOOKS.filter((b) => {
    if (b.testament !== t) return false;
    if (!needle) return true;
    return (
      b.name.includes(q) ||
      b.nameS.includes(q) ||
      b.abbr.includes(q) ||
      b.folder.toLowerCase().includes(needle)
    );
  });
}

function BookSection({
  title,
  books,
  script,
}: {
  title: string;
  books: typeof BOOKS;
  script: "T" | "S";
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xs font-medium tracking-wide text-muted">{title}</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {books.map((b) => (
          <Link
            key={b.id}
            to="/book/$bookId"
            params={{ bookId: b.id }}
            className="flex min-h-[4.5rem] flex-col justify-center rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-2 shadow-[var(--shadow-soft)]"
          >
            <span className="text-[11px] text-faint">{b.abbr}</span>
            <span className="text-sm font-medium leading-snug">{script === "S" ? b.nameS : b.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
