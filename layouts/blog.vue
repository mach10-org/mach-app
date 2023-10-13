<template>
  <NuxtLayout
    name="intro"
    :has-header="true"
    :title="title"
    :description="description"
    :preview="preview"
    :show-toc="showToc"
    :toc-links="tocLinks"
  >
    <template #header-top>
      <div class="mb-6">
        <NuxtLinkLocale to="/blog" class="link inline-flex items-center text-base">
          <Icon name="heroicons:arrow-left-solid" class="mr-1" />{{ $t('footer.blog') }}
        </NuxtLinkLocale>
      </div>
    </template>

    <template #header-bottom>
      <div class="mt-5 flex justify-between">
        <div v-if="tags" class="space-x-2">
          <n-tag v-for="tag in tags" :key="tag" :bordered="false" round type="info">
            {{ tag }}
          </n-tag>
        </div>

        <time class="text-base text-$text-muted">{{ date.format('YYYY-MM-DD') }}</time>
      </div>
    </template>
    <slot />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Dayjs } from 'dayjs'

defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  preview: {
    type: String,
    default: undefined,
  },
  showToc: {
    type: Boolean,
    default: true,
  },
  tocLinks: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array as () => string[],
    default: () => [],
  },
  date: {
    type: Object as () => Dayjs,
    required: true,
  },
})
</script>
