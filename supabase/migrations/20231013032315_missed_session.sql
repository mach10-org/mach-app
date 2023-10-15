drop view if exists "public"."last_url_schedule";

alter table "public"."schedule" drop column "day";

alter table "public"."schedule" add column "day_end" smallint not null;

alter table "public"."schedule" add column "day_start" smallint not null;

create or replace view "public"."last_url_per_schedule" with (security_invoker) as  SELECT last_url.id,
    last_url.updated_at,
    last_url.url,
    last_url.title,
    last_url.main,
    last_url.course_title,
    profiles.full_name,
    profiles.email,
    schedule.day_start,
    schedule.day_end,
    schedule.start,
    schedule."end"
   FROM ((last_url
     JOIN schedule ON ((schedule.user_id = last_url.id)))
     JOIN profiles ON ((profiles.id = last_url.id)));


create or replace view "public"."last_url_with_schedule" with (security_invoker) as  SELECT DISTINCT last_url_per_schedule.id,
    last_url_per_schedule.updated_at,
    last_url_per_schedule.url,
    last_url_per_schedule.title,
    last_url_per_schedule.main,
    last_url_per_schedule.course_title,
    last_url_per_schedule.full_name,
    last_url_per_schedule.email
   FROM last_url_per_schedule;



