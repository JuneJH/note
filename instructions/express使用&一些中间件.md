# express 使用

> 基于Node.js 平台 快速 开放 极简的web开发框架
> [文档](https://www.expressjs.com.cn/)

## 创建一个应用

1. 官方示例

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

2. 使用中间件进行配置静态文件

```javascript
    //正确用法    
    app.use(express.static(path.resolve(__dirname, "../public")));
    app.get("/",(req,res)=>{
    res.send("拦截成功")
    });

    // 错误用法 该结果为拦截成功
    app.get("/",(req,res)=>{
    res.send("拦截成功")
    })
    //中间件 使用静态资源
    app.use(express.static(path.resolve(__dirname, "../public")))
```
**中间件的执行是根据其书写位置执行的，因此配置静态资源时最好放置代码的前面**

3. 使用中间件处理body中的数据
 >  node中读取body数据通过流读取，不方便处理
 >  使用```express.urlencoded({extended: true})```和```express.json()```来应对```content-type```值为```x-www-form-urlencoded/json```的数据

```javascript
    //中间件 对body参数进行处理
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
```

4. 自定义中间件

> 是一个函数
> 普通中间件只有3个参数req、res、next
> 错误处理中间件有3个参数err、req、res、next
> **注意：错误处理中间件最好放置代码最后，便于能够处理**

```javascript
    app.use("/middleware", function (req, res, next) {
        console.log("中间件3");
        throw new Error("中间3抛出一个错误");
    })

    // 自定义错误中间件
    app.use((err, req, res, next) => {
        if (err) {
            const errObj = {
                code: 500,
                msg: err instanceof Error ? err.message : err,
            };
            //发生了错误
            res.status(500).send(errObj);
        } else {
            next();
        }
    })
```
