<template>
  <div class="mb-4 flex w-full flex-col last:mb-0 sm:flex-row sm:px-0">
    <div class="flex h-[36px] items-center justify-between sm:w-32">
      <div>
        <label class="text-default flex flex-row items-center space-x-2">
          <div>
            <div class="flex h-auto w-auto flex-row items-center">
              <OSwitch variant="primary" size="small" v-model="isSwitched" @change="onToggle" />
            </div>
          </div>
          <span class="inline-block min-w-[88px] text-sm capitalize">{{ weekday }}</span>
        </label>
      </div>
    </div>
    <div class="flex sm:ml-2">
      <div>
        <div v-for="(range, index) in control" class="mb-2 flex last:mb-0">
          <div>
            <div class="inline-block w-[100px]">
              <span aria-live="polite" aria-atomic="false" aria-relevant="additions text"></span>
              <div class="flex gap-1">
                <ODropdown
                  ref="dropdownStart"
                  :scrollable="true"
                  :max-height="maxHeight"
                  v-model="controlRange(index).value.timeStart"
                  @change="onChangeTime($event, index, 'start')"
                  aria-role="list"
                  class="w-full"
                >
                  <template #trigger>
                    <div class="text-sm leading-4 rounded-md border py-2 px-3 h-fit">
                      <div class="">{{ controlRange(index)?.value?.timeStart?.label }}</div>
                    </div>
                  </template>

                  <ODropdownItem
                    v-for="option in timeOptions"
                    :itemClass="option.value === controlRange(index).value.timeStart.value ? 'o-drop__item--active' : ''"
                    :key="option.value"
                    :value="option"
                    aria-role="listitem"
                  >
                    <span>{{ option.label }}</span>
                  </ODropdownItem>
                </ODropdown>
              </div>
            </div>
            <span class="text-default mx-2 w-2 self-center"> - </span>
            <div class="inline-block w-[100px] rounded-md">
              <span aria-live="polite" aria-atomic="false" aria-relevant="additions text"></span>
              <div class="flex gap-1">
                <ODropdown :scrollable="true" :max-height="maxHeight" v-model="controlRange(index).value.timeEnd" @change="onChangeTime($event, index, 'end')" aria-role="list" class="w-full">
                  <template #trigger>
                    <div class="text-sm leading-4 rounded-md border py-2 px-3 h-fit">
                      <div class="">{{ controlRange(index)?.value?.timeEnd?.label }}</div>
                    </div>
                  </template>

                  <ODropdownItem
                    v-for="option in timeOptions"
                    :key="option.value"
                    :value="option"
                    aria-role="listitem"
                    :itemClass="option.value === controlRange(index).value.timeEnd.value ? 'o-drop__item--active' : ''"
                  >
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
            @click="index === 0 ? onAdd() : onRemove(index)"
            tooltip="Add new time slot"
            class="items-center text-sm font-medium relative rounded-md transition-colors flex justify-center h-9 px-4 py-2.5 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis min-h-[36px] min-w-[36px] !p-2 text-default mx-2"
            type="button"
            data-state="closed"
          >
            <Icon v-if="index === 0" name="PlusCircleIcon" :outline="true" classes="w-7 h-7 text-slate-500" />
            <Icon v-else name="TrashIcon" :outline="true" classes="w-7 h-6 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OSwitch, ODropdown, ODropdownItem } from '@oruga-ui/oruga-next';
import { computed, onMounted, ref } from 'vue';
import Icon from '@components/DynamicHeroIcon.vue';
import { IOption, TimeRange } from '@models/schedule';
import { defaultDayRange, timeHumanUtc } from './utils';
import { updateSchedule, UpdateSchedule } from '@stores/scheduler';
interface ListItem {
  value: number | Date;
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

const maxHeight = 200;
const { start, end } = defaultDayRange;
const isSwitched = ref(!!props.control?.length);

const controlRange = (index: number) =>
  computed(() => {
    const start = props.control[index]?.start;
    const end = props.control[index]?.end;
    const timeStart = { value: start, label: timeHumanUtc(start, 12) };
    const timeEnd = { value: end, label: timeHumanUtc(end, 12) };

    return { timeStart, timeEnd };
  });

const onRemove = (index: number) => {
  const payload: UpdateSchedule = {
    field: 'remove',
    date: { start, end },
    dayIndex: props.controlIndex,
    index
  };
  updateSchedule(payload);
};

const onAdd = () => {
  const index = props.control.length - 1;
  const payload: UpdateSchedule = {
    field: 'add',
    date: { start: props.control[index].start, end: props.control[index].end },
    dayIndex: props.controlIndex,
    index: index
  };
  updateSchedule(payload);
};

const onToggle = () => {
  const payload: UpdateSchedule = {
    field: isSwitched.value ? 'create' : 'delete',
    date: { start: start, end: end },
    dayIndex: props.controlIndex,
    index: 0
  };
  updateSchedule(payload);
};

const onChangeTime = (item: ListItem, index: number, field: 'start' | 'end') => {
  const payload = {
    dayIndex: props.controlIndex,
    date: item.value,
    field,
    index
  };
  updateSchedule(payload);
};
</script>

<style lang="postcss"></style>
