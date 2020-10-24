# HTML&CSS常见问题
 [TOC]
## 1. CSS权重及其引入方式
- CSS引入方式可以使用行间样式，页面级CSS，外联表通过link引入。还可以使用@import
    * 权重值
        - !important
        - 行间样式      1000
        - ID            100
        - 类选择器      10
        - 标签选择器    1    
        - 通配符        0
    **如果权重值相等，将根据代码的原次序进行匹配**

## 2. <a></a>标签全部作用
- 超链接
- 锚点
- 发邮件    \<a href="mailto:1375328416@qqcom">发送邮件</a>将打开本地邮件系统给目标发邮件
- 打电话   \<a href="tel:153XXX7388">拨打客电话</a> 
- 协议限定符     \<a href="javascript:let i= 10;while(i--)alert('点10次吧'+i)">点10次<a>

## 3. 用CSS画三角形
```css
/* 画一个三角形 */
   .box{
    width: 0;
    height: 0;
    border:10px solid transparent;
    border-bottom-color: red;
    }
```
```css
 /* 画一个勾 */
   .gou{
       width: 20px;
       height: 10px;
       border:2px solid #000;
       border-right: none;
       border-top: none;
       border-radius: 2px;
       transform: rotate(-45deg);
   }
```

## 4. 未知宽高元素水平垂直居中（方案及比较）
- position + transform
- flex
- display:table
```css
/* position + transform */
    .parent{
        height: 600px;
        background-color: yellow;
        position: relative;
    }
    .children{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
/* flex */
    .parent{
        height: 600px;
        background-color: yellow;
        display: flex;
        align-items: center;
        justify-items: center;
    }
    .children{

    }
/* table属性 */
  .parent{
        height: 600px;
        background-color: yellow;
        display:table;
    }
    .children{
        display:table-cell;
        vertical-align:middle;
        text-align:center;
    }
```
## 5. 元素种类的划分

- 块级元素 display:block;
- 行内元素 display:inline
- 行内块级元素 display:inline-block

## 6. 盒子模型及其理解
* css中盒子模型分为两种标准盒模型和怪异盒模型
- 标准盒模型 width = content
- 怪异盒模型 width = content + padding + border 

## 7. 定位方式及其区别（文档流）
* position 一共有relative,absolute,fixed sticky
* sticky粘性定位，相当于相对定位和固定定位的混合。粘性定位根据一个阈值决定，在大于等于阈值时采用相对定位，小于阈值后则为固定定位。

## 8. margin塌陷及合并问题
* BFC

## 9. 浮动模型及清除浮动的方法
* BFC clean

## 11. CSS定位属性

## 12. display及相关属性
 - block,inline-block,inline,table,table-cell,flex

## 13. IFC与BFC

- BFC
    - 触发条件
      - 根元素
      - 浮动和绝对定位
      - overflow除默认值
      - 表格
    - 解决问题
      - 高度塌陷(清除浮动，触发BFC)
      - 兄弟元素重叠(给一个元素设置浮动，另一个元素为常规流，但是给常规流触发BFC，就会避开浮动元素)
      - 外边距合并
- IFC i=>inline

## 14. 圣杯布局和双飞翼布局的实现
- 圣杯布局通过padding让位置
- 双飞翼是国内改进的通过margin

```css
 /* 圣杯布局
    结构上 中左右
    最外层通过padding位左右留出位置
    全部浮动
    利用margin让其分布到两侧
    利用相对定位使其归位至padding留出的位置
     */
  .container{
        padding:0 200px;
        border:1px solid;
        min-width: 500px;
    }
    .container::after{
        content:'';
        display: block;
        clear: both;
    }
    .left,.right,.main{
        float: left;
    }
    .left{
        position: relative;     
        left:-200px;
        background-color: red;
        width:200px;
        margin-left:-100%;
    }
    .main{
        width: 100%;
        background-color:orange;
    }
    .right{
        position:relative;
        right:-200px;
        width:200px;
        background-color:yellow;
        margin-left:-200px;
    }

/* 双飞翼布局 */

        .main,
        .right,
        .left{
            float: left;
        }
        .main{
            margin: 0 200px;
        }
        .right{
            width:200px;
            background-color: aquamarine;
            margin-left: -200px;
        }
        .left{
            width: 200px;
            background-color: brown;
            margin-left: -100%;

        }

```

## 14. Flex布局
- css3

## 15. px、em、rem的区别
- em 相对于父级的字体大小
- rem 相对于root即根标签的字体大小
- px

## 16. Less预处理语言

- 增加变量,嵌套写法

## 17. 媒体查询
- @media        @media 媒体类型and （媒体特性）{你的样式}

## 18. vh与vw

- 相对于视口的单位
* 1vw = 视口宽度的1%
* 1vh = 视口高度的1%

## 19. H5的语义化作用及语义化标签

- 通过带有语义化的标签进行构建一个网页结构,可以提高团队协作工作的效率,以及维护,扩展
- 二 有利于搜索引擎,和一些读屏软件生成目录等

## 21. Web Worker和Web Socket

- webworker 多线程
- web socket是基于TCP的全双工协议
- serviceworker 服务端与浏览器
  

## 22. CSS3及相关动画

- animation

## 23. 如何实现响应式布局

- 媒体查询

## 24. SEO的概念及实现

- 搜索引擎
- meta标签属性，keyword，description
- title标签

## 25. HTML5的新特性

- 语义化标签
- 增强表单
- canvas

## 26. Less和Sass使用

- 直接引入
- npm引入

## 27. css会阻塞dom解析嘛

- 会阻塞，但是阻塞的是渲染树，不会阻塞dom解析，因为渲染树是css规则树加dom树合成的。
## 28. CSS3 选择器有哪些

## 29. CSS 两栏布局（float table flex）两列等高布局

- flex
- 圣杯布局
- 伪等高