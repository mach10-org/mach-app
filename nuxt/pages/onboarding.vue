<template>
  <div class="h-[100vh] flex flex-col">
    <div class="h-2 bg-gray-300">
      <div ref="progressBar" class="h-full from-purple-400 to-pink-600 bg-gradient-to-r" />
    </div>
    <div class="">
      <div class="flex items-center justify-center pb-2 pt-8">
        <span class="mr-3 text-2xl sm:text-3xl">👩🏻‍🚀</span>
        <span class="text-text-base self-center whitespace-nowrap text-xl font-semibold"> {{ config.public.siteName }} </span>
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
            <SplideSlideWrapper inner-class="max-w-3xl w-96">
              <n-form-item path="firstname" :label-props="{for: 'firstname'}" :show-feedback="false" style="--n-label-font-size: 20px">
                <template #label>
                  {{ $t('pages.onboarding.form_1_label') }} <small class="text-$text-muted">{{ $t('pages.onboarding.form_1_label_1') }}</small>
                </template>
                <n-input ref="firstnameInput" v-model:value="model.firstname" :input-props="{id: 'firstname'}" placeholder="" />
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
            <SplideSlideWrapper inner-class="max-w-lg" content-class="flex flex-col">
              <n-form-item :label="$t('pages.onboarding.form_3_label')" path="goals" :show-feedback="false" class="mx-auto" style="--n-label-padding:0 0 20px 2px; --n-label-font-size: 22px">
                <n-checkbox-group v-model:value="model.goals">
                  <n-grid :y-gap="10" :x-gap="14" :cols="2">
                    <n-gi v-for="(value, index) in goalsList" :key="index">
                      <n-checkbox :value="$rt(value)" :label="$rt(value)" />
                    </n-gi>
                  </n-grid>
                </n-checkbox-group>
              </n-form-item>
              <p class="text-center text-lg font-medium text-$text-muted">
                {{ $t('pages.onboarding.form_3_help') }}
              </p>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" icon-placement="right" @click="goNext">
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
              <n-form-item :label="$t('pages.onboarding.form_4_label')" path="computerXp" :show-feedback="false" class="mx-auto" style="--n-label-padding:0 0 20px 2px; --n-label-font-size: 22px">
                <n-radio-group v-model:value="model.computerXp">
                  <n-grid :y-gap="10" :cols="1">
                    <n-gi v-for="(value, index) in computerXpList" :key="index">
                      <n-radio :value="$rt(value)" :label="$rt(value)" />
                    </n-gi>
                  </n-grid>
                </n-radio-group>
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" icon-placement="right" @click="goNext">
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
              <n-form-item :label="$t('pages.onboarding.form_5_label')" path="devices" :show-feedback="false" class="mx-auto" style="--n-label-padding:0 0 20px 2px; --n-label-font-size: 22px">
                <n-checkbox-group v-model:value="model.devices">
                  <n-grid :y-gap="10" :x-gap="14" :cols="2">
                    <n-gi v-for="(value, index) in devicesList" :key="index">
                      <n-checkbox :value="$rt(value)" :label="$rt(value)" />
                    </n-gi>
                  </n-grid>
                </n-checkbox-group>
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" icon-placement="right" @click="goNext">
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
              <n-form-item :label="$t('pages.onboarding.form_6_label')" path="age" :show-feedback="false" class="mx-auto" style="--n-label-padding:0 0 20px 2px; --n-label-font-size: 22px">
                <n-radio-group v-model:value="model.age">
                  <n-grid :y-gap="10" :cols="1">
                    <n-gi v-for="(value, index) in agesList" :key="index">
                      <n-radio :value="$rt(value)" :label="$rt(value)" />
                    </n-gi>
                  </n-grid>
                </n-radio-group>
              </n-form-item>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" icon-placement="right" @click="goNext">
                  {{ $t('pages.onboarding.next') }}
                  <template #icon>
                    <Icon name="heroicons:arrow-right-solid" />
                  </template>
                </n-button>
              </n-form-item>
            </SplideSlideWrapper>
          </SplideSlide>

          <SplideSlide>
            <SplideSlideWrapper inner-class="max-w-3xl">
              <h2 class="mb-10 from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl">
                {{ $t('pages.onboarding.form_7') }}
              </h2>
              <n-form-item :show-label="false" :show-feedback="false" class="flex justify-center">
                <n-button type="primary" icon-placement="right" :loading="isLoading" @click="submit">
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

    <div class="flex justify-between px-2 pb-8 pt-6 text-base md:px-10">
      <div class="w-24">
        <button v-if="showBack" class="link flex items-center space-x-1" type="button" @click="goPrev">
          <Icon name="heroicons:arrow-left-solid" />
          <span>{{ $t('pages.onboarding.back') }}</span>
        </button>
      </div>
      <n-popover class="max-w-sm" trigger="click">
        <template #trigger>
          <button class="link" type="button">
            {{ $t('pages.onboarding.why_btn') }}
          </button>
        </template>
        <div class="prose">
          <p>
            {{ $t('pages.onboarding.why_text_1') }}
          </p>
          <p>
            {{ $t('pages.onboarding.why_text_2') }}
          </p>
        </div>
      </n-popover>
      <div class="w-24 flex justify-end">
        <button v-if="showSkip" class="link flex items-center space-x-1" type="button" @click="submit">
          {{ $t('pages.onboarding.skip') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide'
import { Splide as Core } from '@splidejs/splide'
import { promiseTimeout } from '@vueuse/core'
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

const config = useRuntimeConfig()
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
const firstnameInput = ref<InputInst | null>(null)
const isLoading = ref(false)

const model = ref({
  firstname: '',
  goals: [],
  computerXp: '',
  devices: [],
  age: '',
})
const { formRef } = useNaiveForm(model)

const showSkip = ref(false)
const showBack = ref(false)
const goalsList = computed(() => i18n.tm('pages.onboarding.form_3_list') as VueMessageType[])
const computerXpList = computed(() => i18n.tm('pages.onboarding.form_4_list') as VueMessageType[])
const devicesList = computed(() => i18n.tm('pages.onboarding.form_5_list') as VueMessageType[])
const agesList = computed(() => i18n.tm('pages.onboarding.form_6_list') as VueMessageType[])

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

watch(() => [model.value.computerXp, model.value.age], goNext)

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

const submit = async () => {
  isLoading.value = true
  if (await profile.saveOnboarding(model.value.firstname, model.value.goals, model.value.computerXp, model.value.devices, model.value.age)) {
    navigateTo(localePath('/courses'))
  }
  isLoading.value = false
}

const isLoadingProfile = computed(() => profile.isLoading)

onMounted(async () => {
  await until(isLoadingProfile).toBe(false)
  if (profile.isOnBoarded) {
    navigateTo(localePath('/courses'))
    return
  }

  setBarProgress()
  if (firstnameInput.value) {
    firstnameInput.value.focus()
  }
})

definePageMeta({
  middleware: 'auth',
})
</script>

<style lang="postcss" scoped>
.splide__track {
  @apply h-full;
}
</style>
