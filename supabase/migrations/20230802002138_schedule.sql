alter table "public"."availability" drop constraint "availability_scheduleId_fkey";

alter table "public"."availability" drop column "endTime";

alter table "public"."availability" drop column "startTime";

alter table "public"."availability" add constraint "availability_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES schedule(id) not valid;

alter table "public"."availability" validate constraint "availability_scheduleId_fkey";


