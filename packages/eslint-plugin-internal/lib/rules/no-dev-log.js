module.exports = {
    meta: {
        docs: {
            description: 'Disallow commit of dev logs.',
            category: 'Best Practices',
            recommended: true,
        },
        schema: [],
    },
    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.object &&
                    node.callee.property &&
                    node.callee.object.name === 'logger' &&
                    node.callee.property.name === 'dev'
                ) {
                    context.report(
                        node,
                        'Dev logging detected, remove it before commit of changes.',
                    );
                }
            },
        };
    },
};
