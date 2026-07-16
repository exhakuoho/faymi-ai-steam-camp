import RegistrationForm from "./registration-form";
import Image from "next/image";

const days = [
  ["01", "🤖", "AI 程式設計與機器人控制", "認識 AI、積木程式、感測器與控制邏輯，完成第一個機器人闖關。", "完成基礎控制程式"],
  ["02", "🧠", "AI 進階任務", "挑戰自動循跡、避障與多重感測器，練習任務拆解與 AI 決策概念。", "完成自主移動任務"],
  ["03", "⚡", "泡泡發電・氫能實驗室", "用鉛筆電解水製造 H₂、O₂ 泡泡，再看燃料電池把氫氣變回電力與水，親眼看見能源轉換。", "完成氫能實驗觀察單"],
  ["04", "🧠", "AI 指令闖關島", "從生活中的 AI 出發，用圖像化程式安排指令、如果／否則條件，和隊友一起除錯解任務。", "完成 AI 程式挑戰"],
  ["05", "🏁", "小小駕訓總決賽", "檢查車況、辨識交通標誌，挑戰前進、轉彎、精準停車、繞錐與指定路線，最後進行團隊積分賽。", "通過駕訓挑戰並領獎"],
];

const activityHighlights = [
  {
    day: "DAY 03",
    icon: "⚡",
    title: "泡泡發電實驗室",
    lead: "一支鉛筆、一杯鹽水，竟然能把水變成兩種氣體？",
    points: ["鉛筆電解水", "收集 H₂／O₂", "燃料電池發電"],
    art: "energy",
  },
  {
    day: "DAY 04",
    icon: "🧠",
    title: "AI 指令闖關島",
    lead: "讓螢幕裡的指令真的動起來，找出錯誤、修好它，再闖下一關！",
    points: ["圖像化程式", "如果／否則", "小隊除錯任務"],
    art: "code",
  },
  {
    day: "DAY 05",
    icon: "🏁",
    title: "小小駕訓總決賽",
    lead: "會前進還不夠，還要會看標誌、繞錐、停得準，才能拿下駕照挑戰！",
    points: ["交通標誌", "繞錐與停車", "團隊積分賽"],
    art: "drive",
  },
];

const faqs = [
  ["孩子完全沒有寫過程式，可以參加嗎？", "可以。課程從圖像化積木程式與基本操作開始，老師和助教會依學員程度分組陪伴。"],
  ["需要自己準備電腦或機器人嗎？", "需要自備一台可正常使用的筆記型電腦與充電器；機器人、實驗器材與教材皆由營隊提供。也請攜帶水壺、文具與個人用品。"],
  ["NT$9,500 包含哪些項目？", "包含五日課程、教材與設備使用、實驗耗材、每日午餐、活動保險、成果證書及競賽活動。"],
  ["送出表單就算完成報名嗎？", "送出後會取得報名編號，工作人員將於 2 個工作日內聯絡確認。完成繳費後才正式保留名額。"],
  ["營隊日期與地點在哪裡？", "本頁目前開放 2026 暑假五日梯次預先登記，每日時間為 08:30–16:00。前兩天在飛米樂高教室，後三天移動至國立高雄科技大學建工校區。詳細地址與報到方式將於開課通知中提供。"],
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top"><Image className="brand-logo" src="/faymi-logo.jpg" width={48} height={48} alt="飛米樂高 FAYMIBRICK" /><span><b>AI 科技探索營</b><small>FAYMIBRICK × STEAM CAMP</small></span></a>
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
            <div className="trust-row"><span>✓ 小班分組</span><span>✓ 午餐與保險</span><span>✓ 請自備筆電與充電器</span></div>
          </div>
          <div className="hero-visual" aria-label="飛米樂高馬可角色">
            <div className="hero-sun" /><div className="doodle doodle-one">✦</div><div className="doodle doodle-two">●</div>
            <Image className="hero-mascot" src="/faymi-mascot.png" width={520} height={900} priority alt="拿著科技箱子的飛米樂高馬可角色" />
            <div className="chip chip-ai"><b>AI</b><small>人工智慧</small></div><div className="chip chip-energy"><b>H₂</b><small>綠色能源</small></div><div className="chip chip-code"><b>&lt;/&gt;</b><small>程式設計</small></div><div className="chip chip-car"><b>🏎</b><small>自走車</small></div>
          </div>
        </div>
      </section>

      <section className="quick-facts" id="info">
        <div><span>📅</span><p><small>活動期間</small><b>2026 暑假・連續 5 天</b></p></div>
        <div><span>⏰</span><p><small>每日時間</small><b>08:30–16:00</b></p></div>
        <div><span>🎒</span><p><small>招生對象</small><b>國小三年級～國中三年級</b></p></div>
        <div><span>💳</span><p><small>活動費用</small><b>NT$9,500／人</b></p></div>
      </section>

      <section className="location-journey" aria-label="五日營隊上課地點">
        <div className="location-card location-faymi"><span className="location-days">DAY 01—02</span><div className="location-icon">🏠</div><p><small>前兩天上課地點</small><b>飛米樂高教室</b><em>AI 程式與機器人基礎任務</em></p></div>
        <div className="location-arrow" aria-hidden="true">→</div>
        <div className="location-card location-nkust"><span className="location-days">DAY 03—05</span><div className="location-icon">🏫</div><p><small>後三天上課地點</small><b>國立高雄科技大學</b><em>建工校區・能源、AI 與駕訓挑戰</em></p></div>
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

      <section className="section highlight-section" id="highlights">
        <div className="section-heading centered"><span className="section-kicker">DAY 03—05 HIGHLIGHTS</span><h2>後三天，任務越來越好玩！</h2><p>從看得見的能源泡泡，到會思考的程式，最後把技術開上迷你賽道。</p></div>
        <div className="highlight-grid">
          {activityHighlights.map((item) => (
            <article className={`highlight-card highlight-${item.art}`} key={item.day}>
              <div className="highlight-art" aria-hidden="true">
                {item.art === "energy" && <><span className="bolt">⚡</span><div className="beaker"><i className="bubble b1" /><i className="bubble b2" /><i className="bubble b3" /><b>H₂</b><strong>O₂</strong></div></>}
                {item.art === "code" && <><div className="code-window"><i /><i /><i /><b>IF&nbsp; ▶</b><strong>ELSE&nbsp; ↻</strong></div><span className="code-spark">✦</span></>}
                {item.art === "drive" && <><div className="mini-car"><i /><i /><b>AI</b></div><span className="cone cone-one">▲</span><span className="cone cone-two">▲</span><span className="road-line" /></>}
              </div>
              <div className="highlight-copy"><span className="highlight-day">{item.day} <i>{item.icon}</i></span><h3>{item.title}</h3><p>{item.lead}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
            </article>
          ))}
        </div>
        <div className="safety-strip"><Image src="/faymi-mascot.png" width={82} height={142} alt="飛米樂高馬可提醒實驗安全" /><p><b>馬可的任務提醒</b><span>能源實驗會配戴護目鏡，氫氣與燃料電池示範由老師操作；所有活動都有老師與助教分組陪伴。</span></p><strong>安全實作 ✓</strong></div>
      </section>

      <section className="outcome-section">
        <div className="outcome-inner"><div><span className="section-kicker light">CAMP OUTCOMES</span><h2>五天之後，孩子帶走的不只是一台車</h2><p>更重要的是：遇到問題時，知道如何觀察、拆解、測試與修正。</p></div><ul><li><b>01</b> AI 與程式邏輯基礎</li><li><b>02</b> 感測器與機器人控制</li><li><b>03</b> 氫能與能源轉換觀念</li><li><b>04</b> 除錯與問題拆解能力</li><li><b>05</b> 駕駛判斷與團隊合作</li></ul></div>
      </section>

      <section className="section registration-section" id="registration">
        <div className="registration-intro"><span className="section-kicker">REGISTRATION</span><h2>2026 暑假梯次<br />開始預先登記</h2><p>每梯未達 15 人不開班，最多 40 人。送出後會取得報名編號，並由工作人員聯絡確認名額與繳費。</p><div className="price-card"><small>五日完整課程</small><strong><i>NT$</i>9,500</strong><span>／人</span><ul><li>五日課程與完整教材</li><li>設備、實驗耗材與午餐</li><li>活動保險與成果證書</li></ul></div><p className="privacy-note">🔒 身分證字號僅供活動保險使用，報名資料不會公開顯示。</p></div>
        <RegistrationForm />
      </section>

      <section className="section faq-section" id="faq"><div className="section-heading centered"><span className="section-kicker">PARENT FAQ</span><h2>家長常見問題</h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>

      <footer><div className="footer-brand"><Image className="footer-logo" src="/faymi-logo.jpg" width={64} height={64} alt="飛米樂高" /><div><b>飛米樂高 × AI 科技探索營</b><p>讓孩子把想像，變成可以運作的科技作品。</p></div></div><div><b>聯絡方式</b><p>faymieducation@gmail.com</p><p>07-3814526 分機 15453</p></div><div><b>營隊資訊</b><p>前兩天：飛米樂高教室</p><p>後三天：高科大建工校區</p></div><small>© 2026 FAYMIBRICK × AI STEAM CAMP. All rights reserved.</small></footer>
      <a className="mobile-cta" href="#registration">立即報名・NT$9,500</a>
    </main>
  );
}
