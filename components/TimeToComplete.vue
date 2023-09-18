<template>
  <div class="mt-2 flex flex-wrap items-center text-sm leading-[2.1] text-$text-muted lg:(ml-9 mt-0)" :class="{'lg:ml-auto': hasWeeklyGoal}">
    <i18n-t v-if="hasWeeklyGoal" keypath="timeToComplete.withScheduleFinish">
      <template #schedule>
        <nuxt-link-locale to="/schedule" class="link ml-1">
          {{ $t('timeToComplete.schedule') }}
        </nuxt-link-locale>,
      </template>
      <template #endDate>
        {{ endDate }}
      </template>
    </i18n-t>
    <i18n-t v-else keypath="timeToComplete.spendHoursFinish">
      <template #hours>
        <n-input-number
          v-model:value="hours"
          size="small"
          class="mx-1 w-19"
          :min="1"
          placeholder=""
        />
      </template>
      <template #endDate>
        {{ endDate }}
      </template>
    </i18n-t>
  </div>
</template>

<script lang="ts" setup>
import { useScheduleStore } from '~/stores/schedule'

const props = defineProps({
  totalHours: {
    type: Number,
    required: true,
  },
})

const dayjs = useDayjs()
const schedule = useScheduleStore()

const hasWeeklyGoal = computed(() => schedule.weeklyGoal > 0)

const hours = ref(hasWeeklyGoal.value ? schedule.weeklyGoal : 2)

const endDate = computed(() => {
  let weeks = 1
  try {
    if (hours.value === Infinity || hours.value === null) {
      throw new Error('Infinity')
    }
    weeks = Math.ceil(props.totalHours / hours.value)
  } catch (error) {
    return '🤔'
  }

  return dayjs().add(weeks, 'weeks').format('Do of MMMM YYYY')
})
</script>
