<template>
  <nuxt-link-locale to="/" class="flex items-center transition-opacity lg:mr-8 hover:opacity-80">
    <Icon name="maki:rocket" class="mr-1 text-2xl text-ctp-latte-maroon sm:text-3xl dark:text-ctp-frappe-red" />
    <span class="self-center whitespace-nowrap font-semibold super-text-gradient" :class="{ 'text-lg': size === 'sm' , 'text-xl': size === 'md' , 'text-2xl': size === 'lg' }">
      {{ $config.public.siteName }}
    </span>
  </nuxt-link-locale>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
})
</script>
