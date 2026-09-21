import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BOOKS, BOOK_BY_ID } from "@/lib/catalog";
import { ART_STYLES, figuresInRange, type Figure, type StyleId } from "@/lib/people";
import { analyzePeopleFn, generatePortraitFn } from "@/lib/server-fns";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/people")({ component: PeoplePage });

type Card = {
  key: string;
  name: string;
  role: string;
  look: string;
  chapters: string;
};

function PeoplePage() {
  const script = usePrefs((s) => s.script);
  const [bookId, setBookId] = useState("01");
  const book = BOOK_BY_ID[bookId];
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(11, book.chapters));
  const [style, setStyle] = useState<StyleId>("ink");
  const [aiCards, setAiCards] = useState<Card[] | null>(null);
  const [busy, setBusy] = useState<"analyze" | "draw" | null>(null);
  const [error, setError] = useState("");
  const [drawing, setDrawing] = useState<string | null>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  const local = useMemo(() => figuresInRange(bookId, from, to), [bookId, from, to]);

  const cards: Card[] = aiCards ?? local.map(figureToCard);

  function onBook(id: string) {
    const b = BOOK_BY_ID[id];
    setBookId(id);
    setFrom(1);
    setTo(Math.min(11, b.chapters));
    setAiCards(null);
    setError("");
  }

  async function analyze() {
    setBusy("analyze");
    setError("");
    try {
      const name = script === "S" ? book.nameS : book.name;
      const res = await analyzePeopleFn({ data: { bookName: name, from, to } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setAiCards(
        res.people.map((p) => ({
          key: p.name,
          name: p.name,
          role: p.role,
          look: p.look,
          chapters: p.chapters,
        })),
      );
    } catch {
      setError("分析暫時無法完成，可先用本機名單。");
    } finally {
      setBusy(null);
    }
  }

  async function draw(card: Card) {
    setBusy("draw");
    setDrawing(card.key);
    setError("");
    try {
      const res = await generatePortraitFn({
        data: { name: card.name, role: card.role, look: card.look, style },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setImages((prev) => {
        const next = { ...prev, [card.key + style]: res.url };
        const keys = Object.keys(next);
        if (keys.length > 8) delete next[keys[0]];
        return next;
      });
    } catch {
      setError("繪製暫時失敗，請稍後再試。");
    } finally {
      setBusy(null);
      setDrawing(null);
    }
  }

  return (
    <AppShell title="人物">
      <section className="mb-5">
        <p className="font-display text-xl font-semibold">人物畫像</p>
        <p className="mt-1 text-sm text-muted">選書卷與章節，列出重要人物，再選畫風生成。每次只繪一張，以免拖慢閱讀。</p>
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

      <div className="mb-3 grid grid-cols-2 gap-2">
        <label className="text-xs text-muted">
          從第幾章
          <input
            type="number"
            min={1}
            max={book.chapters}
            value={from}
            onChange={(e) => {
              setFrom(clampChap(Number(e.target.value), book.chapters));
              setAiCards(null);
            }}
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
            onChange={(e) => {
              setTo(clampChap(Number(e.target.value), book.chapters));
              setAiCards(null);
            }}
            className="mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
          />
        </label>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {ART_STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStyle(s.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs",
              style === s.id ? "border-fg bg-fg text-bg" : "border-border bg-surface text-muted",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={analyze}
        disabled={busy !== null}
        className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-[length:var(--radius-md)] bg-fg px-4 text-sm text-bg disabled:opacity-60"
      >
        <Sparkles className="size-4" />
        {busy === "analyze" ? "分析中…" : "AI 分析本章人物"}
      </button>

      {error ? <p className="mb-4 text-sm text-seal">{error}</p> : null}

      {cards.length === 0 ? (
        <p className="rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 py-6 text-sm text-muted">
          這段章節本機名單沒有預設人物。點「AI 分析」可依經文補上。
        </p>
      ) : (
        <ul className="space-y-3">
          {cards.map((c) => {
            const img = images[c.key + style];
            return (
              <li
                key={c.key}
                className="rounded-[length:var(--radius-lg)] border border-border bg-surface p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-raised text-seal">
                    <Users className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.role}
                      {c.chapters ? ` · ${c.chapters}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => draw(c)}
                    className="shrink-0 rounded-full border border-border px-3 py-2 text-xs disabled:opacity-60"
                  >
                    {drawing === c.key ? "繪製中…" : img ? "重繪" : "生成畫像"}
                  </button>
                </div>
                {img ? (
                  <img
                    src={img}
                    alt={c.name}
                    className="mt-3 w-full rounded-[length:var(--radius-md)] border border-border object-cover"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}

function figureToCard(f: Figure): Card {
  return {
    key: f.id,
    name: f.name,
    role: f.role,
    look: f.look,
    chapters: `${f.from}–${f.to}章`,
  };
}

function clampChap(n: number, max: number) {
  if (!Number.isFinite(n)) return 1;
  return Math.min(max, Math.max(1, Math.round(n)));
}
