import { action } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';
import moment from 'moment';
import { User } from '@utils/auth';
import { profile, setUser, removeUser } from './profile';
import { supabase } from '@utils/supabase';

export type JwToken = {
  expires_in: string | undefined;
  expires_at: string | undefined;
  refresh_token: string | undefined;
  access_token: string | undefined;
};

export interface NewToken {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

const defaultTokenValues = {
  expires_in: undefined,
  expires_at: undefined,
  refresh_token: undefined,
  access_token: undefined
};

export const token = persistentMap<JwToken>('jwtoken:', defaultTokenValues);

export const saveToken = action(token, 'token', (store, data: NewToken) => {
  const newToken = getNewToken(data);
  store.set(newToken);
  return store.get();
});

export const deleteToken = action(token, 'deleteToken', (store) => {
  store.set(defaultTokenValues);
  return store.get();
});

export const getNewToken = ({ access_token, expires_in, refresh_token }: NewToken) => {
  let d = new Date();
  d = new Date(d.getTime() + parseInt(expires_in) * 1000);
  const expires_at = `${d.getTime()}`;
  return { access_token, expires_in, refresh_token, expires_at };
};

export const logout = async (dbLogout = false) => {
  deleteToken();
  removeUser();
  try {
    dbLogout ? await supabase.auth.signOut() : null;
  } catch (error) {}
};

export const getUser = async (): Promise<User | null> => {
  const tokenData = token.get();
  const { access_token, expires_at: expires_at_str } = tokenData;

  if (!access_token) {
    return null;
  }

  const expires_at = expires_at_str ? parseInt(expires_at_str, 10) : null;

  if (expires_at && moment().isAfter(moment(expires_at))) {
    const userProfile = await refreshToken();
    return userProfile;
  }

  const userProfile = profile.get();

  if (userProfile) {
    return userProfile;
  }

  const userWidtProfileData = await fetchUser(access_token);
  return userWidtProfileData;
};

export const fetchUser = async (access_token: string) => {
  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser(access_token);
    if (error?.status === 401) {
      // logout();
      return null;
    }
    if (!user || user.role !== 'authenticated') {
      return null;
    }
    const userWidtProfileData = await getProfile(user);
    return userWidtProfileData;
  } catch (error) {
    return null;
  }
};

export const getProfile = async (user: User) => {
  try {
    const { data, error, status } = await supabase.from('profiles').select(`*`).single();
    // const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

    if (data) {
      user.user_metadata = data;
    }
    setUser(user);
  } catch (error) {}

  return user;
};

export const refreshToken = async () => {
  let userWidtProfileData: User | null = null;
  try {
    const { data, error } = await supabase.auth.refreshSession();
    const { session, user } = data;
    if (error) {
      throw error;
    }
    if (session) {
      const { access_token, expires_in, refresh_token } = session;
      saveToken({ access_token, expires_in: `${expires_in}`, refresh_token });
      if (user) {
        userWidtProfileData = await getProfile(user);
      }
    }
    return userWidtProfileData;
  } catch (error) {
    return null;
  }
};

export const signinOrUp = async (email: string, emailRedirectTo: string) => {
  try {
    const response = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { username: '' },
        emailRedirectTo
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
