import { o as TOPICS, s as TOPIC_GROUPS } from "./catalog-BxauapDR.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./app-shell-SPNB9aj3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/topics-CVRSZcYt.js
var import_jsx_runtime = require_jsx_runtime();
function TopicsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-1 font-display text-2xl font-semibold",
			children: "主題查經"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-6 text-sm text-muted",
			children: "按題閱讀，點入後列出原站該專題全部篇目。"
		}),
		TOPIC_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-medium tracking-wide text-muted",
				children: g
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: TOPICS.filter((t) => t.group === g).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/topic/$topicId",
					params: { topicId: t.id },
					className: "min-h-14 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-3 text-sm font-medium",
					children: t.name
				}, t.id))
			})]
		}, g))
	] });
}
//#endregion
export { TopicsPage as component };
