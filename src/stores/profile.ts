import { atom, action } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

import { User } from '@utils/auth';
const primitive = {
  encode: JSON.stringify,
  decode: JSON.parse
};
export const isConnected = persistentAtom<boolean>('isConnected', false, primitive);
export const profile = persistentAtom<User | null>('user', null, primitive);
// export const profile = atom<User | null>(null);

export const increasePoints = action(profile, 'increasePoints', (store, add) => {
  const user = store.get();
  if (user?.user_metadata) {
    user.user_metadata.xp = user.user_metadata.xp + add;
  }
  return store.get();
});

export const removeUser = action(profile, 'remove', (store) => {
  isConnected.set(false);
  store.set(null);
  return store.get();
});
