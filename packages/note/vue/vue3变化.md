# vue3的性能

## 1. 静态提升

> 提升静态节点
> 提升静态属性

1. 把静态节点保存在外部
2. 把静态属性保存在外部

## 2. 预字符串化

> 把大量连续的静态节点编译为字符串的节点

## 3. 缓存事件处理函数

> 把不会变的事件处理函数缓存起来

## 4. Block Tree

> 在最近的跟节点记录动态节点,方便比较

## 5. patchFlag

> 标记动态位置
> 记录动态数据的位置,比如文本、class等属性通过不同的状态,让vue在更新是准确找到变化点
> 不用像vue2中全量更新属性,提升效率

1.

```js

{
    [1]: `TEXT`,
    [2]: `CLASS`,
    [4]: `STYLE`,
    [8]: `PROPS`,
    [16]: `FULL_PROPS`,
    [32]: `HYDRATE_EVENTS`,
    [64]: `STABLE_FRAGMENT`,
    [128]: `KEYED_FRAGMENT`,
    [256]: `UNKEYED_FRAGMENT`,
    [512]: `NEED_PATCH`,
    [1024]: `DYNAMIC_SLOTS`,
    [2048]: `DEV_ROOT_FRAGMENT`,
    [-1]: `HOISTED`,
    [-2]: `BAIL`
};

```

## 去掉Vue构造函数

- 当一个页面有多个vue应用使用插件时
- 通过函数导出,有利于tree shaking
- 区分开vue应用和vue组件

```js
// vue2  影响所有的vue应用
Vue.use(router)
Vue.mixin()

// vue3 
createApp().use(router).mixin()

```

## 组件实例

> 在vue2中组件实例存在许多不想开发者使用的属性/方法
> 在vue3中组件实例是一个Proxy的代理对象


## vue3 模版变化

### 1. v-model

> 由于在vue2中v-model和.sync都是用来双向绑定的,无论使用上还是语义上都不是很友好
> 在vue3中双向绑定只能通过v-model
> 通过??Modifiers属性可获得修饰符参数

```js

`<VModel v-model="vmodel" v-model:title.j="title"/>`
funciton inputHandle (e){
  ctx.emit("update:modelValue",e.target.value)
}
function clickHandle(){
  if(props.titleModifiers && props.titleModifiers.j){
    ctx.emit("update:title",Math.ceil(Math.random()*10))
    return;
  }
  ctx.emit("update:title",Math.random())
}

```

### 2. v-for v-if

> 在vue2中v-for指令的优先级高于v-if,但是依旧不建议一同使用,对性能及其不友好
> 在vue3中v-for指令的优先级低于v-if,所以在一同使用时,v-if中无法读到v-for遍历的值,从根本上断绝他们一同使用的情况
> 在vue3中使用计算属性来代替v-for和v-if一同使用的情况

```js

const list = [{
  isShow:false,
  name:"first item"
},{
  isShow:true,
  name:"sec item"
},{
  isShow:true,
  name:"three item"
}]
const computeListRef = computed(()=>list.filter((item)=>item.isShow))

```

### 3. key

> key值在vue3中可以赋值template
> key在分支节点上将自行分配一个唯一的key

```js
// 在vue2中input将会被复用,而在vue3中不会
<div v-if="isShow">
  <label key="1"> 姓名：<input /> </label>
</div>
<div v-else>
  <label key="1"> 昵称：<input /> </label>
</div>
<button @click="isShow = !isShow">更改显示</button>

```

### 4. 可以存在多个根

> vue3支持多个根节点
> 在vue2中一个组件必须有一个根节点,这样有时候是冗余

## 组件的变化

> defineAsyncComponent 异步组件
> Teleport 改变组件实例真实位置
> Suspence

## 响应式数据 reactivity api

> 利用Proxy Api实现
> 对数据时动态访问的
> vue3中把响应式系统为单独的一个模块
> 其中reactive、ref、readonly、computed为生成响应式数据API
> 其中reactive、readonly生成的是代理对象Proxy
> ref、computed生成的是ref对象

### 1. reactive、readonly

- reactive(Object) 代理一个对象new Proxy()

```js

reactive(123);//value cannot be made reactive: 123

```

- readonly(Object) 代理一个对象,不提供set()

```js

const state = readonly({name:"june"})
state.name = 123//Set operation on key "name" failed: target is readonly. {name: "june"}

```

### 2. ref、computed

- 可以让所有类型状态具有响应式
- 如果是非对象类型,直接ref.value
- 如果是对象,ref.value = Proxy对象
- 如果是Proxy对象,直接使用该Proxy对象
- computed返回的是一个ref对象
- computed会缓存结果,依赖发生变化时且再次调用该计算属性时重新执行计算函数得到新值

```js

const numberRef = ref(123);// {value:123}
const userRef = ref({name:"june",age:18});//{value:Proxy}
const user = reactive({name:"june",age:18})
const userReactiveRef = ref(user);
console.log(userReactiveRef.value === user);// true
const userInfo = computed(()=> `My name is ${userRef.value.name},i am ${user.age} year old`)

```

### 3. 工具方法

- isProxy
- isReactive
- isReadonly
- unref
- toRef
- toRefs
- isRef

### 4. watch、watchEffect

> watch:同vue2的使用,惰性执行副作用,手动指定监听对象,可访问当前状态和修改前状态
> watchEffect:在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它
> watchEffect会自动收集依赖

```js

watch(numberRef,(state,preState)=>{
  console.log("watch run",state,preState)
})
watchEffect(()=>{
  console.log("watchEffect run",numberRef.value)
})
// watch 通过数组监听多个依赖,Proxy对象需要转换为一个函数
watch([numberRef,()=>state.name],([state,preState],[name,preName])=>{
  console.log("watch run 2",state,preState,name,preName)
})

```

