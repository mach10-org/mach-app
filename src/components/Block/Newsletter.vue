<template>
  <form @submit.prevent="handleSendMail" :class="classes">
    <div class="flex items-center mb-3">
      <div class="relative flex-1 mr-3">
        <label :for="inputId" class="sr-only">{{ label }}</label>
        <OInput ref="input" :placeholder="placeholder" type="email" name="email" :id="inputId" v-model="email" required size="large" class="bg-page" />
      </div>
      <OButton type="submit" @click="handleSendMail" variant="primary" size="large" name="member_submit">{{ buttonText }}</OButton>
    </div>
    <div class="text-sm text-left prose">
      <slot name="description" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { OButton, OInput } from '@oruga-ui/oruga-next';
import { supabase } from '@utils/supabase';
import { onMounted, ref } from 'vue';
import { showToast, notifyStatus } from '@utils/notify';
import { locales, erroMsg } from '@constants/localize';
import { validateEmail } from '@utils/index';

const {
  notifications: { newsletter: localNotif }
} = locales;

const props = defineProps({
  label: String,
  placeholder: String,
  buttonText: String,
  inputId: String,
  classes: String,
  focus: Boolean
});
const email = ref('');
const input = ref(null);

onMounted(() => {
  if (props.focus && input.value) {
    // @ts-ignore
    input.value.focus();
  }
});

const handleSendMail = async (e) => {
  e.preventDefault();
  if (!email.value) {
    return;
  }
  const notifTitle = localNotif.title;
  if (!validateEmail(email.value)) {
    showToast({ status: 'error', text: localNotif.not_valid_email, title: notifTitle });
    return;
  }
  try {
    const { error } = await supabase.from('newsletter').insert({ email: email.value });
    let status: notifyStatus = 'success';
    let msg = localNotif.email_saved;
    if (error?.code === '23505') {
      status = 'info';
      msg = erroMsg(parseInt(error.code));
    }
    showToast({ status, text: msg, title: notifTitle });
  } catch (error) {
    showToast({ status: 'error', text: erroMsg(error.code), title: notifTitle });
  }
};
</script>
