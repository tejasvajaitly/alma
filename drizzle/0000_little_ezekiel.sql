CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`linkedin_url` text NOT NULL,
	`resume` text NOT NULL,
	`status` text NOT NULL,
	`country` text NOT NULL,
	`visa_type` text NOT NULL,
	`customer_message` text NOT NULL,
	`submitted_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_email_unique` ON `leads` (`email`);