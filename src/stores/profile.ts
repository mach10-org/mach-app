import { action, map } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { User } from '@utils/auth';
import { UserAppMetadata } from '@supabase/supabase-js';
import { supabase } from '@utils/supabase';
import { Database } from '@models/supabase';

export type DatabaseRowProfile = Database['public']['Tables']['profiles']['Row'];

export interface Profile extends DatabaseRowProfile {}

const primitive = {
  encode: JSON.stringify,
  decode: JSON.parse
};
export const isConnected = persistentAtom<boolean>('isConnected', false, primitive);
export const profile = persistentAtom<User | null>('user', null, primitive);

const defaultProfile = {
  full_name: '',
  gender: '',
  education: '',
  dob: null,
  computer_xp: '',
  goal: [],
  about: '',
  avatar_url: '',
  id: '',
  xp: 0,
  updated_at: null,
  username: null,
  devices: [],

  ...profile.get()?.user_metadata
};

export const profileData = map<Profile>(defaultProfile);

export const increasePoints = action(profile, 'increasePoints', (store, add) => {
  const user = store.get();

  if (user?.user_metadata) {
    // user.user_metadata.xp = user.user_metadata.xp + add;
    user.user_metadata.xp = add;
  }
  return store.get();
});

export const removeUser = action(profile, 'removeUser', (store) => {
  isConnected.set(false);
  store.set(null);
  return store.get();
});

export const setUser = action(profile, 'setUser', (store, user: User) => {
  store.set(user);
  isConnected.set(true);
  return store.get();
});

export const updateUser = action(profile, 'updateUser', (store, data: UserAppMetadata) => {
  const user = profile.get();
  if (user) {
    user.user_metadata = data;
    store.set({ ...user });
  }

  return store.get();
});

export const upsertProfile = async (profile: Profile) => {
  try {
    const { data, error } = await supabase.from('profiles').upsert(profile).select().single();

    if (!error) {
      updateUser(data);
    }
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const goalChoices = async (): Promise<string[]> => {
  try {
    const { data: goals, error } = await supabase.from('goals').select('label').eq('active', true);

    return goals?.map((g) => g.label) || [];
  } catch (error) {
    return [];
  }
};
