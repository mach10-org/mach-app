<template>
  <div class="bg-background-base p-4 md:p-6 rounded border border-border-input md:max-w-[600px] mx-2 md:mx-auto mt-6 md:mt-10">
    <h2 class="text-center text-2xl md:text-4xl mb-2">
      <span class="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{ user?.email }}</span>
    </h2>
    <h3 class="text-center text-lg font-bold mb-6">{{ xp }} {{ common.xp }}</h3>

    <p class="mb-2 md:text-lg lg:text-xl">{{ localPageProfile.intro }}</p>
    <p class="md:text-lg lg:text-xl">{{ localPageProfile.intro_2 }}</p>

    <form class="form mt-10" @submit.prevent="submit">
      <OField>
        <template #label labelFor="full_name">
          {{ localPage.form_1_label }}
          <span class="text-xs text-text-muted">{{ localPage.form_1_label_1 }}</span>
        </template>
        <OInput type="text" v-model="full_nameModel" id="full_name" :placeholder="localPage.form_1_placeholder" />
      </OField>

      <OField :label="localPageProfile.gender_label" labelFor="gender">
        <OSelect id="gender" v-model="genderModel" :placeholder="common.choose" expanded>
          <option v-for="(value, index) in localPageProfile.gender_list" :value="value">{{ value }}</option>
        </OSelect>
      </OField>

      <OField :label="localPage.form_6_label" labelFor="age">
        <OSelect id="age" v-model="ageModel" :placeholder="common.choose" expanded>
          <option v-for="(value, index) in ageList" :value="value">{{ value }}</option>
        </OSelect>
      </OField>

      <OField :label="localPageProfile.education_label" labelFor="education">
        <OSelect id="education" v-model="educationModel" :placeholder="common.choose" expanded>
          <option v-for="(value, index) in localPageProfile.education_list" :value="value">{{ value }}</option>
        </OSelect>
      </OField>

      <OField :label="localPage.form_4_label" labelFor="computer_xp">
        <OSelect id="computer_xp" v-model="computer_xpModel" :placeholder="common.choose" expanded>
          <option v-for="(value, index) in computerXpList" :value="value">{{ value }}</option>
        </OSelect>
      </OField>

      <OField label="What kind of devices do you own?">
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(value, index) in deviceList">
            <OCheckbox :key="index" v-model="devicesModel" :native-value="value">
              {{ value }}
            </OCheckbox>
          </div>
        </div>
      </OField>
      <OField label="What is your goal with this program?">
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(value, index) in goalsList">
            <OCheckbox :key="index" v-model="goalModel" :native-value="value">
              {{ value }}
            </OCheckbox>
          </div>
        </div>
      </OField>

      <OField :label="localPageProfile.comment_label" labelFor="about">
        <OInput id="about" v-model="aboutModel" name="about" rows="4" type="textarea" :placeholder="localPageProfile.comment_placeholder"></OInput>
      </OField>

      <OButton variant="primary" size="large" type="submit" @click="submit" :disabled="status.isLoading" expanded>
        <Spinner v-if="status.isLoading" :size="6" color="white" fill="primary" class="fill-primary" />
        {{ common.save }}
      </OButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { OButton, OInput, OField, OSelect, OCheckbox } from '@oruga-ui/oruga-next';
import { User } from '@utils/auth';
import { upsertProfile, profile, profileData } from '@stores/profile';
import { onMounted, ref } from 'vue';
import { useVModel } from '@nanostores/vue';
import Spinner from '@components/svg/Spinner.vue';
import { showToast } from '@utils/notify';
import { erroMsg, locales } from '@constants/localize';
const {
  notifications: { profile: localNotif },
  pages: { onboarding: localPage, profile: localPageProfile },
  common
} = locales;
const notifTitle = localNotif.title;

const { full_nameModel, genderModel, ageModel, educationModel, computer_xpModel, goalModel, aboutModel, devicesModel } = useVModel(profileData, [
  'full_name',
  'gender',
  'dob',
  'education',
  'age',
  'computer_xp',
  'goal',
  'about',
  'devices'
]);
const user = ref<User | null>(null);
const xp = ref(0);
const status = ref({ error: '', success: false, isLoading: false });
const goalsList = localPage.form_3_list;
const computerXpList = localPage.form_4_list;
const deviceList = localPage.form_5_list;
const ageList = localPage.form_6_list;

onMounted(async () => {
  const userProfile = profile.get();
  user.value = userProfile;
  xp.value = userProfile?.user_metadata.xp || 0;
});

const submit = async (e: Event) => {
  e.preventDefault();
  const data = profileData.get();
  status.value = { error: '', success: false, isLoading: true };
  const id = user?.value?.id as string;

  try {
    const { error } = await upsertProfile({ ...data, id });
    if (error?.message) {
      status.value = {
        error: error.message,
        success: false,
        isLoading: false
      };
      showToast({ status: 'error', text: `${error.message}`, title: notifTitle });
    } else {
      status.value = { error: '', success: true, isLoading: false };
      showToast({ status: 'success', text: `${localNotif.profile_saved}`, title: notifTitle });
    }
  } catch (error) {
    showToast({ status: 'error', text: `${erroMsg(error.code)}`, title: notifTitle });

    status.value = {
      error: error.message,
      success: false,
      isLoading: false
    };
  }
};
</script>
