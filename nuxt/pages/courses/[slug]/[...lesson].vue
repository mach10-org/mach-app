<template>
  <NuxtLayout v-if="data" name="course">
    <template #header-bar>
      <nuxt-link :to="localePath(`/courses/${route.params.slug}`)" class="link inline-flex items-center text-base">
        <Icon name="heroicons:arrow-left-solid" class="mr-1" />
        {{ dataIndex?.title }}
      </nuxt-link>
      <!-- TODO add progress -->
    </template>

    <h1 v-if="!hasTitleInBody">
      {{ data.title }}
    </h1>
    <ContentRenderer :value="data" />

    <div v-if="prevNext" ref="prevNextRef" class="flex flex-col justify-start pt-6 md:flex-row md:items-center md:justify-between md:pt-8">
      <nuxt-link
        v-if="prevNext[0]"
        :to="localePath(getPathWithoutLocale(prevNext[0]._path))"
        class="group mr-auto inline-flex items-center border border-$border-input rounded-lg bg-$background-page px-4 py-2 text-sm font-medium text-$link no-underline transition-colors hover:(border-$primary bg-$primary text-white)"
      >
        <Icon name="heroicons:arrow-left-solid" class="mr-2 h-5 w-5" />

        <div class="ml-2">
          <span class="text-$text-muted transition-colors group-hover:text-white">Previous chapter:</span> <br>
          {{ prevNext[0].title }}
        </div>
      </nuxt-link>
      <nuxt-link
        v-if="prevNext[1]"
        :to="localePath(getPathWithoutLocale(prevNext[1]._path))"
        class="group ml-auto mt-2 inline-flex items-center border border-$border-input rounded-lg bg-$background-page px-4 py-2 text-sm font-medium text-$link no-underline transition-colors md:mt-0 hover:(border-$primary bg-$primary text-white)"
      >
        <div class="mr-2">
          <span class="text-$text-muted transition-colors group-hover:text-white">Next chapter:</span> <br>
          {{ prevNext[1].title }}
        </div>

        <Icon name="heroicons:arrow-right-solid" classes="w-5 h-5 ml-2" />
      </nuxt-link>
    </div>

    <template #toc>
      <TableOfContentCourse :course="route.params.slug.toString()" />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { indexFile } from '~/utils/course'
import { useProfileStore } from '~/stores/profile'
import { useCourseStore } from '~/stores/course'

const route = useRoute()
const user = useSupabaseUser()
const profile = useProfileStore()
const course = useCourseStore()
const { locale } = useI18n()
const localePath = useLocalePath()

const isLoading = computed(() => profile.isLoading)

const contentRootPath = computed(() => `/${locale.value}/courses/${route.params.slug}`)
const contentPath = computed(() => `${contentRootPath.value}/${(route.params.lesson as string[]).join('/')}`)
const contentKey = computed(() => `course-${route.params.slug}-${(route.params.lesson as string[]).join('-')}`)

const { data } = await useAsyncData(contentKey.value, () =>
  queryContent(contentPath.value).findOne(),
)

const hasTitleInBody = computed(() => data.value?.body.children.findIndex(el => el.tag === 'h1') !== -1)

useSeoMeta({
  title: () => data.value?.title ?? '',
  description: () => data.value?.description,
})

const { data: dataIndex } = await useAsyncData(`course-${route.params.slug}-index`, () =>
  queryContent(
    `${contentRootPath.value}/${indexFile}`,
  ).findOne(),
)

const { data: prevNext } = await useAsyncData(`${contentKey.value}-prev-next`, () =>
  queryContent(
    contentRootPath.value,
  ).where({ _path: { $not: { $containsAny: ['_dir', indexFile] } } }).only(['title', '_path'])
    .findSurround(contentPath.value),
)

// TODO handle 404

const prevNextRef = ref<HTMLDivElement | null>(null)
const prevNextIsVisible = useElementVisibility(prevNextRef)

watch(prevNextIsVisible, (val) => {
  if (val) {
    course.setLessonLearned(route.params.slug as string, (route.params.lesson as string[]).join('/'))
  }
})

onMounted(async () => {
  if (user.value && data.value?.title) {
    await until(isLoading).toBe(false)

    profile.saveLastCoursePage(route.fullPath, data.value?.title, true)
  }
})
</script>
