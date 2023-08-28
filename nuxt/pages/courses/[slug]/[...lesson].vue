<template>
  <NuxtLayout v-if="data" name="course">
    <template #header-bar>
      <nuxt-link :to="localePath(`/courses/${route.params.slug}`)" class="link inline-flex items-center text-base">
        <Icon name="heroicons:arrow-left-solid" class="mr-1" />
        {{ dataIndex?.title }}
      </nuxt-link>
      <!-- TODO add progress -->
    </template>

    <h1>{{ data.title }}</h1>
    <ContentRenderer :value="data" />

    <template #toc>
      <TableOfContentCourse :course="route.params.slug.toString()" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { indexFile } from '~/utils/course'
import { useProfileStore } from '~/stores/profile'

const route = useRoute()
const user = useSupabaseUser()
const profile = useProfileStore()
const { locale } = useI18n()
const localePath = useLocalePath()

const isLoading = computed(() => profile.isLoading)

const { data } = await useAsyncData(`course-${route.params.slug}-${(route.params.lesson as string[]).join('-')}`, () =>
  queryContent(
    `/${locale.value}/courses/${route.params.slug}/${(route.params.lesson as string[]).join('/')}`,
  ).findOne(),
)

const { data: dataIndex } = await useAsyncData(`course-${route.params.slug}-index`, () =>
  queryContent(
    `/${locale.value}/courses/${route.params.slug}/${indexFile}`,
  ).findOne(),
)

// TODO handle 404

onMounted(async () => {
  if (user.value && data.value?.title) {
    await until(isLoading).toBe(false)

    profile.saveLastCoursePage(route.fullPath, data.value?.title, true)
  }
})
</script>
