# Hyper Text Markup Language
## 什么是HTML？

> 1. HTML： Hyper Text Markup Language：超文本标记语言
> 2. HTML是W3C组织定义的语言标准：HTML是用于描述页面结构（有什么东西，该东西有什么含义）的语言
> 3. MDN：Mozilla Development Network，Mozilla 开发者社区。


## HTML基本

> HTML -> 浏览器内核执行 -> 页面

1. 主流浏览器内核

 - IE：Trident
 - Firfox：Gecko
 - Chrome：Webkit / Blink
 - Safari: Webkit
 - Opera: Presto / Blink

2. 版本和兼容性

- HTML5：2014年提出 通过`<!DOCTYPE html>`声明
- HTML4: 声明需要指定HTML版本,如`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://wwww.w3.org/TR/xhtml1-transitional.dtd">`
- XHTML：可以认为是HTML的一种一个版本(更严格)，完全符合XML的规范。


## 标准的文档结构

```html
    <!DOCTYPE html>
```
- 文档声明，告诉浏览器，当前文档使用的HTML标准是HTML5。不写文档声明，将导致浏览器进入怪异模式

```html
    <html lang="en">
    </html>
```
- 根元素：一个页面最多只能有一个，并且该元素是所有其他元素的父元素或者祖先元素

- lang属性（**全局属性**）：language，全局属性，表示该元素内部使用的文字是使用哪一种自然语言书写而成的（会触发浏览器翻译功能，语音包等）（en（英语），cmn-hans（中国大陆官方语言简体。“zh-CN”过时））**HTML5版本中没有强制书写该元素**

```html
    <head>
    </head>
```

- 文档头：文档头内部的内容，不会显示到页面上。

```html
    <meta>
```
- 文档的元数据：附加信息。可用于优化`SEO`
- charset：指定网页内容编码

```html
    <body>
    </body>
```
- 文档体，页面上所有要参与显示的元素，都应该放置到文档体中。
## 语义化

1. 每一个HTML元素都有具体的含义 

2. 所有元素与展示的效果无关

3. 元素展示到页面中的效果，应该由CSS决定

4. 因为浏览器带有默认的CSS样式，所以每个元素有一些默认样式

**选择什么元素，取决于内容是什么含义，而不是显示出的效果**

### 语义化作用

1. 为了搜索引擎优化（SEO）

2. 为了让浏览器理解网页

## 语义化容器元素

header：通常用于表示页头，也可以用于表示文章的头部

footer：通常用于表示尾部也可以表示文章的尾部

article：通常用于表示整篇文章

section：通常用于表示文章的章节

aside：通常用于表示附加信息，侧边栏

## HTML实体

实体字符，HTML Entity

实体字符通常用于在页面中显示一些特殊符号

1. &单词;
2. &#数字:

- 小于符号 &lt;   &#60
- 大于符号 &gt;
- 空格符号 &nbsp; non-breaking space
- 版权符号 &copy;
- &符号 &amp;


### 总结

- html元素有很多,尽量找到语义化与效率并行的方案
