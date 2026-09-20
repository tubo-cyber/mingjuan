import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { COLUMNS } from "@/lib/catalog";
import { getIndexFn } from "@/lib/server-fns";

export const Route = createFileRoute("/column/$slug")({
  loader: async ({ params }) => {
    const col = COLUMNS.find((c) => c.slug === params.slug);
    if (!col) throw new Error("查無此專欄");
    const idx = await getIndexFn({ data: { path: col.path, title: col.name } });
    return { col, idx };
  },
  component: ColumnPage,
});

function ColumnPage() {
  const { col, idx } = Route.useLoaderData();
  return (
    <AppShell
      title={col.name}
      back={
        <Link to="/columns" className="grid size-11 place-items-center">
          <ChevronLeft className="size-5" />
        </Link>
      }
    >
      <ul className="divide-y divide-border rounded-[length:var(--radius-lg)] border border-border bg-surface">
        {idx.links.map((l, i) => (
          <li key={l.href + i}>
            <Link to="/view" search={{ path: l.href }} className="block min-h-12 px-3 py-3 text-sm">
              {l.text}
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
