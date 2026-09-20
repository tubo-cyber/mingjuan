import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TOPICS, TOPIC_GROUPS } from "@/lib/catalog";

export const Route = createFileRoute("/topics")({ component: TopicsPage });

function TopicsPage() {
  return (
    <AppShell>
      <h1 className="mb-1 font-display text-2xl font-semibold">主題查經</h1>
      <p className="mb-6 text-sm text-muted">按題閱讀，點入後列出原站該專題全部篇目。</p>
      {TOPIC_GROUPS.map((g) => (
        <section key={g} className="mb-7">
          <h2 className="mb-2 text-xs font-medium tracking-wide text-muted">{g}</h2>
          <div className="grid grid-cols-2 gap-2">
            {TOPICS.filter((t) => t.group === g).map((t) => (
              <Link
                key={t.id}
                to="/topic/$topicId"
                params={{ topicId: t.id }}
                className="min-h-14 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-3 text-sm font-medium"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </AppShell>
  );
}
