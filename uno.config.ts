import { defineConfig, presetWind, presetTypography } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import { extendCatppuccin } from 'unocss-catppuccin'
import { themeConfig } from './theme.config'

export default defineConfig({
  content: {
    filesystem: [
      'content/**/*.md',
    ],
  },
  shortcuts: [
    ['root', `
        selector-[:root]:(
          [--primary:${themeConfig.light?.common?.primaryColor}]
          [--primary-hover:${themeConfig.light?.common?.primaryColorHover}]
          [--secondary:#179299]
          [--text-base:${themeConfig.light?.common?.textColorBase}]
          [--text-title:${themeConfig.light?.Card?.titleTextColor}]
          [--text-muted:#6c6f85]
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
          [--primary:${themeConfig.dark?.common?.primaryColor}]
          [--primary-hover:${themeConfig.dark?.common?.primaryColorHover}]
          [--secondary:#8caaee]
          [--text-base:${themeConfig.dark?.common?.textColorBase}]
          [--text-title:${themeConfig.dark?.Card?.titleTextColor}]
          [--text-muted:#a5adce]
          [--background-base:${themeConfig.dark?.common?.baseColor}]
          [--background-body:${themeConfig.dark?.common?.bodyColor}]
          [--link:${themeConfig.dark?.Anchor?.linkTextColorActive}]
          [--link-hover:${themeConfig.dark?.Anchor?.linkTextColorPressed}]
          [--border-input:${themeConfig.dark?.Card?.borderColor}]
        )
    `],
    ['super-gradient', 'from-ctp-latte-maroon to-ctp-latte-blue dark:(from-ctp-frappe-red to-ctp-frappe-mauve) bg-gradient-to-r'],
    ['super-text-gradient', 'super-gradient bg-clip-text font-extrabold text-transparent'],
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
          'text-decoration': 'underline',
        },
        'a:hover': {
          'text-decoration': 'none',
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
    extendCatppuccin(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
