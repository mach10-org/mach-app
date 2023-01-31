import { createClient } from '@supabase/supabase-js';
export type { User } from '@supabase/supabase-js';

interface TokenObj {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);
