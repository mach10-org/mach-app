<template>
  <NuxtLayout
    v-if="data && article"
    name="blog"
    :has-header="true"
    :title="data.title"
    :description="data.description"
    :preview="data.preview"
    :show-toc="data.showToc"
    :toc-links="data.body.toc?.links"
    :tags="article.tags"
    :date="article.date"
  >
    <ContentRenderer :value="data" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useBlogStore } from '~/stores/blog'

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
})
const { locale } = useI18n()
const blog = useBlogStore()

const { data } = await useAsyncData(`blog-${props.page}`, () =>
  queryContent(
    `/${locale.value}/blog/${props.page}`,
  ).findOne(),
)

const isLoading = computed(() => blog.isLoading)
await until(isLoading).toBe(false)

const article = computed(() => data.value && blog.getBlog.find(item => item._path === data.value._path))

if (!data.value || !article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
