<template>
  <div id="isLoggedIn" v-if="$isConnected">
    <button
      type="button"
      class="ml-5 rounded-full p-2.5 text-center inline-flex items-center mr-2 focus:ring-4 bg-gray-800 focus:ring-gray-300 dark:focus:ring-gray-600"
      id="user-menu-button"
      aria-expanded="false"
      data-dropdown-toggle="user-dropdown"
      data-dropdown-placement="bottom"
      @click="showMenu = !showMenu"
    >
      <span class="sr-only">Open user menu</span>
      <UserCircleIcon class="h-6 h-6 text-gray-100" />
    </button>
    <!-- Dropdown menu -->

    <div
      class="absolute min-w-[12rem] -translate-y-2 -translate-x-20 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      id="user-dropdown"
      :class="{ hidden: !showMenu }"
    >
      <div class="px-4 py-3">
        <span id="userName" class="block text-sm text-gray-900 dark:text-white">{{
          $profile?.email
        }}</span>
        <span
          id="xpPoints"
          class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
          >{{ $profile?.user_metadata?.xp }} Points</span
        >
      </div>
      <ul class="py-2" aria-labelledby="user-menu-button">
        <li>
          <a
            :href="`${BASE_URL}profile/`"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Profil</a
          >
        </li>
        <li>
          <button
            id="logout"
            class="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            type="button"
            @click="handleLogoutClick"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </div>

  <a
    v-else
    id="isNotLoggedIn"
    :href="`${BASE_URL}login/`"
    class="mr-5 menu-item text-center py-2.5 px-6 text-purple-700 rounded-md border hover:text-white border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
  >
    Login
  </a>
</template>
<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { getUser, logout } from '@utils/auth';
import { isConnected, profile } from '@stores/profile';
import { useStore } from '@nanostores/vue';
import { onMounted, ref } from 'vue';
const $isConnected = useStore(isConnected);
const $profile = useStore(profile);
const BASE_URL = import.meta.env.BASE_URL;
const showMenu = ref(false);

onMounted(async () => {
  try {
    const user = await getUser();
    if (user !== null) {
      profile.set(user);
      isConnected.set(true);
    }
  } catch (error) {}
});

const handleLogoutClick = () => {
  logout();
  window.location.assign(`${import.meta.env.BASE_URL}`);
};
</script>
