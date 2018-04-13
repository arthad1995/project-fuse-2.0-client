const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            './src/index.js',
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
            chunks: ["app"],
            filename: 'app.bundle.js',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            chunks: ["vendor"],
            filename: 'vendor.bundle.js',
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        //new BundleAnalyzerPlugin(),
        new UglifyJSPlugin(),
        new CopyWebpackPlugin([
            { from: 'index.html' },
            { from: 'assets', to: 'assets' }
        ])
    ],
})