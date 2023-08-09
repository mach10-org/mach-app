<template>
  <NaiveConfig :theme-config="themeConfig">
    <n-message-provider>
      <SeoKit />
      <NuxtLayout class="root rootdark">
        <Navbar />
        <NuxtPage />
        <Footer />
      </NuxtLayout>
    </n-message-provider>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'
</script>
