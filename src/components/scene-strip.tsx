import { useEffect, useMemo, useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { makeSceneFn } from "@/lib/ai-fns";
import { ART_STYLES } from "@/lib/art-styles";
import { imgKey, loadImage, mentioned, saveImage, useCast } from "@/lib/cast-store";
import { compressDataUrl } from "@/lib/compress-image";

export function SceneStrip({
  bookId,
  bookName,
  chapter,
  passage,
}: {
  bookId: string;
  bookName: string;
  chapter: number;
  passage: string;
}) {
  const peopleAll = useCast((s) => s.people);
  const people = peopleAll.filter((p) => p.bookId === bookId && p.confirmed);
  const styleId = useCast((s) => s.styleByBook[bookId] ?? "oil");
  const hits = useMemo(() => mentioned(people, passage), [people, passage]);
  const [portraits, setPortraits] = useState<Record<string, string>>({});
  const [scene, setScene] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all(
      hits.map(async (p) => {
        const img = await loadImage(imgKey(bookId, p.id));
        return [p.id, img] as const;
      }),
    ).then((rows) => {
      if (!alive) return;
      const map: Record<string, string> = {};
      for (const [id, img] of rows) if (img) map[id] = img;
      setPortraits(map);
    });
    return () => {
      alive = false;
    };
  }, [bookId, hits]);

  useEffect(() => {
    const key = `scene:${bookId}:${chapter}:${styleId}`;
    loadImage(key).then((img) => setScene(img));
  }, [bookId, chapter, styleId]);

  async function draw() {
    setBusy(true);
    setErr("");
    const refs = hits
      .map((p) => (portraits[p.id] ? { name: p.name, image: portraits[p.id] } : null))
      .filter(Boolean) as { name: string; image: string }[];
    const res = await makeSceneFn({
      data: { bookName, chapter, passage: passage.slice(0, 3500), styleId, people: refs },
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    const compact = await compressDataUrl(res.dataUrl, 960, 0.8);
    setScene(compact);
    await saveImage(`scene:${bookId}:${chapter}:${styleId}`, compact);
  }

  const styleLabel = ART_STYLES.find((s) => s.id === styleId)?.label ?? "油画";

  return (
    <section className="mb-6 overflow-hidden rounded-[length:var(--radius-lg)] border border-border bg-surface">
      {scene ? (
        <img src={scene} alt={`${bookName}第${chapter}章插图`} className="aspect-video w-full object-cover" />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-raised px-6 text-center text-sm text-muted">
          为本篇生成插图。已锁定的人物会沿用同一张脸。
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2">
        {hits.slice(0, 6).map((p) => (
          <span key={p.id} className="flex items-center gap-1 text-xs text-muted">
            {portraits[p.id] ? (
              <img src={portraits[p.id]} alt="" className="size-6 rounded-full object-cover" />
            ) : null}
            {p.name}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-faint">{styleLabel}</span>
        <button
          type="button"
          onClick={() => void draw()}
          disabled={busy}
          className="inline-flex min-h-10 items-center gap-1 rounded-[length:var(--radius-md)] bg-fg px-3 text-xs text-bg disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-3.5 animate-spin" /> : <ImageIcon className="size-3.5" />}
          {scene ? "重绘本篇" : "生成插图"}
        </button>
      </div>
      {err ? <p className="px-3 pb-2 text-xs text-accent">{err}</p> : null}
    </section>
  );
}
