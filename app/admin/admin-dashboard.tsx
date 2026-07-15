"use client";

import { useState } from "react";

type Registration = {
  id: number;
  registrationCode: string;
  studentName: string;
  school: string;
  grade: string;
  identityNumber: string;
  guardianName: string;
  guardianPhone: string;
  email: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Registration[]>([]);
  const [status, setStatus] = useState<"locked" | "loading" | "ready" | "error">("locked");
  const [message, setMessage] = useState("");

  async function loadRegistrations() {
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/admin/registrations", {
        headers: { Authorization: `Bearer ${password}` },
      });
      const result = (await response.json()) as { registrations?: Registration[]; error?: string };
      if (!response.ok) throw new Error(result.error || "無法讀取報名資料");
      setRows(result.registrations || []);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "登入失敗");
    }
  }

  async function downloadCsv() {
    setMessage("");
    try {
      const response = await fetch("/api/admin/registrations/export", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error || "匯出失敗");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `FAYMI_AI_STEAM_報名名單_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "匯出失敗");
    }
  }

  if (status !== "ready") {
    return (
      <section className="admin-login">
        <div className="admin-logo">F</div>
        <span>FAYMI CAMP ADMIN</span>
        <h1>報名管理後台</h1>
        <p>輸入管理員密碼後，可查看名單並匯出 Excel 相容檔案。</p>
        <label>管理員密碼<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadRegistrations()} /></label>
        {status === "error" && <p className="admin-error">{message}</p>}
        <button type="button" onClick={loadRegistrations} disabled={!password || status === "loading"}>{status === "loading" ? "正在登入…" : "進入後台 →"}</button>
        <a href="/">← 回營隊網站</a>
      </section>
    );
  }

  return (
    <section className="admin-dashboard">
      <header><div><span>FAYMI CAMP ADMIN</span><h1>報名名單</h1><p>目前共 <b>{rows.length}</b> 位學員</p></div><div className="admin-actions"><button type="button" onClick={loadRegistrations}>重新整理</button><button className="export-button" type="button" onClick={downloadCsv}>匯出 Excel／CSV</button></div></header>
      {message && <p className="admin-error">{message}</p>}
      <div className="admin-table-wrap"><table><thead><tr><th>報名時間</th><th>報名編號</th><th>學員</th><th>學校／年級</th><th>家長聯絡</th><th>Email</th><th>身分證</th><th>狀態</th></tr></thead><tbody>{rows.length === 0 ? <tr><td colSpan={8} className="empty-row">目前還沒有報名資料</td></tr> : rows.map((row) => <tr key={row.id}><td>{row.createdAt}</td><td><b>{row.registrationCode}</b></td><td>{row.studentName}</td><td>{row.school}<small>{row.grade}</small></td><td>{row.guardianName}<small>{row.guardianPhone}</small></td><td>{row.email}</td><td>{row.identityNumber}</td><td><span className="status-pill">{row.status}</span></td></tr>)}</tbody></table></div>
      <p className="admin-security">🔒 名單含個人資料，請勿將管理員密碼或匯出檔案轉傳給無關人員。</p>
    </section>
  );
}
