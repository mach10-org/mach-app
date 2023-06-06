export type { User } from '@supabase/supabase-js';

export interface TokenObj {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}
