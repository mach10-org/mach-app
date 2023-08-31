drop policy "Enable delete for users based on user_id" on "public"."answers";

drop policy "Enable select for authenticated users only" on "public"."answers";

drop policy "Enable update for users based on user uuid" on "public"."answers";

alter table "public"."answers" drop constraint "answers_user_fkey";

alter table "public"."answers" drop column "course_slug";

alter table "public"."answers" drop column "success";

alter table "public"."answers" drop column "title";

alter table "public"."answers" drop column "user";

alter table "public"."answers" add column "is_correct" boolean not null;

alter table "public"."answers" add column "label" text not null default ''::text;

alter table "public"."answers" add column "slug" text not null default ''::text;

alter table "public"."answers" add column "slug_course" text not null default ''::text;

alter table "public"."answers" add column "user_id" uuid;

alter table "public"."answers" alter column "created_at" set not null;

alter table "public"."answers" add constraint "answers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."answers" validate constraint "answers_user_id_fkey";

create policy "Enable delete for users based on user_id"
on "public"."answers"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "Enable select for authenticated users only"
on "public"."answers"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for users based on user uuid"
on "public"."answers"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



