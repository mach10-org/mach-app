import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

export const themeConfig: ThemeConfig = {
  shared: {
    common: {
      fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,sans-serif',
    },
    Button: {
      fontWeight: 600,
    },
  }, // Common theme options
  // mobileOrTablet: {}, // Theme options applied on mobile and tablet
  // mobile: {}, // Theme options applied on mobile only
  light: {
    common: {
      textColorBase: '#232E4A',
      primaryColor: '#be185d',
      primaryColorHover: '#9d174f',
      bodyColor: '#FCFCFC',
      baseColor: '#F9F9F9',
    },
  }, // Theme options applied on light mode
  dark: {
    common: {
      textColorBase: '#e2e5e8',
      primaryColor: '#be185d',
      primaryColorHover: '#9d174f',
      bodyColor: '#242F4C',
      baseColor: '#232E4A',
    },
    Button: {
      textColorPrimary: '#fff',
      textColorHoverPrimary: '#fff',
    },
  }, // Theme options applied on dark mode
}
