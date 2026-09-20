import type { Block } from "@/lib/parse-html";
import { cn } from "@/lib/utils";

export function ReaderView({
  title,
  blocks,
}: {
  title: string;
  blocks: Block[];
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
              {b.text}
            </h2>
          );
        }
        if (b.t === "verse") {
          return (
            <section key={i} className="my-6">
              <div className="verse-ref">【{b.ref}】</div>
              {b.quote ? <p className="verse-quote">{b.quote}</p> : null}
            </section>
          );
        }
        if (b.t === "note") {
          return (
            <p key={i} className="my-3 text-[0.95em] text-muted">
              <span className="note-chip">{b.label}</span>
              {b.text}
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
            {b.text}
          </p>
        );
      })}
      {blocks.length === 0 ? <p className="text-muted">{title}</p> : null}
    </article>
  );
}
