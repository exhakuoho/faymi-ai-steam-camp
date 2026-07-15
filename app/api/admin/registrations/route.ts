import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { registrations } from "../../../../db/schema";

function isAuthorized(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const authorization = request.headers.get("authorization");
  return Boolean(password && authorization === `Bearer ${password}`);
}

function maskIdentity(value: string) {
  if (value.length < 6) return "••••••";
  return `${value.slice(0, 3)}••••${value.slice(-3)}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "管理員密碼錯誤。" }, { status: 401 });
  }

  const db = await getDb();
  const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));
  return Response.json({
    registrations: rows.map((row) => ({ ...row, identityNumber: maskIdentity(row.identityNumber) })),
  });
}
