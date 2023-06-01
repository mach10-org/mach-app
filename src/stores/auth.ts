import { atom, action } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent';
import moment from 'moment';
import { supabase, User } from '@utils/auth';
import { profile, setUser, removeUser } from './profile';
import { AuthResponse } from '@supabase/supabase-js';

export type JwToken = {
  expires_in: string | undefined;
  expires_at: string | undefined;
  refresh_token: string | undefined;
  access_token: string | undefined;
};
interface NewToken {
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

  if (moment().isAfter(moment(expires_at))) {
    return null;
  }

  const userProfile = profile.get();

  if (userProfile) {
    return userProfile;
  }
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

    const { data: userData, error: userError, status } = await supabase.from('profiles').select(`*`).single();

    if (userData) {
      user.user_metadata = userData;
    }
    setUser(user);

    return user;
  } catch (error) {
    console.log('error getUser', error);
  }

  return null;
};

export const signinOrUp = async (email: string, emailRedirectTo: string): Promise<AuthResponse> => {
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
