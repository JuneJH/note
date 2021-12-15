# Cross-Origin-Resource-Sharing 跨域资源共享

> ```CORS```是在```HTTP1.1```提出的一种跨域解决方案
> 跨域是浏览器对我们的安全保护，如果服务器同意使用该资源，那么这种保护就没有必要了
> 简单请求-对服务器资源不会造成太大的影响
> 与之相反的则需要发送预捡请求再发送真实请求

## 简单请求

> 请求方法为```get```,```post```,```head```
> 请求头只包含安全字段```Accept```,```Accept-Language```,```Content-Language```,```Content-Type```,```DPR```,```Downlink```,```Save-Data```,```Viewport-Width```,```Width```
> 其中```Content-Type```只能为```text/plain```,```mutipart/form-data```,```application/x-www-form-urlencoded```中一个值
> **同时满足以上三条，则为简单请求**

### 示例 

> Nodejs
> express框架
> fetch

1. 客户端发送一个请求学生列表

```javascript

    fetch("http://127.0.0.1:9527/student",{
                method:"get",
            }).then(data=>data.json()).then(data=>{
                console.log(data);
            })

```

2. 服务器端设置```Access-Control-Allow-Origin```来应对简单请求的跨域

> ```Access-Control-Allow-Origin``` 的值可以为`*`或者具体的源(可通过请求头获取，浏览器为用户发送简单请求自动添加```Origin```属性)
> `*`表示所有允许所有源访问，**如果请求需要携带身份凭证，则不允许设置该值**
> 具体的源表示只针对该域进行跨域访问(服务器可维护可跨域访问资源白名单)

```javascript
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
```

3. 请求头

```json
    Accept: */\*
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    Cache-Control: no-cache
    Connection: keep-alive
    Host: 127.0.0.1:9527
    Origin: http://localhost:63342   // 浏览器为其添加该属性，指定具体的源
    Pragma: no-cache
    Referer: http://localhost:63342/
    Sec-Fetch-Dest: empty
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: cross-site
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36
```

4. 响应头

```json
    Access-Control-Allow-Origin: http://localhost:63342   // 服务器为其设置可访问源
    Connection: keep-alive
    Content-Length: 17215
    Content-Type: application/json; charset=utf-8
    Date: Thu, 26 Nov 2020 02:28:36 GMT
    ETag: W/"433f-QlFxK67TOrn0mHqplU4/RdfiIoY"
    X-Powered-By: Express
```

## 需要发送预检的请求

> 在不满足简单请求的三大条，那么浏览器将为他先发送一条预检请求
> 得到服务器允许后再发送真实请求

### 预检请求

> 预检请求是浏览器再确定真是请求非简单请求自行发送给服务端的请求
> 该请求的方法为```OPTIONS```
> 只有请求头，没有消息体，也没有我们所设置的请求头
> 其中包含了一下请求头
> 1. origin:具体的源
> 2. Access-Control-Request-Method:真实请求使用的请求方法
> 3. Access-Control-Request-Headers:真实请求的添加或者改变的请求头

#### 1. 真实请求

```javascript
      fetch("http://127.0.0.1:9527/student", {
            method: "get",
            headers: {
                myHeader: "this is my header"   // 因为添加了请求头，因此不满足简单请求
            }
        }).then(data => data.json()).then(data => {
            console.log(data);
        })
```

#### 2. 客户端准备预捡请求

当浏览器发现不是简单请求后，自行组装一个预捡请求

```json
// √是需要关注的地方
  √ OPTIONS /student HTTP/1.1    // 该请求为OPTIOINS
    Host: 127.0.0.1:9527
    Connection: keep-alive
    Pragma: no-cache
    Cache-Control: no-cache
    Accept: */\*
  √ Access-Control-Request-Method: GET       // 真实请求的请求方法
  √ Access-Control-Request-Headers: myheader // 真实请求所添加和改变的请求头   
  √ Origin: http://localhost:63342          // 浏览器组装具体的源
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36
    Sec-Fetch-Mode: cors
    Sec-Fetch-Site: cross-site
    Sec-Fetch-Dest: empty
    Referer: http://localhost:63342/
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
```

#### 3. 服务端需要对预检请求响应，否则将不再进行跨域资源共享

> 但服务器收到预捡请求后，必须给予响应，并且需要包含以下请求头
> 1. Access-Control-Allow-Origin:允许的具体的源
> 2. Access-Control-Allow-Methods:对应预捡请求的`Access-Control-Request-Method`,表示我服务端所允许的请求方法
> 3. Access-Control-Allow-Headers:对应预检请求的`Access-Control-Request-Headers`,表示我服务端允许改动的请求头
> 4. ? Access-Control-Allow-Max-Age: 可选的 设置再此时间段，对于与本次相同的请求(预检请求所必带请求头的值相同)，浏览器都不需要再发送预检请求 

1. 服务端设置

```javascript
    if(req.method === "OPTIONS"){
        res.setHeader("Access-control-allow-method",req.headers["access-control-request-method"]);
        res.setHeader("Access-Control-allow-headers",req.headers["access-control-request-headers"]);
        res.setHeader("Access-Control-Max-Age",1000); // 需要将浏览器的缓存打开Disable cache
    }
```

2. 服务端响应给预检请求

```json
    Access-Control-allow-headers: myheader
    Access-control-allow-method: GET
    Access-Control-Allow-Origin: http://localhost:63342
    Access-Control-Max-Age: 1000
    Allow: GET,POST,HEAD
    Connection: keep-alive
    Content-Length: 13
    Content-Type: text/html; charset=utf-8
    Date: Thu, 26 Nov 2020 03:36:58 GMT
    ETag: W/"d-5V0bEbsSC17Ya0KqDVcZsTZ+vh8"
    X-Powered-By: Express
```

### 真实请求就与常规相同

## 附带身份验证信息

> 一个请求如果需要带cookie这样的身份信息，必须征得服务器的同意，否则一切请求浏览器都会视为跨域处理
> 服务器端设置响应头`Access-Control-Allow-Credentials:true`即可，表明服务端需要携带身份认证信息
> **注意：该响应头无论是简单请求还是预检请求都需要得到服务器的认证**

1. 客户端修改请求

```javascript

    fetch("http://127.0.0.1:9527/student", {
                method: "get",
                headers: {
                    myHeader: "this is my header"
                },
                credentials:"include"
            }).then(data => data.json()).then(data => {
                console.log(data);
            })

    // 如果是ajax，为其withCredentials属性设置为true
```

2. 服务端设置

```javascript
    res.header("Access-Control-Allow-Credentials",true);
```

## 修成正果:客户端收到服务端的跨域资源

> 此时服务端不设置任何响应头属性，JavaScript只能拿到部分安全的响应头
> 如果需要拿到自定义的一些响应头，需要服务端设置`Access-Control-Expose-Headers`
> 该属性的值则表示服务端允许JavaScript操作的一些响应头

### 获取自定义响应头

1. 服务端

```javascript
res.header("my-header","this is come from service!!!")
```

2. 客户端
   
```javascript
 fetch("http://127.0.0.1:9527/student", {
            method: "get",
            headers: {
                myHeader: "this is my header"
            },
            credentials:"include"
        }).then(data => {
            console.log(data.headers.get("my-header"))  // this is come from service!!!
            return data.json()
        }).then(data => {
            console.log(data);
        })
```

3. 不修改客户端代码，但是开起一个跨域的服务，跨域访问资源

控制输入:```null``

4. 服务端允许操作`my-header`响应头

```javascript
    res.header("my-header","this is come from service!!!")
    res.header("my-header1","this is come from service!!!")
    res.header("Access-Control-Expose-Headers","my-header,my-header1");
```
**一切正常**

- 响应头

```json
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Origin: http://localhost:63342
    Access-Control-Expose-Headers: my-header,my-header1
    Connection: keep-alive
    Content-Length: 17215
    Content-Type: application/json; charset=utf-8
    Date: Thu, 26 Nov 2020 06:56:06 GMT
    ETag: W/"433f-QlFxK67TOrn0mHqplU4/RdfiIoY"
    my-header: this is come from service!!!
    my-header1: this is come from service!!!
    X-Powered-By: Express
```

## 最后

> 虽然此处是使用Node环境，但是CORS流程是相同的
> 本文主要基于自定义中间件，但是实际开发可以使用```cors``中间件[github](https://github.com/expressjs/cors)








