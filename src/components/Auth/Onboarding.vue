<template>
  <div class="fullscreen-onboarding bg-background-page">
    <div class="absolute w-full" v-if="siteName">
      <div class="flex items-center justify-center p-8">
        <span class="text-2xl mr-3 sm:text-3xl">👩🏻‍🚀</span>
        <span class="self-center font-semibold whitespace-nowrap text-text-base text-xl"> {{ siteName }} </span>
      </div>
    </div>
    <div v-if="!profileLoaded" class="m-auto h-[calc(100vh_-_30rem)] text-center py-20 justify-center flex items-center">
      <span><Spinner />{{ common.loading }}</span>
    </div>
    <div v-else>
      <Splide ref="splide" :has-track="false" :options="options" aria-label="Vue Splide Example" @splide:move="onSplideMove">
        <div class="my-carousel-progress">
          <div class="my-carousel-progress-bar bg-gradient-to-r from-purple-400 to-pink-600"></div>
        </div>

        <form class="form mt-10" @submit.prevent="goNext">
          <SplideTrack>
            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-3xl w-96">
                <OField labelClass="mb-4 text-xl">
                  <template #label labelFor="full_name">
                    {{ localPage.form_1_label }}
                    <span class="text-xs text-text-muted">{{ localPage.form_1_label_1 }}</span>
                  </template>
                  <div class="relative w-full">
                    <OInput type="text" size="large" v-model="full_nameModel" id="full_name" :placeholder="localPage.form_1_placeholder" />
                    <button
                      @click="goNext"
                      :disabled="!full_nameModel"
                      type="button"
                      class="absolute z-10 h-full right-1 bottom-0 rounded-lg p-2 text-center inline-flex items-center focus:ring-4 focus:ring-link/70 focus:outline-none hover:text-link"
                    >
                      <span class="sr-only">Submit</span>
                      <Icon name="ArrowRightIcon" :outline="true" classes="h-7 h-7" />
                    </button>
                  </div>
                </OField>
              </SplideSlideWrapper>
            </SplideSlide>

            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-3xl" content-class="text-center">
                <div>
                  <h2 class="text-center text-2xl md:text-4xl mb-2 text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{ localPage.form_2(full_nameModel) }}!</h2>
                  <p class="text-8xl text-pink-600">☺</p>
                </div>
              </SplideSlideWrapper>
            </SplideSlide>

            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-2xl">
                <OField labelClass="mb-4 text-xl" class="max-w-lg mx-auto" :label="localPage.form_3_label">
                  <div class="grid grid-cols-2 gap-2">
                    <div v-for="(value, index) in goalsList">
                      <OCheckbox :key="index" v-model="goalModel" :native-value="value">
                        {{ value }}
                      </OCheckbox>
                    </div>
                  </div>
                </OField>
                <h2 class="text-center text-xl my-10 text-slate-400 font-bold">
                  {{ localPage.form_3_help }}
                </h2>
                <OButton class="m-auto flex" variant="primary" @click="goNext" size="large">{{ common.next }}</OButton>
              </SplideSlideWrapper>
            </SplideSlide>

            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-3xl w-96">
                <OField labelClass="mb-4 text-xl" :label="localPage.form_4_label" labelFor="computer_xp">
                  <OSelect size="large" @change="goNext" id="computer_xp" v-model="computer_xpModel" :placeholder="common.choose" expanded>
                    <option v-for="(value, index) in computerXpList" :value="value">{{ value }}</option>
                  </OSelect>
                </OField>
              </SplideSlideWrapper>
            </SplideSlide>

            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-3xl w-96">
                <OField labelClass="mb-4 text-xl" :label="localPage.form_5_label">
                  <div class="grid grid-cols-2 gap-2">
                    <div v-for="(value, index) in deviceList">
                      <OCheckbox :key="index" v-model="devicesModel" :native-value="value">
                        {{ value }}
                      </OCheckbox>
                    </div>
                  </div>
                </OField>
                <OButton class="m-auto flex my-10" variant="primary" @click="goNext" size="large">{{ common.next }}</OButton>
              </SplideSlideWrapper>
            </SplideSlide>

            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-3xl w-96">
                <OField labelClass="mb-4 text-xl" :label="localPage.form_6_label" labelFor="age">
                  <OSelect size="large" @change="goNext" id="age" v-model="ageModel" :placeholder="common.choose" expanded>
                    <option v-for="(value, index) in ageList" :value="value">{{ value }}</option>
                  </OSelect>
                </OField>
              </SplideSlideWrapper>
            </SplideSlide>

            <SplideSlide>
              <SplideSlideWrapper inner-class="max-w-3xl">
                <h2 class="text-center text-2xl md:text-4xl mb-10 text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {{ localPage.form_7 }}
                </h2>
                <OButton class="m-auto flex" variant="primary" @click="submit" :disabled="loading" size="large">{{ common.next }}</OButton>
              </SplideSlideWrapper>
            </SplideSlide>
          </SplideTrack>
        </form>
      </Splide>

      <div class="justify-between flex px-2 md:px-10">
        <div class="w-24 justify-start flex">
          <button @click="goPrev" v-if="showBack" class="link link-back flex items-center space-x-1" type="button">
            <Icon name="ArrowLeftIcon" :outline="true" classes="h-5 h-5" />
            <span>Back</span>
          </button>
        </div>
        <div class="w-24 justify-center flex">
          <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" data-modal-backdrop="static" class="link m-auto flex" type="button">Why we ask</button>
        </div>
        <div class="w-24 justify-end flex">
          <button @click="submit" v-if="showSkip" class="link link-skip flex items-center space-x-1" type="button">
            <span>Skip</span>
            <Icon name="ArrowTopRightOnSquareIcon" :outline="true" classes="h-5 h-5" />
          </button>
        </div>
      </div>

      <div
        id="popup-modal"
        data-modal-backdrop="static"
        tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen bg-slate-900 bg-opacity-50"
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 space-y-6">
              <h3 class="text-2xl font-medium text-primary text-center dark:text-white">{{ localPage.why_title }}</h3>

              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ localPage.why_text_1 }}
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ localPage.why_text_2 }}
              </p>
              <button data-modal-hide="popup-modal" type="button" class="link flex m-auto">
                {{ localPage.why_btn }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <OverlayLoader :show="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide';
import { Splide as Core } from '@splidejs/splide';
import { OButton, OInput, OField, OSelect, OCheckbox } from '@oruga-ui/oruga-next';
import Icon from '@components/DynamicHeroIcon.vue';
import OverlayLoader from '@components/OverlayLoader.vue';
import SplideSlideWrapper from '@components/Auth/SplideSlideWrapper.vue';
import { computed, onMounted, ref } from 'vue';
import { useVModel } from '@nanostores/vue';
import { upsertProfile, profile, profileData } from '@stores/profile';
import { sleep } from '@utils/index';
import { User } from '@utils/auth';
import { initModals } from 'flowbite';
import Spinner from '@components/svg/Spinner.vue';
import '@splidejs/vue-splide/css';
import '@splidejs/vue-splide/css/skyblue';
import { locales } from '@constants/localize';
const {
  pages: { onboarding: localPage },
  common
} = locales;

defineProps({
  siteName: String
});

const profileModel = useVModel(profileData, ['full_name', 'computer_xp', 'goal', 'devices', 'age']);

const { full_nameModel, computer_xpModel, goalModel, devicesModel, ageModel } = profileModel;
const splide = ref<InstanceType<typeof Splide>>();
const loading = ref(false);
const showSkip = ref(false);
const showBack = ref(false);
const user = ref<User | null>(null);
const xp = ref(0);
const goalsList = localPage.form_3_list;
const computerXpList = localPage.form_4_list;
const deviceList = localPage.form_5_list;
const ageList = localPage.form_6_list;

const options: Options = {
  drag: false,
  pagination: false,
  rewind: false,
  arrows: false,
  autoplay: false,
  height: 'calc(100vh - 100px)',
  speed: 650
};

const profileLoaded = computed(() => !!profileData.get());

onMounted(async () => {
  const userProfile = profile.get();
  user.value = userProfile;
  xp.value = userProfile?.user_metadata.xp || 0;
  initModals();
});

onMounted(async () => {
  document.body.classList.add('overflow-hidden');
  if (splide.value && splide.value.splide) {
    const bar = splide.value.splide.root.querySelector('.my-carousel-progress-bar') as HTMLElement;
    if (bar) {
      setBarProgress(splide.value.splide);
    }
  }
});

const setBarProgress = (splide: Core) => {
  const bar = splide.root.querySelector('.my-carousel-progress-bar') as HTMLElement;
  if (bar) {
    const end = splide.Components.Controller.getEnd() + 1;
    const rate = Math.min((splide.index + 1) / end, 1);
    bar.style.width = `${100 * rate}%`;
  }
};

const goNext = () => {
  const index = splide?.value?.splide?.index;
  if (index === 0) {
    full_nameModel.value ? splide?.value?.splide?.go('+1') : null;
  } else if (index !== 1 && index !== 6) {
    splide?.value?.splide?.go('+1');
  } else if (index === 6) {
    submit();
  }
};

const goPrev = () => {
  splide?.value?.splide?.go('-1');
};

const onSplideMove = async (splide: Core, index: number) => {
  showSkip.value = index > 1;
  showBack.value = index > 2;

  setBarProgress(splide);
  if (index === 1) {
    await sleep(3500);
    splide.go('+1');
  }
};

const submit = async (e: Event | null = null) => {
  e?.preventDefault();
  const data = profileData.get();
  const id = user?.value?.id as string;
  loading.value = true;
  try {
    const { error } = await upsertProfile({ ...data, id });
    window.location.assign(`/courses/`);
  } catch (error) {}
};
</script>

<style>
.fullscreen-onboarding {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
}

.my-carousel-progress {
  background: #ccc;
}

.my-carousel-progress-bar {
  height: 8px;
  transition: width 400ms ease;
  width: 0;
}
</style>
