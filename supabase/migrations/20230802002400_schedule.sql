alter table "public"."availability" add column "endTime" time without time zone not null;

alter table "public"."availability" add column "startTime" time without time zone not null;


