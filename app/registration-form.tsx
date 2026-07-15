"use client";

import { FormEvent, useState } from "react";

const grades = ["國小三年級", "國小四年級", "國小五年級", "國小六年級", "國中一年級", "國中二年級", "國中三年級"];

export default function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, unknown>;
    payload.photoConsent = data.get("photoConsent") === "on";
    payload.privacyConsent = data.get("privacyConsent") === "on";
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; registrationCode?: string };
      if (!response.ok) throw new Error(result.error || "送出失敗");
      setStatus("success");
      setMessage(result.registrationCode || "");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "送出失敗，請稍後再試。");
    }
  }

  if (status === "success") {
    return (
      <div className="success-card" role="status">
        <span className="success-icon">✓</span>
        <p className="form-kicker">REGISTRATION RECEIVED</p>
        <h3>報名資料已收到！</h3>
        <p>你的報名編號是</p>
        <strong>{message}</strong>
        <p>工作人員將於 2 個工作日內聯絡確認名額與繳費方式。送出資料不等同完成錄取，完成繳費後才會保留名額。</p>
        <button className="text-button" type="button" onClick={() => setStatus("idle")}>再填一位學員</button>
      </div>
    );
  }

  return (
    <form className="registration-form" onSubmit={submit}>
      <div className="form-head">
        <div><span className="form-step">01</span><p><b>學員資料</b><small>請依證件資料正確填寫</small></p></div>
      </div>
      <div className="form-grid">
        <label>學員姓名＊<input name="studentName" autoComplete="name" required placeholder="王小明" /></label>
        <label>就讀學校＊<input name="school" required placeholder="○○國小／國中" /></label>
        <label>目前年級＊<select name="grade" required defaultValue=""><option value="" disabled>請選擇年級</option>{grades.map((grade) => <option key={grade}>{grade}</option>)}</select></label>
        <label>出生日期＊<input name="birthDate" type="date" required /></label>
        <label className="full">身分證字號＊<input name="identityNumber" required maxLength={20} placeholder="僅供活動保險使用" /><small className="field-note">此資料僅用於投保與必要行政作業，不會公開顯示。</small></label>
      </div>

      <div className="form-head">
        <div><span className="form-step">02</span><p><b>家長與緊急聯絡</b><small>用於名額、繳費及活動通知</small></p></div>
      </div>
      <div className="form-grid">
        <label>家長／監護人姓名＊<input name="guardianName" required /></label>
        <label>家長手機＊<input name="guardianPhone" type="tel" required placeholder="09xx-xxx-xxx" /></label>
        <label className="full">電子郵件＊<input name="email" type="email" required placeholder="example@email.com" /></label>
        <label>緊急聯絡人＊<input name="emergencyName" required /></label>
        <label>緊急聯絡電話＊<input name="emergencyPhone" type="tel" required /></label>
      </div>

      <div className="form-head">
        <div><span className="form-step">03</span><p><b>照顧與學習需求</b><small>幫助我們提前做好分組與照顧</small></p></div>
      </div>
      <div className="form-grid">
        <label>飲食需求<select name="diet" defaultValue="一般飲食"><option>一般飲食</option><option>全素</option><option>蛋奶素</option><option>其他</option></select></label>
        <label>程式經驗<select name="learningNotes" defaultValue="無程式經驗"><option>無程式經驗</option><option>接觸過 Scratch／積木程式</option><option>接觸過 Arduino／ESP32</option><option>其他</option></select></label>
        <label className="full">健康、過敏或特殊照顧事項<textarea name="healthNotes" rows={4} placeholder="若無可留白；若有需要請詳細說明。" /></label>
      </div>

      <div className="consent-box">
        <label className="check"><input name="photoConsent" type="checkbox" defaultChecked /><span>同意活動期間進行攝影紀錄，並用於成果展示與招生宣傳。</span></label>
        <label className="check"><input name="privacyConsent" type="checkbox" required /><span>我已閱讀並同意個人資料蒐集、處理及使用說明，並確認以上資料正確。＊</span></label>
      </div>
      {status === "error" && <p className="form-error" role="alert">{message}</p>}
      <button className="submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "正在送出…" : "送出報名資料 →"}</button>
      <p className="submit-note">送出後，工作人員將依序聯絡；未達 15 人不開班，最多 40 人。</p>
    </form>
  );
}
