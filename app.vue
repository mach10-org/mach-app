<template>
  <NaiveConfig :theme-config="themeConfig">
    <SeoKit />
    <NuxtLayout class="root rootdark">
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { themeConfig } from '~/theme.config'
import '~/assets/css/style.css'
import { useProfileStore } from '~/stores/profile'
import { useCourseStore } from '~/stores/course'

const user = useSupabaseUser()
const profile = useProfileStore()
const course = useCourseStore()

const { locales } = useI18n()
const index = ref(0)

// Fetch courses
for (const locale of locales.value) {
  const { data: list } = await useAsyncData(`courses-${locale.code}`, () =>
    queryContent(
      locale.code, 'courses',
    ).where({ _path: { $not: { $eq: `/${locale.code}/courses` } } }).only(['title', 'description', 'lastmod', 'order', 'preview', 'totalHours', '_dir', '_path']).find(),
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
