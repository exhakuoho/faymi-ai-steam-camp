import { desc } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { registrations } from "../../../../../db/schema";

function isAuthorized(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const authorization = request.headers.get("authorization");
  return Boolean(password && authorization === `Bearer ${password}`);
}

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "管理員密碼錯誤。" }, { status: 401 });
  }

  const db = await getDb();
  const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));
  const headers = ["報名時間", "報名編號", "學員姓名", "學校", "年級", "出生日期", "身分證字號", "家長姓名", "家長手機", "Email", "緊急聯絡人", "緊急聯絡電話", "飲食需求", "健康／過敏／特殊照顧", "程式經驗", "攝影同意", "報名狀態"];
  const data = rows.map((row) => [row.createdAt, row.registrationCode, row.studentName, row.school, row.grade, row.birthDate, row.identityNumber, row.guardianName, row.guardianPhone, row.email, row.emergencyName, row.emergencyPhone, row.diet, row.healthNotes, row.learningNotes, row.photoConsent ? "同意" : "不同意", row.status]);
  const csv = `\uFEFF${[headers, ...data].map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=FAYMI_AI_STEAM_registrations.csv",
      "Cache-Control": "no-store",
    },
  });
}
