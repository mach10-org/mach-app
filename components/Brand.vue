<template>
  <nuxt-link to="/" class="flex items-center transition-opacity lg:mr-8 hover:opacity-80">
    <Icon name="maki:rocket" class="mr-1 text-2xl text-ctp-frappe-red sm:text-3xl" />
    <span class="self-center whitespace-nowrap super-text-gradient font-semibold" :class="{ 'text-lg': size === 'sm' , 'text-xl': size === 'md' , 'text-2xl': size === 'lg' }">
      {{ $config.public.siteName }}
    </span>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
})
</script>
