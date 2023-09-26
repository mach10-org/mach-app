<template>
  <NuxtLayout v-if="data && dataIndex" name="course">
    <template #header-bar>
      <CourseProgress :course-slug="route.params.slug.toString()" :active-lesson="route.params.lesson" :title="dataIndex.title?.toString() || ''" />
    </template>

    <h1 v-if="!hasTitleInBody">
      {{ data.title }}
    </h1>
    <ContentRenderer :value="data" />

    <div v-if="prevNext" ref="prevNextRef" class="flex flex-col justify-start pt-6 md:flex-row md:items-center md:justify-between md:pt-8">
      <nuxt-link
        v-if="prevNext[0]"
        :to="localePath(getPathWithoutLocale(prevNext[0]._path))"
        class="group mr-auto inline-flex items-center border border-$border-input rounded-lg bg-$background-body px-4 py-2 text-sm font-medium text-$link no-underline transition-colors hover:(border-$primary bg-$primary text-$background-body)"
      >
        <Icon name="heroicons:arrow-left-solid" class="mr-2 h-5 w-5" />

        <div class="ml-2">
          <span class="text-$text-muted transition-colors group-hover:text-$background-body">{{ $t('pages.course.previousChapter') }}</span> <br>
          {{ prevNext[0].title }}
        </div>
      </nuxt-link>
      <nuxt-link
        v-if="prevNext[1]"
        :to="localePath(getPathWithoutLocale(prevNext[1]._path))"
        class="group ml-auto mt-2 inline-flex items-center border border-$border-input rounded-lg bg-$background-body px-4 py-2 text-sm font-medium text-$link no-underline transition-colors md:mt-0 hover:(border-$primary bg-$primary text-$background-body)"
      >
        <div class="mr-2">
          <span class="text-$text-muted transition-colors group-hover:text-$background-body">{{ $t('pages.course.nextChapter') }}</span> <br>
          {{ prevNext[1].title }}
        </div>

        <Icon name="heroicons:arrow-right-solid" classes="w-5 h-5 ml-2" />
      </nuxt-link>
    </div>

    <template #toc>
      <NButton
        type="primary"
        secondary
        class="fixed bottom-10 right-8 z-90 drop-shadow-lg md:(bottom-auto left-8 right-auto top-1/4)"
        size="large"
        strong
        circle
        aria-controls="drawer-navigation"
        :title="$t('pages.course.showLessons')"
        style="--n-width: 50px; --n-height: 50px;"
        @click="isTocActive = true"
      >
        <template #icon>
          <NIcon>
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </NIcon>
        </template>
      </NButton>
      <n-drawer id="drawer-navigation" v-model:show="isTocActive" :width="320" placement="left" display-directive="show">
        <n-drawer-content closable>
          <template #header>
            {{ $t('pages.course.toc') }}
          </template>
          <TableOfContentCourse :course-slug="route.params.slug.toString()" class="text-base" :with-title="false" />
        </n-drawer-content>
      </n-drawer>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { NButton } from 'naive-ui'
import { indexFile } from '~/utils/course'
import { useProfileStore } from '~/stores/profile'
import { useCourseStore } from '~/stores/course'
import { useScheduleStore } from '~/stores/schedule'

const route = useRoute()
const user = useSupabaseUser()
const profile = useProfileStore()
const schedule = useScheduleStore()
const course = useCourseStore()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const dayjs = useDayjs()

const isLoading = computed(() => profile.isLoading)
const isTocActive = ref(false)

const contentRootPath = computed(() => `/${locale.value}/courses/${route.params.slug}`)
const contentPath = computed(() => `${contentRootPath.value}/${(route.params.lesson as string[]).join('/')}`)
const contentKey = computed(() => `course-${route.params.slug}-${(route.params.lesson as string[]).join('-')}`)

const { data } = await useAsyncData(contentKey.value, () =>
  queryContent(contentPath.value).findOne(),
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const hasTitleInBody = computed(() => data.value?.body.children.findIndex(el => el.tag === 'h1') !== -1)

useSeoMeta({
  title: () => data.value?.title ?? '',
  description: () => data.value?.description,
})

const isLoadingCourses = computed(() => course.isLoading)
await until(isLoadingCourses).toBe(false)
const dataIndex = computed(() => course.getCourses.find(c => c._path.endsWith(`${route.params.slug}/${indexFile}`)))

const prevNext = computed(() => {
  const ret: [Pick<ParsedContent, string> | null, Pick<ParsedContent, string> | null] = [null, null]

  if (!dataIndex.value) {
    return ret
  }
  const lessons = course.getLessonsByCourseWithoutSection[dataIndex.value._dir]
  const index = lessons.findIndex(c => c._path.endsWith(route.fullPath))

  if (index === -1) {
    return ret
  }

  if (index > 0) {
    ret[0] = lessons[index - 1]
  }
  if (index < lessons.length - 1) {
    ret[1] = lessons[index + 1]
  }

  return ret
})

const prevNextRef = ref<HTMLDivElement | null>(null)
const prevNextIsVisible = useElementVisibility(prevNextRef)

watch(prevNextIsVisible, (val) => {
  if (user.value && val) {
    course.setLessonLearned(route.params.slug as string, (route.params.lesson as string[]).join('/'))
  }
})

onMounted(async () => {
  if (user.value && data.value?.title) {
    await until(isLoading).toBe(false)

    profile.saveLastCoursePage(route.fullPath, data.value?.title, dataIndex.value?.title)
  }

  // If we didn't set a schedule yet, if we didn't ask before and if the user is registered for more than a week
  if (schedule.weeklyGoal === 0 && !profile.has_been_asked_to_set_schedule && profile.created_at?.clone()?.add(1, 'week').isBefore(dayjs())) {
    const n = discreteApi.notification.info({
      title: t('notifications.user.create_schedule'),
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
            }, { default: () => t('notifications.user.cancel') }),
            h(NButton, {
              type: 'primary',
              secondary: true,
              onClick: () => {
                n.destroy()
                navigateTo(localePath('/schedule'))
              },
            }, { default: () => t('notifications.user.ok') }),
          ],
        ),
    })

    profile.setAskedToSetSchedule()
  }
})

const discreteApi = useDiscreteApi()
</script>
