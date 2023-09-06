drop policy "Enable read access for all users" on "public"."goals";

alter table "public"."goals" drop constraint "goals_pkey";

drop index if exists "public"."goals_pkey";

drop table "public"."goals";


