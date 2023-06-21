<template>
  <div id="isLoggedIn" v-if="$isConnected" class="relative ml-5 mr-2 p-2 flex">
    <button
      type="button"
      class="transition-colors p-0 rounded-full text-center inline-flex items-center focus:ring-4 focus:ring-link/70 focus:outline-none hover:text-link"
      id="user-menu-button"
      :aria-expanded="isOpen"
      aria-controls="user-dropdown"
      @click="isOpen = !isOpen"
    >
      <span class="sr-only">Open user menu</span>
      <img :src="avatar" class="block h-8 h-8 rounded-full" />
    </button>
    <!-- Dropdown menu -->
    <div
      v-show="isOpen"
      class="absolute min-w-[12rem] text-base right-0 top-full list-none bg-background-base divide-y divide-border-input rounded-lg shadow-lg border border-border-input mt-1 z-[100]"
      id="user-dropdown"
    >
      <LoginStatusMenu />
    </div>
  </div>

  <OButton v-else id="isNotLoggedIn" tag="a" :href="`${BASE_URL}login/`" class="mr-5" variant="primary"> Login </OButton>
</template>
<script lang="ts" setup>
import { getUser, logout } from '@stores/auth';
import { isConnected } from '@stores/profile';
import { useStore } from '@nanostores/vue';
import { onMounted, ref } from 'vue';
import { OButton } from '@oruga-ui/oruga-next';
import LoginStatusMenu from './LoginStatusMenu.vue';
import { getCourseTaken } from '@stores/courses';
import avatar from '@assets/img/avatar.png?url';
import { showToast } from '@utils/notify';
import { erroMsg, locales } from '@constants/localize';
import { getSessionStartDate, setSessionStartDate } from '@utils/index';
import { User } from '@supabase/supabase-js';

const {
  notifications: { user: localNotif }
} = locales;
const notifTitle = localNotif.title;
const $isConnected = useStore(isConnected);
const BASE_URL = import.meta.env.BASE_URL;
const isOpen = ref(false);

onMounted(async () => {
  try {
    const user = await getUser();
    if (user) {
      const redirectOptions = ['/onboarding/', '/profile/'];
      const { pathname } = window.location;
      console.log('pathname', pathname);

      const hasName = typeof user?.user_metadata?.full_name === 'string';
      if (!(user?.user_metadata?.updated_at && hasName) && !redirectOptions.includes(pathname)) {
        window.location.assign(`${BASE_URL}onboarding/`);
      } else {
        handleWelcomMessages(pathname, user);
        getCourseTaken(user.id);
      }
    } else {
      logout();
    }
  } catch (error) {}
});

const handleWelcomMessages = (pathname: string, user: User) => {
  const notofyPathCheck = '/courses/';
  const hasValue = getSessionStartDate();
  const allowedPath = notofyPathCheck === pathname || !pathname.includes(notofyPathCheck);
  const name = user.user_metadata.full_name;
  if (!hasValue && allowedPath) {
    //Welcome back message on any age but a course
    if (allowedPath) {
      showToast({ status: 'info', text: `${localNotif.welcome_back(name)}`, title: notifTitle });
    }
    setSessionStartDate();
  }
};
</script>
