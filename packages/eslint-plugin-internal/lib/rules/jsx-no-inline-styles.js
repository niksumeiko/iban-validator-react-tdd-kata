const INLINE_STYLES_ERROR_MESSAGE = [
    'Don’t use inline styles in JSX;',
    'they are a security risk.',
    'Instead, use utility css classes or CSS Modules.',
].join(' ');

module.exports = {
    meta: {
        docs: {
            description: 'Disallow inline styles in JSX.',
            category: 'Best Practices',
            recommended: true,
        },
        schema: [],
    },

    create(context) {
        return {
            JSXAttribute(node) {
                if (isStyleAttribute(node)) {
                    context.report(node, INLINE_STYLES_ERROR_MESSAGE);
                }
            },
        };
    },
};

function isStyleAttribute(node) {
    return Boolean(
        node.type === 'JSXAttribute' &&
            node.name &&
            node.name.name &&
            node.name.name.toLowerCase() === 'style',
    );
}
