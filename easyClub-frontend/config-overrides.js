// https://web3auth.io/docs/troubleshooting/webpack-issues#create-react-app
// npm install -D path-browserify util stream-browserify browserify-zlib constants-browserify fs.realpath


const webpack = require("webpack");

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        path: require.resolve("path-browserify"),
        util: require.resolve("util/"),
        stream: require.resolve("stream-browserify"),
        fs: false,
        zlib: require.resolve("browserify-zlib"),
        constants: require.resolve("constants-browserify"),
        "fs.realpath": require.resolve("fs.realpath"),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]);
    config.ignoreWarnings = [/Failed to parse source map/];
    config.module.rules.push({
        test: /\.(js|mjs|jsx)$/,
        enforce: "pre",
        loader: require.resolve("source-map-loader"),
        resolve: {
            fullySpecified: false,
        },
    });
    return config;
};