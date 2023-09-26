alter table "public"."profiles" add column "created_at" timestamp without time zone;

alter table "public"."profiles" add column "has_been_asked_to_set_schedule" boolean not null default false;

-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, created_at)
  values (new.id, (now() at time zone 'utc'));
  return new;
end;
$$;

