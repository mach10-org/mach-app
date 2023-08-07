import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

export const themeConfig: ThemeConfig = {
  shared: {
    common: {
      fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,sans-serif',
      textColorBase: '#232E4A',
      primaryColor: '#457D00',
      primaryColorHover: '#ce3077',
      bodyColor: '#FCFCFC',
      baseColor: '#F9F9F9',
    },
  }, // Common theme options
  mobileOrTablet: {}, // Theme options applied on mobile and tablet
  mobile: {}, // Theme options applied on mobile only
  light: {}, // Theme options applied on light mode
  dark: {
    common: {
      textColorBase: '#e2e5e8',
      bodyColor: '#242F4C',
      baseColor: '#232E4A',
    },
  }, // Theme options applied on dark mode
}
