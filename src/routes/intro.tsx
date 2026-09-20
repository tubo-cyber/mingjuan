import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/intro")({ component: IntroPage });

function IntroPage() {
  return (
    <AppShell>
      <h1 className="mb-3 font-display text-2xl font-semibold">關於明卷</h1>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted">
        <p>
          明卷是為手機與日常閱讀重做的查經界面。正文、註解、拾穗、例證、信息、綱目與主題專輯，都來自「華人基督徒查經資料網站」，這裡只重新排版、換字與適配觸控，不改寫原意。
        </p>
        <p>
          原站許多頁面是 Word 轉出的 Big5 網頁，固定寬度表格在手機上必須放大才能讀。明卷會把那些頁面轉成直式長文：經節獨立成段，註解欄位做成標籤，字體、字級、行距、紙色都可以自己調。
        </p>
        <p>
          請把本應用加到主畫面當閱讀器使用。資料仍屬原作者與原網站；若作轉載或出版，請遵守原站規定。
        </p>
        <p>
          原文網站：
          <a className="ml-1 underline decoration-border underline-offset-4 text-fg" href="https://www.ccbiblestudy.org/index-T.htm">
            ccbiblestudy.org
          </a>
        </p>
        <p className="text-xs text-faint">聯絡原站：ccbiblestudy2025@gmail.com</p>
      </div>
    </AppShell>
  );
}
