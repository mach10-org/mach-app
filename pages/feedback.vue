<template>
  <div class="h-[100vh] flex flex-col">
    <div class="h-2 bg-ctp-latte-text dark:bg-ctp-frappe-text">
      <div ref="progressBar" class="h-full super-gradient" />
    </div>
    <div class="">
      <div class="flex items-center justify-center pb-2 pt-8">
        <Brand size="lg" />
      </div>
    </div>

    <Splide
      ref="splide"
      :has-track="false"
      :options="options"
      :aria-label="$t('pages.onboarding.title')"
      class="flex-1"
      @splide:move="onSplideMove"
    >
      <n-form
        ref="formRef"
        :model="model"
        size="large"
        class="h-full"
        @submit.prevent="goNext"
      >
        <SplideTrack>
          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-lg" content-class="flex flex-col">
              <n-form-item :label="$t('pages.feedback.enjoyment_title')" path="enjoyment_rate" :show-feedback="false" class="mx-auto" style="--n-label-padding:0 0 20px 2px; --n-label-font-size: 22px">
                <div class="w-full flex flex-col items-center justify-center pt-1">
                  <div class="mb-4 flex">
                    <span>{{ $t('pages.feedback.not_for_me') }}</span>
                    <span class="mx-4">↔</span>
                    <span>{{ $t('pages.feedback.enjoy_this') }}</span>
                  </div>
                  <n-radio-group v-model:value="model.enjoyment_rate" class="self-center">
                    <div class="flex space-x-3">
                      <div v-for="(value, index) in 5" :key="index">
                        <n-radio :value="index + 1" :label="(index + 1).toString()" />
                      </div>
                    </div>
                  </n-radio-group>
                </div>
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" secondary icon-placement="right" :disabled="model.enjoyment_rate === null" @click="goNext">
                  {{ $t('pages.onboarding.next') }}
                  <template #icon>
                    <Icon name="heroicons:arrow-right-solid" />
                  </template>
                </n-button>
              </n-form-item>
            </SplideSlideWrapper>
          </SplideSlide>

          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-lg" content-class="flex flex-col">
              <n-form-item :label="$t('pages.feedback.difficulty_title')" path="difficulty_rate" :show-feedback="false" class="mx-auto" style="--n-label-padding:0 0 20px 2px; --n-label-font-size: 22px">
                <n-radio-group v-model:value="model.difficulty_rate">
                  <div class="flex space-x-3">
                    <div v-for="(value, index) in difficulties" :key="index">
                      <n-radio :value="index + 1" :label="$rt(value)" />
                    </div>
                  </div>
                </n-radio-group>
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" secondary icon-placement="right" :disabled="model.difficulty_rate === null" @click="goNext">
                  {{ $t('pages.onboarding.next') }}
                  <template #icon>
                    <Icon name="heroicons:arrow-right-solid" />
                  </template>
                </n-button>
              </n-form-item>
            </SplideSlideWrapper>
          </SplideSlide>

          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-lg">
              <n-form-item path="comment" :label="$t('pages.feedback.comment_title')" :label-props="{for: 'comment'}" :show-feedback="false" style="--n-label-font-size: 20px">
                <n-input ref="commentInput" v-model:value="model.comment" type="textarea" :input-props="{id: 'comment'}" placeholder="" />
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="mt-6 flex justify-center">
                <n-button type="primary" secondary :loading="isLoading" @click="goNext">
                  {{ $t('pages.feedback.submit') }}
                </n-button>
              </n-form-item>
            </SplideSlideWrapper>
          </SplideSlide>
        </SplideTrack>
      </n-form>
    </Splide>

    <div class="flex justify-between px-2 pb-8 pt-6 text-base md:px-10">
      <div class="w-30">
        <button v-if="showBack" class="link flex items-center space-x-1" type="button" @click="goPrev">
          <Icon name="heroicons:arrow-left-solid" />
          <span>{{ $t('pages.onboarding.back') }}</span>
        </button>
      </div>
      <div class="w-30 flex justify-end">
        <NuxtLinkLocale to="/" class="link flex items-center space-x-1">
          {{ $t('pages.feedback.go_back_home') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide'
import { Splide as Core } from '@splidejs/splide'
import {
  InputInst,
} from 'naive-ui'
import '@splidejs/vue-splide/css'
import '@splidejs/vue-splide/css/skyblue'
import { VueMessageType } from '@nuxtjs/i18n/dist/runtime/composables'
import { useProfileStore } from '~/stores/profile'

definePageMeta({
  layout: 'onboarding',
})

const profile = useProfileStore()
const i18n = useI18n()
const localePath = useLocalePath()

const options: Options = {
  drag: false,
  pagination: false,
  rewind: false,
  arrows: false,
  autoplay: false,
  height: '100%',
  speed: 650,

}

const splide = ref<InstanceType<typeof Splide>>()
const progressBar = ref<HTMLDivElement | null>(null)
const commentInput = ref<InputInst | null>(null)
const isLoading = ref(false)
const showBack = ref(false)

const model = ref<{
  enjoyment_rate: null | number
  difficulty_rate: null | number
  comment: string
}>({
  enjoyment_rate: null,
  difficulty_rate: null,
  comment: '',
})
const { formRef } = useNaiveForm(model)

const difficulties = computed(() => i18n.tm('pages.feedback.difficulties') as VueMessageType[])

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
  if (index === 2) {
    submit()
  } else {
    splide?.value?.splide?.go('+1')
  }
}

watch(() => [model.value.enjoyment_rate, model.value.difficulty_rate], goNext)

const goPrev = () => {
  splide.value?.splide?.go('-1')
}

const onSplideMove = (_splide: Core, index: number) => {
  showBack.value = index > 0
  setBarProgress()

  if (index === 2) {
    setTimeout(() => {
      commentInput.value?.focus()
    }, options.speed)
  }
}

const submit = async () => {
  isLoading.value = true
  if (model.value.enjoyment_rate !== null && model.value.difficulty_rate !== null) {
    if (await profile.sendFeedback(model.value.enjoyment_rate, model.value.difficulty_rate, model.value.comment)) {
      navigateTo(localePath('/'))
      discreteApi.message.success(i18n.t('pages.feedback.thank_you'))
    }
  }
  isLoading.value = false
}

onMounted(() => {
  setBarProgress()
})

const discreteApi = useDiscreteApi()
</script>

<style lang="postcss" scoped>
.splide__track {
  @apply h-full;
}
</style>
