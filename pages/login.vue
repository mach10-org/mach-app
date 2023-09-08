<template>
  <section class="min-h-[60vh] flex flex-col px-2 pb-10 pt-16 lg:pt-20">
    <div class="mx-auto max-w-[470px]">
      <NCard :title="$t('pages.login.intro')" size="large">
        <h3 class="mb-6 text-base">
          {{ $t('pages.login.description') }}
        </h3>
        <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          size="large"
        >
          <n-form-item :label="$t('pages.login.inputEmail')" path="email" class="mb-4 flex-1" :show-feedback="false">
            <n-input ref="input" v-model:value="formValue.email" :input-props="{type: 'email'}" placeholder="" />
          </n-form-item>
          <n-form-item :show-label="false" :show-feedback="false">
            <n-button
              attr-type="submit"
              type="primary"
              class="w-full"
              :disabled="!canSubmit"
              :loading="isLoadingEmail"
              @click="signInWithOtp"
            >
              {{ $t('pages.login.magicLink_btn') }}
            </n-button>
          </n-form-item>
        </n-form>
      </NCard>
      <p class="my-8 text-center text-$text-muted">
        {{ $t('pages.login.or') }}
      </p>
      <div class="px-6">
        <n-button
          class="github-login w-full"
          type="primary"
          size="large"
          :loading="isLoadingGithub"
          :theme-overrides="{colorPrimary: '#171515', borderPrimary: '#171515', colorHoverPrimary: '#171515AA', borderHoverPrimary: '#171515AA'}"
          @click="signInWithGitHub"
        >
          <template #icon>
            <n-icon>
              <Icon name="mdi:github" />
            </n-icon>
          </template>
          {{ $t('pages.login.github_btn') }}
        </n-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  FormInst,
  FormItemRule,
  InputInst,
} from 'naive-ui'
import { Database } from '~/types/database.types'

definePageMeta({
  middleware: 'not-auth',
})

const supabase = useSupabaseClient<Database>()

const i18n = useI18n()
const config = useRuntimeConfig()
const formRef = ref<FormInst | null>(null)

const formValue = ref({
  email: '',
})
const rules = {
  email: {
    required: true,
    trigger: 'blur',
    validator: (_rule: FormItemRule, value: string) => {
      return validateEmail(value)
    },
  },
}

const canSubmit = computed(() => formValue.value.email.trim() !== '')
const input = ref<InputInst | null>(null)
const isLoadingEmail = ref(false)
const isLoadingGithub = ref(false)

onMounted(() => {
  if (input.value) {
    input.value.focus()
  }
})

const discreteApi = useDiscreteApi()

const signInWithOtp = (e: Event) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (errors) {
      discreteApi.message.error(i18n.t('notifications.newsletter.not_valid_email'))
      return
    }

    isLoadingEmail.value = true

    const { error } = await supabase.auth.signInWithOtp({
      email: formValue.value.email,
      options: {
        emailRedirectTo: `${config.public.siteUrl}/confirm`,
      },
    })
    if (error) {
      discreteApi.message.error(error.message)
      console.error(error)

      return
    }

    discreteApi.message.success(i18n.t('pages.login.magic_link_sent'))
    isLoadingEmail.value = false
    formValue.value.email = ''
  })
}

const signInWithGitHub = async (e: Event) => {
  e.preventDefault()

  isLoadingGithub.value = true

  const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
  if (error) {
    discreteApi.message.error(error.message)
    console.error(error)

    isLoadingGithub.value = false
  }
}
</script>
