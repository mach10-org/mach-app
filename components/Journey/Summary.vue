<template>
  <ul class="grid mx-auto mt-14 max-w-3xl p-0 md:grid-cols-2">
    <li class="flex flex-col items-center justify-center border-b border-$border-input py-4 md:border-b-0 md:border-r">
      <i18n-t tag="h2" keypath="common.hours" class="text-base font-medium text-$text-title">
        <template #hours>
          <span class="text-2xl font-extrabold lg:text-3xl">
            {{ $n(schedule.weeklyGoal, { maximumFractionDigits:1 }) }}
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
        {{ $t('pages.journey.youreBadge', {badge: profile.getBadge}) }}
      </h2>
      <i18n-t v-if="nextBadge" tag="p" keypath="pages.journey.keepPushing" class="max-w-55 text-center text-base text-$text-muted">
        <template #badge>
          <b>{{ nextBadge }}</b>
        </template>
      </i18n-t>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { machBadges, useProfileStore } from '~/stores/profile'
import { useScheduleStore } from '~/stores/schedule'

const schedule = useScheduleStore()
const profile = useProfileStore()

const nextBadge = computed(() => {
  const currentBadge = profile.getBadge
  const currentBadgeIndex = machBadges.findIndex(b => b === currentBadge)
  if (currentBadgeIndex === machBadges.length - 1) {
    return false
  }
  return machBadges[currentBadgeIndex + 1]
})
</script>
