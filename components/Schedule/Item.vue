<template>
  <n-form-item :show-label="false">
    <div class="min-h-$n-blank-height w-full flex items-start">
      <div class="flex items-center pt-[6px]">
        <n-switch v-model:value="valueRef.isChecked" />
        <span aria-role="button" class="ml-2 cursor-pointer font-medium" @click="valueRef.isChecked = !valueRef.isChecked">
          {{ dayjs.weekdays()[valueRef.day] }}
        </span>
      </div>
      <n-dynamic-input v-if="valueRef.isChecked" v-model:value="valueRef.list" :min="1" :on-create="onCreate" class="ml-auto !w-auto">
        <template #default="{value}">
          <n-time-picker
            ref="startRef"
            v-model:formatted-value="value.start"
            format="HH:mm"
            :minutes="5"
            :seconds="[0]"
            :placeholder="$t('pages.schedule.startTime')"
            class="mr-2"
          />
          <n-time-picker
            v-model:formatted-value="value.end"
            format="HH:mm"
            :minutes="5"
            :seconds="[0]"
            :placeholder="$t('pages.schedule.endTime')"
          />
        </template>
      </n-dynamic-input>
    </div>
  </n-form-item>
</template>

<script setup lang="ts">
import {
  TimePickerInst,
} from 'naive-ui'

interface Props {
  value:{
    day: number
    isChecked: boolean
    list: Array<{
      start: string | null
      end: string | null
    }>
  }
}
const props = defineProps<Props>()

const valueRef = toRef(props, 'value')
const startRef = ref<TimePickerInst | null>(null)

const onCreate = () => {
  return {
    start: null,
    end: null,
  }
}

if (valueRef.value.list.length === 0) {
  valueRef.value.list.push(onCreate())
}

const dayjs = useDayjs()

const isChecked = computed(() => valueRef.value.isChecked)
watch(isChecked, (value) => {
  if (!value) {
    valueRef.value.list = [onCreate()]
  } else {
    nextTick(() => {
      if (startRef.value) {
        startRef.value.focus()
      }
    })
  }
})

</script>
