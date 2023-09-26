<template>
  <div class="container">
    <NaiveNavbar :routes="navbarRoutes" :menu-inverted="false" drawer-closable menu-placement="left" :sticky="false">
      <template #start>
        <Brand size="md" />
      </template>
      <template #end>
        <ClientOnly>
          <template v-if="isDev">
            <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" class="link">
              {{
                locale.name
              }}
            </NuxtLink>
          </template>
          <UserDropdown v-if="user" />
          <ButtonLink v-else :to="localePath('/login/')" size="large">
            {{ $t('header.login') }}
          </ButtonLink>
        </ClientOnly>
        <NaiveColorModeSwitch />
      </template>
    </NaiveNavbar>
  </div>
</template>

<script setup lang="ts">
import { NavbarRoute } from '@bg-dev/nuxt-naiveui'
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
const user = useSupabaseUser()
const i18n = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const isDev = process.env.NODE_ENV === 'development'

const availableLocales = computed(() => {
  return (i18n.locales.value).filter(i => typeof i !== 'string' && i.code !== i18n.locale.value) as LocaleObject[]
})

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
