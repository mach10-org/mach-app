import {
  createDiscreteApi,
  ConfigProviderProps,
} from 'naive-ui'

export default function useDiscreteApi () {
  const theme = useNaiveTheme()
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    themeOverrides: theme.value,
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
