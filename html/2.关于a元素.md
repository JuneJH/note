# a元素

> [ a 元素（或称锚元素）可以创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)

## href属性

> hyper reference（引用）：通常用于表示跳转地址

### 1. 普通链接

```html

    <a href="https:www.baidu.com">跳转百度</a>

```

### 2. 锚点链接（回到顶部的id为#）

- 以`#`开始，匹配页面上容器的`ID`

```html

    <a href="#top">回到顶部</a>

```
### 1. 功能链接

> 点击后，触发某个功能

- 执行JS代码，javascript:

```html

    <a href="javascript:alert('你好！')">弹出：你好</a>

```
- 发送邮件：mailto:
- 要求用户计算机安装邮件发送软件：exchange
  
```html

 <a href="mailto:2345tyt@163">发送邮件</a>

```


- 拨号：tel:

- 要求用户计算机上安装有拨号软件，或者是移动端访问

```html

    <a href="tel:+123456789">打电话给123456789</a>

```

## target属性

> 表示跳转窗口位置

- _self:在当前页面窗口打开，默认
- _blank:在新窗口的打开
- _parent:加载至父框架,若无则与_self类似
- _top:加载至父框架顶层,若无则与_self类似

## download

> 拥有该属性后，浏览器将提示用户下载文件，其值为文件名

1. 注意点

- 在响应头中`Content-Dispostion`也可为文件命名且优先级高于该属性
- 该属性遵循同源URL(使用blob:URL和data:URL解决)
