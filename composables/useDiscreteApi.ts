import {
  createDiscreteApi,
  ConfigProviderProps,
} from 'naive-ui'
import { useUtilsStore } from '~/stores/utils'

export default function useDiscreteApi () {
  const utils = useUtilsStore()
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    themeOverrides: utils.themeOverrides,
  }))

  const discreteApi = createDiscreteApi(
    ['message', 'notification'],
    {
      configProviderProps: configProviderPropsRef,
      notificationProviderProps: {
        placement: 'bottom',
      },
      messageProviderProps: {
        placement: 'bottom',
      },
    },
  )

  return discreteApi
}
