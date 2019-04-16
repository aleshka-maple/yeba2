const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    entry: {
        main: path.join(__dirname, './index.tsx')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist')
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".less"],
        modules: ['./', 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            { test: /\.ts|\.tsx$/, loader: 'ts-loader' }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(path.join(__dirname, './dist'), {}),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: path.join(__dirname, './assets/index.html')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./dll/build/vendors.manifest.json')
        })
    ]
};

