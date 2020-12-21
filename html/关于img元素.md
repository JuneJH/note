# img元素

image缩写，空元素

src属性：source 

alt属性： 当图片失效时，将使用该属性的文字替代图片

## 和a元素连用

## 和map元素

map：地图

map的子元素： area
 - shape
 - coords
 - href
 - target

 衡量坐标时，为了避免衡量误差，需要使用专业的衡量工具

 PS，pxcook

 ## 和figure元素

 指代，定义，通常用于把图片，图片标题，描述包裹起来

 子元素：figcaption  ：标题

 ```html
  <figure>
        <figcaption>
            <h2>hbb</h2>
        </figcaption>
        <img usemap="#hbbMap" src="./src/hbb.jpg" alt="">
        <map name="hbbMap">
            <area shape="circle" coords="274,160,60 " href="https://baike.baidu.com/item/%E7%9C%BC%E7%9D%9B/362?fr=aladdin"  target="_blank">
            <area shape="rect" coords="132,175,578,463" href="https://baike.baidu.com/item/%E5%98%B4%E5%B7%B4/10431464?fr=aladdin" target="_blank" >
            <area shape="poly" coords="10,10,10,30,40,50" href="https://baike.baidu.com/item/%E5%98%B4%E5%B7%B4/10431464?fr=aladdin" target="_blank">
        </map>
    </figure>
```