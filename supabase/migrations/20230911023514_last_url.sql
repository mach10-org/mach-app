alter table "public"."last_url" add constraint "last_url_id_fkey" FOREIGN KEY (id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."last_url" validate constraint "last_url_id_fkey";


