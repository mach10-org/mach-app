<template>
  <n-dropdown
    :trigger="hasTouch ? 'click' : 'hover'"
    placement="bottom-end"
    :options="options"
    :render-label="renderDropdownLabel"
  >
    <button
      id="user-menu-button"
      type="button"
      class="inline-flex items-center rounded-full p-0 text-center"
      :title="$t('header.openUserMenu')"
    >
      <img src="/img/avatar.png" class="block h-8 h-8 rounded-full">
    </button>
  </n-dropdown>
</template>

<script setup lang="ts">
import type { VNodeChild } from 'vue'
import type { DropdownOption } from 'naive-ui'
import { h } from '#imports'
import { NuxtLink, UserDropdownHeader } from '#components'
import { Database } from '~/types/database.types'

const supabase = useSupabaseClient<Database>()
const localePath = useLocalePath()
const i18n = useI18n()

const hasTouch = useSupported(() => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0))

const options = computed(() => [{
  key: 'header',
  type: 'render',
  render: renderCustomHeader,
},
{
  type: 'divider',
  key: 'd1',
},
{
  label: i18n.t('header.journey'),
  key: 'journey',
},
{
  label: i18n.t('header.profile'),
  key: 'profile',
},
{
  label: i18n.t('header.signout'),
  key: 'signout',
  props: {
    onClick: () => {
      supabase.auth.signOut()
    },
  },
}])

const renderCustomHeader = () => {
  return h(
    UserDropdownHeader,
  )
}

const renderDropdownLabel = (option: DropdownOption) => {
  if (option.key === 'signout') {
    return h(
      'span',
      {},
      {
        default: () => option.label as VNodeChild,
      },
    )
  }

  return h(
    NuxtLink,
    {
      to: localePath(`/${option.key}`),
    },
    {
      default: () => option.label as VNodeChild,
    },
  )
}
</script>
