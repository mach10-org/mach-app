module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', '@unocss'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'comma-dangle': ['error', 'always-multiline'],
  },
}
