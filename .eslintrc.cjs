module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    env: {
        browser: true,
        es2021: true,
    },
    root: true,
    rules: {
        "quotes": ["error", "double"],
    },
};
