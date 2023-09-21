import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

const textColor = '#4c4f69'
const textColorDark = '#c6d0f5'
const titleTextColor = '#5c5f77'
const titleTextColorDark = '#babbf1'

const link = '#1e66f5'
const linkHover = '#7287fd'
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
      primaryColor: link,
      primaryColorHover: '#dd7878',
      borderColor: '#ccd0da',
      inputColor: 'rgba(0, 0, 0, 0.02)',
      popoverColor: '#e6e9ef',
    },
    Button: {
      textColorPrimary: '#dce0e8',
      textColorHoverPrimary: '#dce0e8',
    },
    Anchor: {
      linkTextColor: textColor,
      linkTextColorActive: link,
      linkTextColorHover: link,
      linkTextColorPressed: linkHover,
    },
    Card: {
      color: baseColor,
      borderColor: border,
      textColor,
      titleTextColor,
    },
    Menu: {
      itemTextColorHorizontal: textColor,
      itemTextColorActiveHorizontal: link,
      itemTextColorActiveHoverHorizontal: linkHover,
      itemTextColorHoverHorizontal: linkHover,
      itemTextColorActive: link,
      itemTextColorActiveHover: linkHover,
    },
    Dropdown: {
      dividerColor: border,
      optionTextColor: textColor,
      optionTextColorHover: textColor,
    },
    Drawer: {
      textColor,
      dividerColor: border,
      titleTextColor,
    },
    Collapse: {
      dividerColor: border,
      arrowColor: link,
    },
    Form: {
      labelTextColor: textColor,
      asteriskColor: '#d20f39',
    },
    Input: {
      placeholderColor: '#737994',
      textColor,
      borderHover: `1px solid ${link}`,
      borderFocus: `1px solid ${link}`,
    },
    TimePicker: {
      iconColor: '#737994',
    },
    Switch: {
      railColorActive: link,
    },
    Checkbox: {
      textColor,
    },
    Radio: {
      textColor,
    },
    Select: {
      peers: {
        InternalSelection: { textColor },
        InternalSelectMenu: { optionTextColor: textColor },
      },
    },
  }, // Theme options applied on light mode
  dark: {
    common: {
      textColorBase: textColorDark,
      baseColor: baseColorDark,
      bodyColor: bodyColorDark,
      primaryColor: linkDark,
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
      textColor: textColorDark,
      titleTextColor: titleTextColorDark,
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
      dividerColor: borderDark,
      optionTextColor: textColorDark,
      optionTextColorHover: textColorDark,
    },
    Drawer: {
      textColor: textColorDark,
      dividerColor: borderDark,
      titleTextColor: titleTextColorDark,
    },
    Collapse: {
      dividerColor: borderDark,
      arrowColor: linkDark,
    },
    Form: {
      labelTextColor: textColorDark,
      asteriskColor: '#e78284',
    },
    Input: {
      placeholderColor: '#737994',
      textColor: textColorDark,
      borderHover: `1px solid ${linkDark}`,
      borderFocus: `1px solid ${linkDark}`,
    },
    TimePicker: {
      iconColor: '#737994',
    },
    Switch: {
      railColorActive: '#81c8be',
    },
    Checkbox: {
      textColor: textColorDark,
    },
    Radio: {
      textColor: textColorDark,
    },
    Select: {
      peers: {
        InternalSelection: { textColor: textColorDark },
        InternalSelectMenu: { optionTextColor: textColorDark },
      },
    },
  }, // Theme options applied on dark mode
}
