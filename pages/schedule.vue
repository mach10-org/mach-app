<template>
  <div class="mx-auto mb-8 mt-4 min-h-[60vh] max-w-screen-sm bg-$background-base p-4 lg:mt-8 lg:p-6">
    <h1 class="mb-4 text-center text-2xl lg:mb-8 md:text-4xl">
      <span class="from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text font-extrabold text-transparent">{{ $t('pages.schedule.title') }}</span>
    </h1>

    <ClientOnly>
      <div>
        <ScheduleTimezone @updated="save" />
        <div class="mt-5 border-t border-$border-input pt-5" />
        <n-form ref="formRef" :model="model" class="space-y-3">
          <ScheduleItem v-for="(item, index) in model.items" :key="item.day" v-model:value="model.items[index]" />
        </n-form>
        <n-button
          type="primary"
          secondary
          size="large"
          class="mt-7 w-full"
          :loading="pending"
          @click="onSubmit(save)"
        >
          Save
        </n-button>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'
import { useScheduleStore } from '~/stores/schedule'

definePageMeta({
  middleware: 'auth',
})

const dayjs = useDayjs()
const schedule = useScheduleStore()
const profile = useProfileStore()
const i18n = useI18n()

interface Item {
    day: number;
    isChecked: boolean;
    list: {
        start: string;
        end: string;
    }[];
}

const isLoadingProfile = computed(() => profile.isLoading)

const model = ref<{items: Item[]}>({ items: [] })

const { formRef, onSubmit, pending } = useNaiveForm(model)

const getItems = () => {
  // Init
  const items = dayjs.weekdays().map((_d, index) => ({
    day: index,
    isChecked: false,
    list: [] as Array<{
      start: string
      end: string
    }>,
  }))

  schedule.list.forEach((item) => {
    const start = dayjs.utc(item.start, 'HH:mm:ss').isoWeekday(item.day).tz(profile.timezone)
    const period = {
      start: start.format('HH:mm'),
      end: dayjs.utc(item.end, 'HH:mm:ss').tz(profile.timezone).format('HH:mm'),
    }

    // Get the day after converting to the user's timezone
    const dayPeriod = start.day()

    items[dayPeriod].isChecked = true
    items[dayPeriod].list.push(period)
  })

  return items
}

onMounted(async () => {
  await until(isLoadingProfile).toBe(false)
  model.value.items = getItems()
})

const discreteApi = useDiscreteApi()

const save = async () => {
  const list: Array<{
    day: number
    start: string
    end: string
  }> = []

  model.value.items.forEach((item) => {
    if (item.isChecked) {
      item.list.forEach((time) => {
        if (!time.start || !time.end) { return }

        // Convert to UTC
        const start = dayjs(time.start, 'HH:mm').second(0).day(item.day).tz(profile.timezone, true).utc()
        const end = dayjs(time.end, 'HH:mm').second(0).day(item.day).tz(profile.timezone, true).utc()

        list.push({
          day: start.isoWeekday(),
          start: start.format('HH:mm:ss'),
          end: end.format('HH:mm:ss'),
        })
      })
    }
  })

  if (await schedule.save(list)) {
    discreteApi.message.success(i18n.t('pages.schedule.successfullySaved'))
  }
}
</script>
