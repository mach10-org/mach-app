<template>
  <div id="toc">
    <nav class="">
      <h2>
        Table of content
      </h2>
      <!-- TODO design -->
      <ul>
        <template v-if="toc.length === 1">
          <li v-for="t in toc[0].children" :key="t._path">
            <nuxt-link :to="localePath(getPathWithoutLocale(t._path))">
              {{ t.title }}
            </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li v-for="th in toc" :key="th.title">
            <span>{{ th.title }}</span>
            <ul>
              <li v-for="t in th.children" :key="t._path">
                <nuxt-link :to="localePath(getPathWithoutLocale(t._path))">
                  {{ t.title }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { indexFile } from '~/utils/course'

const props = defineProps({
  course: {
    type: String,
    required: true,
  },
})

const { locale } = useI18n()
const localePath = useLocalePath()

// eslint-disable-next-line vue/no-setup-props-destructure
const { data } = await useAsyncData(`course-${props.course}-pages`, () =>
  queryContent(
    locale.value, 'courses', props.course,
  ).where({ _path: { $not: { $contains: indexFile } } }).only(['_path', 'title', '_dir']).sort({ order: 1 }).find(),
)

const toc = computed(() => {
  const dirs = _sortBy(_uniqBy(data.value, '_dir').map(d => ({ title: data.value?.find(v => v._path.endsWith(`/${d._dir}/_dir`))?.title, id: d._dir })), 'id')

  return dirs.map(d => ({ title: d.title, children: data.value?.filter(v => v._dir === d.id && !v._path.endsWith('_dir')) }))
})
</script>
