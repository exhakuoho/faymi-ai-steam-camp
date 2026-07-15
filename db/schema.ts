import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registrations = sqliteTable("registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  registrationCode: text("registration_code").notNull().unique(),
  studentName: text("student_name").notNull(),
  school: text("school").notNull(),
  grade: text("grade").notNull(),
  birthDate: text("birth_date").notNull(),
  identityNumber: text("identity_number").notNull(),
  guardianName: text("guardian_name").notNull(),
  guardianPhone: text("guardian_phone").notNull(),
  email: text("email").notNull(),
  emergencyName: text("emergency_name").notNull(),
  emergencyPhone: text("emergency_phone").notNull(),
  diet: text("diet").notNull().default("一般飲食"),
  healthNotes: text("health_notes").notNull().default(""),
  learningNotes: text("learning_notes").notNull().default(""),
  photoConsent: integer("photo_consent", { mode: "boolean" }).notNull().default(true),
  privacyConsent: integer("privacy_consent", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("待聯絡"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
