<template>
  <NaiveConfig :theme-config="themeConfig">
    <SeoKit />
    <NuxtLayout class="root rootdark">
      <div class="min-h-[60vh] flex flex-col items-center pt-20 lg:px-32 sm:px-8 xl:px-64 lg:pt-28">
        <h1 class="mb-4 from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text text-6xl font-extrabold leading-none tracking-tight text-$text-title text-transparent md:text-7xl xl:text-8xl">
          {{ error?.statusCode }}
        </h1>
        <h2 class="text-2xl font-semibold leading-none tracking-tight text-$text-title md:text-3xl xl:text-4xl">
          {{ error?.message }}
        </h2>
        <pre v-if="$config.public.platform !== 'prod'">{{ error?.description }}</pre>
        <pre v-if="$config.public.platform !== 'prod'">{{ error?.data }}</pre>
      </div>
    </NuxtLayout>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'

defineProps({
  error: Object,
})
</script>
