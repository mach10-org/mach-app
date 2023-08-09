export const validateEmail = (email: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}

export const errorMsg = (code: number | null = null) => {
  const i18n = useI18n()
  return code ? i18n.t(`errors.code.${code}`) || i18n.t('errors.code.default') : i18n.t('errors.code.default')
}
