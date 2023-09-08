import { computed, inject } from 'vue'
import { configProviderInjectionKey } from 'naive-ui/lib/config-provider/src/context'
import { commonLight } from 'naive-ui/lib/_styles/common'

export function useThemeOverridesVars () {
  const configProviderInjection = inject(configProviderInjectionKey, null)
  return computed(() => {
    if (configProviderInjection === null) { return commonLight }
    const {
      mergedThemeOverridesRef: { value: mergedThemeOverrides },
    } = configProviderInjection
    return mergedThemeOverrides
  })
}
