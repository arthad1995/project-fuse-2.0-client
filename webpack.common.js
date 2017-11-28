const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: __dirname,
    entry: {
        vendor: ["react", "redux", "react-redux", "react-dom", "react-router", "js-cookie","redux-promise-middleware", "redux-thunk", "history"],
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-3'],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};