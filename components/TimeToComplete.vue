<template>
  <div class="mt-2 flex flex-wrap items-center text-sm leading-[2.1] text-$text-muted lg:(ml-9 mt-0)" :class="{'lg:ml-auto': hasWeeklyGoal}">
    <template v-if="hasWeeklyGoal">
      With my
      <nuxt-link-locale to="/schedule" class="link ml-1">
        schedule
      </nuxt-link-locale>,
      I will finish the course by the {{ endDate }}
    </template>
    <template v-else>
      If I spend
      <n-input-number
        v-model:value="hours"
        size="small"
        class="mx-1 w-10"
        :show-button="false"
        placeholder=""
      />
      hours per week, I will finish the course by the {{ endDate }}
    </template>
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
    weeks = Math.ceil(props.totalHours / hours.value)
  } catch (error) {
    return '...'
  }

  return dayjs().add(weeks, 'weeks').format('Do of MMMM YYYY')
})
</script>
