# 实现防抖和节流

> 防抖【适用场景】:在一些场景中可能会使用`input`,`mousemove`等这样频繁触发的事件来监听一些值并做一些事(比如发送请求)
> 节流【使用场景】:在一定时间内只能触发一次的交互场景中
> 防抖【原理】: 触发该函数后能控制在一段时间后执行，即延迟执行即可
> 节流【原理】: 在一段时间内无论触发多少次，在改时间段内只执行一次。想再次执行必须在下一个时间段

## 1. debounce

> 在实现一个搜索输入框,也许会采用`input`事件来提高用户体验,例如百度搜索框,无需用户点击按钮即可完成发送请求
> 这样的操作会导致用户没有完成输入就发送请求,`input`事件是当输入框的值发生改变时触发
> 多次发送请求不仅对服务器是压力，页面也会发生闪烁
> 利用延时器实现

1. 代码示例

```js
function debounce(handle,delay){
    let timer = null;
    return function (...args){
        // 始终只保留最后产生的延时器
        clearTimeout(timer);
        timer = setTimeout(()=>{
            handle.call(this,...args);
        },delay)
    }
}
```

## 2. throttle

> 在一个抽奖环节场景中，有一个按钮用来点击抽奖没有任何限制，那么可以直接获取到该按钮元素触发它的`click`事件，即可轻轻松松在几毫秒内点击几千次
> 此时可以选择加一个防抖，不是特殊需求的情况下
> 利用时间戳来实现

1. 代码示例

```js
function throttle(handle,wait){
    let time = + new Date();
    return function (...args){
        const nowTime = + new Date();
        if(nowTime - time) > wait){
            time = nowTime;
            handle.call(this,...args);
        }
    }
}
```

- 根据场景的需求添加节流防抖不仅减少服务器压力，也能减少浏览器渲染压力
- 合理选择防抖和节流，能提高不少用户体验
