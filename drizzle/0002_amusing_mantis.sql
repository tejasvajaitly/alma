ALTER TABLE `leads` ADD `first_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `linkedin_url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `resume` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `status` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `country` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `visa_type` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `customer_message` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `submitted_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL;