import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

const textColor = '#4c4f69'
const textColorDark = '#c6d0f5'

const link = '#be185d'
const linkHover = '#9d174f'
const linkDark = '#f4b8e4'
const linkHoverDark = '#ea999c'

const baseColor = '#eff1f5'
const bodyColor = '#eff1f5'
const baseColorDark = '#292c3c'
const bodyColorDark = '#292c3c'

const border = '#dee5ed'
const borderDark = '#51576d'

export const themeConfig: ThemeConfig = {
  shared: {
    common: {
      fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,sans-serif',
    },
    Button: {
      fontWeight: 600,
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
      primaryColor: '#7287fd',
      primaryColorHover: '#9d174f',
    },
    Button: {
      textColorPrimary: '#fff',
      textColorHoverPrimary: '#fff',
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
      primaryColor: '#f4b8e4',
      primaryColorHover: '#eebebe',
      borderColor: '#414559',
      inputColor: 'rgba(255, 255, 255, 0.02)',
      popoverColor: '#232634',
    },
    Button: {
      textColorPrimary: '#232634',
      textColorHoverPrimary: '#232634',
    },
    Anchor: {
      linkTextColor: textColorDark,
      linkTextColorActive: linkDark,
      linkTextColorHover: linkDark,
      linkTextColorPressed: linkHoverDark,
    },
    Card: {
      color: baseColorDark,
      borderColor: borderDark,
    },
    Menu: {
      itemTextColorHorizontal: textColorDark,
      itemTextColorActiveHorizontal: linkDark,
      itemTextColorActiveHoverHorizontal: linkHoverDark,
      itemTextColorHoverHorizontal: linkHoverDark,
      itemTextColorActive: linkDark,
      itemTextColorActiveHover: linkHoverDark,
    },
    Dropdown: {
      color: '#232634',
      dividerColor: borderDark,
      optionTextColor: textColorDark,
      optionTextColorHover: textColorDark,
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
    Input: {
      placeholderColor: '#737994',
      textColor: textColorDark,
      // border: '1px solid #414559',
      borderHover: '1px solid #f4b8e4',
      borderFocus: '1px solid #f4b8e4',
    },
    TimePicker: {
      iconColor: '#737994',
    },
    Switch: {
      railColorActive: '#81c8be',
    },
  }, // Theme options applied on dark mode
}
