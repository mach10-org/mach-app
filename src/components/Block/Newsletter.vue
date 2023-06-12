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
import { computed, onMounted, ref } from 'vue';

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
  try {
    const { data, error } = await supabase.from('newsletter').insert({ email: email.value });
  } catch (error) {}
};
</script>
