# vue技术框架实践

> 在业务需求中一般需要处理UI组件库、网络请求、单页面路由、共享数据、处理图标、公共样式、性能优化
>
> 利用Vue全家桶处理以上需求提供一些方案、想法

## 1. 网络请求

> 通常我们使用基于`XMLHttpRequest`对象封装的库进行网络交互,比如`jQuery.ajax`、`axios`等
>
> 随着前端的日益发展,新推出`Fetch API`同样可满足网络交互

1. 使用`axios`这个库进行网络交互：Axios 是一个基于`Promise` 网络请求库,支持在`nodejs`(*基于http模块*)和浏览器端(*基于XMLHttpRequest对象*)使用
2. `axios`支持请求拦截、响应拦截、实例创建(*分割不同的请求*)等

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```



## 2. 共享数据

> 一个项目中必然存在多个页面共享的数据,如果单纯存放至`store`中并不利于使用与观察
>
> Vue全家桶包含一个专门用于处理该需求的库Vuex

## 3. 路由鉴权

> 单页面应用需要前端控制路由,已达多页面的效果
>
> Vue全家桶中包含一个专门用于处理路由的库Vue-router

## 4. UI组件

> 对于Vue国内主要使用两款优秀的组件库`element`和`ant design vue`
>
> 选取任意一款即可

## 5. 处理图标

> 通常图标可以通过字体图标、`svg`和一些小图片做成的雪碧图解决
>
> 还可以通过自动导入`svg`,封装组件实现

## 6. 性能优化

> 目前项目一般通过脚手架搭建,有官方的也有第三方或者自研的,但基本都依赖`webpack`
>
> 通过配置`webpack`进行打包优化,提高性能