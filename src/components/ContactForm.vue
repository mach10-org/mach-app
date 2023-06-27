<template>
  <form @submit.prevent="submit" class="form">
    <OField labelFor="name" :label="localContact.form_nameLabel">
      <OInput placeholder="" type="text" name="name" id="name" v-model="name" required />
    </OField>
    <OField labelFor="email">
      <template #label>
        {{ localContact.form_emailLabel }}
        <span class="text-xs text-text-muted">{{ localContact.form_emailSublabel }}</span>
      </template>
      <OInput placeholder="" type="email" name="email" id="email" v-model="email" required />
    </OField>
    <OField labelFor="topic" :label="localContact.form_topicLabel">
      <OSelect id="topic" v-model="topic" :placeholder="localContact.form_topicPlaceholder" expanded>
        <option v-for="(value, index) in localContact.form_topicList" :value="value">{{ value }}</option>
      </OSelect>
    </OField>
    <OField labelFor="  " :label="localContact.form_subjectLabel">
      <OInput :placeholder="localContact.form_subjecPlaceholder" type="text" name="subject" v-model="subject" id="subject" required />
    </OField>
    <OField labelFor="message" :label="localContact.form_messageLabel">
      <OInput rows="5" :placeholder="localContact.form_messagePlaceholder" type="textarea" name="message" v-model="message" id="message" required />
    </OField>

    <OButton variant="primary" size="large" type="submit" @click="submit" :disabled="!isValid || status.isLoading" expanded>
      <Spinner v-if="status.isLoading" :size="6" color="white" fill="primary" class="fill-primary" />
      {{ localContact.submit }}
    </OButton>
  </form>
</template>

<script lang="ts" setup>
import { erroMsg, locales } from '@constants/localize';
import { OButton, OInput, OField, OSelect } from '@oruga-ui/oruga-next';
import Spinner from '@components/svg/Spinner.vue';
import { computed, ref } from 'vue';
import { supabase } from '@utils/supabase';
import { validateEmail } from '@utils/index';
import { showToast } from '@utils/notify';
const {
  pages: { contact: localContact },
  notifications: { contact: localNotif }
} = locales;

const name = ref('');
const email = ref('');
const subject = ref('');
const topic = ref('');
const message = ref('');
const status = ref({ error: '', success: false, isLoading: false });
const isValid = computed(() => name.value !== '' && email.value !== '' && validateEmail(email.value) && subject.value !== '' && message.value !== '');

const submit = async (e: Event) => {
  e.preventDefault();
  status.value = { error: '', success: false, isLoading: true };
  try {
    const body = { subject: subject.value, email: email.value, name: name.value, message: message.value, topic: topic.value };
    const { data, error } = await supabase.functions.invoke<any>('send-contact-email', { body });
    if (error || data?.code) {
      throw new Error(error?.message || data.message);
    }
    status.value = { error: '', success: true, isLoading: false };
    name.value = '';
    email.value = '';
    subject.value = '';
    topic.value = '';
    message.value = '';
    showToast({ status: 'success', text: localNotif.email_sent });
  } catch (error) {
    status.value = { error: '', success: false, isLoading: false };
    showToast({ status: 'error', text: erroMsg(error?.code) });
  }
};
</script>
