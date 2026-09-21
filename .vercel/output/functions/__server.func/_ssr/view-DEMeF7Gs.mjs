import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Star, f as ChevronLeft } from "../_libs/lucide-react.mjs";
import { c as useLibrary, o as Route$4 } from "./router-Cf9CHBPa.mjs";
import { n as cn, t as AppShell } from "./app-shell-H_ARUeZI.mjs";
import { t as ReaderView } from "./reader-view-BnBX61lP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/view-DEMeF7Gs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ViewPage() {
	const { article, path } = Route$4.useLoaderData();
	const href = `/view?path=${encodeURIComponent(path)}`;
	const pushHistory = useLibrary((s) => s.pushHistory);
	const toggleStar = useLibrary((s) => s.toggleStar);
	const starred = useLibrary((s) => s.stars.some((x) => x.href === href));
	(0, import_react.useEffect)(() => {
		pushHistory({
			href,
			title: article.title
		});
	}, [
		href,
		article.title,
		pushHistory
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: article.title,
		back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "grid size-11 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
		}),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "grid size-11 place-items-center",
			onClick: () => toggleStar({
				href,
				title: article.title
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-5", starred ? "fill-accent text-accent" : "text-muted") })
		}),
		children: article.isPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "這是 PDF 檔，請開啟原文閱讀。"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: article.sourceUrl,
			target: "_blank",
			rel: "noreferrer",
			className: "inline-flex min-h-11 items-center rounded-[length:var(--radius-md)] bg-fg px-4 text-sm text-bg",
			children: "開啟 PDF"
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReaderView, {
			title: article.title,
			blocks: article.blocks
		})
	});
}
//#endregion
export { ViewPage as component };
