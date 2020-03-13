module.exports = {
  root: true,
  env: {
		"browser": true
  },
  extends: [
		"airbnb-base",
		"plugin:vue/recommended",
		"prettier",
		"prettier/vue"
  ],
  plugins: [
		"prettier",
		"vue"
	],
  parserOptions: {
		"parser": "babel-eslint",
		"sourceType": "module"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ["off"],
    'import/no-unresolved': ["off"],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
