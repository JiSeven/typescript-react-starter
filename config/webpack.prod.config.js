const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./webpack.common');

// Common rules
config.mode = 'production';
config.output.clean = true;
// ================

// Optimization rules
config.optimization = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                warnings: false,
                compress: {
                    comparisons: false,
                },
                parse: {},
                mangle: true,
                output: {
                    comments: false,
                    ascii_only: true,
                },
            },
            parallel: true,
        }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return `npm.${packageName.replace('@', '')}`;
                },
            },
        },
    },
};

config.plugins.push(new webpack.ids.HashedModuleIdsPlugin()); // that prevents file hashes from changing unexpectedly
// ================

// CSS rules
const cssRule = config.module.rules.find((rule) => rule.test.source.includes('css'));

cssRule.use[0].options.modules.localIdentName = '[hash:base64]';

cssRule.use.unshift(MiniCssExtractPlugin.loader);

config.plugins.push(
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
    }),
);

config.plugins.push(new CssMinimizerPlugin());
// ================

module.exports = config;
