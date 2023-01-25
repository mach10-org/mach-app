<template>
  <div
    class="quiz-section m-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-4">
      <h4>{{ label }}</h4>
      <slot id="my-id" />
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>

      <!-- <template slot-scope="{ signal }">
        <option :signal="'foo'"></option>
      </template> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, ref, computed, onMounted } from 'vue';

const slots = useSlots();
const props = defineProps({ label: String });

const slotText = computed(() => {
  return typeof slots && slots.default ? slots.default()[0].children : null; // This is the interesting line
});
onMounted(() => {
  // console.log('slots.default()', slots.default());
  // slots.default().map(vnode => (vnode.text || vnode.elm.innerText)).join('');
  console.log('slotText', slotText);
  console.log('props', props);
});
</script>
