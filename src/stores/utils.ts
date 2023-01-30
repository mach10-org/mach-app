import { persistentMap } from '@nanostores/persistent';

export type SettingsValue = {
  sidebar: 'show' | 'hide';
  theme: 'dark' | 'light' | 'auto';
};

export const settings = persistentMap<SettingsValue>('settings:', {
  sidebar: 'show',
  theme: 'auto'
});
