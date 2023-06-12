<template>
  <section class="flex items-start min-h-[60vh] pt-16 lg:pt-20 px-2">
    <div
      class="flex flex-col items-center justify-center p-6 mx-auto bg-background-base border border-border-input rounded-lg max-w-[450px] space-y-4 md:space-y-6"
    >
      <h2 class="text-xl font-bold text-text-title">
        Signup to create an account, it’s free and you can track your progress
        over time
      </h2>
      <h3 class="text-base">
        To log in, or register. Use the form below to get a magic link to your
        email.
      </h3>
      <form class="w-full">
        <OField label="Email">
          <OInput type="email" name="email" v-model="email" size="large" required />
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
        <div v-if="status.error" class="text-sm text-red-400">
          {{ status.error }}
        </div>
        <div v-if="status.success" className="text-sm text-green-600">
          An email should arrive in your inbox shortly ! <br />
          {{ email }}
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField } from "@oruga-ui/oruga-next";
import { signinOrUp } from "@stores/auth";
import { computed, ref } from "vue";
import { supabase } from "@utils/supabase";

const email = ref("");

const status = ref({ error: "", success: false, isLoading: false });
const canSubmit = computed(() => email.value.trim() !== "");
const { BASE_URL, PUBLIC_SUPABASE_REDIRECT_URL } = import.meta.env;

supabase.auth.onAuthStateChange((event, session) => {
  if (event == "SIGNED_IN") {
    window.location.assign(`${BASE_URL}`);
  }
});

const handleSendLink = async (e) => {
  e.preventDefault();

  status.value = { error: "", success: false, isLoading: true };

  try {
    const { error, data } = await signinOrUp(
      email.value,
      PUBLIC_SUPABASE_REDIRECT_URL
    );

    if (error?.message) {
      status.value = {
        error: error.message,
        success: false,
        isLoading: false,
      };
    } else {
      status.value = { error: "", success: true, isLoading: false };
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};
</script>
