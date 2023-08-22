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
const i18n = useI18n()

const navbarRoutes = computed<NavbarRoute[]>(() => [
  {
    label: i18n.t('menu.home'),
    path: '/',
  },
  {
    label: i18n.t('menu.mission'),
    path: '/mission',
  },
  {
    label: i18n.t('menu.roadmap'),
    path: '/roadmap',
  },
  {
    label: i18n.t('menu.courses'),
    path: '/courses',
  },
  {
    label: i18n.t('menu.whoFor'),
    path: '/who-for',
  },
  {
    label: i18n.t('menu.whyFree'),
    path: '/why-free',
  },
])
</script>
