<template>
  <NaiveConfig :theme-config="themeConfig">
    <SeoKit />
    <!-- <n-global-style /> -->
    <NuxtLayout class="root rootdark">
      <Navbar />
      <NuxtPage />
      <Footer />
    </NuxtLayout>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'
</script>
