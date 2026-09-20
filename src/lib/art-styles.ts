export const ART_STYLES = [
  {
    id: "oil",
    label: "圣经典雅油画",
    prompt:
      "reverent classical oil painting, Rembrandt-like chiaroscuro, museum sacred art, modest clothing, historically grounded Near Eastern features, no modern anachronism",
  },
  {
    id: "watercolor",
    label: "水彩插画",
    prompt:
      "soft watercolor illustration on textured paper, quiet biblical storybook, gentle earth pigments, modest dress, dignified faces",
  },
  {
    id: "woodcut",
    label: "木刻版画",
    prompt:
      "traditional woodcut print, strong ink lines, limited earth-tone palette, liturgical book illustration, modest and solemn",
  },
  {
    id: "fresco",
    label: "壁画细密",
    prompt:
      "Byzantine-influenced fresco and manuscript miniature, gold-leaf accents used sparingly, frontal dignity, modest robes, sacred hush",
  },
  {
    id: "realism",
    label: "当代写实",
    prompt:
      "cinematic still of historically plausible ancient Near East, natural light, filmic realism, modest clothing, no glamour makeup",
  },
  {
    id: "ink",
    label: "水墨手卷",
    prompt:
      "Chinese ink-and-wash handscroll mood applied to biblical narrative, restrained color, spacious composition, modest figures, scholarly calm",
  },
] as const;

export type StyleId = (typeof ART_STYLES)[number]["id"];

export function stylePrompt(id: string): string {
  return ART_STYLES.find((s) => s.id === id)?.prompt ?? ART_STYLES[0].prompt;
}

export const MODESTY =
  "Respectful Christian sacred art. Modest clothing covering the body. No sensual posing, no nudity, no modern fashion, no caricature, no extra limbs. Historically plausible adult appearance. Do not depict God the Father as a face. If Jesus appears, keep the depiction reverent and non-sensual.";
