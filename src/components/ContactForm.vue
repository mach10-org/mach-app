<template>
  <form action="#" class="form">
    <OField labelFor="email">
      <template #label>
        Your email address
        <span class="text-xs text-text-muted">(So we can reply to you)</span>
      </template>
      <OInput
        placeholder=""
        type="email"
        name="contact[email]"
        id="email"
        required
      />
    </OField>
    <OField labelFor="topic" label="Topic">
      <OSelect
        id="topic"
        v-model="topic"
        placeholder="Select a topic"
        expanded
      >
        <option value="US">I have a question</option>
        <option value="CA">I'd like to offer help</option>
        <option value="FR">I have an issue with my account</option>
      </OSelect>
    </OField>
    <OField labelFor="subject" label="Subject">
      <OInput
        placeholder="Let us know how we can help you"
        type="text"
        name="contact[subject]"
        id="subject"
        required
      />
    </OField>
    <OField labelFor="message" label="Your message">
      <OInput
        rows="5"
        placeholder="Leave a comment..."
        type="textarea"
        name="contact[message]"
        id="message"
        required
      />
    </OField>
    <OButton type="submit" variant="primary" name="contact_submit"
      >Send message</OButton
    >
  </form>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField, OSelect } from "@oruga-ui/oruga-next";
import { ref } from "vue";

const topic = ref("")
</script>
