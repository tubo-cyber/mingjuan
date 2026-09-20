import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TOPICS, topicIndexPath } from "@/lib/catalog";
import { getIndexFn } from "@/lib/server-fns";

export const Route = createFileRoute("/topic/$topicId")({
  loader: async ({ params }) => {
    const topic = TOPICS.find((t) => t.id === params.topicId);
    if (!topic) throw new Error("查無此主題");
    const idx = await getIndexFn({ data: { path: topicIndexPath(topic), title: topic.name } });
    return { topic, idx };
  },
  component: TopicPage,
});

function TopicPage() {
  const { topic, idx } = Route.useLoaderData();
  return (
    <AppShell
      title={topic.name}
      back={
        <Link to="/topics" className="grid size-11 place-items-center">
          <ChevronLeft className="size-5" />
        </Link>
      }
    >
      {idx.links.length === 0 ? (
        <p className="text-sm text-muted">暫時讀不到目錄，請稍後再試。</p>
      ) : (
        <ul className="divide-y divide-border rounded-[length:var(--radius-lg)] border border-border bg-surface">
          {idx.links.map((l, i) => (
            <li key={l.href + i}>
              <Link to="/view" search={{ path: l.href }} className="flex min-h-12 items-center px-3 py-3 text-sm">
                <span className="flex-1">{l.text}</span>
                {l.pdf ? <span className="text-xs text-faint">PDF</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
