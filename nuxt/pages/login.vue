<template>
  <section class="min-h-[60vh] flex flex-col px-2 pb-10 pt-16 lg:pt-20">
    <NCard :title="$t('pages.login.intro')" class="mx-auto max-w-[470px]" size="large">
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
          <n-button attr-type="submit" type="primary" class="w-full" :disabled="!canSubmit" @click="signInWithOtp">
            {{ $t('pages.login.magicLink_btn') }}
          </n-button>
        </n-form-item>
      </n-form>
    </NCard>
    <!-- TODO github -->
  </section>
</template>

<script setup lang="ts">
import {
  FormInst,
  FormItemRule,
  InputInst,
  useMessage,
} from 'naive-ui'
const supabase = useSupabaseClient()

// TODO redirect if logged

const message = useMessage()
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

onMounted(() => {
  if (input.value) {
    input.value.focus()
  }
})

const signInWithOtp = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (errors) {
      message.error(i18n.t('notifications.newsletter.not_valid_email'))
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: formValue.value.email,
      options: {
        emailRedirectTo: `${config.public.siteUrl}/confirm`,
      },
    })
    if (error) {
      message.error(error.message)
      return
    }

    message.success(i18n.t('pages.login.magic_link_sent'))
  })
}
</script>
