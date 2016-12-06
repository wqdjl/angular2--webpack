#webpack package

##如何运行demo
   1、首次运行 npm i //安装npm包
              
              npm run webpack:dll //编译固定第三方插件

              npm run dev //使用webpack-dev-server 运行
   2、后续运行
      如果只修改了业务代码 
      
      npm run dev

      如果引用了第三方 

        npm run webpack:dll //编译固定第三方插件

        npm run dev //使用webpack-dev-server 运行

##basic knowledge
###entry —— 入口文件配置
 1、单入口 entry:"***.js";

 2、多入口 entry:{name1:"**.js",name2:'**.js',...},建议使用这种写法，方便扩展

###output —— 输出文件
  output：{

      path：'string',//生成文件的根目录 
      
      filename:'',//可以是固定的文件名 或者[name].[hash].js

  }

参考： https://segmentfault.com/a/1190000006863968

## ts不支持require，需要安装‘ npm i --save-dev @types/node’

##打包输出模板文件
 1、install loader “angular2-template-loader html-loader”. '.ts' loader change to "loaders: ['awesome-typescript-loader', 'angular2-template-loader']"
 
 2、use html-loader instead of raw loader .If you do not instead,it will be ok,but html file can not be compressed 
 
 注：http://stackoverflow.com/questions/39157580/angular2webpack-how-should-i-output-html-file-with-templateurl

## package styleUrls 
 1、install "raw-loader" 

 2、webpack config file add loader { test:'/\.css$/',loader:'raw',include:'styleUrls file path' } 

## package other css
 1、install “css-loader style-loader”
 
 2、webpack config file add loader { test:'/\.css$/',loaders: ['style-loader', 'css-loader'],include:'other css file path' }
 
 注：include，exclude 目的是为了选择需要打包 的css文件所在的目录
  
## 打包并将css文件单独分离出来
  use Extract-text-webpack-plugin.  link: http://npm.taobao.org/package/extract-text-webpack-plugin
  
  warning: loaders and plugin 要一起使用才会生效
  
## 压缩js文件
 1、use webpack.optimize.UglifyJsPlugin() compress js file

 2、use webpack.optimize.CommonsChunkPlugin({name:['入口文件1',...],file:'输出文件，忽略则以name为输出文件的名字'}) ,提取公共文件

## how to become a globlal var 
 1、use webpack.ProviderPlugin.
   
    eg.

    npm i --save jquery ;

    import 'jquery';

    new webpack.ProviderPlugin({

        jQuery:'jquery',
        
        $:'jquery',

        'window.$':'jquery',
        
        'window.jQuery':'jquery'
   
    })

  2、use expose-loader  . https://github.com/webpack/expose-loader
     
     eg.
    
     npm i --save jquery ;

     import 'jquery';

     {test:require.resolve('jquery'),loader:'expose-loader?$!expose-loader?jQuery'}


## 将一个全局变量伪装成某个js模块
   use webpack config options —— externals 

   eg. externals:{ 'jquery':'window.jQuery'} ;然后可以调用 var $=require(jquery);   

## es6代码打包成es2015
  use bebel 

  npm i --save-dev babel-core babel-preset-es2015-loose
  
  更优化方案：设置cacheDirectory、加载plugin（npm i --save-dev bable-runtime babel-plugin-transforn-runtime ）

  {test:/\.js$/,loader: 'babel-loader?presets[]=es2015-loose&cacheDirectory&plugins[]=transform-runtime'}

  https://segmentfault.com/a/1190000006992218

## how to review grammar mistakes and code style
   use eslint-loader

   https://github.com/MoOx/eslint-loader

## 用webpack生产html页面
    npm i --save-dev html-webpack-plugin

    {
        new HtmlWebpackPlugin({
            title:'',

            filename:'生成的网页HTML文件的文件名',

            template:'模板文件',

            inject:'js插入的位置，默认为body末尾'，

            minify:'生成压缩后的html代码',

            hash:'inject进入html页面的添加hash值，属于缓存解决方案，和output的name用[hash]一个效果',

            chunks:'以数组的形式指定由html-webpack-plugin负责加载的chunk文件（打包后生成的js文件），不指定的话就会加载所有的chunk。'
        })
    }

## webpack打包分生产测试开发环境，你的业务代码怎么同步知道？
  用webpack.DefinePlugin 配置node的全局进程process的env(进程的环境变量)，再在业务代码里面做出对应的判断

  new webpack.DefinePlugin({'process.env': JSON.stringify(true)})

  if (process.env) { // 做生产环境该做的事} else { // 做开发环境该做的事}

## 使用CommonChunkPlugin打包公共文件
  new webpack.optimize.CommonChunkPlugin({

      name:'',//这是公共代码的Chunk的名字

      filename:'***',//可以固定文件名或者 [name].js(name是上面配置的属性)

      minChunks:'number'//被重复加载的次数才纳入公共代码

  })

## 使用DllPlugin、DllReferencePlugin打包公共文件提高打包效率
  原理：第三方库使用 webpack 的DllPlugin单独打包，然后打包业务代码并用DllReferencePlugin关联第三方库
  
  操作：1、单独新建一个DllPlugin的config文件，配置对应的output、entry、plugins，然后运行webpack打包此config文件
        
        2、webpack打包业务代码

     注意：需要先运行DllPlugin生产manifest.json，然后再打包业务代码

     问题：打包了第三方库的时候打包了vendors.ts、polyfills.ts，但是在业务代码里面还要在entry里面添加，否则会报错，why？？？
