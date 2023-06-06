<template>
  <div class="px-4 py-3">
    <span id="userName" class="block text-sm text-gray-900 dark:text-white">{{ $profile?.email }}</span>
    <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ $profile?.user_metadata?.xp }} Points</span>
  </div>
  <ul class="py-2" aria-labelledby="user-menu-button">
    <li>
      <a :href="`${BASE_URL}profile/`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profil</a>
    </li>
    <li>
      <button class="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" type="button" @click="handleLogoutClick">
        Sign out
      </button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { logout } from '@stores/auth';
import { profile, removeUser } from '@stores/profile';
import { useStore } from '@nanostores/vue';
const $profile = useStore(profile);
const BASE_URL = import.meta.env.BASE_URL;

const handleLogoutClick = () => {
  logout();
  removeUser();
  window.location.assign(`${BASE_URL}`);
};
</script>
