<template>
  <div class="px-4 py-3">
    <span id="userName" class="block text-sm text-text-title font-medium">{{ $profile?.email }}</span>
    <span class="block text-sm text-text-muted">{{ $profile?.user_metadata?.xp || 0 }} XP</span>
  </div>
  <ul class="py-2" aria-labelledby="user-menu-button">
    <li>
      <a :href="`${BASE_URL}journey/`" class="login-menu__item">Journey</a>
    </li>
    <li>
      <a :href="`${BASE_URL}profile/`" class="login-menu__item">Profile</a>
    </li>
    <li>
      <button class="login-menu__item" type="button" @click="handleLogoutClick">
        Sign out
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { logout } from '@stores/auth';
import { profile } from '@stores/profile';
import { useStore } from '@nanostores/vue';
const $profile = useStore(profile);
const BASE_URL = import.meta.env.BASE_URL;

const handleLogoutClick = async () => {
  await logout();
  window.location.assign(`${BASE_URL}`);
};
</script>

<style lang="postcss">
.login-menu__item {
  @apply transition-colors block text-left w-full px-4 py-2 text-sm text-link hover:bg-primary hover:text-white
}
</style>
