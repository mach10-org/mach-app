<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 class="text-center text-xl font-bold text-gray-900 dark:text-white">
            {{ user?.email }}
          </h2>
          <h3 class="text-center text-lg font-bold text-gray-900 dark:text-white">{{ xp }} XP</h3>
          <p class="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">
            We’d love to learn more about you. Could you share with us what is your main goal applying here? Even if it’s just curiosity, we’re interested to hear ☺. <br />This is also helping us to
            know our audience and adapt our content accordingly.
          </p>

          <p class="text-center mb-2 font-light text-gray-500 dark:text-gray-400">Update your profile !</p>

          <form class="space-y-4 md:space-y-6">
            <div>
              <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your firstname (how should we call you?)</label>
              <input
                type="text"
                v-model="full_nameModel"
                id="full_name"
                name="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                placeholder="firstname"
              />
            </div>

            <div>
              <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>

              <select
                id="gender"
                name="gender"
                v-model="genderModel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
              >
                <option value="">Choose</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>

              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  datepicker
                  id="dob"
                  name="dob"
                  v-model="dobModel"
                  type="date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                  placeholder="Select date"
                />
              </div>
            </div>

            <div>
              <label for="education" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Education level</label>

              <select
                id="education"
                name="education"
                v-model="educationModel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
              >
                <option value="">Choose</option>
                <option value="Primary education">Primary education</option>
                <option value="Secondary education">Secondary education</option>
                <option value="High education">High education</option>
                <option value="Master’s">Master’s</option>
              </select>
            </div>

            <div>
              <label for="computer_xp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience with computers</label>

              <select
                id="computer_xp"
                name="computer_xp"
                v-model="computer_xpModel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
              >
                <option value="">Choose</option>
                <option value="Never used it">Never used it</option>
                <option value="I know how to use a computer but never did technical work">I know how to use a computer but never did technical work</option>
                <option value="I have already programming experience">I have already programming experience</option>
              </select>
            </div>

            <div>
              <label for="goal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your goal with this program?</label>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="(value, index) in goalsList" class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                  <input
                    :key="index"
                    :id="`goal-${index}`"
                    type="checkbox"
                    name="goal"
                    v-model="goalModel"
                    :value="value"
                    class="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded checked:bg-primary-600 focus:ring-primary-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label :for="`goal-${index}`" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ value }}</label>
                </div>
              </div>
            </div>

            <div>
              <label for="about" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Could you tell us more about you and your objectives ?</label>

              <textarea
                id="about"
                v-model="aboutModel"
                name="about"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:border-primary-600"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <button
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="submit"
              :disabled="status.isLoading"
              :class="{ 'cursor-not-allowed opacity-70': status.isLoading }"
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
            </button>
            <div v-if="status.error" class="text-sm text-red-400">{{ status.error }}</div>
            <div v-if="status.success" className="text-sm text-green-600">Your profile has been saved</div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { User } from '@utils/auth';
import { upsertProfile, profile, profileData, goalChoices } from '@stores/profile';
import { onMounted, ref } from 'vue';
import { useVModel } from '@nanostores/vue';

// const firstname = useVModel(profileData, 'firstname');
const { full_nameModel, genderModel, dobModel, educationModel, computer_xpModel, goalModel, aboutModel } = useVModel(profileData, [
  'full_name',
  'gender',
  'dob',
  'education',
  'dob',
  'computer_xp',
  'goal',
  'about'
]);
const user = ref<User | null>(null);
const xp = ref(0);
const status = ref({ error: '', success: false, isLoading: false });
const goalsList = ref<string[]>();
onMounted(async () => {
  const userProfile = profile.get();
  const goalsListRes = await goalChoices();
  goalsList.value = goalsListRes;
  user.value = userProfile;
  xp.value = userProfile?.user_metadata.xp;
});

const submit = async (e: Event) => {
  e.preventDefault();

  const data = profileData.get();
  status.value = { error: '', success: false, isLoading: true };

  try {
    const { error } = await upsertProfile(data);

    if (error?.message) {
      status.value = {
        error: error.message,
        success: false,
        isLoading: false
      };
    } else {
      status.value = { error: '', success: true, isLoading: false };
    }
  } catch (error) {
    status.value = {
      error: error.message,
      success: false,
      isLoading: false
    };
  }
};
</script>
