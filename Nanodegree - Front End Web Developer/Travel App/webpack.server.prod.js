const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'production',
    stats: 'detailed',
    entry: {
        server: './src/server/server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({}),
        ],
        concatenateModules: false,
    },
    target: 'node',
    node: {
        // if you don't put these two in, __dirname and __filename return blank or /
        __dirname: false,
        __filename: false,
    },
    externals: [
        nodeExternals(), // Need this to avoid error when working with Express
    ],
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
};