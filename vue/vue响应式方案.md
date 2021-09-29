# vue 实现响应式方案

> Vue2通过Object.defineProperty拦截对象递归、重写数组方法实现响应式
>
> Vue3直接通过Proxy语言层面代理

## 1. Vue2响应式方案

> Vue2实现响应式主要依赖Object.defineProperty API进行拦截
>
> 针对数组需要重写数组原型方法进行拦截
>
> 通过Watcher和Dep进行依赖收集

1. 创建一个`Watcher`管理页面更新动作,并在创建时主动订阅

```js
class Watcher {
  constructor(vm, update) {
    this.vm = vm;
    this.update = update;
    Dep.target = this;	// 主动订阅
    vm.$data.foo;		// 	读取数据
    Dep.target = null;
    this.updated();
  }
  updated() {
    this.update.call(this.vm)
  }
}

```

2. 创建一个`Dep`实例这些依赖

```js
class Dep{
	constructor(){
		this.deps = []
	}
	add(dep){
		this.deps.push(dep)
	}
	notify(){
		this.deps.forEach(watcher=>watcher.updated());
	}
}

```

3. 使用`Object.defineProperty`实现拦截一个对象的读写并进行订阅发布

```js
function defineReactive(obj, key, val) {
  observe(obj[key]);
  const deps = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && deps.add(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        if (typeof val === "object") {
          observe(newVal);
        }
        val = newVal;
        deps.notify();
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) return;
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]));
}
```

4. 简单封装一下使用

```js
class MiniReactive {
  constructor(options) {
    this.$options = options;
    this.el = this.$options.el;
    this.render = this.$options.render;
    this.$data = typeof options.data === "function" ? options.data() : options.data;
    observe(this.$data);
    if (this.el) {
      this.mountComponent(this.el)
    }
  }
  mountComponent(el) {
    new Watcher(this, this.render)
  }
}
```

5. 测试

```js
const app = new MiniReactive({
  el: "#app",
  data() {
    return {
      foo: 1
    }
  },
  render() {
    const container = document.querySelector(this.el)
    container.innerText = this.$data.foo;
  }
});

setInterval(() => {
  app.$data.foo++;
}, 1000)
```

## 2. Vue3响应式方案

> Vue3的响应机制是基于Es6的语言特性Proxy实现拦截,这属于懒处理只在使用时才处理,在性能上有很大的提升,不用在递归遍历对象对每个属性做代理
>
> 通过effect触发get利用track进行依赖收集trigger触发依赖执行

1. 利用Proxy进行数据代理

```js
function  reactive(obj) {
    return new Proxy(obj,{
        get(target,key){
            track(target,key)
            if(typeof target[key] === "object"){
                return reactive(target[key]);
            }
            return target[key]
        },
        set(target,key,val){
            target[key] = val;
            trigger(target,key)
        },
        deleteProperty(target,key){
            delete target[key];
            trigger(target,key)
        },
    })
}
```

2. 创建副作用函数准备操作,通过effectStack缓存操作

```js
const effectStack = [];
function  effect(fn) {
    const e = createEffect(fn);
    e();
    return e;
}
function createEffect(fn) {
    const effect = function (){
        try{
            effectStack.push(effect);
            fn();
        }finally{
            effectStack.pop();
        }
    }  
    return effect;  
}
```

3. 收集依赖,由于在准备副作用函数时直接执行了更新函数导致出发getter

```js
const targetMap = new WeakMap();
function  track(target,key) {
    const effect = effectStack[effectStack.length - 1];
    if(effect){
        let depMap = targetMap.get(target);
        if(!depMap){
            depMap = new Map();
            targetMap.set(target,depMap) 
        }
        let deps = depMap.get(key);
        if(!deps){
            deps = new Set();
            depMap.set(key,deps)
        }
        deps.add(effect)
    }
}

```

4. 广播,当依赖项发生变化执行副作用-更新函数

```js
function  trigger(target,key) {
    const depMap = targetMap.get(target);
    if(depMap){
        const deps = depMap.get(key);
        if(deps){
            deps.forEach(fn=>fn())
        }
    }
}

```

## 3. 对比

- Vue2 无论是否使用该数据都会在首次对数据进行递归代理
- Vue2 无法监听到数组、删除、新增等变化



