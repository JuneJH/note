# Css 工程化

> 命名冲突: css命名冲突导致样式混乱 BEM命名规范，css module
>
> 复用困难: 没有办法想js那样复用样式 less，sass，css in js



## 1. webpack不能处理css文件，借助`css-loader`处理css文件

> Css-loader 不仅实现了读取css文件，还实现了css module

1. 配置

   ```js
   module.exports = {
       module:{
           rules:[
               {
                   test:/\.css$/,
                   use:["css-loader"]
               }
           ]
       },
   }
   ```

2. css-loader会把css分析并转换成js代码

   ```js
   {
     0:[],// 路径，css字符串
     i:fn,
     toString:// 返回css字符串
     locals// 如果开启css module 模式会存在该属性
   }
   ```

3. css-loader具备css-module能力

   ```js
     module:{
           rules:[
               {
                   test:/\.css$/,
                   use:[{
                       loader:"css-loader",
                       options:{
                           modules: true,
                       }
                   }]
               }
           ]
       }
   // 此时css-loader会返回带有locals属性的对象
   ```

4. 利用`style-loader`把css样式表引入html中

   ```js
   module:{
     rules:[
       {
         test:/\.css$/,
         use:[
           "style-loader",
           {
             loader:"css-loader",
             options:{
               modules: true,
             }
           }]
       }
     ]
   }
   ```

5. 也可以利用`mini-css-extract-plugin`生成独立文件

   ```js
   module:{
     rules:[
       {
         test:/\.css$/,
         use:[
           MiniCssExtractPlugin.loader,
           {
             loader:"css-loader",
             options:{
               modules: true,
             }
           }]
       }
     ]
   },
     plugins:[
       new htmlWebpackPlugin(),
       new MiniCssExtractPlugin()
     ]
   ```

## 2. 处理Less或者Sass

> Css样式表除了命名冲突，还可能需要解决变量，嵌套等问题
>
> 预编译样式语言就能很好解决 less或者sass

1. webpack中使用less

   ```js
   {
     test: /\.less$/,
       use: [
         MiniCssExtractPlugin.loader,
         {
           loader: "css-loader",
           options: {
             modules: true,
           },
         },
         "less-loader"
       ]
   }
   ```

2. less中使用变量,函数,嵌套

   ```less
   @import "./var.less"; // 导入，该文件所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉
   @fontColor: orange; // 变量
   @baseMarginLeft: 15px + 15px;
   
   .fontStyle {
       font-size: 60px;
       font-weight: 700;
       font-style: italic;
   }
   
   .fontSize(@size: 20px) {
       font-size: @size;
   }
   
   .color {
       color: @fontColor;
       .fontStyle(); // 混合
       .fontSize(90px);
   
       span {
           // 嵌套
           color: red;
       }
   
       &::after {
           content: "after";
           color: darken(@fontColor, 20%); // 函数 less提供包括不限于数学函数，颜色处理函数等
           margin-left: @baseMarginLeft + 15px; // 运算 45px
           background-color: (#222 / 2); // 运算 #111111;
   
       }
   }
   ```

## 3. 使用postcss

1. webpack中使用

   ```js
   {
     loader:"postcss-loader",
       options:{
         postcssOptions:{
           plugins:[
             [
               "postcss-preset-env",
               {
                 // options
               }
             ]
           ]
         }
       }
   }
   ```

2. 搭配`.browserslistrc`文件适当增加浏览器前缀

3. 使用css新特性

   ```css
   :root {
     --blue: #1e90ff;
     --white: #ffffff;
   }
   
   .postcssBg {
        background-color: var(--blue); // 使用变量
        transition:background .2s;	// 根据.browserslistrc文件添加前缀适配浏览器
   }
   ```

   
