<template>
  <div
    class="bg-background-base p-4 md:p-6 rounded border border-border-input md:max-w-[600px] mx-2 md:mx-auto mt-6 md:mt-10"
  >
    <h2
      class="text-center text-2xl md:text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2"
    >
      {{ user?.email }}
    </h2>
    <h3 class="text-center text-lg font-bold mb-6">{{ xp }} XP</h3>

    <p class="mb-2 md:text-lg lg:text-xl">
      We’d love to learn more about you. Could you share with us what is your
      main goal applying here? Even if it’s just curiosity, we’re interested to
      hear ☺. 
    </p>
    <p class="md:text-lg lg:text-xl">
      This is also helping us to know our audience and adapt our
      content accordingly.
    </p>

    <form class="form mt-10" @submit.prevent="submit">
      <OField>
        <template #label labelFor="full_name">
          Your firstname
          <span class="text-xs text-text-muted">(how should we call you?)</span>
        </template>
        <OInput
          type="text"
          v-model="full_nameModel"
          id="full_name"
          placeholder="Firstname"
        />
      </OField>

      <OField label="Gender" labelFor="gender">
        <OSelect
          id="gender"
          v-model="genderModel"
          placeholder="Choose"
          expanded
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </OSelect>
      </OField>

      <OField label="Birthdate" labelFor="dob">
        <OInput
          datepicker
          id="dob"
          v-model="dobModel"
          type="date"
          placeholder="Select date"
        />
      </OField>

      <OField label="Education level" labelFor="education">
        <OSelect
          id="education"
          v-model="educationModel"
          placeholder="Choose"
          expanded
        >
          <option value="Primary education">Primary education</option>
          <option value="Secondary education">Secondary education</option>
          <option value="High education">High education</option>
          <option value="Master’s">Master’s</option>
        </OSelect>
      </OField>

      <OField label="Experience with computers" labelFor="computer_xp">
        <OSelect
          id="computer_xp"
          v-model="computer_xpModel"
          placeholder="Choose"
          expanded
        >
          <option value="Never used it">Never used it</option>
          <option
            value="I know how to use a computer but never did technical work"
          >
            I know how to use a computer but never did technical work
          </option>
          <option value="I have already programming experience">
            I have already programming experience
          </option>
        </OSelect>
      </OField>

      <OField label="What is your goal with this program?">
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(value, index) in goalsList" class="">
            <OCheckbox :key="index" v-model="goalModel" :native-value="value">
              {{ value }}
            </OCheckbox>
          </div>
        </div>
      </OField>

      <OField
        label="Could you tell us more about you and your objectives?"
        labelFor="about"
      >
        <OInput
          id="about"
          v-model="aboutModel"
          name="about"
          rows="4"
          type="textarea"
          placeholder="Write your thoughts here..."
        ></OInput>
      </OField>

      <OButton
        variant="primary"
        type="submit"
        @click="submit"
        :disabled="status.isLoading"
        expanded
      >
        <svg
          v-if="status.isLoading"
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        Save
      </OButton>
      <p v-if="status.error" class="text-sm text-red-400 mt-3 text-center">
        {{ status.error }}
      </p>
      <p v-if="status.success" className="text-sm text-green-600 mt-3 text-center">
        Your profile has been saved
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {
  OButton,
  OInput,
  OField,
  OSelect,
  OCheckbox,
} from "@oruga-ui/oruga-next";
import { User } from "@utils/auth";
import {
  upsertProfile,
  profile,
  profileData,
  goalChoices,
} from "@stores/profile";
import { onMounted, ref } from "vue";
import { useVModel } from "@nanostores/vue";

// const firstname = useVModel(profileData, 'firstname');
const {
  full_nameModel,
  genderModel,
  dobModel,
  educationModel,
  computer_xpModel,
  goalModel,
  aboutModel,
} = useVModel(profileData, [
  "full_name",
  "gender",
  "dob",
  "education",
  "dob",
  "computer_xp",
  "goal",
  "about",
]);
const user = ref<User | null>(null);
const xp = ref(0);
const status = ref({ error: "", success: false, isLoading: false });
const goalsList = ref<string[]>();
onMounted(async () => {
  const userProfile = profile.get();
  const goalsListRes = await goalChoices();
  goalsList.value = goalsListRes;
  user.value = userProfile;
  xp.value = userProfile?.user_metadata.xp || 0;
});

const submit = async (e: Event) => {
  e.preventDefault();
  const data = profileData.get();
  status.value = { error: "", success: false, isLoading: true };
  const id = user?.value?.id as string;
  try {
    const { error } = await upsertProfile({ ...data, id });

    if (error?.message) {
      status.value = {
        error: error.message,
        success: false,
        isLoading: false,
      };
    } else {
      status.value = { error: "", success: true, isLoading: false };
    }
  } catch (error) {
    status.value = {
      error: error.message,
      success: false,
      isLoading: false,
    };
  }
};
</script>
