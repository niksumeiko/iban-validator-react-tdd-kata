module.exports = {
    plugins: ['cypress'],
    env: {
        'cypress/globals': true,
    },
    settings: {
        'import/resolver': {
            typescript: {},
            alias: {
                map: [],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'cy.ts'],
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
};
