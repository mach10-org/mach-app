<template>
  <section class="flex flex-col min-h-[60vh] pt-16 pb-10 lg:pt-20 px-2">
    <div class="max-w-[450px] mx-auto">
      <div class="flex flex-col items-center justify-center p-6 bg-background-base border border-border-input rounded-lg space-y-4 md:space-y-6">
        <h2 class="text-xl font-bold text-text-title">Signup to create an account, it’s free and you can track your progress over time</h2>
        <h3 class="text-base">To log in, or register. Use the form below to get a magic link to your email.</h3>
        <form class="w-full" @submit.prevent="handleSendLink">
          <OField label="Email">
            <OInput ref="input" type="email" name="email" v-model="email" size="large" required />
          </OField>

          <OButton variant="primary" @click="handleSendLink" :disabled="!canSubmit || status.isLoading" expanded size="large">
            <Spinner v-if="status.isLoading" :size="6" color="white" fill="primary" class="fill-primary" />
            Send magic link
          </OButton>
        </form>
      </div>
      <p class="text-center my-8 text-text-muted">OR</p>
      <div class="px-6">
        <button class="github-login" @click="signInWithGitHub" :disabled="statusOAuth.isLoading">
          <Spinner v-if="statusOAuth.isLoading" :size="6" color="white" fill="blue-500" class="fill-blue-500" />
          <Github v-else />
          Login with GitHub
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField } from '@oruga-ui/oruga-next';
import { signInWithOAuth, signinOrUp } from '@stores/auth';
import { computed, ref } from 'vue';
import { supabase } from '@utils/supabase';
import { showToast } from '@utils/notify';
import { locales, erroMsg } from '@constants/localize';
import Spinner from '@components/svg/Spinner.vue';
import Github from '@components/svg/Github.vue';

const {
  notifications: { auth: localNotif }
} = locales;
const notifTitle = localNotif.title;

const email = ref('');
const status = ref({ error: '', success: false, isLoading: false });
const statusOAuth = ref({ error: '', success: false, isLoading: false });
const canSubmit = computed(() => email.value.trim() !== '');
const { BASE_URL, PUBLIC_SUPABASE_REDIRECT_URL } = import.meta.env;

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') {
    window.location.assign(`${BASE_URL}`);
  }
});

const signInWithGitHub = async (e: Event) => {
  e.preventDefault();
  statusOAuth.value = { error: '', success: false, isLoading: true };

  try {
    const { data, error } = await signInWithOAuth('github');
  } catch (error) {
    console.error('error', error);
  }
};

const handleSendLink = async (e: Event) => {
  e.preventDefault();
  status.value = { error: '', success: false, isLoading: true };

  try {
    const { error, data } = await signinOrUp(email.value, PUBLIC_SUPABASE_REDIRECT_URL);

    if (error?.message) {
      console.log('error', error);
      status.value = {
        error: error.message,
        success: false,
        isLoading: false
      };
      showToast({ status: 'error', text: `${error.message}`, title: notifTitle });
    } else {
      status.value = { error: '', success: true, isLoading: false };
      showToast({ status: 'success', text: `${localNotif.magic_link_sent} "${email.value}"`, title: notifTitle });
    }
  } catch (error) {
    console.log('ERROR', error);
    showToast({ status: 'error', text: `${erroMsg(error.code)}`, title: notifTitle });
  }
};

const input = ref(null);
</script>

<style lang="postcss">
.github-login {
  background-color: #171515;

  @apply rounded px-3 flex uppercase text-white no-underline items-center h-[47px] font-medium justify-center text-lg transition-opacity w-full hover:opacity-80;

  svg {
    @apply w-6 h-6 mr-2;
  }
}
</style>
