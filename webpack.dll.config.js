let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        lib: ['./polyfills.ts', './vendors.ts']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.css$/,
                loaders: ['raw-loader', 'css-loader'],
                //loader: ['raw'],
                include: path.resolve(__dirname, 'src/app')
            },
            {
                test: /\.css$/,
                // loaders: ['style-loader', 'css-loader'],
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                exclude: path.resolve(__dirname, 'src/app')
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'url?limit=8192&name=assets/[name].[hash].[ext]'//file?name=assets/[name].[hash].[ext]'//!url?limit=8192&name=assets/[name].[hash].[ext]' 
            },
        ]
    },
    output: {
        path: 'dist/dll',
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                compress: true,
                mangle: true,
                comments: false
            }
        ),
          new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename:'../../build/index.html',
            inject:'head'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.DllPlugin({
            path: './dll/manifest.json',//是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包；
            name: '[name]', //dll 暴露的对象名，要跟 output.library 保持一致；
            context: __dirname //解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
        }),
    ],
};

