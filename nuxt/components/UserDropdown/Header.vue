<template>
  <div class="n-dropdown-option">
    <div class="n-dropdown-option-body !h-auto !cursor-text">
      <div class="n-dropdown-option-body__prefix" />
      <div class="n-dropdown-option-body__label py-1 text-sm">
        <span class="block font-medium text-$text-title">{{ user.email }}</span>
        <span class="block text-$text-muted">Mach {{ profile.xp || 0 }}</span>
      </div>
      <div class="n-dropdown-option-body__suffix" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'

const user = useSupabaseUser()
const profile = useProfileStore()
</script>
