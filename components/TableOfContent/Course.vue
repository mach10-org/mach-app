<template>
  <div id="toc">
    <nav class="">
      <h2 v-if="withTitle">
        {{ $t('pages.course.toc') }}
      </h2>
      <ul class="list-none p-0 space-y-[0.4em]">
        <template v-if="toc.length === 1">
          <TableOfContentCourseItem v-for="(t, index) in toc[0].children" :key="t._path" :path="t._path" :index="index" :course-slug="courseSlug">
            {{ t.title }}
          </TableOfContentCourseItem>
        </template>
        <template v-else>
          <li v-for="th in toc" :key="th.title" class="space-y-[0.6em]">
            <span class="flex items-center justify-between border border-l-[4px] border-r-[4px] border-$border-input rounded-md bg-$background-body px-4 py-2">{{ th.title }}</span>
            <ul class="list-none pb-[0.6em] pl-1 space-y-[0.4em]">
              <TableOfContentCourseItem v-for="(t, index) in th.children" :key="t._path" :path="t._path" :index="index" :course-slug="courseSlug">
                {{ t.title }}
              </TableOfContentCourseItem>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/stores/course'
import { sectionFile } from '~/utils/course'

const props = defineProps({
  courseSlug: {
    type: String,
    required: true,
  },
  withTitle: {
    type: Boolean,
    default: true,
  },
})

const courses = useCourseStore()

const isLoading = computed(() => courses.isLoading)
await until(isLoading).toBe(false)

const data = computed(() => courses.getLessonsByCourse[props.courseSlug])

const toc = computed(() => {
  const dirs = _sortBy(_uniqBy(data.value, '_dir').map(d => ({ title: data.value?.find(v => v._path.endsWith(`/${d._dir}/_dir`))?.title, id: d._dir })), 'id')

  return dirs.map(d => ({ title: d.title, children: data.value?.filter(v => v._dir === d.id && !v._path.endsWith(sectionFile)) }))
})
</script>
