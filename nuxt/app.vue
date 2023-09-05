<template>
  <NaiveConfig :theme-config="themeConfig">
    <SeoKit />
    <NuxtLayout class="root rootdark">
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'
import { useProfileStore } from '~/stores/profile'

const user = useSupabaseUser()
const profile = useProfileStore()

watch(user, (val) => {
  if (val) {
    profile.fetch()
  } else {
    profile.reset()
  }
}, { immediate: true })
</script>
