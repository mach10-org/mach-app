<template>
  <NButton type="primary" :size="size" tag="a" :href="href" :on-click="navigate">
    <slot />
  </NButton>
</template>
<script setup lang="ts">
import { NuxtLinkProps } from 'nuxt/app'
interface Props extends NuxtLinkProps {
  size?: 'tiny' | 'small' | 'medium' | 'large'
}
const props = defineProps<Props>()
const { navigate, href, route, isActive, isExactActive } = useLink(props)
</script>