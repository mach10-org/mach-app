<template>
  <Suspense>
    <Main />
    <template #fallback>
      <div class="m-auto text-center py-20">
        <span><Spinner /> Loading...</span>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Spinner from '@components/svg/Spinner.vue';

import Main from './Main.vue';
</script>
