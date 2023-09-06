alter table "public"."last_url" drop column "course";

alter table "public"."last_url" alter column "main" set not null;


