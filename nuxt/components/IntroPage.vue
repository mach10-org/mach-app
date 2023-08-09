<template>
  <NuxtLayout
    v-if="data"
    name="intro"
    :has-header="data.hasHeader"
    :title="data.title"
    :description="data.description"
    :preview="`/img/${data.preview}`"
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

// eslint-disable-next-line vue/no-setup-props-destructure
const { data } = await useAsyncData(props.page, () =>
  queryContent(
    `/${locale.value}/${props.page}`,
  ).findOne(),
)
</script>
