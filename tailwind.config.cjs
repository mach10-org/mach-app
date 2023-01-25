/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')]
};
