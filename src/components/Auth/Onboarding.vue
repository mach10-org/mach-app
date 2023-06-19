<template>
  <div class="fullscreen-onboarding bg-background-page">
    <div class="absolute w-full" v-if="siteName">
      <div class="flex items-center justify-center p-8">
        <span class="text-2xl mr-3 sm:text-3xl">👩🏻‍🚀</span>
        <span class="self-center font-semibold whitespace-nowrap text-text-base text-xl"> {{ siteName }} </span>
      </div>
    </div>
    <Splide ref="splide" :has-track="false" :options="options" aria-label="Vue Splide Example" @splide:move="onSplideMove">
      <div class="my-carousel-progress">
        <div class="my-carousel-progress-bar bg-gradient-to-r from-purple-400 to-pink-600"></div>
      </div>

      <form class="form mt-10" @submit.prevent="submit">
        <SplideTrack>
          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl w-96 mx-auto px-2">
                <div class="field-wrapper">
                  <OField labelClass="mb-4 text-xl">
                    <template #label labelFor="full_name">
                      Your firstname
                      <span class="text-xs text-text-muted">(how should we call you?)</span>
                    </template>
                    <div class="relative w-full">
                      <OInput type="text" size="large" v-model="full_nameModel" id="full_name" placeholder="Firstname" />
                      <button
                        @click="goNext"
                        type="button"
                        class="absolute z-10 h-full right-1 bottom-0 rounded-lg p-2 text-center inline-flex items-center focus:ring-4 focus:ring-link/70 focus:outline-none hover:text-link"
                      >
                        <span class="sr-only">Submit</span>
                        <Icon name="ArrowRightIcon" :outline="true" classes="h-7 h-7" />
                      </button>
                    </div>
                  </OField>
                </div>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl mx-auto px-2">
                <div class="field-wrapper text-center">
                  <div>
                    <h2 class="text-center text-2xl md:text-4xl mb-2 text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Nice to meet you, {{ full_nameModel }}!</h2>
                    <p class="text-8xl text-pink-600">☺</p>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-2xl mx-auto px-2">
                <div class="field-wrapper">
                  <OField labelClass="mb-4 text-xl" class="max-w-lg mx-auto" label="What is your main goal with this website?">
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="(value, index) in goalsList" class="">
                        <OCheckbox :key="index" v-model="goalModel" :native-value="value">
                          {{ value }}
                        </OCheckbox>
                      </div>
                    </div>
                  </OField>
                  <h2 class="text-center text-xl my-10 text-slate-400 font-bold">
                    Remember, learning is often challenging, but some of the most worthwhile things in life are. Consistency can take you to anywhere you want.
                  </h2>
                  <OButton class="m-auto flex" variant="primary" @click="goNext" size="large">Next</OButton>
                </div>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl w-96 mx-auto px-2">
                <div class="field-wrapper">
                  <OField labelClass="mb-4 text-xl" label="How would you rate your computer skills?" labelFor="computer_xp">
                    <OSelect size="large" @change="goNext" id="computer_xp" v-model="computer_xpModel" placeholder="Choose" expanded>
                      <option value="Never used it">Never used it</option>
                      <option value="I know how to use a computer but never did technical work">I know how to use a computer but never did technical work</option>
                      <option value="I have already programming experience">I have already programming experience</option>
                    </OSelect>
                  </OField>
                </div>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl w-96 mx-auto px-2">
                <div class="field-wrapper">
                  <OField labelClass="mb-4 text-xl" label="What kind of devices do you own?">
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="(value, index) in deviceList" class="">
                        <OCheckbox :key="index" v-model="devicesModel" :native-value="value">
                          {{ value }}
                        </OCheckbox>
                      </div>
                    </div>
                  </OField>
                  <OButton class="m-auto flex my-10" variant="primary" @click="goNext" size="large">Next</OButton>
                </div>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl w-96 mx-auto px-2">
                <div class="field-wrapper">
                  <OField labelClass="mb-4 text-xl" label="What's your age?" labelFor="age">
                    <OSelect size="large" @change="goNext" id="age" v-model="ageModel" placeholder="Choose" expanded>
                      <option value="13 - 18">13 - 18</option>
                      <option value="19 – 24">19 – 24</option>
                      <option value="25 – 34">25 – 34</option>
                      <option value="35 – 44">35 – 44</option>
                      <option value="More than 45">More than 45</option>
                      <option value="It’s a secret!">It’s a secret!</option>
                    </OSelect>
                  </OField>
                </div>
              </div>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl mx-auto px-2">
                <div class="field-wrapper">
                  <h2 class="text-center text-2xl md:text-4xl mb-10 text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Perfect! We’re here to help you every step of your journey. Let’s get started!
                  </h2>
                  <OButton class="m-auto flex" variant="primary" @click="submit" size="large">Next</OButton>
                </div>
              </div>
            </div>
          </SplideSlide>
        </SplideTrack>
        <!-- <button class="prev m-4" @click="goPrev" type="button">
          <span class="">prev</span>
        </button>
        <button class="next m-4" @click="goNext" type="button">
          <span class="">next</span>
        </button> -->
      </form>
    </Splide>
  </div>
</template>

<script lang="ts" setup>
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide';
import { Splide as Core } from '@splidejs/splide';
import { OButton, OInput, OField, OSelect, OCheckbox } from '@oruga-ui/oruga-next';
import Icon from '@components/DynamicHeroIcon.vue';
import { onMounted, ref } from 'vue';
import '@splidejs/vue-splide/css';
import '@splidejs/vue-splide/css/skyblue';
import { useVModel } from '@nanostores/vue';
import { upsertProfile, profile, profileData, goalChoices } from '@stores/profile';
import { sleep } from '@utils/index';
import { User } from '@utils/auth';

const { full_nameModel, computer_xpModel, goalModel, devicesModel, ageModel } = useVModel(profileData, ['full_name', 'computer_xp', 'goal', 'devices', 'age']);

const props = defineProps({
  siteName: String
});

const splide = ref<InstanceType<typeof Splide>>();

const user = ref<User | null>(null);
const xp = ref(0);

const goalsList = ref<string[]>();
const deviceList = ref(['iPad', 'Other tablet', 'Mac', 'Windows computer', 'Other', 'None of these']);

onMounted(async () => {
  const userProfile = profile.get();
  const goalsListRes = await goalChoices();
  goalsList.value = goalsListRes;
  user.value = userProfile;
  xp.value = userProfile?.user_metadata.xp || 0;
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
  splide?.value?.splide?.go('+1');
};
const goPrev = () => {
  splide?.value?.splide?.go('-1');
};

const options: Options = {
  drag: false,
  pagination: false,
  rewind: false,
  arrows: false,
  autoplay: false,
  height: 'calc(100vh - 100px)',
  speed: 650
};
let timer = null;

const onSplideMove = async (splide: Core, index: number) => {
  setBarProgress(splide);

  if (index === 1) {
    await sleep(3500);
    goNext();
  }
};

const submit = async (e: Event) => {
  e.preventDefault();
  const data = profileData.get();
  const id = user?.value?.id as string;

  try {
    upsertProfile({ ...data, id });
    /*const { error } = await upsertProfile({ ...data, id });
    if (error?.message) {
    } else {
    }*/
  } catch (error) {}

  window.location.assign(`/courses/`);
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
