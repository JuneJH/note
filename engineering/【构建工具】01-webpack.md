# 工程化01-webpack

> webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 1. 基本概念

- entry: 打包入口,其实是配置chunk,一个入口配置就是一个chunk,该配置是一个对象

  ```js
  module.exports = {
    // 配置一个entry就是一个chunk
    entry:{
      // key 就是chunkname，value 就是模块地址
      main:"./src/index.js",// 一个入口模块,被webpack处理后执行一个入口文件
      more:["./src/index.js","./src/start.js"],// 两个入口模块，被webpack处理后执行与该配置同样的入口文件 生成一个bundle
    }
  }
  ```

- output: 输出配置

  ```js
  const path = require("path");
  module.exports = {
    output:{
      path:path.resolve(__dirname,"./bundle"), // 配置webpack输出目录
      filename:"[name].[hash:5].js" // 配置输出bundle的名称，可以使用webpack规则进行配置
    }
  }
  ```

- module: 加载器,使webpack能处理任何文件

  ```js
  module.exports = {
    module:{
      rules:[
        {
          test: /index.\js$/, // 匹配规则，正则表达式
          // 需要对命中文件使用的loader
          use:[
            // 对象方式
            {
              loader:"./xxx/xxxloader.js",
              options:{
                params:"xxx"
              }
            }
          ]
        },{
         	test:/js$/,
          // 数组方式
          use:["./src/loader01?params=false","loader02"]// 可以在后面想url地址一样使用参数
        }
      ],
      nopares:false
    }
  }
  // 在webpack生成ast之前会对匹配成功的文件的loader进行执行，从后向前执行顺序
  // 一个有效的loader不能为箭头函数 (内部需要使用this)且需要返回一个字符串或者流
  ```
  
- plugins: webpack运行中暴露出来的hooks,配置插件注册在各个阶段处理相关逻辑

  ```js
  modlue.exports = {
    plugins:[
      // 插件是一个对象，需要提供一个apply方法，在webpack初始化时，webpack会调用该方法并提供一个compiler对象该对象提供了钩子注册方法
      new XxxxPlugins() 
    ]
  }
  ```

- chunk: 一个模块的输出,可能会分成多个文件,但是他们应该属于一个chunk，一个入口所有的依赖形成一个chunk

- bundle: 输出的文件

- webpack指纹文件: hash、chunkhash、contenthash

- - hash: 项目级别
  - chunkhash: chunk组发生变化
  - contenthash: 单个文件发生变化 
  
- chunkname: chunk的默认名称

- devtool：开发工具配置，源码地图便于开发调试

  ```js
  devtool:"none" // 默认值
  devtool:"cheap-module-eval-source-map",// 通常使用开发环境配置
  devtool:"cheap-module-source-map", // 通常使用线上⽣成配置
  ```

- devServer: 开发服务器,具备代理,热更新等功能

  ```js
  devServer: {
   contentBase: "./dist", // 资源地址
   open: true, // 自动打开浏览器
   port: 8081, // 端口 port: 8081 // 端口
   proxy: { // 配置代理
  	"/api": {
  			target: "http://localhost:3000"
   		}
   }
  },
  ```

- mode: 设置打包环境

  ```js
  mode: "development"	//设置打包的环境，none、development、prodution
  ```

## 2. 实现一个loader

> loader不能是箭头函数且需要返回一个字符串或者buffer(可以通过return或者`this.callback()`返回)
>
> loader处理异步使用`this.async`

### 1. 实现一个替换字符串

```js
function (str){
    const callback = this.async();
    const res =  str.replace("name","junejh");
    setTimeout(()=>{
        callback(null,res);
    },100);
}
```

## 3. 实现一个plugin

> webpack在编译的时候会触发一系列 Tapable钩子,书写插件时根据自身功能找到自己需要执行的时机并在该钩子上注册插件任务,当钩子执行时会触发该任务
>
> plugin是⼀个类,通过apply函数接受⼀个参数compiler

### 1. 增加获取打包清单列表

```js
class fileListPlugin {
    constructor(filename = "filelist.txt"){
        this.filename = filename
    }
    apply(compiler){
        compiler.hooks.emit.tap("filelist",compilation=>{
            const result = Object.entries(compilation.assets).map(([key,val])=>{
                return `【${key}】    ===>    ${val.size()}`
            })

            compilation.assets[this.filename] = {
                source(){
                    return result.join("\n\n\n")
                },
                size(){
                    return result.length;
                }
            }
        })
    }
}
```

## 4. 打包结果分析(模块兼容方式)

```js
(function (modules) {
    const __webpack_module_cache__ = {};
    /**
     * 实现自定义导入函数__webpack_require__
     * @param {*模块唯一值，uri始终唯一} moduleId 
     * @returns 
     */
    function __webpack_require__(moduleId) {
        if (__webpack_module_cache__[moduleId]) {
            return __webpack_module_cache__[moduleId];
        }

        const fn = modules[moduleId];
        const module = {
            exports
        };
        fn(module, module.exports, __webpack_require__);
        const result = module.exports;
        __webpack_module_cache__[moduleId] = result;
        return result;

    }
    // 调用入口函数
    var __webpack_exports__ = __webpack_require__("./src/index.js")
})(
    // 依赖对象树
    {
        "./src/module01.js": function (module, exports, __webpack_require__) {
            console.log("run module01...")
            const a = "module01";

            module.exports = {
                a
            }

        },
        "./src/module02.js": function (module, exports, __webpack_require__) {
            console.log("run module02...")
            const b = "module02";

            module.exports = {
                b
            }

        },
        "./src/index.js": function (module, exports, __webpack_require__) {
            // console.log("start run...")
            // const { a } = __webpack_require__("./src/module01.js");
            // const { b } = __webpack_require__("./src/module02.js");
            // console.log("导出结果", a, b)
            // 使用eval标记执行行等信息
            eval("console.log(\"start run...\")\n\nconst {a} = __webpack_require__(/*! ./module01 */ \"./src/module01.js\");\n\nconst {b} = __webpack_require__(/*! ./module02 */ \"./src/module02.js\");\n\nconsole.log(\"导出结果\",a,b)\n\n\n//# sourceURL=webpack://engineering/./src/index.js?");

        }

    })
```

- 使用`eval`执行函数方便增加代码附件信息,比如代码行的信息
- 可通过`devtool`配置设置该代码执行方式

## 5. 编译过程

1. 合并参数，cli命令参数>配置文件>默认参数 参考库`yargs`
2. 创建chunk(可能存在多个) 根据入口模块递归穿件chunk assets 列表
3. 构建依赖模块(bundle)，形成chunk assets 资源列表并生成相应的chunk hash(根据资源列表内容)值，抽象语法树
4. 利用所有chunk生成hash
5. 输出文件emit

## 6. 注意事项

 
