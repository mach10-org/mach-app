create table "public"."learning_lesson" (
    "created_at" timestamp with time zone not null default now(),
    "slug" text not null,
    "slug_course" text not null,
    "user_id" uuid not null
);


alter table "public"."learning_lesson" enable row level security;

CREATE UNIQUE INDEX learning_lesson_pkey ON public.learning_lesson USING btree (slug, slug_course, user_id);

alter table "public"."learning_lesson" add constraint "learning_lesson_pkey" PRIMARY KEY using index "learning_lesson_pkey";

alter table "public"."learning_lesson" add constraint "learning_lesson_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."learning_lesson" validate constraint "learning_lesson_user_id_fkey";

create policy "Crud authentificated"
on "public"."learning_lesson"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



