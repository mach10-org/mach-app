<template>
  <div class="text-lg pt-5 mx-auto text-center">
    <div id="isLoggedIn" v-if="isLoggedIn">
      You are logged in 😎🎉!
      <a href="/logout" class="underline"> Log out </a>
    </div>
    <div id="isNotLoggedIn" v-if="!isLoggedIn">You are not logged in 😔</div>
  </div>
</template>
<script lang="ts" setup>
import { getUser } from '@utils/auth';
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);
console.log('supabase', supabase);
const isLoggedIn = ref(false);
const user = null;
try {
  const access_token = localStorage.getItem('access_token');
  console.log('access_token', access_token);
  const {
    data: { user }
  } = await supabase.auth.getUser(access_token as string);

  //const user = await getUser();
} catch (error) {}

/*
  let element: HTMLElement | null;
  if (user) {
    element = document.getElementById('isLoggedIn');
  } else {
    element = document.getElementById('isNotLoggedIn');
  }
  element?.classList.toggle('hidden');
  console.log('document', document);

*/
</script>
