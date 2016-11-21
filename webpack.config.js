let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    entry: {
        app: './src/app/main.ts',
        polyfills: './polyfills.ts',
        vendors: './vendors.ts'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html',
            },
            {
                test: /\.css$/,
                //loaders: ['raw-loader'],
                loader: 'raw',
                include: path.resolve(__dirname, 'src/app')
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                exclude: path.resolve(__dirname, 'src/app')
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendors', 'polyfills'],
            //filename:'build.[hash].js',
            minChunks:2
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery',
            'window.jQuery':'jquery'
        })
    ]

};

module.exports = config;

