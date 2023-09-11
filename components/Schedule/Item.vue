<template>
  <n-form-item :show-label="false" :show-feedback="false">
    <div class="min-h-$n-blank-height w-full flex items-start">
      <div class="flex items-center pt-[6px]">
        <n-switch v-model:value="valueRef.isChecked" />
        <span aria-role="button" class="ml-2 cursor-pointer font-medium" @click="valueRef.isChecked = !valueRef.isChecked">
          {{ dayjs.weekdays()[valueRef.day] }}
        </span>
      </div>
      <n-dynamic-input v-if="valueRef.isChecked" v-model:value="valueRef.list" :min="1" :on-create="onCreate" class="ml-auto !w-auto">
        <template #default="{index, value}">
          <div class="schedule-period-picker flex items-start">
            <n-form-item
              :show-label="false"
              ignore-path-change
              :path="`items[${valueRef.day}]list[${index}].start`"
              :rule="startRule"
            >
              <n-time-picker
                ref="startRef"
                v-model:formatted-value="value.start"
                format="HH:mm"
                :minutes="5"
                :seconds="[0]"
                :placeholder="$t('pages.schedule.startTime')"
                class="mr-2 w-38"
              />
            </n-form-item>
            <n-form-item
              :show-label="false"
              ignore-path-change
              :path="`items[${valueRef.day}]list[${index}].end`"
              :rule="endRule"
            >
              <n-time-picker
                v-model:formatted-value="value.end"
                format="HH:mm"
                :minutes="5"
                :seconds="[0]"
                :placeholder="$t('pages.schedule.endTime')"
                class="w-38"
              />
            </n-form-item>
          </div>
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

const dayjs = useDayjs()
const i18n = useI18n()

const valueRef = toRef(props, 'value')
const startRef = ref<TimePickerInst | null>(null)

const checkPeriod = (start: string, end: string) => {
  const startDay = dayjs(start, 'HH:mm').second(0).millisecond(0)
  const endDay = dayjs(end, 'HH:mm').second(0).millisecond(0)

  if (startDay.isAfter(endDay)) {
    return false
  }

  return true
}

const startRule = {
  trigger: 'blur',
  validator (rule: unknown, value: string) {
    if (value === null) {
      return new Error(i18n.t('pages.schedule.startTimeRequired'))
    }

    const matches = rule.field.match(/list\[(\d+)\]/)
    const index = matches ? parseInt(matches[1]) : 0

    if (!checkPeriod(value, valueRef.value.list[index].end ?? '')) {
      return new Error(i18n.t('pages.schedule.startTimeAfterEndTime'))
    }

    return true
  },
}

const endRule = {
  trigger: 'blur',
  validator (rule: unknown, value: string) {
    if (value === null) {
      return new Error(i18n.t('pages.schedule.endTimeRequired'))
    }

    const matches = rule.field.match(/list\[(\d+)\]/)
    const index = matches ? parseInt(matches[1]) : 0

    if (!checkPeriod(valueRef.value.list[index].start ?? '', value)) {
      return new Error(i18n.t('pages.schedule.endTimeBeforeStartTime'))
    }

    return true
  },
}

const onCreate = () => {
  return {
    start: null,
    end: null,
  }
}

if (valueRef.value.list.length === 0) {
  valueRef.value.list.push(onCreate())
}

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

<style>
.schedule-period-picker .n-form-item-feedback.n-form-item-feedback--error {
  max-width: 145px;
}
</style>
