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
    const db = await getDb();
    await db.insert(registrations).values({
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
    });
    return Response.json({ registrationCode }, { status: 201 });
  } catch (error) {
    console.error("registration error", error);
    return Response.json({ error: "目前無法送出報名，請稍後再試。" }, { status: 500 });
  }
}
