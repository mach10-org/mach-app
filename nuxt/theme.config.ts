import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

export const themeConfig: ThemeConfig = {
  shared: {
    common: {
      fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,sans-serif',
      primaryColor: '#be185d',
      primaryColorHover: '#9d174f',
    },
    Button: {
      fontWeight: 600,
      textColorPrimary: '#fff',
      textColorHoverPrimary: '#fff',
    },
  }, // Common theme options
  // mobileOrTablet: {}, // Theme options applied on mobile and tablet
  // mobile: {}, // Theme options applied on mobile only
  light: {
    common: {
      textColorBase: '#232E4A',
      baseColor: '#FCFCFC',
      bodyColor: '#F9F9F9',
    },
    Anchor: {
      linkTextColorActive: '#be185d',
      linkTextColorHover: '#be185d',
      linkTextColorPressed: '#9d174f',
    },
  }, // Theme options applied on light mode
  dark: {
    common: {
      textColorBase: '#e2e5e8',
      baseColor: '#242F4C',
      bodyColor: '#232E4A',
    },
    Anchor: {
      linkTextColorActive: '#f9a8ca',
      linkTextColorHover: '#f9a8ca',
      linkTextColorPressed: '#f9a8ca',
    },
  }, // Theme options applied on dark mode
}
