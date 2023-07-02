<template>
  <div class="p-4 space-y-10">
    <div class="grid place-content-center">
      <ScheduleDay
        :timeOptions="options"
        v-for="(schedule, index) in scheduleModel"
        :key="index"
        :controlIndex="index"
        :weekday="weekdays[index]"
        :weekdayIndex="(index + weekStart) % 7"
        :control="schedule"
      />
    </div>

    <OButton class="max-w-[450px] m-auto block" variant="primary" size="large" type="submit" @click="submit" :disabled="!isValid || isLoading" expanded>
      <Spinner v-if="isLoading" :size="6" color="white" fill="primary" class="fill-primary" />
      {{ localSchedule.submit }}
    </OButton>
  </div>
</template>
<script lang="ts" setup>
import ScheduleDay from './Item.vue';
import { OButton } from '@oruga-ui/oruga-next';
import Spinner from '@components/svg/Spinner.vue';
import { IOption } from '@models/schedule';
import { computed, ref } from 'vue';
import { setOptions, getTimeZone, convertScheduleToAvailability } from './utils';
import { ScheduleUpsert, schedule, getSchedule, saveSchedule, weekdays, weekStart, setSchedule, DEFAULT_SCHEDULE } from '@stores/scheduler';
import { erroMsg, locales } from '@constants/localize';
import { showToast } from '@utils/notify';

const {
  pages: { schedule: localSchedule },
  notifications: { schedule: localNotif }
} = locales;

const scheduleModel = ref(schedule.get());
const options = ref<IOption[]>(setOptions());
const isLoading = ref(false);
const isValid = computed(() => true);

try {
  const list = await getSchedule('ca8b5e07-f5b1-48fc-81f1-ce8e8267bfb3');
  scheduleModel.value = list ? convertScheduleToAvailability(list) : DEFAULT_SCHEDULE;
  setSchedule(scheduleModel.value);
} catch (error) {}

const submit = async (e: Event) => {
  isLoading.value = true;
  const payload: ScheduleUpsert = {
    id: 'ca8b5e07-f5b1-48fc-81f1-ce8e8267bfb3',
    name: 'My Schedule',
    timeZone: getTimeZone
  };
  e.preventDefault();
  try {
    const res = await saveSchedule(payload);

    showToast({ status: 'success', text: localNotif.success });
  } catch (error) {
    showToast({ status: 'error', text: erroMsg(error?.code) });
  }
  isLoading.value = false;
};
</script>

<style lang="postcss"></style>
