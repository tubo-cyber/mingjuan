import { useEffect } from "react";
import { FONTS, usePrefs } from "@/lib/prefs";

export function ThemeBoot() {
  const font = usePrefs((s) => s.font);
  const size = usePrefs((s) => s.size);
  const leading = usePrefs((s) => s.leading);
  const theme = usePrefs((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    const stack = FONTS.find((f) => f.id === font)?.stack ?? FONTS[0].stack;
    root.style.setProperty("--reader-font", stack);
    root.style.setProperty("--reader-size", `${size}px`);
    root.style.setProperty("--reader-leading", String(leading));
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "paper" ? "#F3ECE0" : theme === "ink" ? "#161310" : "#1C2422");
    }
  }, [font, size, leading, theme]);

  return null;
}
