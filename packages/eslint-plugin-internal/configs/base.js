module.exports = {
    extends: ['airbnb'],
    plugins: ['internal'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    rules: {
        'arrow-body-style': 'off',
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_links', '_embedded'],
            },
        ],
        'class-methods-use-this': 'off',
        'max-depth': ['error', 3],
        'max-lines': 'error',
        'no-param-reassign': [
            'error',
            {
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
            },
        ],
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^__',
            },
        ],
        'no-console': 'error',
        'no-restricted-syntax': [
            'error',
            {
                selector:
                    "CallExpression[callee.object.name='console'][callee.property.name=/^(.*)$/]",
                message: 'Use @luna/logger instead',
            },
        ],
        // Import overrides
        'import/no-cycle': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': [
            'error',
            {
                ts: 'never',
                tsx: 'never',
                ejs: 'always',
                jsx: 'never',
                js: 'never',
                json: 'always',
                svg: 'always',
                png: 'always',
                jpg: 'always',
                ico: 'always',
                css: 'always',
                sass: 'always',
                scss: 'always',
                less: 'always',
                features: 'always',
            },
        ],
        'import/no-unresolved': [
            'error',
            {
                commonjs: true,
                caseSensitive: true,
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
                'newlines-between': 'always',
            },
        ],
        'import/no-useless-path-segments': [
            'error',
            {
                noUselessIndex: true,
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'lodash',
                        message: 'Use @luna/lodash instead.',
                    },
                ],
                patterns: [
                    {
                        group: ['*react-router*'],
                        message: 'Use @luna/router instead.',
                    },
                ],
            },
        ],
        // Custom rules
        'internal/no-unnamed-dynamic-imports': 'error',
        'internal/no-dev-log': 'error',
        'default-param-last': 'warn',
    },
    overrides: [
        {
            files: ['*.test.*', '**/__mocks__/*'],
            rules: {
                'max-lines': 'off',
            },
        },
    ],
    globals: {
        internal: true,
        $: true,
        i18: true,
        moment: true,
        webtrekkV3: true,
        UserSnap: true,
        formatMoneyHTML: true,
        qrcode: true,
        base64: true,
        contentId: true,
    },
};
