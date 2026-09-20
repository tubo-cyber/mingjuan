import type { Block } from "./parse-html";

export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      if (b.t === "verse") return `【${b.ref}】${b.quote ?? ""}`;
      if (b.t === "note") return `〔${b.label}〕${b.text}`;
      if (b.t === "link") return b.text;
      return b.text;
    })
    .filter(Boolean)
    .join("\n");
}
