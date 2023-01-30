import { createClient, Session, User } from '@supabase/supabase-js';
import moment from 'moment';
export type { User } from '@supabase/supabase-js';

export interface Profile {
  id?: string;
  updated_at?: Date;
  username?: string;
  xp?: number;
}
interface TokenObj {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

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

    const expires_at_str = localStorage.getItem('expires_at');
    const expires_at = expires_at_str ? parseInt(expires_at_str, 10) : null;

    if (moment().isAfter(moment(expires_at))) {
      return null;
    }

    const userProfile = getUserProfile();

    if (userProfile) {
      return userProfile;
    }

    try {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser(access_token);
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
      saveUserProfile(user);

      return user;
    } catch (error) {
      console.log('error getUser', error);
    }
  }
  return null;
};

export const upsertProfile = async (profile: Profile) => {
  try {
    const { data, error } = await supabase.from('profiles').upsert(profile).select().single();

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
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

export const saveToken = ({ access_token, expires_in, refresh_token }: TokenObj) => {
  let d = new Date();
  d = new Date(d.getTime() + parseInt(expires_in) * 1000);
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_in', expires_in);
  localStorage.setItem('expires_at', `${d.getTime()}`);
  localStorage.setItem('refresh_token', refresh_token);
};

export const saveUserProfile = (user: User | undefined) => {
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUserProfile = () => {
  if (sessionStorage.getItem('user')) {
    const userStr = sessionStorage.getItem('user') as string;
    return JSON.parse(userStr);
  }
  return null;
};

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
