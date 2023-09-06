<template>
  <div class="min-h-[60vh] flex">
    <n-spin size="large" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useProfileStore } from '~/stores/profile'

const user = useSupabaseUser()
const localePath = useLocalePath()
const i18n = useI18n()
const route = useRoute()

if (route.query.error) {
  throw createError({ statusCode: route.query.error_code ? +route.query.error_code : 500, statusMessage: route.query.error_description?.toString() || 'Login error' })
}

const profile = useProfileStore()

const isLoading = computed(() => profile.isLoading)

watch(user, async () => {
  if (user.value) {
    await until(isLoading).toBe(false)

    if (profile.isOnBoarded) {
      const discreteApi = useDiscreteApi()
      if (profile.lastCoursePage !== null) {
        const n = discreteApi.notification.info({
          title: i18n.t('notifications.user.welcome_back', { name: profile.full_name }),
          content: () =>
            h('div', {}, [
              h('p', { class: 'mb-1' }, i18n.t('notifications.user.welcome_back_description')),
              h('p', {}, [
                h('b', {}, profile.lastCoursePage?.main ? i18n.t('notifications.user.course') : i18n.t('notifications.user.lesson')),
                h('span', {}, `: ${profile.lastCoursePage?.title}`),
              ]),
            ]),
          meta: ' ', // To align buttons to the right
          action: () =>
            h(
              'div',
              { class: 'flex justify-end gap-3' },
              [
                h(NButton, {
                  secondary: true,
                  onClick: () => {
                    n.destroy()
                  },
                }, { default: () => i18n.t('notifications.user.cancel') }),
                h(NButton, {
                  type: 'primary',
                  onClick: () => {
                    n.destroy()
                    navigateTo(profile.lastCoursePage?.url ?? '/')
                  },
                }, { default: () => i18n.t('notifications.user.ok') }),
              ],
            ),
        })
      } else {
        discreteApi.message.info(i18n.t('notifications.user.welcome_back', { name: profile.full_name }))
      }

      return navigateTo(localePath('/'))
    } else {
      return navigateTo(localePath('/onboarding'))
    }
  }
}, { immediate: true })
</script>
