# a元素

超链接

## href属性

hyper reference（引用）：通常用于表示跳转地址

1. 普通链接
2. 锚点链接（回到顶部的id为#）
3. 功能链接

点击后，触发某个功能

- 执行JS代码，javascript:
```html
 <a href="javascript:alert('你好！')">弹出：你好</a>
```
- 发送邮件：mailto:
```html
 <a href="mailto:2345tyt@163">弹出：你好</a>
```
要求用户计算机安装邮件发送软件：exchange

- 拨号：tel:

要求用户计算机上安装有拨号软件，或者是移动端访问

id属性：全局属性，表示元素唯一

## target属性

表示跳转窗口位置

target的取值：
- _self:在当前页面窗口打开，默认
- _blank:在新窗口的打开
