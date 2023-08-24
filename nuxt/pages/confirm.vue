<template>
  <!-- TODO better design -->
  <!-- TODO handle error ?error=invalid_request&error_code=400&error_description=No+associated+flow+state+found.+400:+Flow+state+is+expired#error=invalid_request&error_code=400&error_description=No+associated+flow+state+found.+400%253A+Flow+state+is+expired -->
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'

const user = useSupabaseUser()

const profile = useProfileStore()
profile.isLoading = true

const isLoading = computed(() => profile.isLoading)

watch(user, async () => {
  if (user.value) {
    await until(isLoading).toBe(false)

    if (profile.isOnBoarded) {
      // TODO show message welcome back
      return navigateTo('/')
    } else {
      return navigateTo('/onboarding')
    }
  }
}, { immediate: true })
</script>
