module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'max-len': ['error', { code: 120 }],
    'vue/max-len': ['error', {
      code: 120,
      template: 100,
    }],
    'import/no-unresolved': "off",
    'import/extensions':"off",
  }
}
