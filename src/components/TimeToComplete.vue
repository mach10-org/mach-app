<template>
  <div class="text-text-muted text-sm leading-[2.1]">
    If I spend
  <OInput
    type="number"
    v-model="hours"
    size="small"
    class="w-14 mx-1"
    rootClass="inline"
  ></OInput>
    hours per week, I will finish the course by the {{ endDate }}
  </div>
</template>

<script lang="ts" setup>
import { OInput } from "@oruga-ui/oruga-next";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { computed, ref } from "vue";

dayjs.extend(advancedFormat);

const props = defineProps({
  totalHours: {
    type: Number,
    required: true,
  },
});

const hours = ref(2);

const endDate = computed(() => {
  let weeks = 1;
  try {
    weeks = Math.ceil(props.totalHours / hours.value);
  } catch (error) {
    return "...";
  }

  return dayjs().add(weeks, "weeks").format("Do of MMMM YYYY");
});
</script>
