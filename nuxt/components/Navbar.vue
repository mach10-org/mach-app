<template>
  <NaiveNavbar :routes="navbarRoutes" :menu-inverted="false" drawer-closable menu-placement="left" class="mx-auto flex flex-wrap items-center justify-between container">
    <template #start>
      <Brand size="md" />
    </template>
    <template #end>
      <NaiveColorModeSwitch />
    </template>
  </NaiveNavbar>
</template>

<script setup lang="ts">
import { NavbarRoute } from '@bg-dev/nuxt-naiveui'

const navbarRoutes: NavbarRoute[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Mission',
    path: '/mission/',
  },
]
</script>
