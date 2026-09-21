import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as Route$2 } from "./router-B0RQf9yE.mjs";
import { t as AppShell } from "./app-shell-SPNB9aj3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/column._slug-E4CxlrCe.js
var import_jsx_runtime = require_jsx_runtime();
function ColumnPage() {
	const { col, idx } = Route$2.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: col.name,
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/columns",
			className: "grid size-11 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border rounded-[length:var(--radius-lg)] border border-border bg-surface",
			children: idx.links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/view",
				search: { path: l.href },
				className: "block min-h-12 px-3 py-3 text-sm",
				children: l.text
			}) }, l.href + i))
		})
	});
}
//#endregion
export { ColumnPage as component };
