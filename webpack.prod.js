const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            './src/index.js',
        ],
    },
    externals: [
        "immutable",
    ],
    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
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
        new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
        new BundleAnalyzerPlugin(),
        new UglifyJSPlugin(), //minify everything
    ],
})