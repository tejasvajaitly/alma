import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  linkedinUrl: text("linkedin_url").notNull(),
  resume: text("resume").notNull(),
  status: text("status").notNull(),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  customerMessage: text("customer_message").notNull(),
  submittedAt: integer("submitted_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

const visaTypes = sqliteTable("visa_types", {
  id: integer("id").primaryKey(),
  type: text("type").notNull().unique(),
});

const leadVisaTypes = sqliteTable("lead_visa_types", {
  leadId: integer("lead_id")
    .references(() => leads.id)
    .notNull(),
  visaTypeId: integer("visa_type_id")
    .references(() => visaTypes.id)
    .notNull(),
});

export { leads, visaTypes, leadVisaTypes };
