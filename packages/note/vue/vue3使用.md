# Vue3使用

> 构建工具`vue-cli4`或者vite
>
> Composition api 和 option api
>
> Compostion api更有利于Tree-think、对TS支持更好,API简化更利于理解

## 1. 与vue2的一些区别

- 1. `template` 模板可以多根节点*当有属性需要继承时,需要单根或者声明*
- 2. `option api` 转向 `composition api` 更便捷
- 3. v-if的优先级高于v-for,意味着在一起使用会报错


## 2. setup函数

> setup函数会在适当的时机执行,且此时并没有创建实例,即无法访问`this`
> setup函数具有两个参数`props`、`content`
> setup 可以直接返回一个render函数

- setup 函数只能访问到props,不能访问state、methods、watch、computed
- 其中`props`属性不能被解构、若需结构使用toRef APi
- 其中`context` 包含三个属性`attrs`、`slots`、`emit`

## 3. vue包的一些函数

> 在vue3中通过一些列函数来实现监听属性、计算属性和生命周期函数
> 这些函数通过Vue导出


- ref接受参数并返回一个具有value得对象,即对我们传入得参数创建了一个响应式引用
- onBeforeMount
- onMounted 接受一个生命周期钩子函数
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmount
- onErrorCaptured
- onRenderTracked
- onRenderTriggered
- watch 接受三个参数一个响应式引用、一个回调函数、一个可选的配置选项
- computed 创建一个计算属性,返回一个响应式引用
- toRefs 用于解析响应式引用
- provide 一个函数接受键值对,并不具备响应式,如果通过ref、reactive创建的响应式引用则具备响应式
- inject 接受键和默认值
- readonly 返回一个不可更改的对象

## 4. template的变化

> 支持多根节点
> 静态属性提升
> 预字符串化

## 5. 打包工具vite和vuecli4

> 借助浏览器原生力量(支持EsModule)实现毫秒级启动
> 基本称为Rollup的超集(几乎支持所有的Rollup插件)
