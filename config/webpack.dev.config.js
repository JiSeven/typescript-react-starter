const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('./webpack.common');

// Common rules
config.mode = 'development';
config.devtool = 'inline-source-map';
// ================

config.plugins.unshift(new ReactRefreshWebpackPlugin());

// Typescript rules
const typescriptRule = config.module.rules.find((rule) => rule.test.source.includes('tsx'));

typescriptRule.options.getCustomTransformers = () => ({
    before: [require('react-refresh-typescript')()],
});
// ================

// CSS rules
const cssRule = config.module.rules.find((rule) => rule.test.source.includes('css'));

cssRule.use[0].options.modules.localIdentName = '[path][name]__[local]--[hash:base64:5]';

cssRule.use.unshift('style-loader');
// ================

// Dev server
config.devServer = {
    static: {
        directory: path.join(process.cwd(), 'public'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
};

// ================

module.exports = config;
