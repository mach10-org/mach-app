import { persistentMap } from '@nanostores/persistent';
import { action } from 'nanostores';

export type SettingsValue = {
  sidebar: 'show' | 'hide';
  theme: 'dark' | 'light' | 'auto';
};

export const settings = persistentMap<SettingsValue>('settings:', {
  sidebar: 'show',
  theme: 'auto'
});

export const toggleTheme = action(settings, 'toggle', (store) => {
  const isDark = store.get().theme === 'dark';
  store.setKey('theme', !isDark ? 'dark' : 'light');

  return store.get();
});
