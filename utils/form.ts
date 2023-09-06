export const validateEmail = (email: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}

export const errorMsg = (code: number | null = null) => {
  return code ? `errors.code.${code}` || 'errors.code.default' : 'errors.code.default'
}
