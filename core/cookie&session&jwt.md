# 关于cookie还有session还有jwt

## 1. 关于cookie

> 浏览器与服务器交流，在绝大部分时候我们都选择使用`HTTP`协议
> `HTTP`协议是无状态的，致使服务端无法分清它是谁，我该不该信任它
> 于是我们就需要一个卡包来保存我们的身份信息，不需要太大，钱包大小即可，以此方便服务器在茫茫请求中，准确的找到正确的它
> 一个扬名世界皮包名牌映入眼帘-`cookie`,当然我们可以揣兜儿
> 但是`cookie`不仅仅是一个卡包，它拥有的是服务-浏览器自动管理，无需你亲手来掏证证明你是你
> 它还有*大*容量-4k左右

### 1. cookie是什么

> cookie是浏览器用来存储一些网站的身份信息或者其他一些有用的信息
> 每个不同的域都有自己的一个专属cookie
> 一般情况下cookie都会跟随请求一同发送至服务端
> cookie只有4k左右，只能存储一小部分内容

#### 1. cookie如何存储

1. 先看看

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

#### 1. 客户端如何操作cookie

#### 2. 服务端怎么设置cookie


## 2. 关于session

## 3. 关于jwt
