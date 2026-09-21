import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-w6Fe-tl3.js
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
var analyzePeopleFn_createServerFn_handler = createServerRpc({
	id: "90c6ebd86413b18798571a087a26f47d18ff93f842663d559f97865e721f3b7e",
	name: "analyzePeopleFn",
	filename: "src/lib/server-fns.ts"
}, (opts) => analyzePeopleFn.__executeServer(opts));
var analyzePeopleFn = createServerFn({ method: "POST" }).validator(object({
	bookName: string().min(1).max(40),
	from: number().int().min(1).max(150),
	to: number().int().min(1).max(150)
})).handler(analyzePeopleFn_createServerFn_handler, async ({ data }) => {
	const { analyzePeople } = await import("./ai-people.server-DlnO4u4k.mjs");
	return analyzePeople(data);
});
var generatePortraitFn_createServerFn_handler = createServerRpc({
	id: "f6aa06dddaa54e533561f63f21cbe4fa797b199e17799c7633806f8a1ae9b2ce",
	name: "generatePortraitFn",
	filename: "src/lib/server-fns.ts"
}, (opts) => generatePortraitFn.__executeServer(opts));
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
})).handler(generatePortraitFn_createServerFn_handler, async ({ data }) => {
	const { generatePortrait } = await import("./ai-people.server-DlnO4u4k.mjs");
	return generatePortrait(data);
});
//#endregion
export { analyzePeopleFn_createServerFn_handler, generatePortraitFn_createServerFn_handler, getArticleFn_createServerFn_handler, getIndexFn_createServerFn_handler };
