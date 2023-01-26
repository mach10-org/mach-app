<template>
  <div
    class="quiz-section my-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-4">
      <h4>{{ label }}</h4>

      <Option
        client:only="vue"
        v-model:answer="answer"
        v-for="a in options"
        :key="a.id"
        :label="a.label"
        :explain="a.explain"
        :id="a.id"
      />
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
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Check icon</span>
          </div>

          <div class="pl-4 text-sm font-normal">{{ message }}.</div>
        </div>
      </div>
      <button
        @click="onSubmit"
        type="submit"
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Option from './OptionDetail.vue';
import { useSlots, ref, onMounted, watch } from 'vue';
defineProps({ label: String });
const options = ref<Option[]>([]);
const slots = useSlots();
const answer = ref<string | undefined>();
const message = ref<string | undefined>();
const success = ref<boolean | null>(null);

// watch(answer, (val) => {
//   console.log('answer PARENT', val, answer.value);
// });

interface Option {
  label: string;
  isAnswer?: boolean;
  xp?: string;
  explain?: string;
  id: string;
}

const onSubmit = () => {
  if (typeof answer.value !== 'undefined') {
    const option: Option = options.value[answer.value];
    if (!option.isAnswer) {
      message.value = `Incorrect !`;
    } else {
      message.value = `Correct !`;
    }
    success.value = option.isAnswer || false;
    message.value = `${message.value} ${option.explain}`;

    console.log('onSubmit answer', message.value, option);
  }
};

// const slotText = computed(() => {
//   return typeof slots && slots.default ? slots.default()[0].children : null; // This is the interesting line
// });
onMounted(() => {
  // console.log('el.value)', el.value);
  if (slots?.default) {
    slots?.default().map((vNode) => {
      const strObj = vNode?.props?.value.trim();
      if (strObj) {
        const OptionsStr = `[${strObj}]`;
        try {
          const list = JSON.parse(OptionsStr.replace('},]', '}]'));
          options.value = list.map((o, idx) => {
            o.id = idx;
            return o;
          });
        } catch (error) {}
      }
      // if (!vNode.componentOptions) return false;
      // return Boolean(vNode.componentOptions.propsData.active);
    });
  }

  // console.log('slots.default()', slots.default()[0].props.value);
  // slots.default().map(vnode => (vnode.text || vnode.elm.innerText)).join('');
  // console.log('slotText', slotText);
});
</script>
