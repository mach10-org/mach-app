import { defineConfig, presetWind, presetTypography } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import { themeConfig } from './theme.config'

export default defineConfig({
  preflight: false,
  shortcuts: [
    ['root', `
        selector-[:root]:(
          [--primary:${themeConfig.shared?.common?.primaryColor}]
          [--primaryHover:${themeConfig.shared?.common?.primaryColorHover}]
        )
    `],
  ],
  theme: {
    fontFamily: {
      sans: themeConfig.shared?.common?.fontSize?.split(','),
    },
    colors: {
      primary: {
        100: '#FCE9F2',
        600: '#457D00',
        700: '#ce3077',
      },
    },
  },
  presets: [
    presetWind({
      dark: 'class',
    }),
    presetTypography(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
