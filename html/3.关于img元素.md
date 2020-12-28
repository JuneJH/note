# img元素

> 将图像嵌入文档

## 基本属性

- src: 嵌入图片的路径 

- alt: 当图片失效时，将使用该属性的文字替代图片/如果没有值,将不显示图片损坏的icon

- title: 当用户鼠标移入图片中显示的字,并非alt的替代或补充,是两种不同的功能

- srcset: 以逗号分割,每个值表示替代资源,可与`sizes`进行连用实现在不同的设备显示不同的资源

- sizes:以逗号分隔,表示资源的大小,每一个资源大小包含媒体条件、资源尺寸的值

## 和map元素

> 把一张图片作为一个坐标系,通过该元素与其子元素实现点击不同的坐标得到相应反馈

map：地图

map的子元素： area

 - shape
 - coords
 - href
 - target

 衡量坐标时，为了避免衡量误差，需要使用专业的衡量工具

 PS，pxcook

 ## 和figure元素

> 表示一段独立的内容,表示一段说明,不会影响到主体
> 指代，定义，通常用于把图片，图片标题，描述包裹起来
> 子元素：figcaption

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

- 图片元素也可通过`css`属性`background`加入文档
- canvas/svg也是图片