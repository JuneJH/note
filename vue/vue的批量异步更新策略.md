# Vue的批量异步更新策略

> vue通过发布订阅的设计模式实现数据驱动页面更新,在数据发生变化的过程中会产生许多的`watcher`,如果产生`watcher`就触发更新,这种策略对单线程的Javascript并不是那么友好
>
> 浏览器执行代码遵循一种策略-`Event Loop`,这种策略把渲染这个工作放在了宏任务之后,那么把更新工作放入微任务中,保证它在渲染之前完成,这个策略就是Vue中使用的批量异步更新策略(*如果浏览器不支持Promise,则会进行降级处理,兜底会使用setTimeout*)

## 1. vue中的nextTick方法

- vue中的$nextTick方法是提供给开发者想在修改DOM后在对此进行使用
- Vue在更新时会开启一个队列缓冲同一事件循环内发生的数据修改触发的更新`watcher`
- 在下一个事件循环前，Vue会 刷新队列并执行队列中更新操作(*这些watcher是去重的,是其更加高效*)
- Vue 内部使用 `Promise.then`、`MutationObserver`、`setImmediate`和`setTimeout(fn, 0)`进行异步排队更新

```js
const testOm = document.getElementById("test");
this.test = "修改了";
console.log("1",testOm.innerText);
this.$nextTick(()=>{
  console.log("2",testOm.innerText);	// 能在页面更改后第一时间获取最新的页面信息
})
```

## 2. 什么时候开始收集

1. 当数据发生改变时,Dep会触发内部的`notify`方法通知`watcher`更新页面

```js
notify () {
  const subs = this.subs.slice()
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```

2. 数据发生改变时`Dep`会执行`Watcher`中的`update`方法,在该方法中会吧自己放入一个队列中

```js
update () {
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)	// 页面更新执行此处逻辑
  }
}
```

3. `queueWatcher`处理`watcher`,去重、验证、开启队列

```js
const queue = [];			// 队列
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

4. `flushSchedulerQueue`更新队列函数,用于管理更新队列

```js
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id
  queue.sort((a, b) => a.id - b.id)
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()		// 生命钩子函数beforeupdate
    }
    id = watcher.id
    has[id] = null
    watcher.run()			// 执行页面更新函数
  }
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()
  resetSchedulerState()	// 复原更新队列和一系列状态
  callActivatedHooks(activatedQueue)	// 生命钩子
  callUpdatedHooks(updatedQueue)  // 生命钩子函数
}
```

## 3. NextTick函数如何处理更新队列函数

1. `nextTick`开启异步队列,封装函数进行错误处理

```js
const callbacks = []; // 此队列包含用户手动调用的nextTick、页面更新队列flushSchedulerQueue
// 最终开启异步队列时的操作函数
function flushCallbacks () {}
// nextTick函数接受一个回调
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // 2.1.0+ 中的新功能：如果没有提供回调并且在执行环境中支持 Promise，则返回一个 Promise。
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

2. 异步队列开启方式 `Promise.then`、`MutationObserver`、`setImmediate`和`setTimeout(fn, 0)`

```js
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 优先使用Prmise开启
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)){
  // 使用MutationObserver
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 使用setImmediate
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

## 3. 批量执行

> flushSchedulerQueue专门处理收集`watcher`
>
> callbacks专门处理nextTick收集的回调函数
>
> 最终通过一些方式开启浏览器的异步队列(*最好是微任务*)执行flushCallbacks

1. 最终通过`flushCallbacks`执行队列`callbacks`

```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

2. 以上,用户调用`vue.nextTick`的执行顺序取决于`callbacks`队列中的顺序并非取决于书写的位置

