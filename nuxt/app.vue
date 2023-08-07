<template>
  <NaiveConfig :theme-config="themeConfig">
    <SeoKit />
    <!-- <n-global-style /> -->
    <Navbar />
    <NuxtPage />
    <Footer />
  </NaiveConfig>
</template>

<script setup lang="ts">
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'
</script>
