<template>
  <div class="quiz-section my-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="p-4">
      <h4 class="mt-0">{{ label }}</h4>

      <Option v-for="a in options" :key="a.id" :label="a.label" :id="a.id">
        <input type="radio" :id="a.id" :name="optionsName" :value="a.id" class="hidden peer" v-model="answer" required @change="$emit('update:answer', ($event.target as HTMLInputElement).value)" />
      </Option>
      <div v-if="message">
        <div
          id="toast-simple"
          class="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
        >
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
            :class="{
              'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200': success,
              'text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200': !success
            }"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Check icon</span>
          </div>

          <div class="pl-4 text-sm font-normal">{{ message }}.</div>
        </div>
      </div>
      <div class="flex content-center pt-4">
        <OButton :disabled="!canSubmit" @click="onSubmit" variant="primary" type="submit"> Submit </OButton>
        <div v-if="points" class="flex content-center ml-auto items-center text-sm text-gray-500 dark:text-gray-400">
          <span>
            This would get you +{{ points }}XP
            <span v-if="!$profile">
              <br />
              <a href="/login/" class="link">Signup to track</a> your progress over time, it’s free
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField, OSelect } from '@oruga-ui/oruga-next';

import Option from './OptionDetail.vue';
import { useSlots, computed, ref, onMounted } from 'vue';
import { QuizOption } from '@models/courses';
import { saveAnswer } from '@utils/quiz';
import { isConnected, profile, increasePoints } from '@stores/profile';
import { useStore } from '@nanostores/vue';
const $isConnected = useStore(isConnected);
const $profile = useStore(profile);

const props = defineProps({
  slug: { type: String, required: true },
  label: { type: String, required: true },
  options: {
    type: Object as () => QuizOption[],
    required: true
  }
});
defineEmits(['update:answer']);
// console.log('props quiz', props);

const options = ref<QuizOption[]>([]);
const slots = useSlots();
const optionsName = ref<string>('');
const answer = ref<string | undefined>();
const message = ref<string | undefined>();
const success = ref<boolean | null>(null);
const canSubmit = computed(() => answer.value);
const points = computed(() => options?.value?.find((o) => o.xp)?.xp);

const onSubmit = async () => {
  if (typeof answer.value !== 'undefined') {
    const option: QuizOption = options.value.find((o) => o.id === answer.value) as QuizOption;

    if (!option.isAnswer) {
      message.value = `Incorrect !`;
    } else {
      message.value = `Correct !`;
    }
    success.value = option.isAnswer || false;
    message.value = `${message.value} ${option.explain}`;
    const points = await saveAnswer(option, props.slug);
    increasePoints(points);
  }
};

onMounted(() => {
  if (props.options) {
    optionsName.value = 'props-answer';
    options.value = parseList(props.options, 'props');
  } else if (slots?.default) {
    optionsName.value = 'slots-answer';
    slots?.default().map((vNode) => {
      const strObj = vNode?.props?.value.trim();
      if (strObj) {
        const OptionsStr = `[${strObj}]`;
        try {
          const list: QuizOption[] = JSON.parse(OptionsStr.replace('},]', '}]'));
          options.value = parseList(list, 'slots');
        } catch (error) {}
      }
    });
  }
});

const parseList = (list: QuizOption[], type: 'slots' | 'props') =>
  list.map((o, idx) => {
    o.id = `${idx}-${type}`;
    return o;
  });
</script>
