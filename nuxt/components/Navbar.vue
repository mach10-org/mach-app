<template>
  <div class="container">
    <NaiveNavbar :routes="navbarRoutes" :menu-inverted="false" drawer-closable menu-placement="left" class="w-full">
      <template #start>
        <Brand size="md" />
      </template>
      <template #end>
        <template v-if="user">
          <!-- TODO dropdown -->
          {{ user.email }}
        </template>
        <ButtonLink v-else to="/login/" size="large">
          {{ $t('header.login') }}
        </ButtonLink>
        <NaiveColorModeSwitch />
      </template>
    </NaiveNavbar>
  </div>
</template>

<script setup lang="ts">
import { NavbarRoute } from '@bg-dev/nuxt-naiveui'
const user = useSupabaseUser()

const navbarRoutes: NavbarRoute[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Mission',
    path: '/mission/',
  },
  {
    label: 'Roadmap',
    path: '/roadmap/',
  },
  {
    label: 'Courses',
    path: '/courses/',
  },
]
</script>
