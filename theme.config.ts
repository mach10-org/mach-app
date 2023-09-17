import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

const textColor = '#232E4A'
const textColorDark = '#e2e5e8'

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
    },
    Menu: {
      fontSize: '16px',
    },
    Form: {
      labelFontSizeTopLarge: '16px',
      labelFontWeight: 500,
    },
    Collapse: {
      titleFontSize: '18px',
      titleFontWeight: 500,
    },
  }, // Common theme options
  // mobileOrTablet: {}, // Theme options applied on mobile and tablet
  // mobile: {}, // Theme options applied on mobile only
  light: {
    common: {
      textColorBase: textColor,
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
    Drawer: {
      color: baseColor,
      textColor,
      dividerColor: border,
    },
    Collapse: {
      dividerColor: border,
      arrowColor: link,
    },
  }, // Theme options applied on light mode
  dark: {
    common: {
      textColorBase: textColorDark,
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
    Drawer: {
      color: baseColorDark,
      textColor: textColorDark,
      dividerColor: borderDark,
    },
    Collapse: {
      dividerColor: borderDark,
      arrowColor: linkDark,
    },
  }, // Theme options applied on dark mode
}
