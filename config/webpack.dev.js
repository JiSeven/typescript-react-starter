/* eslint-disable */
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const ip = require('ip');
const chalk = require('chalk');

const divider = chalk.white(new Array(31).fill('\u25A0').join(''));

const common = require('./webpack.common');

common.mode = 'development';
common.devtool = 'inline-source-map';
common.module.rules
    .find((rule) => rule.test.source === /\.tsx?$/.source)
    .use.unshift({
        loader: 'babel-loader',
        options: { plugins: ['react-refresh/babel'] },
    });

common.plugins.unshift(new ReactRefreshPlugin());

common.devServer = {
    static: {
        directory: path.join(process.cwd(), 'build'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
};

module.exports = common;

