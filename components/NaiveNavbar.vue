<!-- From https://github.com/becem-gharbi/nuxt-naiveui/blob/main/src/runtime/components/NaiveNavbar.vue -->

<template>
  <div class="outer" :class="sticky ? 'sticky' : 'static'" :style="{ backgroundColor: naiveTheme.bodyColor}">
    <div class="inner-start" :class="menuPlacement === 'center' ? 'flex-1' : 'unset'">
      <n-button
        v-if="backIcon"
        class="mobileOrTablet"
        text
        tag="span"
        :focusable="false"
        @click="() => router.back()"
      >
        <NaiveIcon
          name="ph:arrow-left"
          :size="backIconSize"
        />
      </n-button>

      <slot name="start" />
    </div>

    <div
      v-if="!isMobileOrTablet"
      class="inner-middle notMobileOrTablet"
      :style="{textAlign: menuPlacement}"
    >
      <n-menu
        v-model:value="activePath"
        :inverted="menuInverted"
        mode="horizontal"
        :options="menuOptions"
      />
    </div>

    <div class="inner-end" :class="menuPlacement === 'center' ? 'flex-1' : 'flex-none'">
      <slot name="end" />

      <n-button
        class="mobileOrTablet"
        text
        tag="span"
        :focusable="false"
        @click="drawerActive = true"
      >
        <slot name="toggle">
          <NaiveIcon
            :name="menuToggleIcon"
            :size="menuToggleIconSize"
          />
        </slot>
      </n-button>
    </div>
  </div>

  <LazyNaiveContainer>
    <n-drawer
      v-model:show="drawerActive"
      :placement="drawerPlacement"
      :width="drawerWidth"
    >
      <n-drawer-content
        title="Menu"
        :body-content-style="{ padding: 0 }"
        :header-style="{
          padding: '15px',
        }"
        :footer-style="{ justifyContent: 'start' }"
        :closable="drawerClosable"
      >
        <template #header>
          <slot name="drawer-header" />
        </template>

        <n-menu
          v-model:value="activePath"
          mode="vertical"
          :inverted="menuInverted"
          :options="menuOptions"
        />

        <template #footer>
          <slot name="drawer-footer" />
        </template>
      </n-drawer-content>
    </n-drawer>
  </LazyNaiveContainer>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import type { NavbarRoute } from '@bg-dev/nuxt-naiveui/dist/types'
import { NuxtLinkLocale, NaiveIcon } from '#components'
import {
  ref,
  computed,
  h,
  useRoute,
  useRouter,
  watchEffect,
  useThemeVars,
  useNaiveDevice,
} from '#imports'

const drawerActive = ref(false)
const route = useRoute()
const router = useRouter()
const activePath = ref()
const naiveTheme = useThemeVars()

const { isMobileOrTablet } = useNaiveDevice()

watchEffect(() => {
  activePath.value = '/' + route.path.split('/')[1]
  drawerActive.value = false
})

const props = withDefaults(
  defineProps<{
    routes?: NavbarRoute[];
    menuToggleIcon?: string;
    menuToggleIconSize?: number;
    backIcon?: boolean;
    backIconSize?: number;
    menuInverted?: boolean;
    menuPlacement?: 'right' | 'left' | 'center';
    drawerPlacement?: 'top' | 'right' | 'bottom' | 'left';
    sticky?: boolean;
    drawerClosable?: boolean;
    drawerWidth?: string | number;
  }>(),
  {
    routes: () => [],
    menuToggleIcon: 'ph:equals',
    menuPlacement: 'left',
    drawerPlacement: 'left',
    menuInverted: false,
    sticky: true,
    menuToggleIconSize: 26,
    backIcon: false,
    backIconSize: 26,
    drawerWidth: '100%',
  },
)

const menuOptions = computed<MenuOption[]>(() => {
  const cb = (routes: NavbarRoute[]) =>
    routes.map((route) => {
      const menuOption: MenuOption = {
        label: route.path
          ? () =>
              h(NuxtLinkLocale, { to: route.path }, { default: () => route.label })
          : route.label,
        icon: route.icon
          ? () => h(NaiveIcon as Component, { name: route.icon })
          : undefined,
        key: route.path || route.label,
      }

      if (route.children) {
        menuOption.children = cb(route.children)
      }

      return menuOption
    })

  return cb(props.routes)
})
</script>

<style lang="postcss" scoped>
.outer {
  @apply flex items-center justify-between gap-4 top-0 z-100;
}

.inner-start {
  @apply h-$navbar-height flex items-center justify-between gap-4;
}

.inner-end {
  @apply flex items-center justify-end gap-3;
}

.inner-middle {
  @apply flex-grow;
}
</style>

<style lang="postcss">
:root {
  --navbar-height: 72px
}
</style>
