import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { COLUMNS } from "@/lib/catalog";

export const Route = createFileRoute("/columns")({ component: ColumnsPage });

function ColumnsPage() {
  return (
    <AppShell>
      <h1 className="mb-1 font-display text-2xl font-semibold">個人專欄</h1>
      <p className="mb-6 text-sm text-muted">原站作者專欄，點入閱讀各卷筆記與追求。</p>
      <div className="flex flex-col gap-2">
        {COLUMNS.map((c) => (
          <Link
            key={c.slug}
            to="/column/$slug"
            params={{ slug: c.slug }}
            className="flex min-h-16 items-center justify-between rounded-[length:var(--radius-lg)] border border-border bg-surface px-4"
          >
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-faint">{c.en}</p>
            </div>
            <span className="text-sm text-muted">開</span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
