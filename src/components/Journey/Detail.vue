<template>
  <div class="border border-border-input rounded">
    <div
      @click="isOpen = !isOpen"
      :id="course.slug + '-heading'"
      class="group h-16 cursor-pointer flex w-full items-center px-4 bg-background-base rounded-2xl"
    >
      <div class="w-1/3 items-center flex gap-4">
        <DynamicDevIcon
          :name="iconName"
          style="normal"
          class="hidden sm:flex"
        />
        <span class="text-text-title truncate">{{ course.title }}</span>
      </div>

      <div class="grow flex items-center pl-2">
        <div
          class="w-full rounded-full h-2.5 group-hover:h-4 transition-height duration-200 bg-border-input"
        >
          <div
            class="bg-gradient-to-r from-purple-400 to-pink-600 h-full rounded-full"
            :style="{ width: percentage + '%' }"
          ></div>
        </div>
        <span class="text-right font-bold w-24 mx-8"
          >{{
            ((course.learning_lesson.length / course.quantity) * 100).toFixed(
              2
            )
          }}%</span
        >
      </div>

      <span
        class="ml-auto shrink-0 transition-all duration-200 transform text-link"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        }"
      >
        <Icon name="ChevronDownIcon" :outline="false" classes="w-6 h-6" />
      </span>
    </div>
    <div
      v-show="isOpen"
      :id="'#' + course.slug + '-body'"
      :aria-labelledby="course.slug + '-heading'"
      class="md:grid-cols-2 mx-auto pb-6 px-6"
      :class="{ grid: isOpen }"
    >
      <div
        class="flex items-center justify-center flex-col py-4 border-b md:border-r md:border-b-0 border-border-input"
      >
        <Icon
          name="ChartBarIcon"
          :outline="false"
          classes="w-10 h-10 text-text-muted mb-1"
        />
        <h4 class="text-2xl text-text-title font-medium">Last 14 days</h4>
        <p class="text-center">
          <strong
            >{{ qtyLastWeeks }} / {{ course.quantity }} ({{
              ((qtyLastWeeks / course.quantity) * 100).toFixed(2)
            }}%)</strong
          >
          <span class="text-text-muted ml-2">exercises completed</span>
        </p>
      </div>
      <div class="flex items-center justify-center flex-col py-4">
        <Icon
          name="ArrowLeftOnRectangleIcon"
          :outline="false"
          classes="w-10 h-10 text-text-muted mb-1"
        />
        <h4 class="text-center text-2xl leading-7 font-medium">
          {{ moment(course.created_at).format("LL") }}
        </h4>
        <p class="text-center text-text-muted">When you started the course</p>
      </div>
      <div class="col-span-2 text-center pt-4">
        <a :href="`/courses/${course.slug}/`" class="link">Go to course</a>
        <!-- TODO go to next chapter? -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DynamicDevIcon from "@components/DynamicDevIcon/index.vue";
import moment from "moment";
import Icon from "@components/DynamicHeroIcon.vue";
import { Learning } from "@stores/courses";
import { computed, ref } from "vue";

const props = defineProps({
  course: {
    type: Object as () => Learning,
    required: true,
  },
});

const periodStart = moment().subtract(2, "weeks").startOf("day");

const qtyLastWeeks = computed(() => {
  const lessons = props.course.learning_lesson.filter((l) =>
    moment(l.updated_at).isSameOrAfter(periodStart)
  );
  return lessons.length;
});

const percentage = computed(
  () => (props.course.learning_lesson.length / props.course.quantity) * 100
);
const iconName = computed(() => {
  let name = "dev";
  switch (props.course.slug) {
    case "golang-book":
      name = "go";
      break;
    case "dotnet":
      name = "go";
      break;
    default:
      name = "dev";
      break;
  }
  return name;
});

const isOpen = ref(false);
</script>
