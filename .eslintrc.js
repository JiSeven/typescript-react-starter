module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb', 'plugin:import/recommended', 'plugin:import/typescript', 'airbnb-typescript', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {},
};
