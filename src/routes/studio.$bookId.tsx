import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, Loader2, Sparkles, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { extractPeopleFn, makePortraitFn, pollClipFn, startClipFn } from "@/lib/ai-fns";
import { ART_STYLES, type StyleId } from "@/lib/art-styles";
import { BOOK_BY_ID } from "@/lib/catalog";
import { compressDataUrl } from "@/lib/compress-image";
import { deleteImage, imgKey, loadImage, saveImage, useCast, type Person } from "@/lib/cast-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio/$bookId")({
  component: StudioPage,
});

function StudioPage() {
  const { bookId } = Route.useParams();
  const book = BOOK_BY_ID[bookId];
  const peopleAll = useCast((s) => s.people);
  const people = peopleAll.filter((p) => p.bookId === bookId);
  const upsertPeople = useCast((s) => s.upsertPeople);
  const styleId = useCast((s) => s.styleByBook[bookId] ?? "oil");
  const setStyle = useCast((s) => s.setStyle);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(11, book?.chapters ?? 1));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!book) return <AppShell title="绘像">查无此书卷</AppShell>;

  async function extract() {
    setBusy(true);
    setErr("");
    try {
      const res = await extractPeopleFn({ data: { bookId, from, to } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      upsertPeople(bookId, res.people);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "提取失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell
      title={`${book.name}绘像`}
      back={
        <Link to="/studio" className="grid size-11 place-items-center">
          <ChevronLeft className="size-5" />
        </Link>
      }
    >
      <p className="mb-4 text-sm text-muted">
        选定章节，只提取叙事重心人物（族谱路人会略过）。锁定肖像后，后文插图会沿用同一张脸。
      </p>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <label className="text-xs text-muted">
          从第
          <input
            type="number"
            min={1}
            max={book.chapters}
            value={from}
            onChange={(e) => setFrom(Number(e.target.value))}
            className="mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm text-fg"
          />
        </label>
        <label className="text-xs text-muted">
          到第
          <input
            type="number"
            min={1}
            max={book.chapters}
            value={to}
            onChange={(e) => setTo(Number(e.target.value))}
            className="mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm text-fg"
          />
        </label>
      </div>

      <h3 className="mb-2 text-xs font-medium text-muted">画风</h3>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {ART_STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStyle(bookId, s.id)}
            className={cn(
              "min-h-11 rounded-[length:var(--radius-md)] border px-3 text-sm",
              styleId === s.id ? "border-fg bg-fg text-bg" : "border-border bg-surface",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => void extract()}
        disabled={busy}
        className="mb-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[length:var(--radius-md)] bg-fg text-sm text-bg disabled:opacity-40"
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        提取第 {Math.min(from, to)}–{Math.max(from, to)} 章重心人物
      </button>
      {err ? <p className="mb-4 text-xs text-accent">{err}</p> : null}

      <div className="space-y-4">
        {people.map((p) => (
          <PersonCard key={p.id} person={p} styleId={p.confirmed ? p.styleId : styleId} />
        ))}
      </div>
    </AppShell>
  );
}

function PersonCard({ person, styleId }: { person: Person; styleId: StyleId }) {
  const confirm = useCast((s) => s.confirm);
  const forget = useCast((s) => s.forget);
  const [img, setImg] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [clip, setClip] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const key = imgKey(person.bookId, person.id);

  useEffect(() => {
    loadImage(key).then(setImg);
  }, [key]);

  async function gen() {
    setBusy(true);
    setErr("");
    const res = await makePortraitFn({
      data: {
        name: person.name,
        brief: person.portraitBrief,
        look: person.bibleLook,
        styleId,
        lockedImage: person.confirmed ? (img ?? undefined) : undefined,
      },
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    const compact = await compressDataUrl(res.dataUrl);
    setDraft(compact);
  }

  async function lock(src: string) {
    const compact = await compressDataUrl(src);
    await saveImage(key, compact);
    setImg(compact);
    setDraft(null);
    confirm(person.bookId, person.id);
  }

  async function animate() {
    if (!img) return;
    setBusy(true);
    setErr("");
    const start = await startClipFn({ data: { image: img, name: person.name } });
    if (!start.ok) {
      setBusy(false);
      setErr(start.error);
      return;
    }
    for (let i = 0; i < 24; i++) {
      await new Promise((r) => setTimeout(r, 2500));
      const poll = await pollClipFn({ data: { requestId: start.requestId } });
      if (!poll.ok) {
        setBusy(false);
        setErr(poll.error);
        return;
      }
      if (poll.status === "done") {
        setClip(poll.url);
        setBusy(false);
        return;
      }
    }
    setBusy(false);
    setErr("视频仍在生成，请稍后再试");
  }

  const shown = draft ?? img;

  return (
    <article className="rounded-[length:var(--radius-lg)] border border-border bg-surface p-3">
      <div className="flex gap-3">
        <div className="size-28 shrink-0 overflow-hidden rounded-[length:var(--radius-md)] bg-raised">
          {shown ? <img src={shown} alt={person.name} className="size-full object-cover" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium">
              {person.name}
              {person.confirmed ? <Star className="ml-1 inline size-3.5 fill-accent text-accent" /> : null}
            </h3>
            <button
              type="button"
              className="text-xs text-faint"
              onClick={() => {
                void deleteImage(key);
                forget(person.bookId, person.id);
              }}
            >
              移除
            </button>
          </div>
          <p className="mt-1 text-xs text-muted">{person.role}</p>
          <p className="mt-2 text-xs leading-relaxed text-faint">{person.importance}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{person.bibleLook}</p>
        </div>
      </div>
      {err ? <p className="mt-2 text-xs text-accent">{err}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void gen()}
          className="inline-flex min-h-10 items-center rounded-[length:var(--radius-md)] border border-border px-3 text-xs disabled:opacity-40"
        >
          {busy ? <Loader2 className="mr-1 size-3.5 animate-spin" /> : null}
          {person.confirmed ? "同脸重绘" : "生成肖像"}
        </button>
        {draft ? (
          <button
            type="button"
            onClick={() => void lock(draft)}
            className="inline-flex min-h-10 items-center rounded-[length:var(--radius-md)] bg-fg px-3 text-xs text-bg"
          >
            锁定这张脸
          </button>
        ) : null}
        {person.confirmed && img ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void animate()}
            className="inline-flex min-h-10 items-center rounded-[length:var(--radius-md)] border border-border px-3 text-xs disabled:opacity-40"
          >
            做成短片
          </button>
        ) : null}
      </div>
      {clip ? (
        <video src={clip} controls className="mt-3 w-full rounded-[length:var(--radius-md)]" />
      ) : null}
    </article>
  );
}
