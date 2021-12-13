# Koa和express的使用



> Koa是express原班人马打造的,更轻量、结构更清晰、完全支持异步处理
>
> Koa是基于生成器完成的,Koa2是基于`async/await`完成的
>
> express中间件如果没有异步和koa是一样的`洋葱模型`

## 1. 创建一个应用

### 1.Koa

```js
const Koa = require("koa");
const app = new Koa();
const PORT = 3000;
app.listen(PORT,()=>{console.log("server start at ",PORT)})
```

### 2. Express

```js
const express = require('express')
const app = express()
const port = 3000
app.listen(port, ()=>{console.log("server start at ",PORT)})
```



## 2. 中间件处理顺序

### 1. Koa

```js
app.use(async (ctx,next)=>{
    console.log("第一个中间件 =>");
    ctx.body +="1";
    await next();
    ctx.body +="10";
    console.log("第一个中间件 <=")
})
app.use(async (ctx,next)=>{
    console.log("第二个中间件 =>");
    ctx.body +="2";
    await next();
    ctx.body +="9";
    await delay();   // 始终等待契约执行完成后运行下面的代码
    console.log("第二个中间件 <=")
})
app.use(async (ctx,next)=>{
    console.log("第三个中间件 =>");
    await delay();   // 始终等待契约执行完成后运行下面的代码
    ctx.body +="3";
    await next();
    console.log("第三个中间件 <=")
    ctx.body +="8";
})
app.use(async (ctx,next)=>{
    ctx.body +="4";
    console.log("第四个中间件 =>");
    await next();
    console.log("第四个中间件 <=")
    ctx.body +="7";
})
app.use(async (ctx,next)=>{
    console.log("第五个中间件 =>");
    ctx.body +="5";
    await next();
    console.log("第五个中间件 <=")
    ctx.body +="6";
})


function delay(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },2000)
    })
}
// 控制台输出
第一个中间件 =>
第二个中间件 =>
第三个中间件 =>
第四个中间件 =>
第五个中间件 =>
第五个中间件 <=
第四个中间件 <=
第三个中间件 <=
第二个中间件 <=
第一个中间件 <=

响应结果 12345678910
```

## 

### 2. Express

```js
app.use(async (res, req, next) => {
    console.log("第一个中间件 =>"); // 1 2 3 1 2 4 5 5 4 3
    next();
    console.log("第一个中间件 <=")
})
app.use(async (res, req, next) => {
    console.log("第二个中间件 =>");
    next();
    await delay();
    console.log("第二个中间件 <=")
})
app.use(async (res, req, next) => {
    console.log("第三个中间件 =>");
    await delay();
    next();
    console.log("第三个中间件 <=")
})
app.use(async (res, req, next) => {
    console.log("第四个中间件 =>");
    next();
    console.log("第四个中间件 <=")
})
app.use(async (res, req, next) => {
    console.log("第五个中间件 =>");
    next();
    console.log("第五个中间件 <=")
})

function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000)
    })
}

// 控制台输出
第一个中间件 =>
第二个中间件 =>
第三个中间件 =>
第一个中间件 <=
第四个中间件 =>
第五个中间件 =>
第五个中间件 <=
第四个中间件 <=
第三个中间件 <=
第二个中间件 <=
```

## 3. 中间件实现





