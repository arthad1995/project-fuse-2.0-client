const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://0.0.0.0:8081',
            'webpack/hot/only-dev-server',
            './src/index.js',
        ],
    },
    externals: [
        "immutable",
    ],
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
});