import type { ReactNode } from "react";
import type { Block } from "@/lib/parse-html";
import { cn } from "@/lib/utils";

export type NameMark = { id: string; name: string; aliases: string[] };

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, marks: NameMark[]): ReactNode {
  const names = marks
    .flatMap((m) => [m.name, ...m.aliases])
    .filter((n) => n.length >= 2)
    .sort((a, b) => b.length - a.length);
  if (!names.length) return text;
  const re = new RegExp(`(${names.map(escapeRe).join("|")})`, "g");
  const parts = text.split(re);
  return parts.map((part, i) => {
    const hit = marks.find((m) => m.name === part || m.aliases.includes(part));
    if (!hit) return <span key={i}>{part}</span>;
    return (
      <mark key={i} className="rounded-sm bg-transparent font-medium text-seal underline decoration-border underline-offset-4">
        {part}
      </mark>
    );
  });
}

export function ReaderView({
  title,
  blocks,
  marks = [],
}: {
  title: string;
  blocks: Block[];
  marks?: NameMark[];
}) {
  return (
    <article
      className="reader-prose mx-auto max-w-[40rem]"
      style={{
        fontFamily: "var(--reader-font)",
        fontSize: "var(--reader-size, 19px)",
        lineHeight: "var(--reader-leading, 1.9)",
      }}
    >
      {blocks.map((b, i) => {
        if (b.t === "title") {
          return (
            <h1 key={i} className="mb-6 text-center font-semibold tracking-wide" style={{ fontSize: "1.35em", lineHeight: 1.4 }}>
              {b.text}
            </h1>
          );
        }
        if (b.t === "h") {
          return (
            <h2 key={i} className="mt-8 mb-3 font-semibold text-seal" style={{ fontSize: "1.08em" }}>
              {highlight(b.text, marks)}
            </h2>
          );
        }
        if (b.t === "verse") {
          return (
            <section key={i} className="my-6">
              <div className="verse-ref">【{b.ref}】</div>
              {b.quote ? <p className="verse-quote">{highlight(b.quote, marks)}</p> : null}
            </section>
          );
        }
        if (b.t === "note") {
          return (
            <p key={i} className="my-3 text-[0.95em] text-muted">
              <span className="note-chip">{b.label}</span>
              {highlight(b.text, marks)}
            </p>
          );
        }
        if (b.t === "link") {
          return (
            <p key={i} className="my-2">
              <a className="underline decoration-border underline-offset-4" href={b.href}>
                {b.text}
              </a>
            </p>
          );
        }
        return (
          <p key={i} className={cn("my-3")}>
            {highlight(b.text, marks)}
          </p>
        );
      })}
      {blocks.length === 0 ? <p className="text-muted">{title}</p> : null}
    </article>
  );
}
