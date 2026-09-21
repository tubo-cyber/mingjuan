import { i as __toESM } from "../_runtime.mjs";
import { t as BOOKS } from "./catalog-BxauapDR.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
import { c as useLibrary, l as usePrefs } from "./router-B0RQf9yE.mjs";
import { t as AppShell } from "./app-shell-SPNB9aj3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ggHDIOmJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [q, setQ] = (0, import_react.useState)("");
	const script = usePrefs((s) => s.script);
	const history = useLibrary((s) => s.history);
	const stars = useLibrary((s) => s.stars);
	const navigate = useNavigate();
	const ot = (0, import_react.useMemo)(() => filterBooks("ot", q), [q]);
	const nt = (0, import_react.useMemo)(() => filterBooks("nt", q), [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-semibold tracking-wide",
				children: "明卷查經"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "原站資料重排 · 手機也能順讀"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mb-6 flex min-h-12 items-center gap-2 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "搜尋書卷，如 創世記、羅馬書",
				className: "h-12 w-full bg-transparent text-base outline-none placeholder:text-faint"
			})]
		}),
		history[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => navigate({ to: history[0].href }),
			className: "mb-6 flex w-full items-center justify-between rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 py-3 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: "繼續閱讀"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 font-medium",
				children: history[0].title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: "開"
			})]
		}) : null,
		stars.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium tracking-wide text-muted",
				children: "收藏"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: stars.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => navigate({ to: s.href }),
					className: "rounded-[length:var(--radius-md)] px-2 py-2 text-left text-sm hover:bg-surface",
					children: s.title
				}, s.href))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookSection, {
			title: "舊約",
			books: ot,
			script
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookSection, {
			title: "新約",
			books: nt,
			script
		})
	] });
}
function filterBooks(t, q) {
	const needle = q.trim().toLowerCase();
	return BOOKS.filter((b) => {
		if (b.testament !== t) return false;
		if (!needle) return true;
		return b.name.includes(q) || b.nameS.includes(q) || b.abbr.includes(q) || b.folder.toLowerCase().includes(needle);
	});
}
function BookSection({ title, books, script }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-xs font-medium tracking-wide text-muted",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2 sm:grid-cols-4",
			children: books.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/book/$bookId",
				params: { bookId: b.id },
				className: "flex min-h-[4.5rem] flex-col justify-center rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-2 shadow-[var(--shadow-soft)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-faint",
					children: b.abbr
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium leading-snug",
					children: script === "S" ? b.nameS : b.name
				})]
			}, b.id))
		})]
	});
}
//#endregion
export { Home as component };
