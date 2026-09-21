import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-CjG__nsr.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getArticleFn_createServerFn_handler = createServerRpc({
	id: "7b10dfce7e3ae8aa3cbd38d35b064a12e4b886f084f4df5bd66f555bcf0b5e3d",
	name: "getArticleFn",
	filename: "src/lib/server-fns.ts"
}, (opts) => getArticleFn.__executeServer(opts));
var getArticleFn = createServerFn({ method: "GET" }).validator(object({
	path: string().min(1).max(400),
	title: string().max(120).optional()
})).handler(getArticleFn_createServerFn_handler, async ({ data }) => {
	const { fetchArticle } = await import("./fetch-source.server-g2EMTGZY.mjs");
	return fetchArticle(data.path, data.title ?? "查經資料");
});
var getIndexFn_createServerFn_handler = createServerRpc({
	id: "aac9e1e2b75223d9fc223dc01815b1c865501bc9eda3da563e4c894fd42c27b2",
	name: "getIndexFn",
	filename: "src/lib/server-fns.ts"
}, (opts) => getIndexFn.__executeServer(opts));
var getIndexFn = createServerFn({ method: "GET" }).validator(object({
	path: string().min(1).max(400),
	title: string().max(120).optional()
})).handler(getIndexFn_createServerFn_handler, async ({ data }) => {
	const { fetchIndex } = await import("./fetch-source.server-g2EMTGZY.mjs");
	return fetchIndex(data.path, data.title ?? "目錄");
});
//#endregion
export { getArticleFn_createServerFn_handler, getIndexFn_createServerFn_handler };
