<template>
  <div class="h-[100vh]">
    <div class="absolute w-full">
      <div class="flex items-center justify-center p-8">
        <span class="mr-3 text-2xl sm:text-3xl">👩🏻‍🚀</span>
        <span class="text-text-base self-center whitespace-nowrap text-xl font-semibold"> {{ config.public.siteName }} </span>
      </div>
    </div>

    <Splide ref="splide" :has-track="false" :options="options" :aria-label="$t('pages.onboarding.title')" @splide:move="onSplideMove">
      <div class="my-carousel-progress">
        <div class="my-carousel-progress-bar from-purple-400 to-pink-600 bg-gradient-to-r" />
      </div>

      <n-form
        ref="formRef"
        :model="model"
        size="large"
        @submit.prevent="goNext"
      >
        <SplideTrack>
          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-3xl w-96">
              <n-form-item path="firstname" :label-props="{for: 'firstname'}" :show-feedback="false">
                <template #label>
                  {{ $t('pages.onboarding.form_1_label') }} <small class="text-$text-muted">{{ $t('pages.onboarding.form_1_label_1') }}</small>
                </template>
                <n-input ref="input" v-model:value="model.firstname" :input-props="{id: 'firstname'}" placeholder="" />
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center mt-6">
                <n-button type="primary" :disabled="!model.firstname.trim()" @click="goNext">
                  Next
                </n-button>
              </n-form-item>
            </SplideSlideWrapper>
          </SplideSlide>
        </SplideTrack>
      </n-form>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide'
import { Splide as Core } from '@splidejs/splide'
import { promiseTimeout } from '@vueuse/core'
import {
  FormInst,
  FormItemRule,
  InputInst,
  useMessage,
} from 'naive-ui'
import '@splidejs/vue-splide/css'
import '@splidejs/vue-splide/css/skyblue'
import { useProfileStore } from '~/stores/profile'

definePageMeta({
  layout: 'onboarding',
})

const config = useRuntimeConfig()
const profile = useProfileStore()

const options: Options = {
  drag: false,
  pagination: false,
  rewind: false,
  arrows: false,
  autoplay: false,
  height: 'calc(100vh - 100px)',
  speed: 650,
}

const splide = ref<InstanceType<typeof Splide>>()

const model = ref({
  firstname: '',
})
const { formRef, rules, pending, apiErrors, edited, reset, onSubmit } = useNaiveForm(model)

const showSkip = ref(false)
const showBack = ref(false)

const setBarProgress = (splide: Core) => {
  const bar = splide.root.querySelector('.my-carousel-progress-bar') as HTMLElement
  if (bar) {
    const end = splide.Components.Controller.getEnd() + 1
    const rate = Math.min((splide.index + 1) / end, 1)
    bar.style.width = `${100 * rate}%`
  }
}

const goNext = () => {
  const index = splide?.value?.splide?.index
  if (index === 0) {
    if (model.value.firstname.trim()) {
      splide?.value?.splide?.go('+1')
    }
  } else if (index !== 1 && index !== 6) {
    splide?.value?.splide?.go('+1')
  } else if (index === 6) {
    submit()
  }
}

const goPrev = () => {
  splide?.value?.splide?.go('-1')
}

const onSplideMove = async (splide: Core, index: number) => {
  showSkip.value = index > 1
  showBack.value = index > 2

  setBarProgress(splide)
  if (index === 1) {
    await promiseTimeout(3500)
    splide.go('+1')
  }
}

const submit = async (e: Event | null = null) => {
  e?.preventDefault()
  // const data = profileData.get();
  // const id = user?.value?.id as string;
  // loading.value = true;
  // try {
  //   const { error } = await upsertProfile({ ...data, id });
  //   window.location.assign(`/courses/`);
  // } catch (error) {}
}
</script>
