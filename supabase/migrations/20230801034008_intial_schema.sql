create extension if not exists "moddatetime" with schema "extensions";

create extension if not exists "pg_cron" with schema "extensions";


create sequence "public"."availability_id_seq";

create table "public"."answers" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "course_slug" text default ''::text,
    "title" text default ''::text,
    "success" boolean,
    "user" uuid
);


alter table "public"."answers" enable row level security;

create table "public"."availability" (
    "id" integer not null default nextval('availability_id_seq'::regclass),
    "days" integer[],
    "date" date,
    "scheduleId" uuid not null,
    "endTime" numeric not null,
    "startTime" numeric not null
);


create table "public"."goals" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "active" boolean not null default true,
    "order" numeric not null default '0'::numeric,
    "label" text not null default ''::text
);


alter table "public"."goals" enable row level security;

create table "public"."last_url" (
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "url" text not null,
    "title" text not null,
    "course" text not null,
    "id" uuid not null,
    "main" boolean default false
);


alter table "public"."last_url" enable row level security;

create table "public"."learning" (
    "id" uuid not null default uuid_generate_v4(),
    "quantity" numeric not null,
    "completed" boolean not null default false,
    "user" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "title" text not null default ''::text,
    "slug" text not null
);


alter table "public"."learning" enable row level security;

create table "public"."learning_lesson" (
    "id" uuid not null default uuid_generate_v4(),
    "slug" text not null default ''::text,
    "title" text not null default ''::text,
    "course_id" uuid not null,
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."learning_lesson" enable row level security;

create table "public"."newsletter" (
    "email" text not null,
    "updated_at" timestamp with time zone default now()
);


alter table "public"."newsletter" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "full_name" text,
    "avatar_url" text,
    "xp" numeric not null default '0'::numeric,
    "education" text,
    "dob" date,
    "computer_xp" text,
    "about" text,
    "goal" text[] not null default '{}'::text[],
    "gender" text,
    "devices" text[] default '{}'::text[],
    "age" text
);


alter table "public"."profiles" enable row level security;

create table "public"."schedule" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text default ''::text,
    "timeZone" text
);


alter sequence "public"."availability_id_seq" owned by "public"."availability"."id";

CREATE UNIQUE INDEX "Availability_pkey" ON public.availability USING btree (id);

CREATE UNIQUE INDEX answers_id_key ON public.answers USING btree (id);

CREATE UNIQUE INDEX answers_pkey ON public.answers USING btree (id);

CREATE UNIQUE INDEX goals_pkey ON public.goals USING btree (id);

CREATE UNIQUE INDEX last_url_pkey ON public.last_url USING btree (id);

CREATE UNIQUE INDEX learning_id_key ON public.learning USING btree (id);

CREATE UNIQUE INDEX learning_lesson_id_key ON public.learning_lesson USING btree (id);

CREATE UNIQUE INDEX learning_lesson_pkey ON public.learning_lesson USING btree (id);

CREATE UNIQUE INDEX learning_pkey ON public.learning USING btree (id);

CREATE UNIQUE INDEX newsletter_email_key ON public.newsletter USING btree (email);

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX schedule_id_key ON public.schedule USING btree (id);

CREATE UNIQUE INDEX schedule_pkey ON public.schedule USING btree (id);

CREATE UNIQUE INDEX unique_slug_course_id ON public.learning_lesson USING btree (slug, course_id);

CREATE UNIQUE INDEX unique_user_slug ON public.learning USING btree ("user", slug);

alter table "public"."answers" add constraint "answers_pkey" PRIMARY KEY using index "answers_pkey";

alter table "public"."availability" add constraint "Availability_pkey" PRIMARY KEY using index "Availability_pkey";

alter table "public"."goals" add constraint "goals_pkey" PRIMARY KEY using index "goals_pkey";

alter table "public"."last_url" add constraint "last_url_pkey" PRIMARY KEY using index "last_url_pkey";

alter table "public"."learning" add constraint "learning_pkey" PRIMARY KEY using index "learning_pkey";

alter table "public"."learning_lesson" add constraint "learning_lesson_pkey" PRIMARY KEY using index "learning_lesson_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."schedule" add constraint "schedule_pkey" PRIMARY KEY using index "schedule_pkey";

alter table "public"."answers" add constraint "answers_id_key" UNIQUE using index "answers_id_key";

alter table "public"."answers" add constraint "answers_user_fkey" FOREIGN KEY ("user") REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."answers" validate constraint "answers_user_fkey";

alter table "public"."availability" add constraint "availability_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES schedule(id) ON DELETE CASCADE not valid;

alter table "public"."availability" validate constraint "availability_scheduleId_fkey";

alter table "public"."last_url" add constraint "last_url_id_fkey" FOREIGN KEY (id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."last_url" validate constraint "last_url_id_fkey";

alter table "public"."learning" add constraint "learning_id_key" UNIQUE using index "learning_id_key";

alter table "public"."learning" add constraint "learning_user_fkey" FOREIGN KEY ("user") REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."learning" validate constraint "learning_user_fkey";

alter table "public"."learning" add constraint "unique_user_slug" UNIQUE using index "unique_user_slug";

alter table "public"."learning_lesson" add constraint "learning_lesson_course_id_fkey" FOREIGN KEY (course_id) REFERENCES learning(id) ON DELETE CASCADE not valid;

alter table "public"."learning_lesson" validate constraint "learning_lesson_course_id_fkey";

alter table "public"."learning_lesson" add constraint "learning_lesson_id_key" UNIQUE using index "learning_lesson_id_key";

alter table "public"."learning_lesson" add constraint "unique_slug_course_id" UNIQUE using index "unique_slug_course_id";

alter table "public"."newsletter" add constraint "newsletter_email_key" UNIQUE using index "newsletter_email_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."schedule" add constraint "schedule_id_fkey" FOREIGN KEY (id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."schedule" validate constraint "schedule_id_fkey";

alter table "public"."schedule" add constraint "schedule_id_key" UNIQUE using index "schedule_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

create policy "Enable delete for users based on user_id"
on "public"."answers"
as permissive
for delete
to authenticated
using ((auth.uid() = "user"));


create policy "Enable insert for all only"
on "public"."answers"
as permissive
for insert
to public
with check (true);


create policy "Enable select for authenticated users only"
on "public"."answers"
as permissive
for select
to authenticated
using ((auth.uid() = "user"));


create policy "Enable update for users based on user uuid"
on "public"."answers"
as permissive
for update
to authenticated
using ((auth.uid() = "user"))
with check ((auth.uid() = "user"));


create policy "Enable read access for all users"
on "public"."goals"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on connected user uuid"
on "public"."last_url"
as permissive
for delete
to authenticated
using ((auth.uid() = id));


create policy "Enable insert for users based on connected user uuid"
on "public"."last_url"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "Enable read access for users based on connected user uuid"
on "public"."last_url"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Enable update for users based on connected user uuid"
on "public"."last_url"
as permissive
for update
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Enable delete for users based on user_id"
on "public"."learning"
as permissive
for delete
to authenticated
using ((auth.uid() = "user"));


create policy "Enable insert for authenticated users only"
on "public"."learning"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for user based on user uuid"
on "public"."learning"
as permissive
for select
to authenticated
using ((auth.uid() = "user"));


create policy "Enable update for users based on user uuid"
on "public"."learning"
as permissive
for update
to authenticated
using ((auth.uid() = "user"))
with check ((auth.uid() = "user"));


create policy "Enable delete for users based on user_id"
on "public"."learning_lesson"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM learning
  WHERE ((learning.id = learning_lesson.course_id) AND (auth.uid() = learning."user")))));


create policy "Enable insert for authenticated users only and by user id"
on "public"."learning_lesson"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM learning
  WHERE ((learning.id = learning_lesson.course_id) AND (auth.uid() = learning."user")))));


create policy "Enable read access for all users"
on "public"."learning_lesson"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM learning
  WHERE ((learning.id = learning_lesson.course_id) AND (auth.uid() = learning."user")))));


create policy "Enable update for users based on user id"
on "public"."learning_lesson"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM learning
  WHERE ((learning.id = learning_lesson.course_id) AND (auth.uid() = learning."user")))))
with check ((EXISTS ( SELECT 1
   FROM learning
  WHERE ((learning.id = learning_lesson.course_id) AND (auth.uid() = learning."user")))));


create policy "Enable insert access for all users"
on "public"."newsletter"
as permissive
for insert
to public
with check (true);


create policy "Public profiles are viewable by user only."
on "public"."profiles"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.last_url FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.learning_lesson FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


