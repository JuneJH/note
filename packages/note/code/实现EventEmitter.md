# EventEmitter

> `EventEmitter`是`nodejs`中的基础模块,`fs`、`http`等模块需要继承该模块实现事件
> 利用**发布-订阅模式（Publish–subscribe pattern）**实现
> **发布-订阅模式（Publish–subscribe pattern）**是在**观察者模式（Observer pattern）**上增加一层控制
> 发布-订阅模式在前端框架中比较常见,比如`vue`中的数据绑定、数据通信(event-bus)等

## 1. 实现

> 实现最基础的方法
> > on(type,handle):
> > once(type,handle):
> > emit(type,...args):
> > off(type,handle)
> **发布-订阅模式**

1. 代码示例

```js

        class EventEmitter {
        constructor() {
          this.cache = {};  // 中间控制层
        }
        on(type, handle) {
          if (!Array.isArray(this.cache[type])) {
            this.cache[type] = [];
          }
          this.cache[type].push(handle);
        }
        once(type, handle) {
          const self = this;
          function _fn(...args) {
            handle.call(this, ...args);
            self.off(type, _fn);
          }
          this.on(type,_fn);
        }
        off(type, handle) {
          if (Array.isArray(this.cache[type])) {
            this.cache[type] = this.cache[type].filter((fn) => fn != handle);
          }
        }
        emit(type, ...args) {
          if (Array.isArray(this.cache[type])) {
            this.cache[type].forEach((fn) => {
              fn.call(this, ...args);
            });
          }
        }
      }

```

## 2. 使用观察者模式

> 发布订阅模式相比观察者模式多了一层控制层
> 观察者模式则需要自身管理

```js

    class EventControl{
        constructor(){
          this.cache = [];
        }
        emit(...args){
          this.cache.forEach(fn=>{
            fn.call(this,...args);
          })
        };
        on(who,handle){
          who.cache.push(handle);
        }
        once(who,handle){
          function _fn(...args){
            handle.call(this,...args);
            who.off(who,_fn);
          }
          who.on(who,_fn);
        }
        off(who,handle){
          who.cache = who.cache.filter(fn=>fn != handle);
        }
      }

      // 使用

      // 定义三个函数
      function a(...params) {
        console.log("this is a funciton!!!", "parms", params);
      }
      function b(...params) {
        console.log("this is b funciton!!!", "parms", params);
      }
      function c(...params) {
        console.log("this is c funciton!!!", "parms", params);
      }

      // 实例一个事件 被观察者
      const eventTargt = new EventControl();
      // 观察者   
      const e = new EventControl();

      // 订阅
      e.on(eventTargt,a);
      e.on(eventTargt,b);
      e.once(eventTargt,c)

      // 发布
      eventTargt("通知消息")
      this is a funciton!!! parms ["通知"]
      this is b funciton!!! parms ["通知"]
      this is c funciton!!! parms ["通知"]
      // 二次发布
      eventTargt("通知消息")
      this is a funciton!!! parms ["通知"]
      this is b funciton!!! parms ["通知"]

```

- 在本例子中，一个实例既是观察者也是被观察者
- 在这样的场景下,发布订阅模式比观察者模式的合适度就要高
- 在另外一些场景下,发布-订阅模式由于多了中间管理,可能就会出现数据问题

