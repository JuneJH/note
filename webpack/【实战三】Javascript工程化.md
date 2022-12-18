# Javascript 工程化

> 对于不确定的客户端如何在开发的时候使用新语法提高开发效率



## 1. Babel

> 统一的语

1. babel预设
1. babel插件

## 2. webpack中使用Babel

1. 配置babel-loader

   ```js
   module: {
     rules: [
       {
         test: /\.js$|\.ts$/,
         use: [
           {
             loader: "babel-loader",
             options: {
               // 配置预设
               presets: [
                 ['@babel/preset-env',
                  {
                    useBuiltIns: "entry",
                    corejs: "3.22"
                  }]
               ],
               // 配置插件
               plugins:[
                 "@babel/plugin-transform-typescript" // 处理ts文件
               ]
             }
           }
         ]
       }
     ]
   }
   ```
   
1. 也可以单独起配置文件`babel.config.json`

   ```json
   {
       // 配置预设，预设配置作为数组第二项传入
       "presets": [
           [
               "@babel/preset-env",
               {
                   "corejs": "3.22"
               }
           ]
       ],
       // 配置插件
       "plugins": [
           "@babel/plugin-transform-typescript" // 处理ts文件
       ]
   }
   ```
   
   
