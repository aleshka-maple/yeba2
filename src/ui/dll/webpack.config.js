const webpack = require("webpack");

module.exports = {
    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-loadable',
            'react-redux',
            'react-router',
            'react-router-dom',
            'redux'
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].dll.js",
        library: '[name]'
    },
    resolve: {
        modules: ['node_modules']
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: __dirname + '/build/[name].manifest.json'
        }),
        //new webpack.optimize.UglifyJsPlugin()
    ]
};
