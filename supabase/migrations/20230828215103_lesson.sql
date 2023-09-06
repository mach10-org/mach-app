drop trigger if exists "handle_updated_at" on "public"."learning_lesson";

drop policy "Enable delete for users based on user_id" on "public"."learning";

drop policy "Enable insert for authenticated users only" on "public"."learning";

drop policy "Enable read access for user based on user uuid" on "public"."learning";

drop policy "Enable update for users based on user uuid" on "public"."learning";

drop policy "Enable delete for users based on user_id" on "public"."learning_lesson";

drop policy "Enable insert for authenticated users only and by user id" on "public"."learning_lesson";

drop policy "Enable read access for all users" on "public"."learning_lesson";

drop policy "Enable update for users based on user id" on "public"."learning_lesson";

alter table "public"."learning_lesson" drop constraint "learning_lesson_course_id_fkey";

alter table "public"."learning_lesson" drop constraint "learning_lesson_id_key";

alter table "public"."learning_lesson" drop constraint "unique_slug_course_id";

alter table "public"."learning_lesson" drop constraint "learning_lesson_pkey";

drop index if exists "public"."learning_lesson_id_key";

drop index if exists "public"."learning_lesson_pkey";

drop table "public"."learning_lesson";

alter table "public"."learning" drop constraint "learning_id_key";

alter table "public"."learning" drop constraint "learning_user_fkey";

alter table "public"."learning" drop constraint "unique_user_slug";

alter table "public"."learning" drop constraint "learning_pkey";

drop index if exists "public"."learning_id_key";

drop index if exists "public"."learning_pkey";

drop index if exists "public"."unique_slug_course_id";

drop index if exists "public"."unique_user_slug";

drop table "public"."learning";



