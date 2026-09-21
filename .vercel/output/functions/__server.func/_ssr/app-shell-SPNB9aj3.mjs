import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { c as Layers, f as BookOpen, l as Info, n as Users, o as Settings2, r as UserRound, t as X } from "../_libs/lucide-react.mjs";
import { l as usePrefs, s as FONTS } from "./router-B0RQf9yE.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-SPNB9aj3.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function SettingsSheet({ children }) {
	const font = usePrefs((s) => s.font);
	const size = usePrefs((s) => s.size);
	const leading = usePrefs((s) => s.leading);
	const theme = usePrefs((s) => s.theme);
	const script = usePrefs((s) => s.script);
	const { setFont, setSize, setLeading, setTheme, setScript } = usePrefs();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-fg/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-[length:var(--radius-xl)] border border-border bg-surface p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-soft)] outline-none sm:inset-auto sm:right-4 sm:top-16 sm:bottom-auto sm:w-96 sm:rounded-[length:var(--radius-xl)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-base font-semibold",
					children: "閱讀設定"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "grid size-10 place-items-center rounded-[length:var(--radius-md)] hover:bg-raised",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				label: "字體",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: FONTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFont(f.id),
						className: cn("min-h-11 rounded-[length:var(--radius-md)] border px-3 text-sm", font === f.id ? "border-fg bg-fg text-bg" : "border-border bg-raised"),
						style: { fontFamily: f.stack },
						children: f.label
					}, f.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				label: `字級 ${size}px`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 16,
					max: 26,
					step: 1,
					value: size,
					onChange: (e) => setSize(Number(e.target.value)),
					className: "w-full accent-[var(--color-accent)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					style: {
						fontSize: size,
						lineHeight: leading
					},
					children: "起初神創造天地。地是空虛混沌。"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				label: `行距 ${leading.toFixed(2)}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 1.5,
					max: 2.2,
					step: .05,
					value: leading,
					onChange: (e) => setLeading(Number(e.target.value)),
					className: "w-full accent-[var(--color-accent)]"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				label: "紙色",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						["paper", "素紙"],
						["ink", "夜讀"],
						["dusk", "青暮"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTheme(id),
						className: cn("min-h-11 rounded-[length:var(--radius-md)] border text-sm", theme === id ? "border-fg bg-fg text-bg" : "border-border bg-raised"),
						children: label
					}, id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				label: "原文語文",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScript("T"),
						className: cn("min-h-11 rounded-[length:var(--radius-md)] border text-sm", script === "T" ? "border-fg bg-fg text-bg" : "border-border bg-raised"),
						children: "繁體"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScript("S"),
						className: cn("min-h-11 rounded-[length:var(--radius-md)] border text-sm", script === "S" ? "border-fg bg-fg text-bg" : "border-border bg-raised"),
						children: "简体"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-faint",
					children: "切換後新打開的章節會抓取對應語文頁面。"
				})]
			})
		]
	})] })] });
}
function Section({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-2 text-xs font-medium tracking-wide text-muted",
			children: label
		}), children]
	});
}
function AppShell({ children, title, back, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-3xl items-center gap-2 px-3 pt-[env(safe-area-inset-top)]",
					children: [
						back ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 min-h-11 pr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-[length:var(--radius-sm)] bg-fg text-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
									className: "size-4",
									strokeWidth: 1.75
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[15px] font-semibold tracking-wide",
								children: "明卷"
							})]
						}),
						title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "min-w-0 flex-1 truncate text-center text-sm font-medium",
							children: title
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
						action,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-[length:var(--radius-md)] text-muted hover:bg-surface hover:text-fg",
							"aria-label": "閱讀設定",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-5" })
						}) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-3xl px-4 pb-24 pt-4",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-3xl grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							to: "/",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" }),
							label: "經卷"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							to: "/topics",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-5" }),
							label: "主題"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							to: "/people",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
							label: "人物"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							to: "/columns",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" }),
							label: "專欄"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
							to: "/intro",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-5" }),
							label: "關於"
						})
					]
				})
			})
		]
	});
}
function Tab({ to, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		activeOptions: { exact: to === "/" },
		className: "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] text-faint [&.active]:text-fg",
		children: [icon, label]
	});
}
//#endregion
export { cn as n, AppShell as t };
