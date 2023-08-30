<template>
  <div class="flex items-center text-sm leading-[2.1] text-$text-muted">
    If I spend
    <n-input-number
      v-model:value="hours"
      size="small"
      class="mx-1 w-10"
      :show-button="false"
      placeholder=""
    />
    hours per week, I will finish the course by the {{ endDate }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  totalHours: {
    type: Number,
    required: true,
  },
})

const { $dayjs } = useNuxtApp()

const hours = ref(2)

const endDate = computed(() => {
  let weeks = 1
  try {
    weeks = Math.ceil(props.totalHours / hours.value)
  } catch (error) {
    return '...'
  }

  return $dayjs().add(weeks, 'weeks').format('Do of MMMM YYYY')
})
</script>
