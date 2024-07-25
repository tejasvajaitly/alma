DROP INDEX IF EXISTS `leads_email_unique`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `first_name`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `last_name`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `linkedin_url`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `resume`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `country`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `visa_type`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `customer_message`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `submitted_at`;