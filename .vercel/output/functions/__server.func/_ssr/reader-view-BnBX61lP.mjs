import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn } from "./app-shell-H_ARUeZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reader-view-BnBX61lP.js
var import_jsx_runtime = require_jsx_runtime();
function ReaderView({ title, blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "reader-prose mx-auto max-w-[40rem]",
		style: {
			fontFamily: "var(--reader-font)",
			fontSize: "var(--reader-size, 19px)",
			lineHeight: "var(--reader-leading, 1.9)"
		},
		children: [blocks.map((b, i) => {
			if (b.t === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-6 text-center font-semibold tracking-wide",
				style: {
					fontSize: "1.35em",
					lineHeight: 1.4
				},
				children: b.text
			}, i);
			if (b.t === "h") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 mb-3 font-semibold text-seal",
				style: { fontSize: "1.08em" },
				children: b.text
			}, i);
			if (b.t === "verse") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "my-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "verse-ref",
					children: [
						"【",
						b.ref,
						"】"
					]
				}), b.quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "verse-quote",
					children: b.quote
				}) : null]
			}, i);
			if (b.t === "note") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "my-3 text-[0.95em] text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "note-chip",
					children: b.label
				}), b.text]
			}, i);
			if (b.t === "link") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "my-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "underline decoration-border underline-offset-4",
					href: b.href,
					children: b.text
				})
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("my-3"),
				children: b.text
			}, i);
		}), blocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: title
		}) : null]
	});
}
//#endregion
export { ReaderView as t };
