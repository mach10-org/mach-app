<template>
  <ClientOnly>
    <NCard class="mx-2 mt-6 md:mx-auto md:mt-10 md:max-w-[600px]">
      <template #header>
        <h2 class="mb-2 text-center text-2xl md:text-4xl">
          <span class="from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text font-bold text-transparent">{{ user?.email }}</span>
        </h2>
        <h3 class="mb-6 text-center text-lg font-bold">
          {{ profile.getXp }}
        </h3>
      </template>

      <p class="mb-2 lg:text-xl md:text-lg">
        {{ $t('pages.profile.intro') }}
      </p>
      <p class="lg:text-xl md:text-lg">
        {{ $t('pages.profile.intro_2') }}
      </p>

      <n-form
        ref="formRef"
        :model="model"
        size="large"
        class="mt-6 h-full"
        @submit.prevent="onSubmit(submit)"
      >
        <n-form-item path="firstname" :label-props="{for: 'firstname'}">
          <template #label>
            {{ $t('pages.onboarding.form_1_label') }} <small class="text-$text-muted">{{ $t('pages.onboarding.form_1_label_1') }}</small>
          </template>
          <n-input v-model:value="model.firstname" :input-props="{id: 'firstname'}" placeholder="" />
        </n-form-item>

        <n-form-item :label="$t('pages.profile.gender_label')" path="gender">
          <n-radio-group v-model:value="model.gender">
            <n-grid :y-gap="10" :cols="1">
              <n-gi v-for="(value, index) in genderList" :key="index">
                <n-radio :value="$rt(value)" :label="$rt(value)" />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </n-form-item>

        <n-form-item :label="$t('pages.onboarding.form_6_label')" path="age">
          <n-radio-group v-model:value="model.age" class="w-full">
            <n-grid :y-gap="10" :x-gap="14" :cols="2">
              <n-gi v-for="(value, index) in agesList" :key="index">
                <n-radio :value="$rt(value)" :label="$rt(value)" />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </n-form-item>

        <n-form-item :label="$t('pages.profile.education_label')" path="education">
          <n-radio-group v-model:value="model.education">
            <n-grid :y-gap="10" :cols="1">
              <n-gi v-for="(value, index) in educationsList" :key="index">
                <n-radio :value="$rt(value)" :label="$rt(value)" />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </n-form-item>

        <n-form-item :label="$t('pages.onboarding.form_4_label')" path="computerXp">
          <n-radio-group v-model:value="model.computerXp">
            <n-grid :y-gap="10" :cols="1">
              <n-gi v-for="(value, index) in computerXpList" :key="index">
                <n-radio :value="$rt(value)" :label="$rt(value)" />
              </n-gi>
            </n-grid>
          </n-radio-group>
        </n-form-item>

        <n-form-item :label="$t('pages.onboarding.form_5_label')" path="devices">
          <n-checkbox-group v-model:value="model.devices">
            <n-grid :y-gap="10" :x-gap="14" :cols="2">
              <n-gi v-for="(value, index) in devicesList" :key="index">
                <n-checkbox :value="$rt(value)" :label="$rt(value)" />
              </n-gi>
            </n-grid>
          </n-checkbox-group>
        </n-form-item>

        <n-form-item :label="$t('pages.onboarding.form_3_label')" path="goals">
          <n-checkbox-group v-model:value="model.goals">
            <n-grid :y-gap="10" :x-gap="14" :cols="2">
              <n-gi v-for="(value, index) in goalsList" :key="index">
                <n-checkbox :value="$rt(value)" :label="$rt(value)" />
              </n-gi>
            </n-grid>
          </n-checkbox-group>
        </n-form-item>

        <n-form-item path="about" :label="$t('pages.profile.comment_label')" :label-props="{for: 'about'}">
          <n-input v-model:value="model.about" :input-props="{id: 'about'}" :placeholder="$t('pages.profile.comment_placeholder')" type="textarea" />
        </n-form-item>

        <n-form-item :show-label="false" :show-feedback="false">
          <n-button attr-type="submit" type="primary" class="w-full" :loading="isLoading">
            {{ $t('common.save') }}
          </n-button>
        </n-form-item>
      </n-form>
    </NCard>
  </ClientOnly>
</template>

<script setup lang="ts">
import { VueMessageType } from '@nuxtjs/i18n/dist/runtime/composables'
import { useProfileStore } from '~/stores/profile'

const user = useSupabaseUser()
const profile = useProfileStore()
const i18n = useI18n()

const model = ref({
  firstname: '',
  goals: [] as string[],
  computerXp: '',
  devices: [] as string[],
  age: '',
  gender: '',
  education: '',
  about: '',
})
const { formRef, onSubmit } = useNaiveForm(model)

const isLoading = ref(false)

const goalsList = computed(() => i18n.tm('pages.onboarding.form_3_list') as VueMessageType[])
const computerXpList = computed(() => i18n.tm('pages.onboarding.form_4_list') as VueMessageType[])
const devicesList = computed(() => i18n.tm('pages.onboarding.form_5_list') as VueMessageType[])
const agesList = computed(() => i18n.tm('pages.onboarding.form_6_list') as VueMessageType[])
const genderList = computed(() => i18n.tm('pages.profile.gender_list') as VueMessageType[])
const educationsList = computed(() => i18n.tm('pages.profile.education_list') as VueMessageType[])

onMounted(async () => {
  await until(isLoadingProfile).toBe(false)

  model.value.firstname = profile.full_name ?? ''
  model.value.gender = profile.gender ?? ''
  model.value.age = profile.age ?? ''
  model.value.education = profile.education ?? ''
  model.value.computerXp = profile.computer_xp ?? ''
  model.value.devices = profile.devices ?? []
  model.value.goals = profile.goal ?? []
  model.value.about = profile.about ?? ''
})

definePageMeta({
  middleware: 'auth',
})

const discreteApi = useDiscreteApi()

const submit = async () => {
  isLoading.value = true
  if (await profile.saveProfile(model.value.firstname, model.value.goals, model.value.computerXp, model.value.devices, model.value.age, model.value.gender, model.value.education, model.value.about)) {
    discreteApi.message.success(i18n.t('pages.profile.successfullySaved'))
  }
  isLoading.value = false
}

const isLoadingProfile = computed(() => profile.isLoading)
</script>
