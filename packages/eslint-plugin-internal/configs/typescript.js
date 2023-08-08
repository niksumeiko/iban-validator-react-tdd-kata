module.exports = {
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                'react/prop-types': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/ban-ts-comment': 'warn',
                '@typescript-eslint/explicit-function-return-type': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': [
                    'error',
                    {
                        ignoreTypeReferences: true,
                        functions: false,
                    },
                ],
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': [
                    'error',
                    {
                        allowShortCircuit: true,
                        allowTernary: true,
                        allowTaggedTemplates: true,
                    },
                ],
                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        vars: 'all',
                        args: 'after-used',
                        ignoreRestSiblings: true,
                        argsIgnorePattern: '^__',
                    },
                ],
                '@typescript-eslint/no-magic-numbers': [
                    'error',
                    {
                        ignoreEnums: true,
                        ignoreNumericLiteralTypes: true,
                        ignoreReadonlyClassProperties: true,
                        ignoreArrayIndexes: true,
                        ignore: [-1, 0, 1],
                    },
                ],
                // these import rules are off as TypeScript provides the same checks as part of standard type checking.
                'import/no-unresolved': 'off',
                'import/no-named-as-default-member': 'off',
                'import/named': 'off',
                // checked as part of nx
                'import/no-cycle': 'off',
                'import/no-import-module-exports': 'off',
            },
        },
        {
            files: ['*.test.*', '**/__mocks__/*'],
            rules: {
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/no-implicit-any': 'off',
                '@typescript-eslint/no-magic-numbers': 'off',
            },
        },
        {
            files: ['*.tsx', '*.jsx'],
            rules: {
                '@typescript-eslint/ban-types': [
                    'error',
                    {
                        extendDefaults: true,
                        types: {
                            '{}': false,
                        },
                    },
                ],
            },
        },
        {
            files: ['*.cy.tsx'],
            rules: {
                '@typescript-eslint/no-magic-numbers': 'off',
            },
        },
        {
            files: ['**/features/*', '**/FeatureConfig/*'],
            rules: {
                '@typescript-eslint/no-magic-numbers': 'off',
            },
        },
    ],
};
