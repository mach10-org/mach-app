<template>
  <section class="flex flex-col min-h-[60vh] pt-16 pb-10 lg:pt-20 px-2">
    <div class="max-w-[450px] mx-auto">
      <div
        class="flex flex-col items-center justify-center p-6 bg-background-base border border-border-input rounded-lg space-y-4 md:space-y-6"
      >
        <h2 class="text-xl font-bold text-text-title">
          Signup to create an account, it’s free and you can track your progress
          over time
        </h2>
        <h3 class="text-base">
          To log in, or register. Use the form below to get a magic link to your
          email.
        </h3>
        <form class="w-full" @submit.prevent="handleSendLink">
          <OField label="Email">
            <OInput
              ref="input"
              type="email"
              name="email"
              v-model="email"
              size="large"
              required
            />
          </OField>

          <OButton
            variant="primary"
            @click="handleSendLink"
            :disabled="!canSubmit || status.isLoading"
            expanded
            size="large"
          >
            <svg
              v-if="status.isLoading"
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-2 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Send magic link
          </OButton>
          <div v-if="status.error" class="text-sm text-red-400 text-center mt-4">
            {{ status.error }}
          </div>
          <div v-if="status.success" className="text-sm text-green-600 text-center mt-4">
            An email should arrive in your inbox shortly ! <br />
            {{ email }}
          </div>
        </form>
      </div>
      <p class="text-center my-8 text-text-muted">OR</p>
      <div class="px-6">
        <a
          class="github-login"
          :href="`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`"
        >
          <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              fill="currentColor"
            />
          </svg>
          <span class="ml-2">Login with GitHub</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField } from '@oruga-ui/oruga-next';
import { signinOrUp } from '@stores/auth';
import { computed, onMounted, ref } from 'vue';
import { supabase } from '@utils/supabase';

const email = ref('');

const client_id = "TODO";
const redirect_uri = "TODO";

const status = ref({ error: '', success: false, isLoading: false });
const canSubmit = computed(() => email.value.trim() !== '');
const { BASE_URL, PUBLIC_SUPABASE_REDIRECT_URL } = import.meta.env;

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') {
    window.location.assign(`${BASE_URL}`);
  }
});

const handleSendLink = async (e) => {
  e.preventDefault();

  status.value = { error: '', success: false, isLoading: true };

  try {
    const { error, data } = await signinOrUp(email.value, PUBLIC_SUPABASE_REDIRECT_URL);

    if (error?.message) {
      status.value = {
        error: error.message,
        success: false,
        isLoading: false
      };
    } else {
      status.value = { error: '', success: true, isLoading: false };
    }
  } catch (error) {
    console.log('ERROR', error);
  }
};

const input = ref(null);

onMounted(() => {
  if (input.value) {
    // @ts-ignore
    input.value.focus();
  }
});
</script>

<style lang="postcss">
.github-login {
  background-color: #171515;

  @apply rounded px-3 flex uppercase text-white no-underline items-center h-[47px] font-medium justify-center text-lg transition-opacity hover:opacity-80;

  svg {
    @apply w-6 h-6;
  }
}
</style>
