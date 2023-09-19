<template>
  <NCard class="mx-2 mt-6 md:mx-auto md:mt-10 md:max-w-[600px]">
    <template #header>
      <i18n-t keypath="pages.contact.title" tag="h1" class="text-text-title text-2xl font-extrabold tracking-tight lg:mb-8 md:text-4xl">
        <template #email>
          <a href="mailto:hello@mach10.jp" class="from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text text-transparent">
            hello@mach10.jp
          </a>
        </template>
      </i18n-t>
    </template>

    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      size="large"
      @submit.prevent="onSubmit(submit)"
    >
      <n-form-item path="name" :label="$t('pages.contact.form_nameLabel')" :label-props="{for: 'name'}">
        <n-input ref="nameRef" v-model:value="model.name" :input-props="{id: 'name'}" placeholder="" />
      </n-form-item>

      <n-form-item path="email" :label-props="{for: 'email'}">
        <template #label>
          {{ $t('pages.contact.form_emailLabel') }} <small class="text-$text-muted">{{ $t('pages.contact.form_emailSublabel') }}</small>
        </template>
        <n-input v-model:value="model.email" :input-props="{id: 'email'}" placeholder="" />
      </n-form-item>

      <!-- SSR doesn't work -->
      <ClientOnly>
        <n-form-item path="topic" :label="$t('pages.contact.form_topicLabel')" :label-props="{for: 'topic'}">
          <n-select v-model:value="model.topic" :input-props="{id: 'topic'}" :placeholder="$t('pages.contact.form_topicPlaceholder')" :options="topicsList" />
        </n-form-item>
      </ClientOnly>

      <n-form-item path="subject" :label="$t('pages.contact.form_subjectLabel')" :label-props="{for: 'subject'}">
        <n-input v-model:value="model.subject" :input-props="{id: 'subject'}" :placeholder="$t('pages.contact.form_subjecPlaceholder')" />
      </n-form-item>

      <n-form-item path="message" :label="$t('pages.contact.form_messageLabel')" :label-props="{for: 'message'}">
        <n-input
          v-model:value="model.message"
          type="textarea"
          :input-props="{id: 'message'}"
          :placeholder="$t('pages.contact.form_messagePlaceholder')"
        />
      </n-form-item>

      <n-form-item :show-label="false" :show-feedback="false">
        <n-button attr-type="submit" type="primary" secondary class="w-full" :loading="pending">
          {{ $t('pages.contact.submit') }}
        </n-button>
      </n-form-item>
    </n-form>
  </NCard>
</template>

<script setup lang="ts">
import {
  InputInst,
} from 'naive-ui'
import { VueMessageType } from '@nuxtjs/i18n/dist/runtime/composables'
import { useProfileStore } from '~/stores/profile'

const user = useSupabaseUser()
const profile = useProfileStore()
const i18n = useI18n()
const supabase = useSupabaseClient()

onMounted(async () => {
  if (nameRef.value) {
    nameRef.value.focus()
  }

  if (user.value) {
    await until(isLoadingProfile).toBe(false)
    model.value.name = profile.full_name ?? ''
    model.value.email = user.value.email ?? ''
  }
})

const discreteApi = useDiscreteApi()

const model = ref({
  name: '',
  email: '',
  topic: '',
  subject: '',
  message: '',
})
const { formRef, onSubmit, rules, pending } = useNaiveForm(model)

rules.value = {
  name: [
    { required: true, message: i18n.t('pages.contact.form_nameRequired'), trigger: 'blur' },
  ],
  email: [
    { required: true, message: i18n.t('pages.contact.form_emailRequired'), trigger: 'blur' },
    { type: 'email', message: i18n.t('pages.contact.form_emailInvalid'), trigger: 'blur' },
  ],
  topic: [
    { required: true, message: i18n.t('pages.contact.form_topicRequired') },
  ],
  subject: [
    { required: true, message: i18n.t('pages.contact.form_subjectRequired'), trigger: 'blur' },
  ],
  message: [
    { required: true, message: i18n.t('pages.contact.form_messageRequired'), trigger: 'blur' },
  ],
}

const nameRef = ref<InputInst | null>(null)

const topicsList = computed(() => (i18n.tm('pages.contact.form_topicList') as VueMessageType[]).map(t => ({ label: i18n.rt(t), value: i18n.rt(t) })))

const submit = async () => {
  try {
    const { data, error } = await supabase.functions.invoke<any>('send-contact-email', { body: model.value })

    if (error || data?.code) {
      throw new Error(error || data.message)
    }

    discreteApi.message.success(i18n.t('pages.contact.success'))

    model.value.topic = ''
    model.value.subject = ''
    model.value.message = ''
  } catch (error) {
    console.error(error)
    discreteApi.message.error(i18n.t('pages.contact.error'))
  }
}

const isLoadingProfile = computed(() => profile.isLoading)
</script>
