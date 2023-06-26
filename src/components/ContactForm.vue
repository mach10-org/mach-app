<template>
  <form action="#" class="form">
    <OField labelFor="email">
      <template #label>
        {{ localContact.form_emailLabel }}
        <span class="text-xs text-text-muted">{{ localContact.form_emailSublabel }}</span>
      </template>
      <OInput placeholder="" type="email" name="contact[email]" id="email" required />
    </OField>
    <OField labelFor="topic" :label="localContact.form_topicLabel">
      <OSelect id="topic" v-model="topic" :placeholder="localContact.form_topicPlaceholder" expanded>
        <option value="US">I have a question</option>
        <option value="CA">I'd like to offer help</option>
        <option value="FR">I have an issue with my account</option>
      </OSelect>
    </OField>
    <OField labelFor="subject" :label="localContact.form_subjectLabel">
      <OInput :placeholder="localContact.form_subjecPlaceholder" type="text" name="contact[subject]" id="subject" required />
    </OField>
    <OField labelFor="message" :label="localContact.form_messageLabel">
      <OInput rows="5" :placeholder="localContact.form_messagePlaceholder" type="textarea" name="contact[message]" id="message" required />
    </OField>
    <OButton type="submit" variant="primary" name="contact_submit">{{ localContact.submit }}</OButton>
  </form>
</template>

<script lang="ts" setup>
import { locales } from '@constants/localize';
import { OButton, OInput, OField, OSelect } from '@oruga-ui/oruga-next';
import { ref } from 'vue';
const {
  pages: { contact: localContact }
} = locales;

const topic = ref('');
</script>
