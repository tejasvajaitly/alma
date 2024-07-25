import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  resume: text("resume").notNull(),
  status: text("status").notNull(),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  customerMessage: text("customer_message").notNull(),
  submittedAt: text("submitted_at").default(sql`(CURRENT_DATE)`),
});

export { leads };
