const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/client/js/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    target: 'web',
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.m?js$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebpackPlugin in Plugins 
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            // Must be set to false in order for the HtmlWebpackPlugin minifier to not throw an error
                            // on minifying inlined ressources by the 'url-loader'.
                            // The problem is that if this is not set then by default the 'html-loader' will minify
                            // the html files, which means in effect you will have two html minifications process.
                            // Problem is, that the 'html-loader' produces some html error (removing quotes) which then
                            // breakes the minifier of HtmlWebpackPlugin.
                            minimize: false,
                        }
                    }
                ]
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    limit: 8192,
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};