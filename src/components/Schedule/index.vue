<template>
  <div class="p-4">
    <!-- <ScheduleDay :timeOptions="options" v-for="(weekday, num) in weekdays" :key="num" :weekday="weekday" :weekdayIndex="(num + weekStart) % 7" /> -->
    <ScheduleDay
      :timeOptions="options"
      v-for="(schedule, index) in scheduleModel"
      :key="index"
      :controlIndex="index"
      :weekday="weekdays[index]"
      :weekdayIndex="(index + weekStart) % 7"
      :control="schedule"
    />

    <!-- 
    {weekdayNames(i18n.language, weekStart, "long").map((weekday, num) => {
        const weekdayIndex = (num + weekStart) % 7;
        const dayRangeName = `${name}.${weekdayIndex}` as ArrayPath<TFieldValues>;
        return (
          <ScheduleDay
            name={dayRangeName}
            key={weekday}
            weekday={weekday}
            control={control}
            CopyButton={<CopyButton weekStart={weekStart} getValuesFromDayRange={dayRangeName} />}
          />
        );
      })} -->
  </div>
  <OButton variant="primary" size="large" type="submit" @click="submit" :disabled="!isValid || isLoading" expanded>
    <Spinner v-if="isLoading" :size="6" color="white" fill="primary" class="fill-primary" />
    {{ localSchedule.submit }}
  </OButton>
</template>
<script lang="ts" setup>
import ScheduleDay from './Item.vue';
import { OButton } from '@oruga-ui/oruga-next';
import Spinner from '@components/svg/Spinner.vue';
import { IOption } from './models';
import { computed, onMounted, ref } from 'vue';
import { setOptions, weekdayNames, getTimeZone } from './utils';
import { ScheduleUpsert, schedule, getSchedule, saveSchedule, weekdays, weekStart } from '@stores/scheduler';
import { locales } from '@constants/localize';
import { useVModel } from '@nanostores/vue';

const {
  pages: { schedule: localSchedule },
  notifications: { schedule: localNotif }
} = locales;

const scheduleModel = schedule.get();
const options = ref<IOption[]>([]);
const isLoading = ref(false);
const isValid = computed(() => true);

onMounted(() => {
  options.value = setOptions();
});

try {
  const list = await getSchedule('ca8b5e07-f5b1-48fc-81f1-ce8e8267bfb3');
  console.log('list');
} catch (error) {}

const submit = async (e: Event) => {
  console.log('scheduleModel', scheduleModel);

  return;
  const payload: ScheduleUpsert = {
    id: 'ca8b5e07-f5b1-48fc-81f1-ce8e8267bfb3',
    name: 'My Schedule',
    timeZone: getTimeZone
  };

  console.log('payload', payload);

  const res = await saveSchedule(payload);

  console.log('res', res);

  e.preventDefault();
  try {
  } catch (error) {}
};
</script>

<style lang="postcss"></style>
