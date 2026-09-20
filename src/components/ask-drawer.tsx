import * as Dialog from "@radix-ui/react-dialog";
import { MessageCircle, Send, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { askStudyFn } from "@/lib/ai-fns";

type Msg = { role: "user" | "assistant"; content: string };

export function AskDrawer({
  title,
  source,
  trigger,
}: {
  title: string;
  source: string;
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [err, setErr] = useState("");

  async function send() {
    const question = q.trim();
    if (!question || busy) return;
    setQ("");
    setErr("");
    const next = [...msgs, { role: "user" as const, content: question }];
    setMsgs(next);
    setBusy(true);
    const res = await askStudyFn({
      data: {
        question,
        title,
        source,
        history: next.slice(-8),
      },
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setMsgs([...next, { role: "assistant", content: res.text }]);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="grid size-11 place-items-center rounded-[length:var(--radius-md)] text-muted hover:bg-surface hover:text-fg"
            aria-label="提问"
          >
            <MessageCircle className="size-5" />
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-[length:var(--radius-xl)] border border-border bg-surface shadow-[var(--shadow-soft)] outline-none sm:inset-auto sm:right-3 sm:top-14 sm:bottom-3 sm:w-[26rem] sm:rounded-[length:var(--radius-xl)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Dialog.Title className="text-sm font-semibold">按本页提问</Dialog.Title>
            <Dialog.Close className="grid size-10 place-items-center rounded-[length:var(--radius-md)] hover:bg-raised">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <p className="px-4 pt-2 text-xs text-faint">答案依据本页注解与经文。不确定处会标明。</p>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {msgs.length === 0 ? (
              <p className="text-sm text-muted">例如：这一章的「空虚混沌」在注解里怎么讲？</p>
            ) : null}
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-[length:var(--radius-md)] bg-fg px-3 py-2 text-sm text-bg"
                    : "mr-4 rounded-[length:var(--radius-md)] bg-raised px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap"
                }
              >
                {m.content}
              </div>
            ))}
            {busy ? <p className="text-xs text-faint">正在对照本页注解…</p> : null}
            {err ? <p className="text-xs text-accent">{err}</p> : null}
          </div>
          <form
            className="flex gap-2 border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="问这一页…"
              className="h-11 min-w-0 flex-1 rounded-[length:var(--radius-md)] border border-border bg-raised px-3 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="grid size-11 place-items-center rounded-[length:var(--radius-md)] bg-fg text-bg disabled:opacity-40"
              aria-label="送出"
            >
              <Send className="size-4" />
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
