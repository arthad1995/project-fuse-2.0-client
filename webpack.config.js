const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: __dirname,
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://0.0.0.0:8081',
            'webpack/hot/only-dev-server',
            './src/index.js',
        ],
        vendor: ["react", "redux", "react-redux", "react-dom", "react-router", "js-cookie", "immutable", "axios", "redux-promise-middleware", "redux-thunk", "history"],
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },
    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(), //dedupe similar code 
        //new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.bundle.js",
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
    ],
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