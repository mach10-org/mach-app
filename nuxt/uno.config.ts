import { defineConfig, presetWind, presetTypography } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  preflight: true,
  theme: {
    fontFamily: {
      sans: [
        'Rubik',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'sans-serif',
      ],
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