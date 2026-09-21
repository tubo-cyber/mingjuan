import { i as __toESM } from "../_runtime.mjs";
import { n as BOOK_BY_ID, t as BOOKS } from "./catalog-BxauapDR.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Users } from "../_libs/lucide-react.mjs";
import { l as usePrefs } from "./router-B0RQf9yE.mjs";
import { t as AppShell } from "./app-shell-SPNB9aj3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-XGsSRXSw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** 精簡名單：只列各卷主要出場人物，用於本地篩選，不佔容量。 */
var FIGURES = [
	{
		id: "adam",
		name: "亞當",
		nameS: "亚当",
		bookId: "01",
		from: 1,
		to: 5,
		role: "始祖",
		look: "ancient Near Eastern first man, weathered, humble"
	},
	{
		id: "eve",
		name: "夏娃",
		nameS: "夏娃",
		bookId: "01",
		from: 1,
		to: 4,
		role: "始祖之母",
		look: "ancient Near Eastern first woman, dignified, simple linen"
	},
	{
		id: "noah",
		name: "挪亞",
		nameS: "挪亚",
		bookId: "01",
		from: 6,
		to: 9,
		role: "方舟的建造者",
		look: "aged patriarch with weathered hands, rain-soaked cloak"
	},
	{
		id: "abraham",
		name: "亞伯拉罕",
		nameS: "亚伯拉罕",
		bookId: "01",
		from: 12,
		to: 25,
		role: "信心之父",
		look: "elderly Semitic patriarch, desert robes, kind eyes"
	},
	{
		id: "sarah",
		name: "撒拉",
		nameS: "撒拉",
		bookId: "01",
		from: 12,
		to: 23,
		role: "多國之母",
		look: "elderly Semitic matriarch, linen veil"
	},
	{
		id: "isaac",
		name: "以撒",
		nameS: "以撒",
		bookId: "01",
		from: 21,
		to: 28,
		role: "應許之子",
		look: "middle-aged Semitic man, pastoral"
	},
	{
		id: "rebekah",
		name: "利百加",
		nameS: "利百加",
		bookId: "01",
		from: 24,
		to: 27,
		role: "以撒之妻",
		look: "young Semitic woman with water jar"
	},
	{
		id: "jacob",
		name: "雅各",
		nameS: "雅各",
		bookId: "01",
		from: 25,
		to: 50,
		role: "以色列",
		look: "bearded Semitic man, travel-worn cloak"
	},
	{
		id: "esau",
		name: "以掃",
		nameS: "以扫",
		bookId: "01",
		from: 25,
		to: 36,
		role: "獵人長子",
		look: "rugged hunter, reddish hair, outdoor skins"
	},
	{
		id: "joseph",
		name: "約瑟",
		nameS: "约瑟",
		bookId: "01",
		from: 37,
		to: 50,
		role: "埃及宰相",
		look: "young Semitic man in Egyptian court linen"
	},
	{
		id: "moses",
		name: "摩西",
		nameS: "摩西",
		bookId: "02",
		from: 1,
		to: 40,
		role: "領以色列出埃及",
		look: "aged Hebrew prophet with staff, desert robes"
	},
	{
		id: "aaron",
		name: "亞倫",
		nameS: "亚伦",
		bookId: "02",
		from: 4,
		to: 40,
		role: "大祭司",
		look: "Hebrew priest with ephod"
	},
	{
		id: "miriam",
		name: "米利暗",
		nameS: "米利暗",
		bookId: "02",
		from: 2,
		to: 15,
		role: "女先知",
		look: "Hebrew woman with tambourine"
	},
	{
		id: "joshua",
		name: "約書亞",
		nameS: "约书亚",
		bookId: "06",
		from: 1,
		to: 24,
		role: "接續摩西的領袖",
		look: "Hebrew commander in bronze-age armor"
	},
	{
		id: "deborah",
		name: "底波拉",
		nameS: "底波拉",
		bookId: "07",
		from: 4,
		to: 5,
		role: "女先知與士師",
		look: "wise Hebrew woman under a palm"
	},
	{
		id: "gideon",
		name: "基甸",
		nameS: "基甸",
		bookId: "07",
		from: 6,
		to: 8,
		role: "士師",
		look: "young Hebrew warrior with torch and jar"
	},
	{
		id: "samson",
		name: "參孫",
		nameS: "参孙",
		bookId: "07",
		from: 13,
		to: 16,
		role: "拿細耳人勇士",
		look: "long-haired Hebrew strongman"
	},
	{
		id: "ruth",
		name: "路得",
		nameS: "路得",
		bookId: "08",
		from: 1,
		to: 4,
		role: "摩押女子",
		look: "young Moabite woman gleaning barley"
	},
	{
		id: "naomi",
		name: "拿俄米",
		nameS: "拿俄米",
		bookId: "08",
		from: 1,
		to: 4,
		role: "路得的婆婆",
		look: "aged Hebrew widow"
	},
	{
		id: "boaz",
		name: "波阿斯",
		nameS: "波阿斯",
		bookId: "08",
		from: 2,
		to: 4,
		role: "至近親屬",
		look: "kind Hebrew landowner in harvest"
	},
	{
		id: "samuel",
		name: "撒母耳",
		nameS: "撒母耳",
		bookId: "09",
		from: 1,
		to: 16,
		role: "先知與士師",
		look: "Hebrew prophet with gray hair and mantle"
	},
	{
		id: "saul",
		name: "掃羅",
		nameS: "扫罗",
		bookId: "09",
		from: 9,
		to: 31,
		role: "以色列首任君王",
		look: "tall Hebrew king with spear"
	},
	{
		id: "david",
		name: "大衛",
		nameS: "大卫",
		bookId: "09",
		from: 16,
		to: 31,
		role: "牧童與受膏者",
		look: "young Hebrew shepherd with lyre and sling"
	},
	{
		id: "david2",
		name: "大衛王",
		nameS: "大卫王",
		bookId: "10",
		from: 1,
		to: 24,
		role: "以色列王",
		look: "mature Hebrew king with harp"
	},
	{
		id: "bathsheba",
		name: "拔示巴",
		nameS: "拔示巴",
		bookId: "10",
		from: 11,
		to: 12,
		role: "所羅門之母",
		look: "Hebrew royal woman"
	},
	{
		id: "solomon",
		name: "所羅門",
		nameS: "所罗门",
		bookId: "11",
		from: 1,
		to: 11,
		role: "智慧之王",
		look: "Hebrew king in temple-era robes"
	},
	{
		id: "elijah",
		name: "以利亞",
		nameS: "以利亚",
		bookId: "11",
		from: 17,
		to: 22,
		role: "先知",
		look: "hairy Hebrew prophet with leather belt"
	},
	{
		id: "elijah2",
		name: "以利亞",
		nameS: "以利亚",
		bookId: "12",
		from: 1,
		to: 2,
		role: "先知",
		look: "Hebrew prophet at the Jordan"
	},
	{
		id: "elisha",
		name: "以利沙",
		nameS: "以利沙",
		bookId: "12",
		from: 2,
		to: 13,
		role: "先知",
		look: "Hebrew prophet with mantle"
	},
	{
		id: "hezekiah",
		name: "希西家",
		nameS: "希西家",
		bookId: "12",
		from: 18,
		to: 20,
		role: "猶大王",
		look: "devout Hebrew king"
	},
	{
		id: "ezra",
		name: "以斯拉",
		nameS: "以斯拉",
		bookId: "15",
		from: 7,
		to: 10,
		role: "文士",
		look: "Hebrew scribe with Torah scroll"
	},
	{
		id: "nehemiah",
		name: "尼希米",
		nameS: "尼希米",
		bookId: "16",
		from: 1,
		to: 13,
		role: "省長",
		look: "Persian-era Hebrew governor"
	},
	{
		id: "esther",
		name: "以斯帖",
		nameS: "以斯帖",
		bookId: "17",
		from: 1,
		to: 10,
		role: "王后",
		look: "Persian-era Jewish queen, modest crown"
	},
	{
		id: "mordecai",
		name: "末底改",
		nameS: "末底改",
		bookId: "17",
		from: 2,
		to: 10,
		role: "養父",
		look: "Jewish court official at Susa"
	},
	{
		id: "job",
		name: "約伯",
		nameS: "约伯",
		bookId: "18",
		from: 1,
		to: 42,
		role: "受苦的義人",
		look: "ancient patriarch in dust and ash, dignified"
	},
	{
		id: "isaiah",
		name: "以賽亞",
		nameS: "以赛亚",
		bookId: "23",
		from: 1,
		to: 66,
		role: "大先知",
		look: "Hebrew court prophet, solemn, linen robes"
	},
	{
		id: "hezekiah-isa",
		name: "希西家",
		nameS: "希西家",
		bookId: "23",
		from: 36,
		to: 39,
		role: "猶大王",
		look: "devout Hebrew king in Jerusalem"
	},
	{
		id: "cyrus",
		name: "古列",
		nameS: "古列",
		bookId: "23",
		from: 44,
		to: 45,
		role: "波斯王",
		look: "Achaemenid Persian king, historically modest portrait"
	},
	{
		id: "jeremiah",
		name: "耶利米",
		nameS: "耶利米",
		bookId: "24",
		from: 1,
		to: 52,
		role: "流淚先知",
		look: "sorrowful Hebrew prophet"
	},
	{
		id: "ezekiel",
		name: "以西結",
		nameS: "以西结",
		bookId: "26",
		from: 1,
		to: 48,
		role: "被擄中的先知",
		look: "Hebrew priest-prophet by the Chebar canal"
	},
	{
		id: "daniel",
		name: "但以理",
		nameS: "但以理",
		bookId: "27",
		from: 1,
		to: 12,
		role: "在巴比倫的先知",
		look: "young Hebrew court official in Babylon"
	},
	{
		id: "hosea",
		name: "何西阿",
		nameS: "何西阿",
		bookId: "28",
		from: 1,
		to: 14,
		role: "先知",
		look: "Hebrew prophet"
	},
	{
		id: "jonah",
		name: "約拿",
		nameS: "约拿",
		bookId: "32",
		from: 1,
		to: 4,
		role: "先知",
		look: "reluctant Hebrew prophet near the sea"
	},
	{
		id: "jesus-mt",
		name: "耶穌基督",
		nameS: "耶稣基督",
		bookId: "40",
		from: 1,
		to: 28,
		role: "彌賽亞",
		look: "first-century Jewish teacher, compassionate, simple robe, no halo cliché overload"
	},
	{
		id: "mary-mt",
		name: "馬利亞",
		nameS: "马利亚",
		bookId: "40",
		from: 1,
		to: 2,
		role: "耶穌之母",
		look: "young Jewish woman, modest veil"
	},
	{
		id: "peter-mt",
		name: "彼得",
		nameS: "彼得",
		bookId: "40",
		from: 4,
		to: 26,
		role: "門徒",
		look: "weathered Galilean fisherman"
	},
	{
		id: "john-b",
		name: "施洗約翰",
		nameS: "施洗约翰",
		bookId: "40",
		from: 3,
		to: 14,
		role: "先驅",
		look: "ascetic prophet in camel hair"
	},
	{
		id: "jesus-mk",
		name: "耶穌基督",
		nameS: "耶稣基督",
		bookId: "41",
		from: 1,
		to: 16,
		role: "彌賽亞",
		look: "first-century Jewish teacher, compassionate"
	},
	{
		id: "jesus-lk",
		name: "耶穌基督",
		nameS: "耶稣基督",
		bookId: "42",
		from: 1,
		to: 24,
		role: "彌賽亞",
		look: "first-century Jewish teacher"
	},
	{
		id: "zacchaeus",
		name: "撒該",
		nameS: "撒该",
		bookId: "42",
		from: 19,
		to: 19,
		role: "稅吏",
		look: "short Jewish tax collector in a sycamore"
	},
	{
		id: "jesus-jn",
		name: "耶穌基督",
		nameS: "耶稣基督",
		bookId: "43",
		from: 1,
		to: 21,
		role: "道成肉身",
		look: "first-century Jewish teacher, luminous but human"
	},
	{
		id: "nicodemus",
		name: "尼哥底母",
		nameS: "尼哥底母",
		bookId: "43",
		from: 3,
		to: 19,
		role: "法利賽人",
		look: "elderly Jewish teacher at night"
	},
	{
		id: "peter-ac",
		name: "彼得",
		nameS: "彼得",
		bookId: "44",
		from: 1,
		to: 12,
		role: "使徒",
		look: "bold Galilean apostle"
	},
	{
		id: "paul-ac",
		name: "保羅",
		nameS: "保罗",
		bookId: "44",
		from: 9,
		to: 28,
		role: "外邦使徒",
		look: "Jewish tentmaker-scholar, intense eyes"
	},
	{
		id: "barnabas",
		name: "巴拿巴",
		nameS: "巴拿巴",
		bookId: "44",
		from: 4,
		to: 15,
		role: "勸慰子",
		look: "kind Cypriot believer"
	},
	{
		id: "paul-ro",
		name: "保羅",
		nameS: "保罗",
		bookId: "45",
		from: 1,
		to: 16,
		role: "書信作者",
		look: "Jewish apostle dictating a letter"
	},
	{
		id: "timothy",
		name: "提摩太",
		nameS: "提摩太",
		bookId: "54",
		from: 1,
		to: 6,
		role: "年輕同工",
		look: "young Asia-Minor Christian"
	},
	{
		id: "john-rev",
		name: "約翰",
		nameS: "约翰",
		bookId: "66",
		from: 1,
		to: 22,
		role: "拔摩海島的看見者",
		look: "aged apostle on a rocky island"
	}
];
function figuresInRange(bookId, from, to) {
	const a = Math.min(from, to);
	const b = Math.max(from, to);
	return FIGURES.filter((f) => f.bookId === bookId && f.from <= b && f.to >= a);
}
function PeoplePage() {
	const script = usePrefs((s) => s.script);
	const [bookId, setBookId] = (0, import_react.useState)("01");
	const book = BOOK_BY_ID[bookId];
	const [from, setFrom] = (0, import_react.useState)(1);
	const [to, setTo] = (0, import_react.useState)(Math.min(11, book.chapters));
	const people = (0, import_react.useMemo)(() => figuresInRange(bookId, from, to), [
		bookId,
		from,
		to
	]);
	function onBook(id) {
		const b = BOOK_BY_ID[id];
		setBookId(id);
		setFrom(1);
		setTo(Math.min(11, b.chapters));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "人物",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold",
					children: "人物"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "選書卷與章節，查看這一段經文裡的主要人物，點姓名即可去讀該章註解。"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mb-3 block text-xs text-muted",
				children: ["書卷", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: bookId,
					onChange: (e) => onBook(e.target.value),
					className: "mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm text-fg",
					children: BOOKS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: b.id,
						children: script === "S" ? b.nameS : b.name
					}, b.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs text-muted",
					children: ["從第幾章", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: book.chapters,
						value: from,
						onChange: (e) => setFrom(clampChap(Number(e.target.value), book.chapters)),
						className: "mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs text-muted",
					children: ["到第幾章", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: book.chapters,
						value: to,
						onChange: (e) => setTo(clampChap(Number(e.target.value), book.chapters)),
						className: "mt-1 h-11 w-full rounded-[length:var(--radius-md)] border border-border bg-surface px-3 text-sm"
					})]
				})]
			}),
			people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[length:var(--radius-lg)] border border-border bg-surface px-4 py-6 text-sm text-muted",
				children: "這段章節暫無預設人物名單，可改選其他章或直接從經卷讀經。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/read/$bookId/$kind/$chap",
					params: {
						bookId,
						kind: "C",
						chap: String(p.from)
					},
					className: "flex min-h-14 items-center gap-3 rounded-[length:var(--radius-lg)] border border-border bg-surface px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center rounded-full bg-raised text-seal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: script === "S" ? p.nameS : p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs text-muted",
								children: [
									p.role,
									" · ",
									p.from,
									"–",
									p.to,
									"章"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-faint",
							children: "讀"
						})
					]
				}) }, p.id))
			})
		]
	});
}
function clampChap(n, max) {
	if (!Number.isFinite(n)) return 1;
	return Math.min(max, Math.max(1, Math.round(n)));
}
//#endregion
export { PeoplePage as component };
