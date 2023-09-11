<template>
  <n-form-item :label="$t('pages.schedule.timezone')" :show-feedback="false">
    <n-select v-model:value="timeZone" filterable class="w-full" :options="listTimeZones" />
  </n-form-item>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'

interface TimeZoneItem {
  label: string
  utc: string
  value: string
}

const emit = defineEmits(['updated'])

const dayjs = useDayjs()
const profile = useProfileStore()

const listTimeZones = computed<TimeZoneItem[]>(() => _orderBy(
  Intl.supportedValuesOf('timeZone').map((tz: any) => {
    const utc = `${dayjs.tz(new Date(), tz).format('Z')}` as string

    return {
      label: `(UTC${utc}) ${tz}`,
      value: tz,
      utc,
    }
  }),
  ['utc'],
  ['asc'],
))

const timeZone = ref(profile.timezone)

watch(timeZone, async (value) => {
  if (await profile.saveTimezone(value)) {
    emit('updated')
  }
})
</script>
