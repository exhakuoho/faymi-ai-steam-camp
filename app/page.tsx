import RegistrationForm from "./registration-form";

const days = [
  ["01", "🤖", "AI 程式設計與機器人控制", "認識 AI、積木程式、感測器與控制邏輯，完成第一個機器人闖關。", "完成基礎控制程式"],
  ["02", "🧠", "AI 進階任務", "挑戰自動循跡、避障與多重感測器，練習任務拆解與 AI 決策概念。", "完成自主移動任務"],
  ["03", "⚡", "綠色能源探索", "進行電解水、氫能與燃料電池實驗，理解能源轉換與 SDGs。", "完成能源實驗紀錄"],
  ["04", "🛠️", "工程設計與創意改造", "規劃車體與任務機構，經歷設計、組裝、測試、失敗與修正。", "完成團隊創意原型"],
  ["05", "🏁", "自走車成果挑戰", "整合五天所學，完成駕駛關卡、隱藏任務、團隊競賽與成果分享。", "帶走作品、證書與回憶"],
];

const faqs = [
  ["孩子完全沒有寫過程式，可以參加嗎？", "可以。課程從圖像化積木程式與基本操作開始，老師和助教會依學員程度分組陪伴。"],
  ["需要自己準備電腦或機器人嗎？", "不需要。課程使用的電腦、機器人、實驗器材與教材皆由營隊提供；孩子只需攜帶水壺、文具與個人用品。"],
  ["NT$8,000 包含哪些項目？", "包含五日課程、教材與設備使用、實驗耗材、每日午餐、活動保險、成果證書及競賽活動。"],
  ["送出表單就算完成報名嗎？", "送出後會取得報名編號，工作人員將於 2 個工作日內聯絡確認。完成繳費後才正式保留名額。"],
  ["營隊日期與地點在哪裡？", "本頁目前開放 2026 暑假五日梯次預先登記，正式日期與上課地點將於開課通知中確認。每日時間為 08:30–16:00。"],
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark">AI</span><span><b>科技探索營</b><small>AI × STEAM CAMP</small></span></a>
        <nav><a href="#features">營隊特色</a><a href="#schedule">五日課程</a><a href="#info">報名資訊</a><a href="#faq">家長 FAQ</a></nav>
        <a className="button button-small" href="#registration">立即報名</a>
      </header>

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span />2026 暑假進階版・五日不過夜</div>
            <h1>讓孩子用五天，<em>把未來科技做出來</em></h1>
            <p>從 AI 程式、機器人控制到氫能實驗與自走車挑戰，不是坐著聽課，而是親手設計、反覆測試、和隊友一起解決問題。</p>
            <div className="hero-actions"><a className="button button-primary" href="#registration">搶先登記名額 <span>→</span></a><a className="button button-ghost" href="#schedule">看看五天玩什麼</a></div>
            <div className="trust-row"><span>✓ 小班分組</span><span>✓ 午餐與保險</span><span>✓ 完整教材設備</span></div>
          </div>
          <div className="hero-visual" aria-label="科技機器人示意圖">
            <div className="visual-ring ring-one" /><div className="visual-ring ring-two" />
            <div className="robot"><div className="antenna" /><div className="face"><i /><i /></div><div className="screen">HELLO!</div><div className="wheels"><i /><i /></div></div>
            <div className="chip chip-ai"><b>AI</b><small>人工智慧</small></div><div className="chip chip-energy"><b>H₂</b><small>綠色能源</small></div><div className="chip chip-code"><b>&lt;/&gt;</b><small>程式設計</small></div><div className="chip chip-car"><b>🏎</b><small>自走車</small></div>
          </div>
        </div>
      </section>

      <section className="quick-facts" id="info">
        <div><span>📅</span><p><small>活動期間</small><b>2026 暑假・連續 5 天</b></p></div>
        <div><span>⏰</span><p><small>每日時間</small><b>08:30–16:00</b></p></div>
        <div><span>🎒</span><p><small>招生對象</small><b>國小三年級～國中三年級</b></p></div>
        <div><span>💳</span><p><small>活動費用</small><b>NT$8,000／人</b></p></div>
      </section>

      <section className="section feature-section" id="features">
        <div className="section-heading"><span className="section-kicker">WHY THIS CAMP</span><h2>不是才藝體驗，<br />是一場完整的科技任務</h2><p>讓孩子在真實任務裡練習邏輯、動手實作、溝通合作與解決問題。</p></div>
        <div className="feature-grid">
          {[["🧩","零基礎也能加入","從圖像化程式開始，老師與助教分組陪伴。"],["🔬","每天都要動手做","五天都有實驗、組裝或任務挑戰。"],["🚗","真實機器人操作","從程式控制到自走車競賽，讓科技真正動起來。"],["🌱","跨域 STEAM 學習","整合科學、科技、工程、藝術與數學能力。"]].map((item,i)=><article className="feature-card" key={item[1]}><span className="feature-number">0{i+1}</span><span className="feature-icon">{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}
        </div>
      </section>

      <section className="section schedule-section" id="schedule">
        <div className="section-heading centered"><span className="section-kicker">5-DAY JOURNEY</span><h2>五天，一步步完成自己的科技任務</h2><p>每天都有明確目標與成果，從看懂原理走到真正完成挑戰。</p></div>
        <div className="day-list">{days.map((day)=><article className={`day-card day-${day[0]}`} key={day[0]}><div className="day-label"><span>DAY {day[0]}</span><b>{day[1]}</b></div><div className="day-copy"><h3>{day[2]}</h3><p>{day[3]}</p></div><div className="day-result"><small>當日成果</small><b>{day[4]}</b></div></article>)}</div>
      </section>

      <section className="outcome-section">
        <div className="outcome-inner"><div><span className="section-kicker light">CAMP OUTCOMES</span><h2>五天之後，孩子帶走的不只是一台車</h2><p>更重要的是：遇到問題時，知道如何觀察、拆解、測試與修正。</p></div><ul><li><b>01</b> AI 與程式邏輯基礎</li><li><b>02</b> 感測器與機器人控制</li><li><b>03</b> 氫能與能源轉換觀念</li><li><b>04</b> 工程設計循環實作</li><li><b>05</b> 團隊溝通與成果表達</li></ul></div>
      </section>

      <section className="section registration-section" id="registration">
        <div className="registration-intro"><span className="section-kicker">REGISTRATION</span><h2>2026 暑假梯次<br />開始預先登記</h2><p>每梯未達 15 人不開班，最多 40 人。送出後會取得報名編號，並由工作人員聯絡確認名額與繳費。</p><div className="price-card"><small>五日完整課程</small><strong><i>NT$</i>8,000</strong><span>／人</span><ul><li>五日課程與完整教材</li><li>設備、實驗耗材與午餐</li><li>活動保險與成果證書</li></ul></div><p className="privacy-note">🔒 身分證字號僅供活動保險使用，報名資料不會公開顯示。</p></div>
        <RegistrationForm />
      </section>

      <section className="section faq-section" id="faq"><div className="section-heading centered"><span className="section-kicker">PARENT FAQ</span><h2>家長常見問題</h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>

      <footer><div className="footer-brand"><span className="brand-mark">AI</span><div><b>AI × STEAM 科技探索營</b><p>讓孩子把想像，變成可以運作的科技作品。</p></div></div><div><b>聯絡方式</b><p>md406md406@gmail.com</p><p>07-3814526 分機 15453</p></div><div><b>營隊資訊</b><p>2026 暑假五日梯次</p><p>每日 08:30–16:00</p></div><small>© 2026 AI × STEAM CAMP. All rights reserved.</small></footer>
      <a className="mobile-cta" href="#registration">立即報名・NT$8,000</a>
    </main>
  );
}
