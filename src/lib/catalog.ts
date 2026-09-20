export type KindCode = "C" | "G" | "I" | "M" | "O" | "V";

export const KINDS: { code: KindCode; name: string; hint: string; pdf?: boolean }[] = [
  { code: "C", name: "註解", hint: "逐節詳解" },
  { code: "G", name: "拾穗", hint: "精華摘錄" },
  { code: "I", name: "例證", hint: "靈感與例證" },
  { code: "M", name: "信息", hint: "講道信息" },
  { code: "O", name: "綱目", hint: "結構大綱" },
  { code: "V", name: "譯文", hint: "各種譯本", pdf: true },
];

export type Book = {
  id: string;
  folder: string;
  testament: "ot" | "nt";
  name: string;
  nameS: string;
  abbr: string;
  chapters: number;
};

export const BOOKS: Book[] = [
  { id: "01", folder: "01Gen", testament: "ot", name: "創世記", nameS: "创世记", abbr: "創", chapters: 50 },
  { id: "02", folder: "02Exo", testament: "ot", name: "出埃及記", nameS: "出埃及记", abbr: "出", chapters: 40 },
  { id: "03", folder: "03Lev", testament: "ot", name: "利未記", nameS: "利未记", abbr: "利", chapters: 27 },
  { id: "04", folder: "04Num", testament: "ot", name: "民數記", nameS: "民数记", abbr: "民", chapters: 36 },
  { id: "05", folder: "05Deut", testament: "ot", name: "申命記", nameS: "申命记", abbr: "申", chapters: 34 },
  { id: "06", folder: "06Josh", testament: "ot", name: "約書亞記", nameS: "约书亚记", abbr: "書", chapters: 24 },
  { id: "07", folder: "07Judg", testament: "ot", name: "士師記", nameS: "士师记", abbr: "士", chapters: 21 },
  { id: "08", folder: "08Ruth", testament: "ot", name: "路得記", nameS: "路得记", abbr: "得", chapters: 4 },
  { id: "09", folder: "09 1Sam", testament: "ot", name: "撒母耳記上", nameS: "撒母耳记上", abbr: "撒上", chapters: 31 },
  { id: "10", folder: "10 2Sam", testament: "ot", name: "撒母耳記下", nameS: "撒母耳记下", abbr: "撒下", chapters: 24 },
  { id: "11", folder: "11 1King", testament: "ot", name: "列王紀上", nameS: "列王纪上", abbr: "王上", chapters: 22 },
  { id: "12", folder: "12 2King", testament: "ot", name: "列王紀下", nameS: "列王纪下", abbr: "王下", chapters: 25 },
  { id: "13", folder: "13 1Chro", testament: "ot", name: "歷代志上", nameS: "历代志上", abbr: "代上", chapters: 29 },
  { id: "14", folder: "14 2Chro", testament: "ot", name: "歷代志下", nameS: "历代志下", abbr: "代下", chapters: 36 },
  { id: "15", folder: "15Ezra", testament: "ot", name: "以斯拉記", nameS: "以斯拉记", abbr: "拉", chapters: 10 },
  { id: "16", folder: "16Neh", testament: "ot", name: "尼希米記", nameS: "尼希米记", abbr: "尼", chapters: 13 },
  { id: "17", folder: "17Esth", testament: "ot", name: "以斯帖記", nameS: "以斯帖记", abbr: "斯", chapters: 10 },
  { id: "18", folder: "18Job", testament: "ot", name: "約伯記", nameS: "约伯记", abbr: "伯", chapters: 42 },
  { id: "19", folder: "19Psa", testament: "ot", name: "詩篇", nameS: "诗篇", abbr: "詩", chapters: 150 },
  { id: "20", folder: "20Prov", testament: "ot", name: "箴言", nameS: "箴言", abbr: "箴", chapters: 31 },
  { id: "21", folder: "21Eccl", testament: "ot", name: "傳道書", nameS: "传道书", abbr: "傳", chapters: 12 },
  { id: "22", folder: "22Song", testament: "ot", name: "雅歌", nameS: "雅歌", abbr: "歌", chapters: 8 },
  { id: "23", folder: "23Isa", testament: "ot", name: "以賽亞書", nameS: "以赛亚书", abbr: "賽", chapters: 66 },
  { id: "24", folder: "24Jer", testament: "ot", name: "耶利米書", nameS: "耶利米书", abbr: "耶", chapters: 52 },
  { id: "25", folder: "25Lam", testament: "ot", name: "耶利米哀歌", nameS: "耶利米哀歌", abbr: "哀", chapters: 5 },
  { id: "26", folder: "26Ezek", testament: "ot", name: "以西結書", nameS: "以西结书", abbr: "結", chapters: 48 },
  { id: "27", folder: "27Dan", testament: "ot", name: "但以理書", nameS: "但以理书", abbr: "但", chapters: 12 },
  { id: "28", folder: "28Hosea", testament: "ot", name: "何西阿書", nameS: "何西阿书", abbr: "何", chapters: 14 },
  { id: "29", folder: "29Joel", testament: "ot", name: "約珥書", nameS: "约珥书", abbr: "珥", chapters: 3 },
  { id: "30", folder: "30Amos", testament: "ot", name: "阿摩司書", nameS: "阿摩司书", abbr: "摩", chapters: 9 },
  { id: "31", folder: "31Obad", testament: "ot", name: "俄巴底亞書", nameS: "俄巴底亚书", abbr: "俄", chapters: 1 },
  { id: "32", folder: "32Jonah", testament: "ot", name: "約拿書", nameS: "约拿书", abbr: "拿", chapters: 4 },
  { id: "33", folder: "33Micah", testament: "ot", name: "彌迦書", nameS: "弥迦书", abbr: "彌", chapters: 7 },
  { id: "34", folder: "34Nah", testament: "ot", name: "那鴻書", nameS: "那鸿书", abbr: "鴻", chapters: 3 },
  { id: "35", folder: "35Habak", testament: "ot", name: "哈巴谷書", nameS: "哈巴谷书", abbr: "哈", chapters: 3 },
  { id: "36", folder: "36Zeph", testament: "ot", name: "西番雅書", nameS: "西番雅书", abbr: "番", chapters: 3 },
  { id: "37", folder: "37Hagg", testament: "ot", name: "哈該書", nameS: "哈该书", abbr: "該", chapters: 2 },
  { id: "38", folder: "38Zech", testament: "ot", name: "撒迦利亞書", nameS: "撒迦利亚书", abbr: "亞", chapters: 14 },
  { id: "39", folder: "39Mal", testament: "ot", name: "瑪拉基書", nameS: "玛拉基书", abbr: "瑪", chapters: 4 },
  { id: "40", folder: "40Matt", testament: "nt", name: "馬太福音", nameS: "马太福音", abbr: "太", chapters: 28 },
  { id: "41", folder: "41Mark", testament: "nt", name: "馬可福音", nameS: "马可福音", abbr: "可", chapters: 16 },
  { id: "42", folder: "42Luke", testament: "nt", name: "路加福音", nameS: "路加福音", abbr: "路", chapters: 24 },
  { id: "43", folder: "43John", testament: "nt", name: "約翰福音", nameS: "约翰福音", abbr: "約", chapters: 21 },
  { id: "44", folder: "44Acts", testament: "nt", name: "使徒行傳", nameS: "使徒行传", abbr: "徒", chapters: 28 },
  { id: "45", folder: "45Rom", testament: "nt", name: "羅馬書", nameS: "罗马书", abbr: "羅", chapters: 16 },
  { id: "46", folder: "46 1Cor", testament: "nt", name: "哥林多前書", nameS: "哥林多前书", abbr: "林前", chapters: 16 },
  { id: "47", folder: "47 2Cor", testament: "nt", name: "哥林多後書", nameS: "哥林多后书", abbr: "林後", chapters: 13 },
  { id: "48", folder: "48Gal", testament: "nt", name: "加拉太書", nameS: "加拉太书", abbr: "加", chapters: 6 },
  { id: "49", folder: "49Eph", testament: "nt", name: "以弗所書", nameS: "以弗所书", abbr: "弗", chapters: 6 },
  { id: "50", folder: "50Phil", testament: "nt", name: "腓立比書", nameS: "腓立比书", abbr: "腓", chapters: 4 },
  { id: "51", folder: "51Col", testament: "nt", name: "歌羅西書", nameS: "歌罗西书", abbr: "西", chapters: 4 },
  { id: "52", folder: "52 1Thes", testament: "nt", name: "帖撒羅尼迦前書", nameS: "帖撒罗尼迦前书", abbr: "帖前", chapters: 5 },
  { id: "53", folder: "53 2Thes", testament: "nt", name: "帖撒羅尼迦後書", nameS: "帖撒罗尼迦后书", abbr: "帖後", chapters: 3 },
  { id: "54", folder: "54 1Tim", testament: "nt", name: "提摩太前書", nameS: "提摩太前书", abbr: "提前", chapters: 6 },
  { id: "55", folder: "55 2Tim", testament: "nt", name: "提摩太後書", nameS: "提摩太后书", abbr: "提後", chapters: 4 },
  { id: "56", folder: "56Titus", testament: "nt", name: "提多書", nameS: "提多书", abbr: "多", chapters: 3 },
  { id: "57", folder: "57Philem", testament: "nt", name: "腓利門書", nameS: "腓利门书", abbr: "門", chapters: 1 },
  { id: "58", folder: "58Heb", testament: "nt", name: "希伯來書", nameS: "希伯来书", abbr: "來", chapters: 13 },
  { id: "59", folder: "59James", testament: "nt", name: "雅各書", nameS: "雅各书", abbr: "雅", chapters: 5 },
  { id: "60", folder: "60 1Pet", testament: "nt", name: "彼得前書", nameS: "彼得前书", abbr: "彼前", chapters: 5 },
  { id: "61", folder: "61 2Pet", testament: "nt", name: "彼得後書", nameS: "彼得后书", abbr: "彼後", chapters: 3 },
  { id: "62", folder: "62 1John", testament: "nt", name: "約翰一書", nameS: "约翰一书", abbr: "約壹", chapters: 5 },
  { id: "63", folder: "63 2John", testament: "nt", name: "約翰二書", nameS: "约翰二书", abbr: "約貳", chapters: 1 },
  { id: "64", folder: "64 3John", testament: "nt", name: "約翰三書", nameS: "约翰三书", abbr: "約參", chapters: 1 },
  { id: "65", folder: "65Jude", testament: "nt", name: "猶大書", nameS: "犹大书", abbr: "猶", chapters: 1 },
  { id: "66", folder: "66Rev", testament: "nt", name: "啟示錄", nameS: "启示录", abbr: "啟", chapters: 22 },
];

export const BOOK_BY_ID = Object.fromEntries(BOOKS.map((b) => [b.id, b]));

export type Topic = {
  id: string;
  folder: string;
  index: string;
  name: string;
  group: string;
};

export const TOPICS: Topic[] = [
  { id: "67God", folder: "67God", index: "67index-T.htm", name: "父神", group: "真理與分辨" },
  { id: "68Christ", folder: "68Christ", index: "68index-T.htm", name: "耶穌基督", group: "真理與分辨" },
  { id: "69Spirit", folder: "69Spirit", index: "69index-T.htm", name: "聖靈", group: "真理與分辨" },
  { id: "78Bible", folder: "78Bible", index: "78index-T.htm", name: "聖經總論", group: "真理與分辨" },
  { id: "80Salvation", folder: "80Salvation", index: "80index-T.htm", name: "救恩與信仰", group: "真理與分辨" },
  { id: "81Church", folder: "81Church", index: "81index-T.htm", name: "教會真理", group: "真理與分辨" },
  { id: "82TheEnd", folder: "82TheEnd", index: "82index-T.htm", name: "末世與永世", group: "真理與分辨" },
  { id: "83Spiritual", folder: "83Spiritual", index: "83index-T.htm", name: "靈界與靈戰", group: "真理與分辨" },
  { id: "84Truth", folder: "84Truth", index: "84index-T.htm", name: "一般真理", group: "真理與分辨" },
  { id: "85Discern", folder: "85Discern", index: "85index-T.htm", name: "真理的分辨", group: "真理與分辨" },
  { id: "71GodToUs", folder: "71GodToUs", index: "71index-T.htm", name: "神對我們", group: "靈命與靈交" },
  { id: "72UsToGod", folder: "72UsToGod", index: "72index-T.htm", name: "我們對神", group: "靈命與靈交" },
  { id: "73FaithHopeLove", folder: "73FaithHopeLove", index: "73index-T.htm", name: "信望愛", group: "靈命與靈交" },
  { id: "74Union", folder: "74Union", index: "74index-T.htm", name: "與神聯合", group: "靈命與靈交" },
  { id: "75Worship", folder: "75Worship", index: "75index-T.htm", name: "敬拜與讚美", group: "靈命與靈交" },
  { id: "76Prayer", folder: "76Prayer", index: "76index-T.htm", name: "禱告與祈求", group: "靈命與靈交" },
  { id: "77Study", folder: "77Study", index: "77index-T.htm", name: "讀經與查經", group: "靈命與靈交" },
  { id: "86Human", folder: "86Human", index: "86index-T.htm", name: "靈魂體剖析", group: "靈命與靈交" },
  { id: "87Life", folder: "87Life", index: "87index-T.htm", name: "靈命追求", group: "靈命與靈交" },
  { id: "88Cross", folder: "88Cross", index: "88index-T.htm", name: "十字架與成聖", group: "靈命與靈交" },
  { id: "70GodsWill", folder: "70GodsWill", index: "70index-T.htm", name: "旨意與引導", group: "生活與事奉" },
  { id: "79Gospel", folder: "79Gospel", index: "79index-T.htm", name: "福音與見證", group: "生活與事奉" },
  { id: "89Character", folder: "89Character", index: "89index-T.htm", name: "品德與性格", group: "生活與事奉" },
  { id: "90DailyWalk", folder: "90DailyWalk", index: "90index-T.htm", name: "個人生活", group: "生活與事奉" },
  { id: "91Relationship", folder: "91Relationship", index: "91index-T.htm", name: "群體生活", group: "生活與事奉" },
  { id: "92Meeting", folder: "92Meeting", index: "92index-T.htm", name: "教會生活", group: "生活與事奉" },
  { id: "93Service", folder: "93Service", index: "93index-T.htm", name: "配搭與事奉", group: "生活與事奉" },
  { id: "94Worker", folder: "94Worker", index: "94index-T.htm", name: "工人與領袖", group: "生活與事奉" },
  { id: "95Preach", folder: "95Preach", index: "95index-T.htm", name: "傳揚與牧養", group: "生活與事奉" },
  { id: "95Illustration", folder: "95Illustration", index: "95index-T1.htm", name: "例證故事", group: "生活與事奉" },
  { id: "96Person", folder: "96Person", index: "96index-T.htm", name: "聖經著名人物", group: "歷史與其他" },
  { id: "96Name", folder: "96Name", index: "96index-T1.htm", name: "聖經人名辭典", group: "歷史與其他" },
  { id: "97History", folder: "97History", index: "97index-T.htm", name: "教會歷史", group: "歷史與其他" },
  { id: "97Biography", folder: "97Biography", index: "97index-T1.htm", name: "教會人物傳記", group: "歷史與其他" },
  { id: "98Special", folder: "98Special", index: "98index-T.htm", name: "特殊專題", group: "歷史與其他" },
  { id: "98Assembly", folder: "98Assembly", index: "98index-T1.htm", name: "眾處文集", group: "歷史與其他" },
  { id: "98Famous", folder: "98Famous", index: "98index-T2.htm", name: "屬靈名著專輯", group: "歷史與其他" },
  { id: "99Others", folder: "99Others", index: "99index-T.htm", name: "聖經度量衡", group: "歷史與其他" },
  { id: "99Place", folder: "99Place", index: "99index-T1.htm", name: "聖經地名辭典", group: "歷史與其他" },
  { id: "99Food", folder: "99Food", index: "99index-T2.htm", name: "每日靈糧", group: "歷史與其他" },
  { id: "H0Commentary", folder: "H0Commentary", index: "H0index-T.htm", name: "聖經註解", group: "黃迦勒專輯" },
  { id: "H1Basics", folder: "H1Basics", index: "H1index-T.htm", name: "基要信息", group: "黃迦勒專輯" },
  { id: "H2Perfection", folder: "H2Perfection", index: "H2index-T.htm", name: "成全訓練綱目", group: "黃迦勒專輯" },
  { id: "H3Outlines", folder: "H3Outlines", index: "H3index-T.htm", name: "講章綱目", group: "黃迦勒專輯" },
  { id: "H4Correction", folder: "H4Correction", index: "H4index-T.htm", name: "黃迦勒辨正集", group: "黃迦勒專輯" },
  { id: "H5Memoirs", folder: "H5Memoirs", index: "H5index-T.htm", name: "黃迦勒回憶錄", group: "黃迦勒專輯" },
  { id: "H6Dictionary", folder: "H6Dictionary", index: "H6index-T.htm", name: "聖經和屬靈辭典", group: "黃迦勒專輯" },
  { id: "H7Digest", folder: "H7Digest", index: "H7index-T.htm", name: "基督徒文摘", group: "黃迦勒專輯" },
  { id: "H8Hymnary", folder: "H8Hymnary", index: "H8index-T.htm", name: "詩歌選集", group: "黃迦勒專輯" },
  { id: "H9Collection", folder: "H9Collection", index: "H9index-T.htm", name: "黃迦勒電子書藏", group: "黃迦勒專輯" },
];

export const TOPIC_GROUPS = [
  "真理與分辨",
  "靈命與靈交",
  "生活與事奉",
  "歷史與其他",
  "黃迦勒專輯",
] as const;

export const COLUMNS = [
  { slug: "CharlieYang", name: "楊震宇", en: "Charlie Yang", path: "individual/CharlieYang/index.html" },
  { slug: "JamesLin", name: "林建利", en: "James Lin", path: "individual/JamesLin/index.html" },
  { slug: "WasiTjan", name: "曾華希", en: "Wasi Tjan", path: "individual/WasiTjan/index.html" },
  { slug: "EzraWang", name: "王白", en: "Ezra Wang", path: "individual/EzraWang/index.html" },
  { slug: "JoshuaLee", name: "李建熹", en: "Joshua Lee", path: "individual/JoshuaLee/index.html" },
];

export const ORIGIN = "https://www.ccbiblestudy.org";

export function bookDir(book: Book): string {
  const root = book.testament === "ot" ? "Old Testament" : "New Testament";
  return `${root}/${book.folder}`;
}

export function articleFile(
  book: Book,
  kind: KindCode,
  chap: number,
  script: "T" | "S" | "E" = "T",
): string {
  const pad = padChapLocal(book.id, chap);
  const ext = kind === "V" ? "pdf" : "htm";
  return `${book.id}${kind}${script}${pad}.${ext}`;
}

function padChapLocal(bookId: string, chap: number): string {
  if (bookId === "19") return String(chap).padStart(3, "0");
  return String(chap).padStart(2, "0");
}

export function articlePath(
  book: Book,
  kind: KindCode,
  chap: number,
  script: "T" | "S" | "E" = "T",
): string {
  return `${bookDir(book)}/${articleFile(book, kind, chap, script)}`;
}

export function indexPath(book: Book, script: "T" | "S" | "E" = "T"): string {
  return `${bookDir(book)}/${book.id}index-${script}.htm`;
}

export function topicIndexPath(topic: Topic, script: "T" | "S" | "E" = "T"): string {
  const file = topic.index.replace(/-[TSE]\./, `-${script}.`);
  return `Topics/${topic.folder}/${file}`;
}
