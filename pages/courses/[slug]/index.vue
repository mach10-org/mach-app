<template>
  <NuxtLayout v-if="data" name="course">
    <template #header>
      <nuxt-link :to="localePath('/courses')" class="link inline-flex items-center text-base">
        <Icon name="heroicons:arrow-left-solid" class="mr-1" />
        {{ $t('menu.courses') }}
      </nuxt-link>
      <TimeToComplete :total-hours="data.totalHours" />
    </template>

    <h1>{{ data.title }}</h1>
    <ContentRenderer :value="data" />
    <TableOfContentCourse :course-slug="route.params.slug.toString()" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { indexFile } from '~/utils/course'
import { useProfileStore } from '~/stores/profile'

const route = useRoute()
const user = useSupabaseUser()
const profile = useProfileStore()
const localePath = useLocalePath()
const { locale } = useI18n()

const isLoading = computed(() => profile.isLoading)

const { data } = await useAsyncData(`course-${route.params.slug}-index`, () =>
  queryContent(
    `/${locale.value}/courses/${route.params.slug}/${indexFile}`,
  ).findOne(),
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

onMounted(async () => {
  if (user.value && data.value?.title) {
    await until(isLoading).toBe(false)

    profile.saveLastCoursePage(route.fullPath, data.value?.title, data.value?.title, true)
  }
})
</script>
