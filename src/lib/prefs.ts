import { create } from "zustand";
import { persist } from "zustand/middleware";

export const FONTS = [
  { id: "serif", label: "思源宋體", stack: '"Noto Serif TC", "Noto Serif SC", "Songti TC", serif' },
  { id: "sans", label: "思源黑體", stack: '"Noto Sans TC", "Noto Sans SC", "PingFang TC", sans-serif' },
  { id: "kai", label: "霞鶩文楷", stack: '"LXGW WenKai TC", "Kaiti TC", "KaiTi", serif' },
  { id: "sys", label: "系統字體", stack: 'ui-serif, "Songti TC", "PMingLiU", serif' },
] as const;

export type FontId = (typeof FONTS)[number]["id"];
export type ThemeId = "paper" | "ink" | "dusk";
export type ScriptId = "T" | "S";

type Prefs = {
  font: FontId;
  size: number;
  leading: number;
  theme: ThemeId;
  script: ScriptId;
  setFont: (f: FontId) => void;
  setSize: (n: number) => void;
  setLeading: (n: number) => void;
  setTheme: (t: ThemeId) => void;
  setScript: (s: ScriptId) => void;
};

export const usePrefs = create<Prefs>()(
  persist(
    (set) => ({
      font: "serif",
      size: 19,
      leading: 1.9,
      theme: "paper",
      script: "T",
      setFont: (font) => set({ font }),
      setSize: (size) => set({ size }),
      setLeading: (leading) => set({ leading }),
      setTheme: (theme) => set({ theme }),
      setScript: (script) => set({ script }),
    }),
    { name: "mingjuan-prefs" },
  ),
);

export type HistoryItem = {
  href: string;
  title: string;
  at: number;
};

type Library = {
  history: HistoryItem[];
  stars: HistoryItem[];
  pushHistory: (item: Omit<HistoryItem, "at">) => void;
  toggleStar: (item: Omit<HistoryItem, "at">) => void;
  isStarred: (href: string) => boolean;
};

export const useLibrary = create<Library>()(
  persist(
    (set, get) => ({
      history: [],
      stars: [],
      pushHistory: (item) =>
        set((s) => ({
          history: [{ ...item, at: Date.now() }, ...s.history.filter((h) => h.href !== item.href)].slice(0, 40),
        })),
      toggleStar: (item) =>
        set((s) => {
          const exists = s.stars.some((x) => x.href === item.href);
          return {
            stars: exists
              ? s.stars.filter((x) => x.href !== item.href)
              : [{ ...item, at: Date.now() }, ...s.stars],
          };
        }),
      isStarred: (href) => get().stars.some((x) => x.href === href),
    }),
    { name: "mingjuan-library" },
  ),
);
