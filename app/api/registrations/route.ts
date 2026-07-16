import { getDb } from "../../../db";
import { registrations } from "../../../db/schema";

const requiredFields = [
  "studentName", "school", "grade", "birthDate", "identityNumber",
  "guardianName", "guardianPhone", "email", "emergencyName", "emergencyPhone",
] as const;

function clean(value: unknown, max = 120) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function makeCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `AI${date}-${random}`;
}

type RegistrationData = {
  registrationCode: string;
  studentName: string;
  school: string;
  grade: string;
  birthDate: string;
  identityNumber: string;
  guardianName: string;
  guardianPhone: string;
  email: string;
  emergencyName: string;
  emergencyPhone: string;
  diet: string;
  healthNotes: string;
  learningNotes: string;
  photoConsent: boolean;
  privacyConsent: boolean;
};

// 與 aisteam-camp2／faymi-aisteam 靜態站共用同一個 Apps Script，欄位名稱需保持一致
const DEFAULT_SHEETS_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx9IwB6g7oSsB9TqDRQsNEapckwR1evxNtNWAsGrJlj0sWxylhkc-hXLQGD5LkrbLcXfA/exec";

async function sendToGoogleSheet(data: RegistrationData) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL || DEFAULT_SHEETS_WEBHOOK;
  const payload = {
    batch: process.env.SHEETS_BATCH_LABEL || "飛米五日旗艦 AIxSTEAM 未來科技探索營",
    refCode: data.registrationCode,
    studentName: data.studentName,
    school: data.school,
    stage: data.grade.slice(0, 2),
    grade: data.grade,
    gender: "",
    birth: data.birthDate,
    idNumber: data.identityNumber,
    parentName: data.guardianName,
    relation: "",
    phone: data.guardianPhone,
    emergency: `${data.emergencyName}（${data.emergencyPhone}）`,
    email: data.email,
    allergies: [],
    allergyOther: "",
    diet: data.diet,
    special: data.healthNotes,
    notes: data.learningNotes,
    photoConsent: data.photoConsent ? "同意" : "不同意",
    termsAgree: data.privacyConsent,
    signatureName: "",
    signatureImage: "",
  };
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Google Sheet 服務回應 ${response.status}`);
}

async function sendRegistrationNotification(data: {
  registrationCode: string;
  studentName: string;
  school: string;
  grade: string;
  guardianName: string;
  guardianPhone: string;
  email: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !notificationEmail) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.NOTIFICATION_FROM || "FAYMI AI STEAM <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `[FAYMI AI STEAM] 新報名｜${data.studentName}｜${data.registrationCode}`,
      html: `<h2>新的營隊報名</h2><p><b>報名編號：</b>${data.registrationCode}</p><p><b>學員：</b>${data.studentName}（${data.school}／${data.grade}）</p><p><b>家長：</b>${data.guardianName}｜${data.guardianPhone}</p><p><b>Email：</b>${data.email}</p><p>完整資料請登入網站管理後台查看。</p>`,
    }),
  });
  if (!response.ok) throw new Error(`寄信服務回應 ${response.status}`);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    for (const field of requiredFields) {
      if (!clean(body[field])) {
        return Response.json({ error: "請完整填寫所有必填欄位。" }, { status: 400 });
      }
    }
    if (body.privacyConsent !== true) {
      return Response.json({ error: "請先同意個人資料蒐集與使用說明。" }, { status: 400 });
    }
    const email = clean(body.email, 180);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "請輸入有效的電子郵件。" }, { status: 400 });
    }
    const registrationCode = makeCode();
    const cleanData: RegistrationData = {
      registrationCode,
      studentName: clean(body.studentName, 50),
      school: clean(body.school, 80),
      grade: clean(body.grade, 20),
      birthDate: clean(body.birthDate, 10),
      identityNumber: clean(body.identityNumber, 20).toUpperCase(),
      guardianName: clean(body.guardianName, 50),
      guardianPhone: clean(body.guardianPhone, 30),
      email,
      emergencyName: clean(body.emergencyName, 50),
      emergencyPhone: clean(body.emergencyPhone, 30),
      diet: clean(body.diet, 30) || "一般飲食",
      healthNotes: clean(body.healthNotes, 500),
      learningNotes: clean(body.learningNotes, 500),
      photoConsent: body.photoConsent === true,
      privacyConsent: true,
    };
    // 主要寫入 D1，同步備份到 Google Sheet；兩者只要有一邊成功就算報名成功
    let storedInDb = false;
    try {
      const db = await getDb();
      await db.insert(registrations).values(cleanData);
      storedInDb = true;
    } catch (dbError) {
      console.error("registration db error", dbError);
    }
    let storedInSheet = false;
    try {
      await sendToGoogleSheet(cleanData);
      storedInSheet = true;
    } catch (sheetError) {
      console.error("registration sheet error", sheetError);
    }
    if (!storedInDb && !storedInSheet) {
      return Response.json({ error: "目前無法送出報名，請稍後再試。" }, { status: 500 });
    }
    try {
      await sendRegistrationNotification({
        registrationCode,
        studentName: cleanData.studentName,
        school: cleanData.school,
        grade: cleanData.grade,
        guardianName: cleanData.guardianName,
        guardianPhone: cleanData.guardianPhone,
        email: cleanData.email,
      });
    } catch (notificationError) {
      console.error("registration notification error", notificationError);
    }
    return Response.json({ registrationCode }, { status: 201 });
  } catch (error) {
    console.error("registration error", error);
    return Response.json({ error: "目前無法送出報名，請稍後再試。" }, { status: 500 });
  }
}
