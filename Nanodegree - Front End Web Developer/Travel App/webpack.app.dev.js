const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        index: './src/client/js/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    target: 'web',
    devtool: 'source-map',
    devServer: {
        host: 'localhost',
        port: 5010,
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        before(app, server, compiler) {
            // As HMR does not recognize html changes right now, we manually watch for html files and
            // reload the page on changes.
            const watchFiles = ['.html'];

            compiler.plugin('done', () => {
                const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

                if (
                    this.hot &&
                    changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
                ) {
                    server.sockWrite(server.sockets, 'content-changed');
                }
            });
        }
    },
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
                    }
                ]
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    {
                        loader: "style-loader",
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
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
    ]
};