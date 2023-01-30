import { atom, action } from 'nanostores';

import { User } from '@utils/auth';
export const isConnected = atom(false);
export const profile = atom<User | null>(null);

export const increasePoints = action(profile, 'increasePoints', (store, add) => {
  const user = store.get();
  if (user?.user_metadata) {
    user.user_metadata.xp = user.user_metadata.xp + add;
  }
  return store.get();
});
