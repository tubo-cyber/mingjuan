import { r as COLUMNS } from "./catalog-BxauapDR.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./app-shell-SPNB9aj3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/columns-CDo1PVcg.js
var import_jsx_runtime = require_jsx_runtime();
function ColumnsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-1 font-display text-2xl font-semibold",
			children: "個人專欄"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-6 text-sm text-muted",
			children: "原站作者專欄，點入閱讀各卷筆記與追求。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: COLUMNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/column/$slug",
				params: { slug: c.slug },
				className: "flex min-h-16 items-center justify-between rounded-[length:var(--radius-lg)] border border-border bg-surface px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-faint",
					children: c.en
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "開"
				})]
			}, c.slug))
		})
	] });
}
//#endregion
export { ColumnsPage as component };
