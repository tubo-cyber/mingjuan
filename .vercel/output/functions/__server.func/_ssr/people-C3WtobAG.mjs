import { i as __toESM } from "../_runtime.mjs";
import { n as figuresInRange, t as ART_STYLES } from "./people-O5QIDr2E.mjs";
import { n as BOOK_BY_ID, t as BOOKS } from "./catalog-BxauapDR.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Users, o as Sparkles } from "../_libs/lucide-react.mjs";
import { d as generatePortraitFn, l as usePrefs, u as analyzePeopleFn } from "./router-Cf9CHBPa.mjs";
import { n as cn, t as AppShell } from "./app-shell-H_ARUeZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-C3WtobAG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PeoplePage() {
	const script = usePrefs((s) => s.script);
	const [bookId, setBookId] = (0, import_react.useState)("01");
	const book = BOOK_BY_ID[bookId];
	const [from, setFrom] = (0, import_react.useState)(1);
	const [to, setTo] = (0, import_react.useState)(Math.min(11, book.chapters));
	const [style, setStyle] = (0, import_react.useState)("ink");
	const [aiCards, setAiCards] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [drawing, setDrawing] = (0, import_react.useState)(null);
	const [images, setImages] = (0, import_react.useState)({});
	const local = (0, import_react.useMemo)(() => figuresInRange(bookId, from, to), [
		bookId,
		from,
		to
	]);
	const cards = aiCards ?? local.map(figureToCard);
	function onBook(id) {
		const b = BOOK_BY_ID[id];
		setBookId(id);
		setFrom(1);
		setTo(Math.min(11, b.chapters));
		setAiCards(null);
		setError("");
	}
	async function analyze() {
		setBusy("analyze");
		setError("");
		try {
			const name = script === "S" ? book.nameS : book.name;
			const res = await analyzePeopleFn({ data: {
				bookName: name,
				from,
				to
			} });
			if (!res.ok) {
				setError(res.error);
				return;
			}
			setAiCards(res.people.map((p) => ({
				key: p.name,
				name: p.name,
				role: p.role,
				look: p.look,
				chapters: p.chapters
			})));
		} catch {
			setError("分析暫時無法完成，可先用本機名單。");
		} finally {
			setBusy(null);
		}
	}
	async function draw(card) {
		setBusy("draw");
		setDrawing(card.key);
		setError("");
		try {
			const res = await generatePortraitFn({ data: {
				name: card.name,
				role: card.role,
				look: card.look,
				style
			} });
			if (!res.ok) {
				setError(res.error);
				return;
			}
			setImages((prev) => {
				const next = {
					...prev,
					[card.key + style]: res.url
				};
				const keys = Object.keys(next);
				if (keys.length > 8) delete next[keys[0]];
				return next;
			});
		} catch {
			setError("繪製暫時失敗，請稍後再試。");
		} finally {
			setBusy(null);
			setDrawing(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "人物",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold",
					children: "人物畫像"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "選書卷與章節，列出重要人物，再選畫風生成。每次只繪一張，以免拖慢閱讀。"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mb-3 block text-xs text-muted",
				children: ["書卷", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: bookId,
					onChange: (e) => onBook(e.target.value),
					className: "mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm text-fg",
					children: BOOKS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: b.id,
						children: script === "S" ? b.nameS : b.name
					}, b.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs text-muted",
					children: ["從第幾章", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: book.chapters,
						value: from,
						onChange: (e) => {
							setFrom(clampChap(Number(e.target.value), book.chapters));
							setAiCards(null);
						},
						className: "mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs text-muted",
					children: ["到第幾章", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: book.chapters,
						value: to,
						onChange: (e) => {
							setTo(clampChap(Number(e.target.value), book.chapters));
							setAiCards(null);
						},
						className: "mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-1.5",
				children: ART_STYLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStyle(s.id),
					className: cn("rounded-full border px-3 py-1.5 text-xs", style === s.id ? "border-fg bg-fg text-bg" : "border-border bg-surface text-muted"),
					children: s.label
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: analyze,
				disabled: busy !== null,
				className: "mb-6 inline-flex min-h-11 items-center gap-2 rounded-[length:var(--radius-md)] bg-fg px-4 text-sm text-bg disabled:opacity-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), busy === "analyze" ? "分析中…" : "AI 分析本章人物"]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-seal",
				children: error
			}) : null,
			cards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 py-6 text-sm text-muted",
				children: "這段章節本機名單沒有預設人物。點「AI 分析」可依經文補上。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: cards.map((c) => {
					const img = images[c.key + style];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[length:var(--radius-lg)] border border-border bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 shrink-0 place-items-center rounded-full bg-raised text-seal",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [c.role, c.chapters ? ` · ${c.chapters}` : ""]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy !== null,
									onClick: () => draw(c),
									className: "shrink-0 rounded-full border border-border px-3 py-2 text-xs disabled:opacity-60",
									children: drawing === c.key ? "繪製中…" : img ? "重繪" : "生成畫像"
								})
							]
						}), img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: c.name,
							className: "mt-3 w-full rounded-[length:var(--radius-md)] border border-border object-cover"
						}) : null]
					}, c.key);
				})
			})
		]
	});
}
function figureToCard(f) {
	return {
		key: f.id,
		name: f.name,
		role: f.role,
		look: f.look,
		chapters: `${f.from}–${f.to}章`
	};
}
function clampChap(n, max) {
	if (!Number.isFinite(n)) return 1;
	return Math.min(max, Math.max(1, Math.round(n)));
}
//#endregion
export { PeoplePage as component };
