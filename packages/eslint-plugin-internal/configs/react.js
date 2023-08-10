module.exports = {
    extends: ['plugin:react/jsx-runtime'],
    plugins: ['internal', 'react', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        // React overrides
        'react/no-unused-prop-types': 'off',
        // too many false positives in TS files
        'react/require-default-props': 'off',
        // use ES6 defaults
        'react/jsx-key': [
            'error',
            {
                checkFragmentShorthand: true,
            },
        ],
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/state-in-constructor': 'off',
        'react/static-property-placement': 'off',
        'react/button-has-type': 'warn',
        'react/jsx-curly-brace-presence': [
            'warn',
            {
                props: 'never',
                children: 'never',
            },
        ],
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.tsx', '.jsx'],
            },
        ],
        'react/jsx-props-no-spreading': [
            'warn',
            { html: 'ignore', exceptions: ['FormProvider'] },
        ],
        'react/jsx-no-script-url': [
            'error',
            [
                {
                    name: 'Link',
                    props: ['href', 'to'],
                },
            ],
        ],
        'react/no-access-state-in-setstate': 'warn',
        'react/sort-comp': 'warn',
        'react/forbid-foreign-prop-types': 'error',
        'react/forbid-prop-types': [
            'error',
            {
                forbid: ['any'],
            },
        ],
        // allowing array and object for now
        'react/prefer-stateless-function': [
            'error',
            {
                ignorePureComponents: false,
            },
        ],
        // off for performance reasons
        'react/no-deprecated': 'off',
        // a11y overrides
        'jsx-a11y/label-has-associated-control': 'off',
        // React hooks overrides
        'react-hooks/exhaustive-deps': 'warn',
        // Custom rules concerning React
        'internal/jsx-no-ternary': 'warn',
        'internal/no-unnamed-dynamic-imports': 'error',
        'internal/jsx-no-inline-styles': 'error',
        'react/jsx-no-bind': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/no-unstable-nested-components': [
            'error',
            {
                allowAsProps: true,
            },
        ],
        'react/jsx-no-constructed-context-values': 'warn',
    },
    overrides: [
        {
            files: ['*.test.*', '**/__mocks__/*'],
            rules: {
                'react/jsx-props-no-spreading': 'off',
                'internal/jsx-no-inline-styles': 'off',
            },
        },
    ],
    env: {
        browser: true,
    },
};
