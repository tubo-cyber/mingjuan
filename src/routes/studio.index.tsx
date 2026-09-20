import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { BOOKS } from "@/lib/catalog";
import { useCast } from "@/lib/cast-store";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/studio/")({ component: StudioHome });

function StudioHome() {
  const script = usePrefs((s) => s.script);
  const people = useCast((s) => s.people);
  const counts = Object.fromEntries(
    BOOKS.map((b) => [b.id, people.filter((p) => p.bookId === b.id && p.confirmed).length]),
  );

  return (
    <AppShell>
      <h1 className="mb-1 font-display text-2xl font-semibold">绘像</h1>
      <p className="mb-6 text-sm text-muted">先锁定人物肖像，读经时本篇插图会沿用同一张脸。</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {BOOKS.map((b) => (
          <Link
            key={b.id}
            to="/studio/$bookId"
            params={{ bookId: b.id }}
            className="min-h-16 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-3"
          >
            <p className="text-sm font-medium">{script === "S" ? b.nameS : b.name}</p>
            <p className="mt-1 text-[11px] text-faint">
              {counts[b.id] ? `已锁定 ${counts[b.id]} 人` : "尚未绘像"}
            </p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
