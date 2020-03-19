module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: ['airbnb-base', 'plugin:vue/recommended', 'prettier', 'prettier/vue'],
    // extends: ['airbnb-base', 'plugin:prettier/recommended'],
    // extends: ['plugin:vue/essential',

    // ],
    plugins: ['prettier', 'vue'],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': ['off'],
        'import/no-unresolved': ['off'],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never'
            }
        ]
    }
};
