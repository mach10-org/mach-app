<template><div /></template>

<script setup lang="ts">
import { useUtilsStore } from '~/stores/utils'

onMounted(() => {
  const theme = useThemeOverridesVars()
  const utils = useUtilsStore()

  watch(theme, (val) => {
    utils.themeOverrides = val
  }, { immediate: true })
})

</script>
