# HTTP 缓存机制

> 对于web系统来说:图片、第三方库等资源发生改变的可能性是比较低的,所以我们可以把这些文件放在客户端存储下来
> 但是web系统迭代的速度相对而言也是比较快的,客户端并不知道我们系统的资源会发生变化,而沿用之前的资源
> 以上情况可以利用HTTP缓存机制对web系统进行优化,达到更好的用户体验

## 1. HTTP 缓存机制？

- 当用户访问系统时如果不做缓存,那么该用户无论是跳转该域下的页面或者再次访问该系统时,都会请求所有所需的静态资源
- 如果用户每次访问都需要请求相同的静态资源到本地进行渲染,这对系统的性能和用户的体验都是很不友好的
- 根据HTTP缓存机制,可以把静态资源缓存在本地,用户再次访问时之间使用缓存资源而不需要再次从服务端获取
- 利用这种方式既可以提高系统的性能也能提升用户体验,节省带宽

## 2. HTTP缓存机制存储位置

- Service worker: HTTPS协议支持,自定义缓存规则
- Memory Cache: 内存缓存
- Disk Cache: 磁盘缓存
- Push Cache: HTTP2支持 TODO

## 3. HTTP缓存机制模式

> 强缓存
> 协商缓存

-  使用强缓存策略时,浏览器不会向服务端发送请求,该资源直接从`disk cache`或者`memory cache`中获取,http状态码为`200`
- 使用协商缓存时,如果强缓存并未命中成功,那么使用协商缓存,协商缓存携带`if-modified-since`或者`if-none-mathc`请求头,如果协商缓存失效则正常请求(http返回正常的请求),如果缓存未失效返回`304 not modified`

## 4. HTTP缓存机制-强缓存

> 强缓存通过`expires`和`cache-control`控制

### 1. expires

- 用于指定缓存过期时间,在这个时间段内不会再向服务端发送请求
- 该字段的值为一个具体的时间,它会依赖客户端的时间,因此该属性的使用就有一定的局限性
- *目前测试下post请求缓存没有生效,大概原因为浏览器不缓存post请求*

```js

    // 在express中设置
    let count = 1;
    app.use("/getCache",(req,res)=>{
        console.log("收到请求")
        res.setHeader("expires",new Date(+new Date() + 30000))
        res.send({
            data:count
        })
        count ++;
    })
    // 浏览器应该是不缓存post请求,我认为post是带操作的不应该进行强缓存
    app.post("/postCache",(req,res)=>{
        console.log("收到请求")
        res.setHeader("expires",new Date(+new Date() + 30000))
        res.send({
            data:count
        })
        count ++;
    })

```

### 2. cache-control

> http1.1中用来控制缓存的字段,如果在http1.1的环境下`cache-control`的优先级要高于`expires`
> 鉴于`expires`的局限性,目前`expires`适合在非http1.1环境下使用(向下兼容)

- public: 谁都可以缓存,客户端、中间件
- private: 只有客户端能缓存
- no-cache: 客户端使用协商缓存
- no-store: 不缓存
- max-age: 缓存在多少秒后失效

## 5. HTTP缓存机制-协商缓存

> 通过`last-modified`和`etag`控制
> 当再次请求时请求头会通过`if-modified-sice`和` if-none-match`携带以上两个字段的值

## 6. HTTP缓存机制-express实践