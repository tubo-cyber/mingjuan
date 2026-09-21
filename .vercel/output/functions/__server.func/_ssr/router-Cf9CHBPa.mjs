import { i as __toESM } from "../_runtime.mjs";
import { c as articlePath, i as KINDS, l as indexPath, n as BOOK_BY_ID, o as TOPICS, r as COLUMNS, u as topicIndexPath } from "./catalog-BxauapDR.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as _enum } from "../_libs/zod.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-Bry1d1Co.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getArticleFn = createServerFn({ method: "GET" }).validator(object({
	path: string().min(1).max(400),
	title: string().max(120).optional()
})).handler(createSsrRpc("7b10dfce7e3ae8aa3cbd38d35b064a12e4b886f084f4df5bd66f555bcf0b5e3d"));
var getIndexFn = createServerFn({ method: "GET" }).validator(object({
	path: string().min(1).max(400),
	title: string().max(120).optional()
})).handler(createSsrRpc("aac9e1e2b75223d9fc223dc01815b1c865501bc9eda3da563e4c894fd42c27b2"));
var analyzePeopleFn = createServerFn({ method: "POST" }).validator(object({
	bookName: string().min(1).max(40),
	from: number().int().min(1).max(150),
	to: number().int().min(1).max(150)
})).handler(createSsrRpc("90c6ebd86413b18798571a087a26f47d18ff93f842663d559f97865e721f3b7e"));
var generatePortraitFn = createServerFn({ method: "POST" }).validator(object({
	name: string().min(1).max(40),
	role: string().max(80),
	look: string().max(240),
	style: _enum([
		"icon",
		"ink",
		"oil",
		"illum",
		"mosaic"
	])
})).handler(createSsrRpc("f6aa06dddaa54e533561f63f21cbe4fa797b199e17799c7633806f8a1ae9b2ce"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cf9CHBPa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "發生未預期的錯誤，請重新整理頁面。";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-accent",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "無法載入"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var FONTS = [
	{
		id: "serif",
		label: "思源宋體",
		stack: "\"Noto Serif TC\", \"Noto Serif SC\", \"Songti TC\", serif"
	},
	{
		id: "sans",
		label: "思源黑體",
		stack: "\"Noto Sans TC\", \"Noto Sans SC\", \"PingFang TC\", sans-serif"
	},
	{
		id: "kai",
		label: "霞鶩文楷",
		stack: "\"LXGW WenKai TC\", \"Kaiti TC\", \"KaiTi\", serif"
	},
	{
		id: "sys",
		label: "系統字體",
		stack: "ui-serif, \"Songti TC\", \"PMingLiU\", serif"
	}
];
var usePrefs = create()(persist((set) => ({
	font: "serif",
	size: 19,
	leading: 1.9,
	theme: "paper",
	script: "T",
	setFont: (font) => set({ font }),
	setSize: (size) => set({ size }),
	setLeading: (leading) => set({ leading }),
	setTheme: (theme) => set({ theme }),
	setScript: (script) => set({ script })
}), { name: "mingjuan-prefs" }));
var useLibrary = create()(persist((set, get) => ({
	history: [],
	stars: [],
	pushHistory: (item) => set((s) => ({ history: [{
		...item,
		at: Date.now()
	}, ...s.history.filter((h) => h.href !== item.href)].slice(0, 40) })),
	toggleStar: (item) => set((s) => {
		return { stars: s.stars.some((x) => x.href === item.href) ? s.stars.filter((x) => x.href !== item.href) : [{
			...item,
			at: Date.now()
		}, ...s.stars] };
	}),
	isStarred: (href) => get().stars.some((x) => x.href === href)
}), { name: "mingjuan-library" }));
function ThemeBoot() {
	const font = usePrefs((s) => s.font);
	const size = usePrefs((s) => s.size);
	const leading = usePrefs((s) => s.leading);
	const theme = usePrefs((s) => s.theme);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.dataset.theme = theme;
		const stack = FONTS.find((f) => f.id === font)?.stack ?? FONTS[0].stack;
		root.style.setProperty("--reader-font", stack);
		root.style.setProperty("--reader-size", `${size}px`);
		root.style.setProperty("--reader-leading", String(leading));
		const meta = document.querySelector("meta[name=\"theme-color\"]");
		if (meta) meta.setAttribute("content", theme === "paper" ? "#F3ECE0" : theme === "ink" ? "#161310" : "#1C2422");
	}, [
		font,
		size,
		leading,
		theme
	]);
	return null;
}
var styles_default = "/assets/styles-Q5mrtHd6.css";
var APP_NAME = "明卷查經";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#F3ECE0"
			},
			{
				name: "description",
				content: "為手機與桌面重排的華人基督徒查經讀本。資料來自華人基督徒查經資料網站。"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&family=Noto+Sans+SC:wght@400;600&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700&family=Noto+Serif+TC:wght@400;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-Hant",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeBoot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-t4ORHdP7.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./columns-DeiqfYRV.mjs");
var Route$8 = createFileRoute("/columns")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./intro-CraBqsty.mjs");
var Route$7 = createFileRoute("/intro")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./people-C3WtobAG.mjs");
var Route$6 = createFileRoute("/people")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./topics-hW7WAewZ.mjs");
var Route$5 = createFileRoute("/topics")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./view-DEMeF7Gs.mjs");
var searchSchema = object({ path: string() });
var Route$4 = createFileRoute("/view")({
	validateSearch: searchSchema,
	loaderDeps: ({ search }) => ({ path: search.path }),
	loader: async ({ deps }) => {
		return {
			article: await getArticleFn({ data: {
				path: deps.path,
				title: "查經資料"
			} }),
			path: deps.path
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./book._bookId-4cnt0bhD.mjs");
var Route$3 = createFileRoute("/book/$bookId")({
	loader: async ({ params }) => {
		const book = BOOK_BY_ID[params.bookId];
		if (!book) throw new Error("查無此書卷");
		return { extras: (await getIndexFn({ data: {
			path: indexPath(book),
			title: book.name
		} })).links.filter((l) => l.pdf || /BT/i.test(l.href)) };
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./column._slug-CFaQW9qt.mjs");
var Route$2 = createFileRoute("/column/$slug")({
	loader: async ({ params }) => {
		const col = COLUMNS.find((c) => c.slug === params.slug);
		if (!col) throw new Error("查無此專欄");
		return {
			col,
			idx: await getIndexFn({ data: {
				path: col.path,
				title: col.name
			} })
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./topic._topicId-BShLvUOq.mjs");
var Route$1 = createFileRoute("/topic/$topicId")({
	loader: async ({ params }) => {
		const topic = TOPICS.find((t) => t.id === params.topicId);
		if (!topic) throw new Error("查無此主題");
		return {
			topic,
			idx: await getIndexFn({ data: {
				path: topicIndexPath(topic),
				title: topic.name
			} })
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./read._bookId._kind._chap-Js5Fyl4d.mjs");
var Route = createFileRoute("/read/$bookId/$kind/$chap")({
	loader: async ({ params }) => {
		const book = BOOK_BY_ID[params.bookId];
		if (!book) throw new Error("查無此書卷");
		const kind = params.kind;
		const chap = Number(params.chap);
		return { article: await getArticleFn({ data: {
			path: articlePath(book, kind, chap, "T"),
			title: chapterTitle(book.name, kind, chap, book.chapters)
		} }) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function chapterTitle(name, kind, chap, total) {
	const k = KINDS.find((x) => x.code === kind)?.name ?? "";
	if (chap === 0) return `${name}導論${k}`;
	if (chap === total + 1) return `${name}綜合${k}`;
	return `${name}第${chap}章${k}`;
}
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	ColumnsRoute: Route$8.update({
		id: "/columns",
		path: "/columns",
		getParentRoute: () => Route$10
	}),
	IntroRoute: Route$7.update({
		id: "/intro",
		path: "/intro",
		getParentRoute: () => Route$10
	}),
	PeopleRoute: Route$6.update({
		id: "/people",
		path: "/people",
		getParentRoute: () => Route$10
	}),
	TopicsRoute: Route$5.update({
		id: "/topics",
		path: "/topics",
		getParentRoute: () => Route$10
	}),
	ViewRoute: Route$4.update({
		id: "/view",
		path: "/view",
		getParentRoute: () => Route$10
	}),
	BookBookIdRoute: Route$3.update({
		id: "/book/$bookId",
		path: "/book/$bookId",
		getParentRoute: () => Route$10
	}),
	ColumnSlugRoute: Route$2.update({
		id: "/column/$slug",
		path: "/column/$slug",
		getParentRoute: () => Route$10
	}),
	TopicTopicIdRoute: Route$1.update({
		id: "/topic/$topicId",
		path: "/topic/$topicId",
		getParentRoute: () => Route$10
	}),
	ReadBookIdKindChapRoute: Route.update({
		id: "/read/$bookId/$kind/$chap",
		path: "/read/$bookId/$kind/$chap",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$3 as a, useLibrary as c, generatePortraitFn as d, getArticleFn as f, Route$2 as i, usePrefs as l, Route as n, Route$4 as o, Route$1 as r, FONTS as s, router_exports as t, analyzePeopleFn as u };
