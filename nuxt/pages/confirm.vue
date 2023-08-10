<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>
<template>
  <!-- TODO better design -->
  <div>Waiting for login...</div>
</template>
