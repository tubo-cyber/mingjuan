import { i as KINDS, n as BOOK_BY_ID } from "./catalog-BxauapDR.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as Route$3, l as usePrefs } from "./router-B0RQf9yE.mjs";
import { t as AppShell } from "./app-shell-SPNB9aj3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book._bookId-DlQW7oO8.js
var import_jsx_runtime = require_jsx_runtime();
function BookPage() {
	const { bookId } = Route$3.useParams();
	const { extras } = Route$3.useLoaderData();
	const book = BOOK_BY_ID[bookId];
	const name = usePrefs((s) => s.script) === "S" ? book.nameS : book.name;
	const specials = [
		{
			chap: 0,
			label: "導論"
		},
		...Array.from({ length: book.chapters }, (_, i) => ({
			chap: i + 1,
			label: String(i + 1).padStart(2, "0")
		})),
		{
			chap: book.chapters + 1,
			label: "綜合"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: name,
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "grid size-11 place-items-center text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm text-muted",
				children: [
					"共 ",
					book.chapters,
					" 章 · 點章節即讀註解，也可改選其他資料類型"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/read/$bookId/$kind/$chap",
					params: {
						bookId: book.id,
						kind: k.code,
						chap: "1"
					},
					className: "rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted",
					children: k.name
				}, k.code))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2 sm:grid-cols-8",
				children: specials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/read/$bookId/$kind/$chap",
					params: {
						bookId: book.id,
						kind: "C",
						chap: String(s.chap)
					},
					className: "grid min-h-11 place-items-center rounded-[length:var(--radius-md)] border border-border bg-surface text-sm",
					children: s.label
				}, s.chap))
			}),
			extras.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xs font-medium tracking-wide text-muted",
					children: "電子書與圖表"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: extras.slice(0, 40).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/view",
						search: { path: l.href },
						className: "block rounded-[length:var(--radius-md)] px-2 py-2 text-sm hover:bg-surface",
						children: [l.text, l.pdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-xs text-faint",
							children: "PDF"
						}) : null]
					}) }, l.href + l.text))
				})]
			}) : null
		]
	});
}
//#endregion
export { BookPage as component };
