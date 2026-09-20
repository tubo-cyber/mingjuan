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
          「繪像」會依你選定的章節，從本站註解與聖經記載抽出敘事重心人物（族譜路人會略過），再按你選的畫風生成肖像。你鎖定某一張臉之後，後面章節的插圖會把這張臉當參考，避免同一個人前後長得不一樣。短片是從已鎖定肖像做輕微運鏡，不是另起一張陌生的臉。
        </p>
        <p>
          閱讀頁的提問只根據「這一頁的注解與經文」作答；摘錄不足會說明，不編造出處。生圖與提問都要你按下去才會呼叫，不會自動連發。
        </p>
        <p>
          資料仍屬原作者與原網站；AI 圖像是助讀想像，不能代替經文。若作轉載或出版，請遵守原站規定。
        </p>
        <p>
          原文網站：
          <a className="ml-1 underline decoration-border underline-offset-4 text-fg" href="https://www.ccbiblestudy.org/index-T.htm">
            ccbiblestudy.org
          </a>
        </p>
      </div>
    </AppShell>
  );
}
