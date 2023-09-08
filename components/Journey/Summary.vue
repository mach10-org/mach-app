<template>
  <ul class="grid mx-auto mt-14 max-w-3xl p-0 md:grid-cols-2">
    <li class="flex flex-col items-center justify-center border-b border-$border-input py-4 md:border-b-0 md:border-r">
      <i18n-t tag="h2" keypath="common.hours" class="text-base font-medium text-$text-title">
        <template #hours>
          <span class="text-2xl font-extrabold lg:text-3xl">
            {{ schedule.weeklyGoal }}
          </span>
        </template>
      </i18n-t>
      <p class="text-base text-$text-muted">
        {{ $t('pages.journey.summary_left') }}
      </p>
      <NuxtLinkLocale to="/schedule" class="link mt-3">
        {{ $t('pages.journey.summary_left_link') }}
      </NuxtLinkLocale>
    </li>
    <li class="flex flex-col items-center justify-center py-4">
      <h2 class="mb-1 text-2xl font-extrabold text-$text-title lg:text-3xl">
        {{ lessonsCompleted }}
      </h2>
      <p class="text-base text-$text-muted">
        {{ $t('pages.journey.summary_right') }}
      </p>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useScheduleStore } from '~/stores/schedule'

defineProps({
  lessonsCompleted: {
    type: Number,
    required: true,
  },
})

const schedule = useScheduleStore()
</script>
