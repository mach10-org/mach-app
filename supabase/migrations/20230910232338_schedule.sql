alter table "public"."availability" drop constraint "availability_scheduleId_fkey";

alter table "public"."schedule" drop constraint "schedule_id_fkey";

alter table "public"."schedule" drop constraint "schedule_id_key";

alter table "public"."availability" drop constraint "Availability_pkey";

alter table "public"."schedule" drop constraint "schedule_pkey";

drop index if exists "public"."Availability_pkey";

drop index if exists "public"."schedule_id_key";

drop index if exists "public"."schedule_pkey";

drop table "public"."availability";

drop table "public"."schedule";

drop sequence if exists "public"."availability_id_seq";


