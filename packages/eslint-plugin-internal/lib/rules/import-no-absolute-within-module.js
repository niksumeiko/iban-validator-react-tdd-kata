const { relative, dirname, parse, join } = require('path');

const resolve = require('eslint-module-utils/resolve.js');

const normalizeSep = (somePath = '') => somePath.split('\\').join('/');
/**
 * This function returns the module group name
 * of a path:
 * @example getModuleGroupName('projects/my-app/packages/form/adapters/src/index.cjs') // returns formapi
 * */

const getModuleGroupName = (path) => {
    const hasPackages = path.includes('packages');
    const pathArray = normalizeSep(path).split('/');

    if (hasPackages) {
        const indexOfPackages = pathArray.findIndex((dir) => dir === 'packages');
        const indexOfSrc = pathArray.findIndex((dir) => dir === 'src');
        return pathArray.slice(indexOfPackages, indexOfSrc).join('');
    }

    const hasRootSrc = path.includes('src');
    if (hasRootSrc) {
        const indexOfSrc = pathArray.findIndex((dir) => dir === 'src');
        return pathArray[indexOfSrc + 1];
    }

    return '';
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: `Disallow absolute imports within a module/feature.`,
            category: 'Best Practices',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    root: { type: 'string' },
                },
                additionalProperties: false,
            },
        ],
        fixable: 'code',
    },

    /**
     * Pseudocode:
     * if importDeclaration is an absolute path
     * where the source module (e.g. luna/adapters) is the same
     * as the target module (e.g. luna/adapters) then report a linter error */
    create: function noAbsoluteWithinModules(context) {
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                const isRelativePath = importPath.startsWith('.');

                if (isRelativePath) {
                    return false;
                }

                // file from which we are doing the import and running the eslint rule
                const sourceFilePath = context.getFilename();
                // file that we are importing in this importDeclaration
                const targetImportPath = resolve.default(importPath, context);
                if (!targetImportPath) {
                    return;
                }

                const sourcePathModuleGroupName = getModuleGroupName(sourceFilePath);
                const targetPathModuleGroupName = getModuleGroupName(targetImportPath);

                const sourceAndTargetModuleGroupAreEqual =
                    sourcePathModuleGroupName === targetPathModuleGroupName;

                if (
                    !sourceAndTargetModuleGroupAreEqual ||
                    !sourcePathModuleGroupName ||
                    !targetPathModuleGroupName
                ) {
                    return;
                }

                const relDepPath = relative(
                    dirname(context.getFilename()),
                    targetImportPath,
                );
                const parsed = parse(relDepPath);
                const relDepPathWithoutExtension = join(parsed.dir, parsed.name);
                const isJSFile = ['.js', '.jsx', '.ts', '.tsx'].includes(parsed.ext);
                const canAutoFix = !importPath.startsWith('@');

                context.report({
                    node,
                    message: `importing from "${importPath}" with an absolute path is not allowed. Please use the relative path.`,
                    ...(canAutoFix && {
                        fix(fixer) {
                            if (importPath.startsWith('@')) {
                                return;
                            }
                            return fixer.replaceText(
                                node.source,
                                `'./${
                                    isJSFile ? relDepPathWithoutExtension : relDepPath
                                }'`,
                            );
                        },
                    }),
                });
            },
        };
    },
};
