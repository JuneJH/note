# 关于cookie还有session还有jwt

## 1. 关于cookie

> 浏览器与服务器交流，在绝大部分时候我们都选择使用`HTTP`协议
> `HTTP`协议是无状态的，致使服务端无法分清它是谁，我该不该信任它
> 于是我们就需要一个卡包来保存我们的身份信息，不需要太大，钱包大小即可，以此方便服务器在茫茫请求中，准确的找到正确的它
> 一个扬名世界皮包名牌映入眼帘-`cookie`,当然我们可以揣兜儿
> 但是`cookie`不仅仅是一个卡包，它拥有的是服务-浏览器自动管理，无需你亲手来掏证证明你是你
> 它的*大*容量只有-4k左右

### 1. cookie是什么

> cookie是浏览器用来存储一些网站的身份信息或者其他一些有用的信息
> 每个不同的域都有自己的一个专属cookie
> 一般情况下cookie都会跟随请求一同发送至服务端
> cookie只有4k左右，只能存储一小部分内容
> 客户端
> ```Cookie```通过响应头中的```Set-Cookie```

#### 1. cookie如何存储

1. 后端设置响应头

```javascript
    // 后端代码设置响应头
    res.cookie("token", value,{
                path:"/",
                domain:"127.0.0.1",
                maxAge:24*60*60*1000,
    })
    // 响应头单独截取
    Set-Cookie: token=a391b44e1e2f4176b87f52395ed35c96; Max-Age=86400; Domain=127.0.0.1; Path=/; Expires=Fri, 27 Nov 2020 07:46:19 GMT
```
 - 它保存的是键(`key`)值(`vaule`)对并且通过一些属性对其进行控制
    > 1. domain:域，表示该cookie属于那个域
    > 2. path:表示该cookie属于那个路径
    > 3. secure: 是否使用安全传输
    > 4. expire:过期时间
    > 5. max-age:单位秒

#### 2. 客户端如何操作cookie

1. 客户端使用`document.cookie`来操作cookie
2. 设置`cookie`,一次只能设置一个`cookie`它满足键值对，其中后续可跟限制其属性的关键变量并以`;`分割
```javascript
document.cookie = "myCookie=123;max-age=1000"
```
#### 3. 服务端怎么设置cookie

1. 在`express`框架中通过`res.cookie(key,value,option)`方法来设置
2. 也可通过设置响应头`set-cookie`来设置

```javascript

    res.cookie("token", value,{
                path:"/",
                domain:"127.0.0.1",
                maxAge:24*60*60*1000,
            })

    res.header("set-cookie","my=234")

```


## 2. 关于session

> `session`是一个会话状态
> 当客户端第一次访问服务器时，服务器会为其生成一个唯一ID(eg:uuid)
> 并且把这个`id`传回给客户端，可以放在`cookie`中，也可以跟随url(这只是实现上的问题)
> 客户端再次发送请求(比如登录)，并且带上服务器刚刚颁发的`id`
> 服务器收到客户端的`id`,并在自我维护的session列表中找到该用户
> 服务器做一些处理(比如登录成功),可以将结果保存在该`Id`下，以便后续操作

### 1. 存入内存

### 2. 存入客户端

### 3. 存入redis

## 3. 关于jwt   --JSON Web Tokens。

> 随着越来越多的终端设备，这些设备对`cookie`的支持远不如浏览器甚至没有
> `session`随着用户的增多也出现难以管理的现象
> JWT是一种标准，具有简约、自包含等特点[----来自官网](http://jwtio.online/introduction.html)
> 拥有特定的数字签名，因此在传输中的通信信息是能保证被信任的
> 使用场景: 1 .认证鉴权  2. 数据交换

### 1. jwt的结构

一般来说长这个样儿```xxxxx.yyyyy.zzzzz```

> 头部 Header
>
> >头部 ```{"alg": "HS256","typ": "JWT"}```

> 负载 Payload
>
> > 负载 ```{  "ss"："发行者",	"iat"："发布时间",	"exp"："到期时间",	"sub"："主题",	aud"："听众",	"nbf"："在此之前不可用",  "jti"："JWT ID"}```

> 签名 Signature

## 总结

> start
> ### cookie
> > 作为真实的存储位置,存储在客户端，不占用服务器资源
> > > session产生的ID可以保存在其中
> > > JWT也可以保存在其中
> > 同时也具有以下一些缺点
> > > 存储的为字符串
> > > 存储空间小
> > > 数据容易获取(只要没有设置`httponly`,`javascript`就能获取，更不要提一些攻击手段)
> > > 容易被篡改
> > > 容易丢失
> ### session
> > 它的优点即是`cookie`的缺点
> > > 它可以是任意格式
> > > 存储空间无所谓(只要服务器强大)
> > > 数据基本获取不到，毕竟在服务端
> > > 数据更不能更改了
> ### jwt
> > 只是一种规范
> > > 将想保存的信息放入`payload`即可
> > > 不受终端限制，无论是放在`cookie`中,还是`localstorage`,还是响应头中
> > 因为有签名存在
> > > 基本难以更改和伪造
> ### cookie更像一种载体，它的实现取决于浏览器，session和jwt更像是一种概念，怎么实现取决于开发者，权衡利弊完全在开发者手中
>end

