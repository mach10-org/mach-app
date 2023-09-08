<template>
  <div>
    <div class="mb-3 flex items-center">
      <n-form
        ref="formRef"
        inline
        :model="formValue"
        :rules="rules"
        size="large"
      >
        <n-form-item :label="label" :show-label="false" :show-feedback="false" path="email" class="flex-1">
          <n-input ref="input" v-model:value="formValue.email" :input-props="{type: 'email', 'aria-label': label}" :placeholder="placeholder" />
        </n-form-item>
        <n-form-item :show-label="false" :show-feedback="false">
          <n-button attr-type="submit" type="primary" @click="handleSendMail">
            {{ buttonText }}
          </n-button>
        </n-form-item>
      </n-form>
    </div>
    <div class="text-left text-sm prose">
      <slot name="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FormInst,
  FormItemRule,
  InputInst,
} from 'naive-ui'
import type { Database } from '~/types/database.types'
import { errorMsg, validateEmail } from '~/utils/form'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  inputId: {
    type: String,
    required: true,
  },
  focus: Boolean,
})

// const message = useMessage()
const supabase = useSupabaseClient<Database>()
const i18n = useI18n()
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

const input = ref<InputInst | null>(null)

onMounted(() => {
  if (props.focus && input.value) {
    input.value.focus()
  }
})

const discreteApi = useDiscreteApi()

const handleSendMail = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const { error } = await supabase.from('newsletter').upsert({ email: formValue.value.email })
        if (error?.code === '23505') {
          discreteApi.message.info(i18n.t(errorMsg(parseInt(error.code))))
        } else {
          discreteApi.message.success(i18n.t('notifications.newsletter.email_saved'))
        }
        formValue.value.email = ''
      } catch (error) {
        discreteApi.message.error(i18n.t(errorMsg(parseInt(error.code))))
      }
    } else {
      discreteApi.message.error(i18n.t('notifications.newsletter.not_valid_email'))
    }
  })
}
</script>
