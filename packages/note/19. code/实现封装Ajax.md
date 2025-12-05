# Ajax

> `Asynchronous JavaScript and XML`:异步的`JavaScript`和`XML`,虽然说是`XML`，但是现代开发明显`JSON`更受欢迎
> `Ajax`是当代前后端开发的桥梁，更是现代框架(react,vue)的基石。所以学好它是刚需
> 通常通过`XMLHttpRequest`来实现该标准，所以该对象也是`Ajax`的基础

## XMLHttpRequest

> 该对象可以在不刷新页面的情况下请求特定URL，获取数据，更新页面
> 可以在[该地址读到更多关于该对象的一些属性](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

### 1. 最简单的发送请求

```js

      const xhr = new XMLHttpRequest();
      xhr.open("get","https://book.douban.com");
      xhr.send();

```

> 1. 创建一个`XMLHttpRequest`对象
> 2. 打开连接通道
> 3. 发送

**这仅仅是发送了一个请求，我们还需要接受服务器的响应，这个响应时间可长可短，因此需要一个可以监听的事件：onreadystatechange**

### 2. 接收服务器响应

```js

      const xhr = new XMLHttpRequest();
      xhr.open("get","");
      xhr.send();
      xhr.onreadystatechange=function(e){
        
      }

```

> 该监听函数将会在`XMLHttpRequest`的`readyState`属性发生改变时触发
> 如果因为`abort()`停止请求则不会触发
> `readyState`的值
> >  1. 0 => 调用open()之前
> >  2. 1 => 调用open()之后，即使调用send()之后也是该值，该值表示正在向服务端发送请求
> >  3. 2 => 接受服务端原始数据
> >  4. 3 => 解析原始数据,将其装入responseBody、responseText、responseXML中
> >  5. 4 => 可用的

```js

// 状态值演示
  xhr.onreadystatechange = function (e) {
        console.log(xhr);
      };
      console.log("open()之前", xhr.readyState);  // 0
      xhr.open("get", "");
      console.log("send()之前", xhr.readyState); // 1 触发onreadystatechange，因为readyState发生了改变
      xhr.send();
      console.log("abort()之前", xhr.readyState); // 1
      xhr.abort();
      console.log("abort()之后", xhr.readyState); // 0 触发onreadystatechange，因为readyState发生了改变

```

### 3. 处理正确的和错误的请求

> Http状态码，可以告诉我们该请求是否正确
> > 状态码
> > > 1 XX   接收到请求，等待下一步处理
> > > 2 XX   成功的
> > > 3 XX   缓存、重定向
> > > 4 XX   客户端问题
> > > 5 XX   服务端问题

```js

 const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              console.log("请求成功后要做什么，可调用回调或者封装为promise")
              // 数据可能存在位置response responseText responseXML
            }else{
              console.log("失败了怎么办")
            }
          }
        };
        xhr.open("get", "");
        xhr.send();
```

### 4. 封装一个简单的Ajax

> 解决一些常用的get/post请求
> 通过回调函数处理响应结果
> post请求时请求头`content-type`统一采用`application/x-WWW-from-urlencoded`


```js

function myAjax (options){
    // 判断是否传入参数
    if(!options || typeof options != 'object') return;
    // 处理参数,一些默认参数
    const type = options.type || 'get';
    let url = options.url || location.pathname;
    const async = options.async == false ? false : true;
    const params = getParams(options.params);
    // 创建一个XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    // 判断是否为get请求方法，并处理业务数据
    if(type == 'get'){
        url = url + '?' + params;
    }
    xhr.open(type,url,async);
    // 判断，如果为post请求方法，需要设置请求体的编码格式
    if(type == 'post'){
        xhr.setRequestHeader('content-type','application/x-WWW-from-urlencoded');
    }
    // 设置请求参数
    xhr.send(params);
    // 监听事件
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){   // 共有5个值，4的时候为完成状态
            if(xhr.status == 200){ // 状态码
                let data = null;
                // 得到响应头的content-type，处理数据
                const contentType = xhr.getResponseHeader('content-type');
                if(contentType.indexOf('json') > -1){
                    data =  JSON.parse(xhr.responseText);
                }else if(contentType.indexOf('xml') > -1){
                    data = xhr.responseXML;
                }else{
                    data = xhr.responseText;
                }
                options.success && options.success(data);
            }else{
                options.error && options.error(xhr.responseText)
            }
        }
    }

}
function getParams(params){
    if(!params) return;
    const arr = [];
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            arr.push(key + '=' + params[key])
        }
    }
    return arr.join('&');
    
}

```

### 5. 利用promise再来一遍

> 回调方式不够优雅
> 得赶上潮流

```js
      function Ajax() {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            try {
              if (xhr.readyState == 4) {
                  resolve(xhr.response);
              }
            } catch (e) {
              reject(e);
            }
          };
          xhr.open("get", "");
          xhr.send();
        });
      }

```

> 在`promise`中使用`reject`是在发生错误时
> 因此在请求中，只要能收到服务器得响应都应该使用`resolve` 
> 实际开发中推荐使用`axios`



## 6. 如何动态控制请求顺序



## 7. 如何取消获取去重



## 总结

> 原生请求APi`Fetch`,原生支持promise
> 在Ajax请求中，jQuery中Ajax和Axios都是不错得选择