import { defineConfig, presetWind, presetTypography } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import { themeConfig } from './theme.config'

export default defineConfig({
  shortcuts: [
    ['root', `
        selector-[:root]:(
          [--primary:${themeConfig.shared?.common?.primaryColor}]
          [--primary-hover:${themeConfig.shared?.common?.primaryColorHover}]
          [--text-base:${themeConfig.light?.common?.textColorBase}]
          [--text-title:#111827]
          [--text-muted:#89939F]
          [--background-base:${themeConfig.light?.common?.baseColor}]
          [--background-body:${themeConfig.light?.common?.bodyColor}]
          [--link:${themeConfig.light?.Anchor?.linkTextColorActive}]
          [--link-hover:${themeConfig.light?.Anchor?.linkTextColorPressed}]
          [--border-input:${themeConfig.light?.Card?.borderColor}]
          [--un-prose-headings:var(--text-title)]
          [--un-prose-links:var(--link)]
          [--un-prose-lists:var(--text-muted)]
          [--un-prose-hr:var(--text-muted)]
          [--un-prose-captions:var(--text-muted)]
          [--un-prose-code:var(--text-base)]
          [--un-prose-borders:var(--border-input)]
        )
    `],
    ['rootdark', `
        selector-[html.dark]:(
          [--text-base:${themeConfig.dark?.common?.textColorBase}]
          [--text-title:#EDF1F5]
          [--background-base:${themeConfig.dark?.common?.baseColor}]
          [--background-body:${themeConfig.dark?.common?.bodyColor}]
          [--link:${themeConfig.dark?.Anchor?.linkTextColorActive}]
          [--link-hover:${themeConfig.dark?.Anchor?.linkTextColorPressed}]
          [--border-input:${themeConfig.dark?.Card?.borderColor}]
        )
    `],
  ],
  theme: {
    fontFamily: {
      sans: themeConfig.shared?.common?.fontSize?.split(','),
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      center: true,
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
    presetTypography({
      cssExtend: {
        a: {
          'text-decoration-style': 'dashed',
        },
        'a:hover': {
          'text-decoration-style': 'solid',
          color: 'var(--link-hover)',
        },
        'h1 a,h2 a,h3 a,h4 a,h5 a,h6 a': {
          color: 'var(--un-prose-headings)',
          'text-decoration': 'none',
          'font-weight': 700,
        },
        'h1,h2,h3,h4,h5,h6': {
          'font-weight': 700,
        },
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
