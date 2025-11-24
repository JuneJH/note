



## 1. 文档声明

1. 什么是`<!DOCTYPE>`? 是否需要在HTML5中使用？
2. 什么是严格模式、混杂模式？
3. 列举几条怪异模式的怪癖行为



### 1. 概念HTML 文档通常以文档声明开始，该声明的作用是帮助浏览器确定其尝试解析和显示的HTML文档类型。

```html
<!DOCTYPE html>
```

文档声明必须是HTML文档的第一行、且顶格显示，对大小写不敏感。因为任何放DOCTYPE前面的东西，比如批注或者XML声明，会令IE9或者更早期的浏览器触发怪异模式

![image-20250917120250309](/Users/june/Library/Application Support/typora-user-images/image-20250917120250309.png)

![image-20250917120322589](/Users/june/Library/Application Support/typora-user-images/image-20250917120322589.png)

## 2. 语义化

1. 说说对html语义化的理解？

### 1. 概念

语义是指对一个词或者句子含义的正确解释。很多HTML标签也具备语义的意义，即元素本身传达了关于标签所包含内容类型的一些信息，例如，当浏览器解析到<h1></h1>标签时，他将该标签解释为包含这一块内容的最重要的标题，h1标签的语义就是用来标识特定网页或部分重要的标题

### 2. 作用

1. 代码结构：页面在没有css的情况下，也能够呈现出很好的内容结构
2. 有利于SEO：爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
3. 提升用户体验：列入title、alt可以用于解释名称或者解释图片信息，以及label标签
4. 便于团队开发和维护：语义化使得代码更具备可读性
5. 方便其他设备解析：如屏幕阅读器、盲人阅读器、移动设备等

### 3. 常见标签

1. header: 用于定义页面的头部区域
2. nav: 定义页面导航区域
3. main: 定义文档主要内容，该内容在文档中应该是**独一无二的**
4. article: 定义页面独立的内容
5. aside: 定义文档中的一个区域
6. footer: 定义最近一个章节的内容或者跟节点元素的页脚

### 4. 无障碍网页

1. W3C在1997年发起了一项WAI计划，提升网站的易用性，其中一个很重要指标那就是能够被残章人士使用的网站才能称得上易用的网站
2. 角色：定义了元素是干什么的
3. 属性：通过定义一些属性给元素，让他们具备更多的语义
4. 状态：用于表达元素当前的条件的特殊属性，状态和属性的差异在于，属性在应用的什么周期中不会改变，而状态可以，比如通过javascript修改一个input的可输入状态

### 5. 语义化的理解

1. 去掉或丢失样式的时候能够让页面呈现出清晰的结构
2. 有利于SEO：和搜索引擎建立良好的沟通，有助于爬虫抓更多的有效信息：爬虫依赖标签来确定上下文和各个关键字的权重
3. 方便其他设备解析：屏幕阅读器、盲人阅读器、移动设备
4. 便于团队开发和维护：语义化更具可读性，是下一代网页重要动向

## 3. W3C标准组织

1. 对于WEB标准以及W3C的理解与认识？

### 1. 概念

W3C指万维网联盟(World Wide Web  Consortium) 由Tim Berners-Lee创建于1994年10月，它是一个会员组织，他的主要工作是对web进行标准化，它创建并维护WWW标准，W3C标准被称为W3C推荐或者W3C规范，W3C成员由一些知名技术公司、学校等组成

### 2. 运行流程

1. 收到一份提交
2. 发布一份记录
3. 创建一个工作组
4. 发布一份工作草案
5. 发布一份候选推荐
6. 发布一份被提议的推荐
7. 发布推荐

### 3. 对WEB标准以及W3C的理解与认识

任何东西都需要一个标准，有了标准才能更好的进行交流和推广、不同的标准得出的便是不同的结果。正式因为有了网页的标准，才能降低开发难度以及开发成本，减少各种BUG和安全问题，提高网站易用性

## 3. SEO

1. 请描述下SEO中的TDK？

### 1. 概念

SEO(Search Engine Optimization) 搜索引擎优化：从自然搜索结果获得网络流量的技术和过程，是在了解搜索引擎自然排名机制的基础上，对网站进行内部以及外部优化调整，改进网站在搜索引擎中的关键词自然排名，获得更多流量，从而达成网站销售及品牌建设的目标。

### 2. 怎么做？

1. 合理的title、description、keywords
2. 语义化的HTML代码，符合W3C规范
3. 非装饰性图片增加alt属性
4. 对于不显示的对象避免使用display:none
5. 重要内容HEML代码提前
6. 非必要不使用iframe
7. 投放友情链接、外链。向搜索引擎提交站点

![image-20250917223651429](/Users/june/Library/Application Support/typora-user-images/image-20250917223651429.png

![image-20250917223849544](/Users/june/Library/Application Support/typora-user-images/image-20250917223849544.png)

## 5. iframe

1. iframe有哪些优缺点?
2. iframe用来干什么的？

![image-20250917224706563](/Users/june/Library/Application Support/typora-user-images/image-20250917224706563.png)

![image-20250917224718745](/Users/june/Library/Application Support/typora-user-images/image-20250917224718745.png)

## 6. 微格式

1. 知道什么是微格式吗？
2. 谈谈理解，在前端构建中应该考虑微格式吗？

![image-20250917224952161](/Users/june/Library/Application Support/typora-user-images/image-20250917224952161.png)

![image-20250917225131306](/Users/june/Library/Application Support/typora-user-images/image-20250917225131306.png)

![image-20250917225424502](/Users/june/Library/Application Support/typora-user-images/image-20250917225424502.png) 

![image-20250917225640185](/Users/june/Library/Application Support/typora-user-images/image-20250917225640185.png)

![image-20250917225737966](/Users/june/Library/Application Support/typora-user-images/image-20250917225737966.png)

![image-20250917225821352](/Users/june/Library/Application Support/typora-user-images/image-20250917225821352.png)

## 7. 替换元素

1. 什么是可替换元素，什么事非可替换元素，他们各自有什么特点？

![image-20250917230018365](/Users/june/Library/Application Support/typora-user-images/image-20250917230018365.png)

![image-20250917230120480](/Users/june/Library/Application Support/typora-user-images/image-20250917230120480.png)