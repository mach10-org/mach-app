<template>
  <div class="h-[100vh]">
    <div class="absolute w-full">
      <div class="flex items-center justify-center p-8">
        <span class="mr-3 text-2xl sm:text-3xl">👩🏻‍🚀</span>
        <span class="text-text-base self-center whitespace-nowrap text-xl font-semibold"> {{ config.public.siteName }} </span>
      </div>
    </div>

    <Splide ref="splide" :has-track="false" :options="options" :aria-label="$t('pages.onboarding.title')" @splide:move="onSplideMove">
      <div class="h-2 bg-gray-300">
        <div ref="progressBar" class="h-full from-purple-400 to-pink-600 bg-gradient-to-r" />
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
              <n-form-item :show-label="false" :show-feedback="false" class="mt-6 flex justify-center">
                <n-button type="primary" :disabled="!model.firstname.trim()" icon-placement="right" @click="goNext">
                  {{ $t('pages.onboarding.next') }}
                  <template #icon>
                    <Icon name="heroicons:arrow-right-solid" />
                  </template>
                </n-button>
              </n-form-item>
            </SplideSlideWrapper>
          </SplideSlide>

          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-3xl" content-class="text-center">
              <div>
                <h2 class="mb-2 from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl">
                  {{ $t('pages.onboarding.form_2', {firstname: model.firstname}) }}!
                </h2>
                <p class="text-8xl text-pink-600">
                  ☺
                </p>
              </div>
            </SplideSlideWrapper>
          </SplideSlide>

          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-2xl" content-class="flex flex-col">
              <n-form-item :label="$t('pages.onboarding.form_3_label')" path="firstname" :label-props="{for: 'goals'}" :show-feedback="false" class="mx-auto">
                <n-checkbox-group>
                  <n-grid :y-gap="10" :cols="2">
                    <n-gi v-for="(value, index) in goalsList" :key="index">
                      <n-checkbox :value="$rt(value)" :label="$rt(value)" />
                    </n-gi>
                  </n-grid>
                </n-checkbox-group>
              </n-form-item>
              <p class="mt-6 text-center text-lg font-medium text-$text-muted">
                {{ $t('pages.onboarding.form_3_help') }}
              </p>
              <n-form-item :show-label="false" :show-feedback="false" class="mt-6 flex justify-center">
                <n-button type="primary" icon-placement="right" @click="goNext">
                  {{ $t('pages.onboarding.next') }}
                  <template #icon>
                    <Icon name="heroicons:arrow-right-solid" />
                  </template>
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
import { VueMessageType } from '@nuxtjs/i18n/dist/runtime/composables'
import { useProfileStore } from '~/stores/profile'

definePageMeta({
  layout: 'onboarding',
})

const config = useRuntimeConfig()
const profile = useProfileStore()
const i18n = useI18n()

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
const progressBar = ref<HTMLDivElement | null>(null)

const model = ref({
  firstname: '',
  goals: [],
})
const { formRef, rules, pending, apiErrors, edited, reset, onSubmit } = useNaiveForm(model)

const showSkip = ref(false)
const showBack = ref(false)
const goalsList = computed(() => i18n.tm('pages.onboarding.form_3_list') as VueMessageType[])

const setBarProgress = () => {
  if (splide.value && splide.value.splide) {
    const sp = splide.value.splide

    if (progressBar.value) {
      const end = sp.Components.Controller.getEnd() + 1
      const rate = Math.min((sp.index + 1) / end, 1)
      progressBar.value.style.width = `${100 * rate}%`
    }
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
  splide.value?.splide?.go('-1')
}

const onSplideMove = async (splide: Core, index: number) => {
  showSkip.value = index > 1
  showBack.value = index > 2

  setBarProgress()
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

onMounted(async () => {
  setBarProgress()
})
</script>
