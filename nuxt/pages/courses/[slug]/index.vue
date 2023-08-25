<template>
  <div v-if="data">
    <ContentRenderer :value="data" class="prose lg:text-xl" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const { data } = await useAsyncData(`course-${route.params.slug}-index`, () =>
  queryContent(
    `/${locale.value}/courses/${route.params.slug}/00-index`,
  ).findOne(),
)
</script>
