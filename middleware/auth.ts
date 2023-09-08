export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  const nuxt = useNuxtApp()

  if (!user.value) {
    return navigateTo(nuxt.$localePath('/login'))
  }
})
