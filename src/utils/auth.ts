import { createClient, User } from '@supabase/supabase-js';
import moment from 'moment';
export type { User } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);

export const getUser = async (): Promise<User | null> => {
  if (
    typeof sessionStorage !== 'undefined' &&
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('access_token')
  ) {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      return null;
    }

    const expires_at = localStorage.getItem('expires_at');
    if (moment().isAfter(moment(expires_at))) {
      return null;
    }

    if (sessionStorage.getItem('user')) {
      const userStr = sessionStorage.getItem('user') as string;
      return JSON.parse(userStr);
    }

    try {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser(access_token);

      //user_metadata
      if (error?.status === 401) {
        logout();
        return null;
      }

      if (!user || user.role !== 'authenticated') {
        return null;
      }

      const {
        data: userData,
        error: userError,
        status
      } = await supabase.from('profiles').select(`*`).single();

      user.user_metadata = userData;
      sessionStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.log('error getUser', error);
    }
  }
  return null;
};

export const logout = async (dbLogout = false) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('user');
  try {
    dbLogout ? await supabase.auth.signOut() : null;
  } catch (error) {}
};

// export async function isLoggedIn(req: Request) {
//   return (await getUser(req)) != null;
// }
