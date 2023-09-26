alter table "public"."profiles" add column "email" text not null;

alter table "public"."last_url" add column "course_title" text not null;

create or replace view "public"."last_url_schedule" with (security_invoker) as  SELECT DISTINCT last_url.id,
    last_url.updated_at,
    last_url.url,
    last_url.title,
    last_url.main,
    last_url.course_title,
    profiles.full_name,
    profiles.email
   FROM (((last_url
     JOIN schedule ON ((schedule.user_id = last_url.id)))
     JOIN profiles ON ((profiles.id = last_url.id))));

-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, created_at, email)
  values (new.id, (now() at time zone 'utc'), new.email);
  return new;
end;
$$;



