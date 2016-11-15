##output file with templateUrl?
 1、"templateUrl:'XXX.html'" change to "template:require('XXX.html')", 注：ts不支持require，需要安装‘ npm i --save-dev @types/node’
 
 2、install loader “angular2-template-loader html-loader”. '.ts' loader change to "loaders: ['awesome-typescript-loader', 'angular2-template-loader']"
 
 3、use html-loader instead of raw loader .If you do not instead,it will be ok,but html file can not be compressed 
 
 注：http://stackoverflow.com/questions/39157580/angular2webpack-how-should-i-output-html-file-with-templateurl

## package styleUrls 
 1、install "raw-loader" 

 2、webpack config file add loader { test:'/\.css$/',loader:'raw',include:'styleUrls file path' } 

## package other css
 1、install “css-loader style-loader”
 
 2、webpack config file add loader { test:'/\.css$/',loaders: ['style-loader', 'css-loader'],include:'other css file path' }
 
 注：include，exclude 目的是为了选择需要打包 的css文件所在的目录

## how to make js file size smaller 
 1、use webpack.optimize.UglifyJsPlugin() compress js file

 2、use webpack.optimize.CommonsChunkPlugin({name:['入口文件1',...],file:'输出文件，忽略则以name为输出文件的名字'}) ,提取公共文件