module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'never'
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
