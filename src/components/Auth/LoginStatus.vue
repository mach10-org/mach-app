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
      class="absolute min-w-[12rem] inset-auto -translate-y-2 -translate-x-20 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      id="user-dropdown"
      :class="{ hidden: !showMenu }"
    >
      <LoginStatusMenu />
    </div>
  </div>

  <OButton v-else id="isNotLoggedIn" tag="a" :href="`${BASE_URL}login/`" class="mr-5" variant="primary"> Login </OButton>
</template>
<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { getUser, logout } from '@stores/auth';
import { isConnected, removeUser } from '@stores/profile';
import { useStore } from '@nanostores/vue';
import { onSet } from 'nanostores';
import { onMounted, ref } from 'vue';
import { OButton } from '@oruga-ui/oruga-next';
import LoginStatusMenu from './LoginStatusMenu.vue';
import { getCourseTaken } from '@stores/courses';
const $isConnected = useStore(isConnected);
const BASE_URL = import.meta.env.BASE_URL;
const showMenu = ref(false);

onMounted(async () => {
  try {
    const user = await getUser();

    if (user) {
      getCourseTaken(user.id);
    } else {
      logout();
    }
  } catch (error) {}
});
</script>
