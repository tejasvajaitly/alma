CREATE TABLE `lead_visa_types` (
	`lead_id` integer NOT NULL,
	`visa_type_id` integer NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `visa_types` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `leads` ADD `first_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `linkedin_url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `resume` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `status` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `country` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `visa_type` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `customer_message` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `submitted_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `visa_types_type_unique` ON `visa_types` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `leads_email_unique` ON `leads` (`email`);