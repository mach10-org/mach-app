<template>
  <div
    class="quiz-section m-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-4">
      <h4>{{ label }}</h4>

      <Option v-for="a in options" :key="a.id" :label="a.label" :explain="a.explain" :id="a.id" />

      <!-- <div ref="el">
        <slot />
      </div> -->

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Option from './OptionDetail.vue';
import { useSlots, ref, computed, onMounted } from 'vue';
// const el = ref();
const slots = useSlots();
defineProps({ label: String });
const options = ref<Option[]>([]);

interface Option {
  label: string;
  isAnswer?: boolean;
  xp?: string;
  explain?: string;
  id: string;
}

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
