CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`registration_code` text NOT NULL,
	`student_name` text NOT NULL,
	`school` text NOT NULL,
	`grade` text NOT NULL,
	`birth_date` text NOT NULL,
	`identity_number` text NOT NULL,
	`guardian_name` text NOT NULL,
	`guardian_phone` text NOT NULL,
	`email` text NOT NULL,
	`emergency_name` text NOT NULL,
	`emergency_phone` text NOT NULL,
	`diet` text DEFAULT '一般飲食' NOT NULL,
	`health_notes` text DEFAULT '' NOT NULL,
	`learning_notes` text DEFAULT '' NOT NULL,
	`photo_consent` integer DEFAULT true NOT NULL,
	`privacy_consent` integer NOT NULL,
	`status` text DEFAULT '待聯絡' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_registration_code_unique` ON `registrations` (`registration_code`);