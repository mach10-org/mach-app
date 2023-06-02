<template>
  <form action="#" :class="classes">
    <div class="flex items-center mb-3">
      <div class="relative flex-1 mr-3">
        <label :for="inputId" class="sr-only">{{ label }}</label>
        <OInput
          :placeholder="placeholder"
          type="email"
          name="member[email]"
          :id="inputId"
          required
          size="large"
        />
      </div>
      <OButton
        type="submit"
        variant="primary"
        size="large"
        name="member_submit"
        >{{ buttonText }}</OButton
      >
    </div>
    <div class="text-sm text-left text-text-base">
      {{ description }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { OButton, OInput } from "@oruga-ui/oruga-next";

defineProps({
  label: String,
  placeholder: String,
  buttonText: String,
  description: String,
  inputId: String,
  classes: String,
});
</script>
