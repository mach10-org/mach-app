<template>
  <form action="#" class="space-y-8">
    <div>
      <OField labelFor="email">
        <template #label> Your email address <span class="text-xs text-gray-500">(So we can reply to you)</span> </template>
        <OInput placeholder="" type="email" name="contact[email]" id="email" required />
      </OField>
    </div>
    <div>
      <OField labelFor="topic" label="Topic">
        <OSelect id="topic" name="contact[topic]" placeholder="Select a topic" size="medium">
          <option value="US">I have a question</option>
          <option value="CA">I'd like to offer help</option>
          <option value="FR">I have an issue with my account</option>
        </OSelect>
      </OField>
    </div>
    <div>
      <OField labelFor="subject" label="Subject">
        <OInput placeholder="Let us know how we can help you" type="text" name="contact[subject]" id="subject" required />
      </OField>
    </div>
    <div class="sm:col-span-2">
      <OField labelFor="message" label="Your message"> <OInput rows="5" placeholder="Leave a comment..." type="textarea" name="contact[message]" id="message" required /> </OField>
    </div>
    <div>
      <OButton type="submit" variant="primary" name="contact_submit">Send message</OButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField, OSelect } from '@oruga-ui/oruga-next';
</script>
