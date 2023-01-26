<template>{{ JSON.stringify(props, null, 2) }},</template>

<script lang="ts" setup>
const props = defineProps({
  label: { type: String, required: true },
  isAnswer: Boolean,
  xp: String,
  explain: String
});
</script>
