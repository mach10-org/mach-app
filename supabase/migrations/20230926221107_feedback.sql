create table "public"."feedback" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "user_id" uuid,
    "enjoyment_rate" integer not null,
    "difficulty_rate" integer not null,
    "comment" character varying
);


alter table "public"."feedback" enable row level security;

CREATE UNIQUE INDEX feedback_pkey ON public.feedback USING btree (id);

alter table "public"."feedback" add constraint "feedback_pkey" PRIMARY KEY using index "feedback_pkey";

alter table "public"."feedback" add constraint "feedback_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE SET NULL not valid;

alter table "public"."feedback" validate constraint "feedback_user_id_fkey";

create policy "Enable insert access for all users"
on "public"."feedback"
as permissive
for insert
to public
with check (true);



