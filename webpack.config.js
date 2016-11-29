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
        path: path.resolve(__dirname, 'dist'),

    },
    resolve: {
        extensions: ['', '.ts', '.js', '.css']
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
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/manifest.json'),
        }),
        new webpack.DefinePlugin({'process.env': JSON.stringify(true)}),
        
        new ExtractTextPlugin('style.[hash].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common', //['app', 'vendors', 'polyfills'],
        //     filename: '[name].[hash].js',
        //     minChunks: 2
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]

};

module.exports = config;

