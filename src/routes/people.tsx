import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BOOKS, BOOK_BY_ID } from "@/lib/catalog";
import { figuresInRange } from "@/lib/people";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/people")({ component: PeoplePage });

function PeoplePage() {
  const script = usePrefs((s) => s.script);
  const [bookId, setBookId] = useState("01");
  const book = BOOK_BY_ID[bookId];
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(11, book.chapters));
  const people = useMemo(() => figuresInRange(bookId, from, to), [bookId, from, to]);

  function onBook(id: string) {
    const b = BOOK_BY_ID[id];
    setBookId(id);
    setFrom(1);
    setTo(Math.min(11, b.chapters));
  }

  return (
    <AppShell title="人物">
      <section className="mb-5">
        <p className="font-display text-xl font-semibold">人物</p>
        <p className="mt-1 text-sm text-muted">選書卷與章節，查看這一段經文裡的主要人物，點姓名即可去讀該章註解。</p>
      </section>

      <label className="mb-3 block text-xs text-muted">
        書卷
        <select
          value={bookId}
          onChange={(e) => onBook(e.target.value)}
          className="mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm text-fg"
        >
          {BOOKS.map((b) => (
            <option key={b.id} value={b.id}>
              {script === "S" ? b.nameS : b.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mb-6 grid grid-cols-2 gap-2">
        <label className="text-xs text-muted">
          從第幾章
          <input
            type="number"
            min={1}
            max={book.chapters}
            value={from}
            onChange={(e) => setFrom(clampChap(Number(e.target.value), book.chapters))}
            className="mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
          />
        </label>
        <label className="text-xs text-muted">
          到第幾章
          <input
            type="number"
            min={1}
            max={book.chapters}
            value={to}
            onChange={(e) => setTo(clampChap(Number(e.target.value), book.chapters))}
            className="mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
          />
        </label>
      </div>

      {people.length === 0 ? (
        <p className="rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 py-6 text-sm text-muted">
          這段章節暫無預設人物名單，可改選其他章或直接從經卷讀經。
        </p>
      ) : (
        <ul className="space-y-2">
          {people.map((p) => (
            <li key={p.id}>
              <Link
                to="/read/$bookId/$kind/$chap"
                params={{ bookId, kind: "C", chap: String(p.from) }}
                className="flex min-h-14 items-center gap-3 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-3"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-raised text-seal">
                  <Users className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{script === "S" ? p.nameS : p.name}</span>
                  <span className="block text-xs text-muted">
                    {p.role} · {p.from}–{p.to}章
                  </span>
                </span>
                <span className="text-xs text-faint">讀</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}

function clampChap(n: number, max: number) {
  if (!Number.isFinite(n)) return 1;
  return Math.min(max, Math.max(1, Math.round(n)));
}
