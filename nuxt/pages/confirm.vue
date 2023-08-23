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
  <!-- TODO handle error ?error=invalid_request&error_code=400&error_description=No+associated+flow+state+found.+400:+Flow+state+is+expired#error=invalid_request&error_code=400&error_description=No+associated+flow+state+found.+400%253A+Flow+state+is+expired -->
  <div>Waiting for login...</div>
</template>
