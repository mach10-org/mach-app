<template>
  <ul class="list-none space-y-8 p-0 text-sm">
    <li v-if="groupedData" class="space-y-4" v-for="(value, key, idx) in groupedData">
      <div class="px-4 py-3 border-l-[4px] border-border-input rounded-md bg-background-page">
        <div>SECTION {{ idx + 1 }}</div>
        <h3 class="m-0 text-text-title">{{ key }}</h3>
      </div>
      <ul class="list-none p-0">
        <li v-for="(item, index) in value" class="flex items-center space-x-3">
          <IconTypes client:only="vue" :done="item?.data?.isDone" :index="index + 1" :isInProgress="item.slug === `${params?.course}/${params?.slug}`" :slug="item.slug" />
          <h4 class="my-0 flex-1">
            <a :href="baseUrl + item.collection + '/' + item.slug" class="line-clamp-1 block"> {{ item.data.title }} </a>
          </h4>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { courseTaken } from '@stores/courses';
import { PropType, onMounted, ref } from 'vue';
import { onSet } from 'nanostores';
import { GroupCourse } from '@models/courses';
import IconTypes from './IconType.vue';

const props = defineProps({
  baseUrl: String,
  grouped: Object as PropType<GroupCourse>,
  params: Object as PropType<{
    course: string;
    slug: string;
  }>
});

const groupedData = ref<GroupCourse>();

onMounted(() => {
  groupedData.value = props.grouped;
});
// await allTasks();
// const courseTakenRes = courseTaken.get();
// console.log('courseTaken', courseTakenRes);

onSet(courseTaken, ({ newValue, abort }) => {
  if (props?.grouped) {
    const listVisible = newValue.find((l) => l.slug === props?.params?.course);

    Object.keys(props.grouped as GroupCourse).forEach((key) => {
      const lessons = (props.grouped as GroupCourse)[key];
      lessons.map((menuItem) => {
        menuItem.data.isDone = listVisible?.learning_lesson.find((l) => menuItem.slug === `${listVisible?.slug}/${l?.slug}`);
        return menuItem;
      });
    });

    groupedData.value = { ...props.grouped };
  }
});
</script>
