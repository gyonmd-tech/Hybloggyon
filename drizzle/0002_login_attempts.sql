CREATE TABLE "login_attempts" (
	"key" varchar(80) PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"reset_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "login_attempts_reset_at_idx" ON "login_attempts" USING btree ("reset_at");