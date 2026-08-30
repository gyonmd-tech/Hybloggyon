CREATE TABLE "system_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"level" varchar(16) DEFAULT 'info' NOT NULL,
	"action" varchar(80) NOT NULL,
	"entity_type" varchar(80) DEFAULT 'system' NOT NULL,
	"entity_id" text,
	"message" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"actor_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_actor_id_admin_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "system_logs_created_at_idx" ON "system_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "system_logs_action_idx" ON "system_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "system_logs_actor_id_idx" ON "system_logs" USING btree ("actor_id");