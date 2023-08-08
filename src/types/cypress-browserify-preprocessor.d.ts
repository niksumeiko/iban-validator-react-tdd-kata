declare module '@cypress/browserify-preprocessor' {
    type Plugin = [string, Record<string, string>];

    interface Browserify {
        defaultOptions: {
            browserifyOptions: {
                plugin: Plugin[];
            };
        };
    }

    const browserify: Browserify;

    export default browserify;
}
