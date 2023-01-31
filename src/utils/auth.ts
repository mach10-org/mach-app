import { createClient, Session, User } from '@supabase/supabase-js';
import moment from 'moment';
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
/*
export const refreshSession = async () => {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');

  if (access_token && refresh_token) {
    try {
      const { data, error } = await supabase.auth.refreshSession({ refresh_token });
      const { session, user } = data;

      console.log('data', data);
      console.log('error', error);
    } catch (error) {}
  }
};
*/
