import cucumber from 'cypress-cucumber-preprocessor';
import browserify from '@cypress/browserify-preprocessor';

module.exports = (on) => {
    const options = browserify.defaultOptions;

    options.browserifyOptions.plugin.unshift(['tsify', { project: '../../tsconfig.json' }]);

    on('file:preprocessor', cucumber(options));
};
