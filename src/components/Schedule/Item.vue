<template>
  <div class="mb-4 flex w-full flex-col last:mb-0 sm:flex-row sm:px-0">
    <div class="flex h-[36px] items-center justify-between sm:w-32">
      <div>
        <label class="text-default flex flex-row items-center space-x-2">
          <div>
            <div class="flex h-auto w-auto flex-row items-center">
              <OSwitch variant="primary" size="small" v-model="isSwitched" />
            </div>
          </div>
          <span class="inline-block min-w-[88px] text-sm capitalize">{{ weekday }}</span>
        </label>
      </div>
    </div>
    <div class="flex sm:ml-2">
      <div>
        <div class="mb-2 flex last:mb-0">
          <div>
            <div class="inline-block w-[100px]">
              <span aria-live="polite" aria-atomic="false" aria-relevant="additions text"></span>
              <div class="flex gap-1">
                <ODropdown :scrollable="true" :max-height="maxHeight" v-model="timeStart" @change="(val) => onChange(val, 'start')" aria-role="list" class="w-full">
                  <template #trigger>
                    <div class="text-sm leading-4 rounded-md border py-2 px-3 h-fit">
                      <div class="">{{ timeStart.label }}</div>
                    </div>
                  </template>

                  <ODropdownItem v-for="(option, index) in timeOptions" :key="index" :value="option" aria-role="listitem">
                    <div class="media">
                      <div class="media-content">
                        <span>{{ option.label }}</span>
                      </div>
                    </div>
                  </ODropdownItem>
                </ODropdown>
              </div>
            </div>
            <span class="text-default mx-2 w-2 self-center"> - </span>
            <div class="inline-block w-[100px] rounded-md">
              <span aria-live="polite" aria-atomic="false" aria-relevant="additions text"></span>
              <div class="flex gap-1">
                <ODropdown :scrollable="true" :max-height="maxHeight" v-model="timeEnd" @change="(val) => onChange(val, 'end')" aria-role="list" class="w-full">
                  <template #trigger>
                    <div class="text-sm leading-4 rounded-md border py-2 px-3 h-fit">
                      <div class="">{{ timeEnd.label }}</div>
                    </div>
                  </template>

                  <ODropdownItem v-for="(option, index) in timeOptions" :key="index" :value="option" aria-role="listitem">
                    <div class="media">
                      <div class="media-content">
                        <span>{{ option.label }}</span>
                      </div>
                    </div>
                  </ODropdownItem>
                </ODropdown>
              </div>
            </div>
          </div>

          <button
            tooltip="Add new time slot"
            class="items-center text-sm font-medium relative rounded-md transition-colors flex justify-center h-9 px-4 py-2.5 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis min-h-[36px] min-w-[36px] !p-2 text-default mx-2"
            type="button"
            data-state="closed"
          >
            <Icon name="PlusCircleIcon" :outline="true" classes="w-7 h-7 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OSwitch, OInput, ODropdown, ODropdownItem, OButton } from '@oruga-ui/oruga-next';
import { computed, onMounted, ref } from 'vue';
import Icon from '@components/DynamicHeroIcon.vue';
import { IOption, TimeRange } from './models';
import moment from 'moment';
import { INCREMENT, defaultDayRange, timeFormat, timeHumanUtc } from './utils';
import { updateSchedule } from '@stores/scheduler';
interface ListItem {
  value: number;
  label: string;
}

const props = defineProps({
  timeOptions: {
    type: Object as () => IOption[],
    required: true
  },
  weekday: {
    type: String,
    required: true
  },
  weekdayIndex: {
    type: Number,
    required: true
  },
  controlIndex: {
    type: Number,
    required: true
  },
  control: {
    type: Object as () => TimeRange[],
    required: true
  }
});

console.log('props', props);
const maxHeight = 200;
const { start, end } = defaultDayRange;
const timeStart = ref<ListItem>({ value: start, label: timeHumanUtc(start, 12) });
const timeEnd = ref<ListItem>({ value: end, label: timeHumanUtc(end, 12) });

const isSwitched = computed(() => !!props.control?.length);

onMounted(() => {
  if (props.control.length) {
    const start = props.control[0]?.start;
    const end = props.control[0]?.end;
    timeStart.value = { value: start, label: timeHumanUtc(start, 12) };
    timeEnd.value = { value: end, label: timeHumanUtc(end, 12) };
  }
});

console.log('timeStart', timeStart);

const onChange = (item: ListItem, field: 'start' | 'end') => {
  console.log('onChange', field, item);

  const res = updateSchedule(props.controlIndex, item.value, field);

  console.log('res', res);
};

// if (props.weekdayIndex === 0) {
//   console.log('props', props);
//   console.log('start', start, timeHumanUtc(start, 12));
//   console.log('timeStart', timeStart);
// }
</script>

<style lang="postcss"></style>
