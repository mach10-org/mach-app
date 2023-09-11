<template>
  <n-form-item>
    <n-switch v-model:value="valueRef.isChecked" />
    <span>{{ dayjs.weekdays()[valueRef.day] }}</span>
    <n-dynamic-input v-if="valueRef.isChecked" v-model:value="valueRef.list" :min="1" :on-create="onCreate">
      <template #default="{value}">
        <n-time-picker
          v-model:formatted-value="value.start"
          :minutes="15"
          :seconds="[0]"
        />
        <n-time-picker
          v-model:formatted-value="value.end"
          :minutes="15"
          :seconds="[0]"
        />
      </template>
    </n-dynamic-input>
  </n-form-item>
</template>

<script setup lang="ts">
interface Props {
  value:{
    day: number
    isChecked: boolean
    list: Array<{
      start: string
      end: string
    }>
  }
}
const props = defineProps<Props>()

const valueRef = toRef(props, 'value')

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

</script>
