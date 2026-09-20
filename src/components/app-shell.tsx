import { Link } from "@tanstack/react-router";
import { BookOpen, Layers, UserRound, Info, Settings2, Palette } from "lucide-react";
import type { ReactNode } from "react";
import { SettingsSheet } from "./settings-sheet";

export function AppShell({
  children,
  title,
  back,
  action,
}: {
  children: ReactNode;
  title?: string;
  back?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-3 pt-[env(safe-area-inset-top)]">
          {back ?? (
            <Link to="/" className="flex items-center gap-2 min-h-11 pr-2">
              <span className="grid size-8 place-items-center rounded-[length:var(--radius-sm)] bg-fg text-bg">
                <BookOpen className="size-4" strokeWidth={1.75} />
              </span>
              <span className="font-display text-[15px] font-semibold tracking-wide">明卷</span>
            </Link>
          )}
          {title ? (
            <h1 className="min-w-0 flex-1 truncate text-center text-sm font-medium">{title}</h1>
          ) : (
            <div className="flex-1" />
          )}
          {action}
          <SettingsSheet>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-[length:var(--radius-md)] text-muted hover:bg-surface hover:text-fg"
              aria-label="閱讀設定"
            >
              <Settings2 className="size-5" />
            </button>
          </SettingsSheet>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          <Tab to="/" icon={<BookOpen className="size-5" />} label="經卷" />
          <Tab to="/topics" icon={<Layers className="size-5" />} label="主題" />
          <Tab to="/studio" icon={<Palette className="size-5" />} label="繪像" />
          <Tab to="/columns" icon={<UserRound className="size-5" />} label="專欄" />
          <Tab to="/intro" icon={<Info className="size-5" />} label="關於" />
        </div>
      </nav>
    </div>
  );
}

function Tab({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] text-faint [&.active]:text-fg"
    >
      {icon}
      {label}
    </Link>
  );
}
