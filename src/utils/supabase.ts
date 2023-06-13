import { Database } from '@models/supabase';
import { SupabaseClientOptions, createClient } from '@supabase/supabase-js';

const options: SupabaseClientOptions<'public'> = {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};

export const supabase = createClient<Database>(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_KEY, options);
