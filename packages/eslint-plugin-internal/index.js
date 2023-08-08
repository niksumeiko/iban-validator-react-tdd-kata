/** Custom internal rules */
const jsxNoTernary = require('./lib/rules/jsx-no-ternary.js');
const noUnnamedDynamicImports = require('./lib/rules/no-unnamed-dynamic-imports.js');
const importNoAbsoluteWithinModule = require('./lib/rules/import-no-absolute-within-module.js');
const jsxNoInlineStyles = require('./lib/rules/jsx-no-inline-styles.js');
const noDevLog = require('./lib/rules/no-dev-log.js');

/** Custom internal configs */
const baseConfig = require('./configs/base');
const typescriptConfig = require('./configs/typescript');
const reactConfig = require('./configs/react');
const cypressConfig = require('./configs/cypress');
const prettierConfig = require('./configs/prettier');

module.exports = {
    rules: {
        'jsx-no-ternary': jsxNoTernary,
        'no-dev-log': noDevLog,
        'jsx-no-inline-styles': jsxNoInlineStyles,
        'import-no-absolute-within-module': importNoAbsoluteWithinModule,
        'no-unnamed-dynamic-imports': noUnnamedDynamicImports,
    },
    configs: {
        base: baseConfig,
        typescript: typescriptConfig,
        react: reactConfig,
        cypress: cypressConfig,
        prettier: prettierConfig,
    },
};
