import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

const link = '#be185d'
const linkHover = '#9d174f'
const linkDark = '#f9a8ca'
const linkHoverDark = '#f472a8'

const baseColor = '#FCFCFC'
const bodyColor = '#F9F9F9'
const baseColorDark = '#242F4C'
const bodyColorDark = '#232E4A'

const border = '#dee5ed'
const borderDark = '#3a4959'

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
    Message: {
      fontSize: '16px',
      padding: '18px 21px',
      iconSize: '24px',
    },
    Card: {
      titleFontSizeLarge: '20px',
      titleFontWeight: 700,
      borderRadius: '8px',
      // TODO style
    },
    Menu: {
      fontSize: '16px',
    },
  }, // Common theme options
  // mobileOrTablet: {}, // Theme options applied on mobile and tablet
  // mobile: {}, // Theme options applied on mobile only
  light: {
    common: {
      textColorBase: '#232E4A',
      baseColor,
      bodyColor,
    },
    Anchor: {
      linkTextColorActive: link,
      linkTextColorHover: link,
      linkTextColorPressed: linkHover,
    },
    Card: {
      color: baseColor,
      borderColor: border,
    },
    Dropdown: {
      color: baseColor,
      dividerColor: border,
    },
  }, // Theme options applied on light mode
  dark: {
    common: {
      textColorBase: '#e2e5e8',
      baseColor: baseColorDark,
      bodyColor: bodyColorDark,
    },
    Anchor: {
      linkTextColorActive: linkDark,
      linkTextColorHover: linkDark,
      linkTextColorPressed: linkHoverDark,
    },
    Card: {
      color: baseColorDark,
      borderColor: borderDark,
    },
    Menu: {
      itemTextColorActiveHorizontal: linkDark,
      itemTextColorActiveHoverHorizontal: linkHoverDark,
      itemTextColorHoverHorizontal: linkHoverDark,
      itemTextColorActive: linkDark,
      itemTextColorActiveHover: linkHoverDark,
    },
    Dropdown: {
      color: baseColorDark,
      dividerColor: borderDark,
    },
  }, // Theme options applied on dark mode
}
