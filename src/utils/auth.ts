import { createClient } from '@supabase/supabase-js';
import moment from 'moment';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);

// export async function getUser(req: Request) {
//   const c = cookie.parse(req.headers.get('cookie') ?? '');
//   if (!c.sbat) {
//     return null;
//   }

//   const {
//     data: { user }
//   } = await supabase.auth.getUser(c.sbat);
//   if (!user || user.role !== 'authenticated') {
//     return null;
//   }
//   return user;
// }

export const getUser = async () => {
  console.log('getUser TS');

  if (
    typeof sessionStorage !== 'undefined' &&
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('access_token')
  ) {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      return null;
    }

    const expires_in = localStorage.getItem('expires_in');
    if (moment().isAfter(moment(expires_in))) {
      return null;
    }

    if (sessionStorage.getItem('user')) {
      const userStr = sessionStorage.getItem('user') as string;
      return JSON.parse(userStr);
    }

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser(access_token);

      if (!user || user.role !== 'authenticated') {
        return null;
      }
      sessionStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {}
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('user');
};

// export async function isLoggedIn(req: Request) {
//   return (await getUser(req)) != null;
// }
