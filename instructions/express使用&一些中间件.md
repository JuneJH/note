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
         res.send("如果不是静态资源并且匹配成功路径，则进入")
    });

    // 错误用法 该结果为拦截成功
    app.get("/",(req,res)=>{
         res.send("这样写在使用静态资源中间件前面并且匹配成功，则进入且不在先后传递")
    })
    //中间件 使用静态资源
    app.use(express.static(path.resolve(__dirname, "../public")))
```
**中间件的执行是根据其书写位置执行的，因此配置静态资源时最好放置代码的前面**

3. 使用中间件处理body中的数据
 >  node中读取body数据通过流读取，不方便处理，可使用`express`自带中间件处理
 >  使用```express.urlencoded({extended: true})```和```express.json()```来应对```content-type```值为```x-www-form-urlencoded/json```的数据

```javascript
    //中间件 对body参数进行处理
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
```

4. 自定义中间件

> 中间件就是一个函数
> 普通中间件只有3个参数req、res、next
> 错误处理中间件有4个参数err、req、res、next
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

## 第三方中间件

### 1. cors 使用该中间件实现CORS跨域

> `CORS`是用于开启CORS实现跨域的`express`中间件
> 在使用`cors`实现跨域时，需要对请求进行区分简单请求和复杂请求(在发送真实请求前需要先发送一个预检请求)
> [GitHub文档](https://github.com/expressjs/cors#readme)

1. 简单使用(官方示例)

```javascript

    const express = require('express')
    const cors = require('cors')
    const app = express()

    app.use(cors())

    app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
    })

    app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
    })

```

2. 动态配置

```JavaScript

// 使用全局方式
    app.use(
        cors({
            origin(origin, callback) {
            if (!origin) {
                callback(null, "*");
                return;
            }
            callback(null, origin);
            },
            credentials: true,
        })
    );

```

3. 基本配置选项

- orgin:配置`Access-Control-Origin`
- methods:配置`Access-control-Allow-Methods`
- alloweHeaders:配置`Access-Control-Allow-Headers`
- exposeHeaders:配置`Access-Control-Expose-Headers`
- creadentilas:配置`Access-Control-Allow-Credentials`
- maxAge:配置`Access-Control-Max-Age`
- preflightContinue:传送给下一个处理程序
- optionsSuccessStatus:处理204

### 2. cookie-parser 使用该中间件解析cookie

> 解析cookie并且将结果注入req.cookies中
> 可选传入`secret`字符串，会被保存在`req.secret`,供其他中间件使用
> [文档](https://github.com/expressjs/cookie-parser#readme)

1. 直接在合适的位置添加该中间件

```javascript

    app.use(cookieParser())

```

### 3. express-session 使用该中间件实现session

> 该中间件通过简单的配置即可帮助我们实现`session`管理
> [github地址](https://github.com/expressjs/session#readme)

1. 简单使用

```javascript

app.use(session({
    secret:"June",
    name:"sessionid"
}))

```
### 4. jsonwebtoken 使用该中间件生成/验证jwt

> 这并不是一个中间件，而是帮助我们生成jwt，写在此处只为于前两种做对比
> [github文档](https://github.com/auth0/node-jsonwebtoken#readme)

1. 简单使用
   
```javascript


const jwt = require("jsonwebtoken");
const secrecy = "****";
//  在登录处使用该方法颁发一个jwt
exports.publish = function (res,maxAge = 3600,info={}){
    console.log('run jwt')
    const token = jwt.sign(info,secrecy,{
        expiresIn:maxAge
    })
    res.header("authorization",token);
}
// 在验证权限处使用该方法验证是否篡改和伪造
exports.verify = function (req){
    let token = req.headers.authorization;
    if(!token){
        return  null;
    }
    token = token.split(" ");
    token = token.length === 1 ? token[0]:token[1];
    try{
        const result = jwt.verify(token,secrecy);
        return  result;
    }catch (e){
        return  null;
    }
}

```


