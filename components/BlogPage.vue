<template>
  <NuxtLayout
    v-if="data"
    name="blog"
    :has-header="true"
    :title="data.title"
    :description="data.description"
    :preview="data.preview"
    :show-toc="data.showToc"
    :toc-links="data.body.toc.links"
  >
    <ContentRenderer :value="data" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps({
  page: {
    type: String,
    required: true,
  },
})
const { locale } = useI18n()

const { data } = await useAsyncData(`blog-${props.page}`, () =>
  queryContent(
    `/${locale.value}/blog/${props.page}`,
  ).findOne(),
)
</script>
