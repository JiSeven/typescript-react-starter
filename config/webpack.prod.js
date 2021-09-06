const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common');

common.mode = 'production';
common.output.clean = true;

common.module.rules
    .find((rule) => rule.test.source === /\.tsx?$/.source)
    .use.unshift({
        loader: 'babel-loader',
    });

common.module.rules.map((rule) => {
    if (rule.test.source.includes('css')) {
        rule.use.unshift(MiniCssExtractPlugin.loader);
    }

    return rule;
});

common.optimization = {
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
        maxInitialRequests: 20,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(
                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                    )[1];
                    return `npm.${packageName.replace('@', '')}`;
                },
            },
        },
    },
};

common.plugins.push(
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
);

common.plugins.push(new CssMinimizerPlugin());

common.plugins.push(new webpack.ids.HashedModuleIdsPlugin());

if (process.env.ANALYZE === 'true') {
    const dateObj = new Date();
    let date = ('0' + dateObj.getDate()).slice(-2);
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let year = (dateObj.getFullYear().toString()).slice(-2);

    common.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.join(process.cwd(), 'config', 'reports', `analyze-${year}.${month}.${date}.html`),
    }));
}

module.exports = common;

