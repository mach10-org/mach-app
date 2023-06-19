<template>
  <div class="fullscreen-onboarding bg-white">
    <Splide ref="splide" :has-track="false" :options="options" aria-label="Vue Splide Example" @splide:move="onSplideMove">
      <form class="form mt-10" @submit.prevent="submit">
        <SplideTrack>
          <SplideSlide>
            <div class="slide-content flex h-full flex-col justify-center">
              <div class="max-w-3xl w-96 mx-auto">
                <div class="field-wrapper">
                  <OField>
                    <template #label labelFor="full_name">
                      Your firstname
                      <span class="text-xs text-text-muted">(how should we call you?)</span>
                    </template>
                    <div class="relative w-full">
                      <OInput type="text" size="large" v-model="full_nameModel" id="full_name" placeholder="Firstname" />
                      <button
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
              <div class="max-w-3xl w-96 mx-auto">
                <div class="field-wrapper">
                  <OField label="Gender" labelFor="gender">
                    <OSelect id="gender" v-model="genderModel" placeholder="Choose" expanded>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </OSelect>
                  </OField>
                </div>
              </div>
            </div>
          </SplideSlide>
        </SplideTrack>
        <button class="prev m-4" @click="goPrev" type="button">
          <span class="">prev</span>
        </button>
        <button class="next m-4" @click="goNext" type="button">
          <span class="">next</span>
        </button>

        <div class="my-carousel-progress">
          <div class="my-carousel-progress-bar"></div>
        </div>
      </form>
    </Splide>
  </div>
</template>

<script lang="ts" setup>
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide';
import { Splide as Core } from '@splidejs/splide';
import { OButton, OInput, OField, OSelect } from '@oruga-ui/oruga-next';
import Icon from '@components/DynamicHeroIcon.vue';

import { onMounted, ref } from 'vue';
import '@splidejs/vue-splide/css';
import '@splidejs/vue-splide/css/skyblue';
import { useVModel } from '@nanostores/vue';
import { profileData } from '@stores/profile';

const { full_nameModel, genderModel, dobModel, educationModel, computer_xpModel, goalModel, aboutModel, devicesModel } = useVModel(profileData, [
  'full_name',
  'gender',
  'dob',
  'education',
  'dob',
  'computer_xp',
  'goal',
  'about',
  'devices'
]);

const splide = ref<InstanceType<typeof Splide>>();
const slides = generateSlides();

onMounted(async () => {
  document.body.classList.add('overflow-hidden');

  if (splide.value && splide.value.splide) {
    const bar = splide.value.splide.root.querySelector('.my-carousel-progress-bar') as HTMLElement;
    if (bar) {
      setBarProgress(splide.value.splide);
    }
    // console.log('splide', splide.value);
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
  height: 'calc(100vh - 100px)'
};

const onSplideMove = (splide: Core, index: number) => {
  setBarProgress(splide);
};

const submit = async (e: Event) => {
  e.preventDefault();
};

function generateSlides(length = 10, sig = 0): Array<{ src: string; alt: string }> {
  return Array.from({ length }).map((value, index) => {
    index = sig || index;
    return {
      src: `https://fakeimg.pl/1000x650?text=Hello-${index}`,
      alt: `Image ${index}`
    };
  });
}
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
  background: greenyellow;
  height: 5px;
  transition: width 400ms ease;
  width: 0;
}
</style>
