import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ChevronLeft } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-Cf9CHBPa.mjs";
import { t as AppShell } from "./app-shell-H_ARUeZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/topic._topicId-BShLvUOq.js
var import_jsx_runtime = require_jsx_runtime();
function TopicPage() {
	const { topic, idx } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: topic.name,
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/topics",
			className: "grid size-11 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}),
		children: idx.links.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "暫時讀不到目錄，請稍後再試。"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border rounded-[length:var(--radius-lg)] border border-border bg-surface",
			children: idx.links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/view",
				search: { path: l.href },
				className: "flex min-h-12 items-center px-3 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1",
					children: l.text
				}), l.pdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-faint",
					children: "PDF"
				}) : null]
			}) }, l.href + i))
		})
	});
}
//#endregion
export { TopicPage as component };
