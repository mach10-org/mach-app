<!-- From https://github.com/becem-gharbi/nuxt-naiveui/blob/main/src/runtime/components/NaiveNavbar.vue -->

<template>
  <div :style="navbarStyle">
    <div class="h-$navbar-height flex items-center justify-between gap-4">
      <div :style="menuPlacement === 'center' ? { flex: 1 } : {}">
        <div class="flex items-center justify-start gap-3">
          <n-button
            v-if="backIcon"
            class="mobileOrTablet"
            text
            tag="span"
            :focusable="false"
            @click="() => router.back()"
          >
            <NaiveIcon name="ph:arrow-left" :size="backIconSize" />
          </n-button>

          <slot name="start" />
        </div>
      </div>

      <div class="notMobileOrTablet" :style="{ flexGrow: 1, textAlign: menuPlacement }">
        <n-menu v-model:value="activePath" :inverted="menuInverted" mode="horizontal" :options="menuOptions" class="font-medium" />
      </div>

      <div :style="menuPlacement === 'center' ? { flex: 1 } : {}">
        <div class="flex items-center justify-end gap-3">
          <slot name="end" />

          <n-button
            v-if="menuOptions.length > 0"
            class="mobileOrTablet"
            text
            tag="span"
            :focusable="false"
            @click="() => drawerActive = true"
          >
            <slot name="toggle">
              <NaiveIcon :name="menuToggleIcon" :size="menuToggleIconSize" />
            </slot>
          </n-button>
        </div>
      </div>
    </div>

    <n-drawer
      v-if="menuOptions.length > 0"
      v-model:show="drawerActive"
      :placement="drawerPlacement"
      :width="drawerWidth"
    >
      <n-drawer-content
        title="Menu"
        :body-content-style="{ padding: 0 }"
        :header-style="{
          padding: '15px'
        }"
        :footer-style="{ justifyContent: 'start' }"
        :closable="drawerClosable"
      >
        <template #header>
          <slot name="drawer-header" />
        </template>

        <n-menu v-model:value="activePath" mode="vertical" :inverted="menuInverted" :options="menuOptions" />

        <template #footer>
          <slot name="drawer-footer" />
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang = "ts">
import { NDrawer, NMenu, NDrawerContent, NButton } from 'naive-ui'
import type { StyleValue } from 'vue'
import type { MenuOption } from 'naive-ui'
import type { NavbarRoute } from '@bg-dev/nuxt-naiveui/dist/types'
import { NuxtLink, NaiveIcon } from '#components'
import { ref, computed, h, useRoute, useRouter, watchEffect, useNaiveTheme } from '#imports'
const drawerActive = ref(false)
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const activePath = ref()
watchEffect(() => {
  activePath.value = '/' + route.path.split('/')[1]
  drawerActive.value = false
})
const props = withDefaults(defineProps<{
  routes?: NavbarRoute[],
  menuToggleIcon?: string,
  menuToggleIconSize?: number,
  backIcon?: boolean,
  backIconSize?: number,
  menuInverted?: boolean,
  menuPlacement?: 'right' | 'left' | 'center',
  drawerPlacement?: 'top' | 'right' | 'bottom' | 'left',
  sticky?: boolean,
  drawerClosable?: boolean,
  drawerWidth?: string | number,
}>(), {
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
})
const naiveTheme = useNaiveTheme()
const navbarStyle = computed<StyleValue>(() => ({
  position: props.sticky ? 'sticky' : 'static',
  backgroundColor: naiveTheme.value?.common?.bodyColor,
  top: 0,
  zIndex: 100,
}))
const menuOptions = computed<MenuOption[]>(() => {
  const cb = (routes: NavbarRoute[]) => routes.map((route) => {
    const menuOption: MenuOption =
      {
        label: route.path ? () => h(NuxtLink, { to: localePath(route.path ?? '') }, { default: () => route.label }) : route.label,
        icon: route.icon ? () => h(NaiveIcon, { name: route.icon }) : undefined,
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

<style lang="postcss">
:root {
  --navbar-height: 72px
}
</style>
