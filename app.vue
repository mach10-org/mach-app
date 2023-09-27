<template>
  <NaiveConfig :theme-config="themeConfig" :locale="naiveLocale" :date-locale="naiveDateLocale">
    <SeoKit />
    <NuxtLayout class="root rootdark">
      <NuxtPage />
    </NuxtLayout>
    <UpdateTheme />
  </NaiveConfig>
</template>

<script setup lang="ts">
import { enUS, dateEnUS, jaJP, dateJaJP } from 'naive-ui'
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'
import { useProfileStore } from '~/stores/profile'
import { useCourseStore } from '~/stores/course'

const user = useSupabaseUser()
const profile = useProfileStore()
const course = useCourseStore()
const dayjs = useDayjs()

const { locales, locale } = useI18n()
dayjs.locale(locale.value)
const index = ref(0)

const naiveLocale = computed(() => {
  if (locale.value === 'ja') {
    return jaJP
  }

  return enUS
})

const naiveDateLocale = computed(() => {
  if (locale.value === 'ja') {
    return dateJaJP
  }

  return dateEnUS
})

// Fetch courses
for (const locale of locales.value) {
  const { data: list } = await useAsyncData(`courses-${locale.code}`, () =>
    queryContent(
      locale.code, 'courses',
    ).where({ _path: { $not: { $eq: `/${locale.code}/courses` } } }).only(['title', 'description', 'lastmod', 'order', 'preview', 'totalHours', 'isComingSoon', '_dir', '_path']).find(),
  )

  if (list.value) {
    course.list[locale.code] = list.value
  }

  if (++index.value === locales.value.length) {
    course.isLoading = false
  }
}

watch(user, (val) => {
  if (val) {
    profile.fetch()
  } else {
    profile.reset()
  }
}, { immediate: true })
</script>
