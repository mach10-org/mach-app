import { defineConfig, presetWind, presetTypography } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import { themeConfig } from './theme.config'

export default defineConfig({
  shortcuts: [
    ['root', `
        selector-[:root]:(
          [--primary:${themeConfig.light?.common?.primaryColor}]
          [--primary-hover:${themeConfig.light?.common?.primaryColorHover}]
          [--text-muted:#89939F]
          [--link:#be185d]
          [--link-hover:#9d174f]
        )
    `],
    ['rootdark', `
        selector-[html.dark]:(
          [--primary:${themeConfig.dark?.common?.primaryColor}]
          [--primary-hover:${themeConfig.dark?.common?.primaryColorHover}]
          [--link:#f9a8ca]
          [--link-hover:#f472a8]
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
