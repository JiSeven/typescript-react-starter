const path = require('path');

const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

module.exports = {
    entry: {
        main: path.join(cwd, 'src'),
    },
    output: {
        path: path.join(cwd, 'build'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                auto: true,
                                exportGlobals: true,
                                localIdentContext: path.join(cwd, 'src'),
                                exportLocalsConvention: 'camelCaseOnly',
                                namedExport: true,
                                exportOnlyLocals: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        modules: [path.join(cwd, 'src'), 'node_modules'],
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: path.join(cwd, 'src', 'index.html'),
            filename: 'index.html',
            scriptLoading: 'defer',
        }),
        new Dotenv(),
    ],
};
