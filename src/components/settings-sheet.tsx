import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { FONTS, usePrefs, type ThemeId } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export function SettingsSheet({ children }: { children: ReactNode }) {
  const font = usePrefs((s) => s.font);
  const size = usePrefs((s) => s.size);
  const leading = usePrefs((s) => s.leading);
  const theme = usePrefs((s) => s.theme);
  const script = usePrefs((s) => s.script);
  const { setFont, setSize, setLeading, setTheme, setScript } = usePrefs();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-[length:var(--radius-xl)] border border-border bg-surface p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-soft)] outline-none sm:inset-auto sm:right-4 sm:top-16 sm:bottom-auto sm:w-96 sm:rounded-[length:var(--radius-xl)]">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold">閱讀設定</Dialog.Title>
            <Dialog.Close className="grid size-10 place-items-center rounded-[length:var(--radius-md)] hover:bg-raised">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <Section label="字體">
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFont(f.id)}
                  className={cn(
                    "min-h-11 rounded-[length:var(--radius-md)] border px-3 text-sm",
                    font === f.id ? "border-fg bg-fg text-bg" : "border-border bg-raised",
                  )}
                  style={{ fontFamily: f.stack }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Section>

          <Section label={`字級 ${size}px`}>
            <input
              type="range"
              min={16}
              max={26}
              step={1}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)]"
            />
            <p className="mt-2 text-muted" style={{ fontSize: size, lineHeight: leading }}>
              起初神創造天地。地是空虛混沌。
            </p>
          </Section>

          <Section label={`行距 ${leading.toFixed(2)}`}>
            <input
              type="range"
              min={1.5}
              max={2.2}
              step={0.05}
              value={leading}
              onChange={(e) => setLeading(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)]"
            />
          </Section>

          <Section label="紙色">
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["paper", "素紙"],
                  ["ink", "夜讀"],
                  ["dusk", "青暮"],
                ] as [ThemeId, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={cn(
                    "min-h-11 rounded-[length:var(--radius-md)] border text-sm",
                    theme === id ? "border-fg bg-fg text-bg" : "border-border bg-raised",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Section>

          <Section label="原文語文">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setScript("T")}
                className={cn(
                  "min-h-11 rounded-[length:var(--radius-md)] border text-sm",
                  script === "T" ? "border-fg bg-fg text-bg" : "border-border bg-raised",
                )}
              >
                繁體
              </button>
              <button
                type="button"
                onClick={() => setScript("S")}
                className={cn(
                  "min-h-11 rounded-[length:var(--radius-md)] border text-sm",
                  script === "S" ? "border-fg bg-fg text-bg" : "border-border bg-raised",
                )}
              >
                简体
              </button>
            </div>
            <p className="mt-2 text-xs text-faint">切換後新打開的章節會抓取對應語文頁面。</p>
          </Section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-xs font-medium tracking-wide text-muted">{label}</h3>
      {children}
    </section>
  );
}
