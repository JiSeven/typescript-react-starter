const path = require('path');

const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(process.cwd(), 'src'),
    },
    output: {
        path: path.join(process.cwd(), 'build'),
        filename: '[name].[fullhash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(process.cwd(), 'src'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.module\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[path]-[local]-[hash:base64:5]',
                            },
                            sourceMap: true,
                        },
                    },
                    'style-loader'
                ],
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'css-loader',
                    'style-loader',
                ],
            },
        ],
    },
    resolve: {
        modules: [path.join(process.cwd(), 'src'), 'node_modules'],
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: path.join(process.cwd(), 'src', 'index.html'),
            filename: 'index.html',
            scriptLoading: 'defer',
        }),
        new Dotenv(),
    ],
};

