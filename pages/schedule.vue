<template>
  <div class="mx-auto mt-4 min-h-[60vh] max-w-screen-lg bg-$background-base p-4 lg:mt-8 lg:p-6">
    <h1 class="mb-4 text-center text-2xl lg:mb-8 md:text-4xl">
      <span class="from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text font-extrabold text-transparent">{{ $t('pages.schedule.title') }}</span>
    </h1>

    <ClientOnly>
      <div class="space-y-12">
        
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>
