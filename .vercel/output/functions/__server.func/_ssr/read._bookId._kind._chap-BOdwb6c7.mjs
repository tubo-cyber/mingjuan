import { i as __toESM } from "../_runtime.mjs";
import { c as articlePath, i as KINDS, n as BOOK_BY_ID } from "./catalog-BxauapDR.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Star, d as ChevronLeft, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { c as useLibrary, l as usePrefs, n as Route, u as getArticleFn } from "./router-B0RQf9yE.mjs";
import { n as cn, t as AppShell } from "./app-shell-SPNB9aj3.mjs";
import { t as ReaderView } from "./reader-view-DFCAdCdZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/read._bookId._kind._chap-BOdwb6c7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReadPage() {
	const { bookId, kind, chap } = Route.useParams();
	const { article } = Route.useLoaderData();
	const book = BOOK_BY_ID[bookId];
	const script = usePrefs((s) => s.script);
	const n = Number(chap);
	const k = kind;
	const max = book.chapters + 1;
	const prev = n > 0 ? n - 1 : null;
	const next = n < max ? n + 1 : null;
	const href = `/read/${bookId}/${kind}/${chap}`;
	const pushHistory = useLibrary((s) => s.pushHistory);
	const toggleStar = useLibrary((s) => s.toggleStar);
	const starred = useLibrary((s) => s.stars.some((x) => x.href === href));
	const [live, setLive] = (0, import_react.useState)(article);
	(0, import_react.useEffect)(() => {
		setLive(article);
	}, [article]);
	(0, import_react.useEffect)(() => {
		if (script === "T") return;
		let alive = true;
		const path = articlePath(book, k, n, script);
		getArticleFn({ data: {
			path,
			title: article.title
		} }).then((a) => {
			if (alive && a.status === 200) setLive(a);
		});
		return () => {
			alive = false;
		};
	}, [
		script,
		book,
		k,
		n,
		article.title
	]);
	(0, import_react.useEffect)(() => {
		pushHistory({
			href,
			title: live.title
		});
	}, [
		href,
		live.title,
		pushHistory
	]);
	const name = script === "S" ? book.nameS : book.name;
	if (live.isPdf) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: live.title,
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/book/$bookId",
			params: { bookId },
			className: "grid size-11 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBar, {
				bookId,
				chap,
				current: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "此項為 PDF 譯文檔，請開啟原文。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: live.sourceUrl,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex min-h-11 items-center rounded-[length:var(--radius-md)] bg-fg px-4 text-sm text-bg",
				children: "開啟 PDF"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: `${name} ${n === 0 ? "導" : n > book.chapters ? "綜" : n}`,
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/book/$bookId",
			params: { bookId },
			className: "grid size-11 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "grid size-11 place-items-center",
			onClick: () => toggleStar({
				href,
				title: live.title
			}),
			"aria-label": "收藏",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-5", starred ? "fill-accent text-accent" : "text-muted") })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBar, {
				bookId,
				chap,
				current: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReaderView, {
				title: live.title,
				blocks: live.blocks
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex items-center justify-between gap-3",
				children: [prev !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/read/$bookId/$kind/$chap",
					params: {
						bookId,
						kind,
						chap: String(prev)
					},
					className: "inline-flex min-h-11 items-center gap-1 rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "上一章"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/read/$bookId/$kind/$chap",
					params: {
						bookId,
						kind,
						chap: String(next)
					},
					className: "inline-flex min-h-11 items-center gap-1 rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm",
					children: ["下一章", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-[11px] text-faint",
				children: "資料來源：華人基督徒查經資料網站 · 僅重排版面"
			})
		]
	});
}
function KindBar({ bookId, chap, current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-6 -mx-1 flex gap-1 overflow-x-auto pb-1",
		children: KINDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/read/$bookId/$kind/$chap",
			params: {
				bookId,
				kind: item.code,
				chap
			},
			className: cn("shrink-0 rounded-full px-3 py-2 text-xs", current === item.code ? "bg-fg text-bg" : "bg-surface text-muted border border-border"),
			children: item.name
		}, item.code))
	});
}
//#endregion
export { ReadPage as component };
