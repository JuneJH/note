# call、apply、bind改变this的指向



在JavaScript中，可以使用以下方法来改变函数内部的 `this` 指向：

1. `call(thisArg, ...args)`：立即调用函数，并将指定的 `this` 值传递给函数。后续参数将作为实际函数的参数进行传递。
2. `apply(thisArg, argsArray)`：与 `call()` 类似，也是立即调用函数，并将指定的 `this` 值传递给函数。不同的是，第二个参数是一个包含多个参数的数组，该数组中的元素将作为实际函数的参数进行传递。
3. `bind(thisArg, ...args)`：返回一个新函数，其中 `this` 值被固定为指定的值。后续参数将作为实际函数的参数进行传递。

## 0. 使用

```javascript
function greeting(message) {
  console.log(`${message} ${this.name}!`);
}

const person = {
  name: "John"
};

// 使用 call() 方法
greeting.call(person, "Hello"); 
// 输出: Hello John!

const numbers = [1, 2, 3, 4, 5];

// 使用 apply() 方法
const maxNumber = Math.max.apply(null, numbers);
console.log(maxNumber); 
// 输出: 5

// 使用 bind() 方法
const greet = greeting.bind(person, "Hi");
greet(); 
// 输出: Hi John!
```


## 1. 实现call

> call的调用方式为函数直接调用 ```fn.call(null,params)```,所以它是在原型上
> 第一个参数可以传任意值

1. 代码示例

```js
Function.prototype.myCall = function (context, ...args) {
  // 处理上下文为 null 或 undefined 的情况
  context = context || window;

  // 创建一个唯一的属性名
  const func = Symbol();

  // 将当前函数作为属性值赋给上下文对象
  context[func] = this;

  // 调用函数，并传入参数
  const result = context[func](...args);

  // 删除属性
  delete context[func];

  // 返回函数调用的结果
  return result;
};
```

**此时如果第一个参数传入基础数据类型,则会报错, 升级兼容处理基础数据类型**

2. 代码示例

```js
Function.prototype.myCall = function (context, ...args) {
  if (typeof context === "symbol") {
    throw new Error("暂时不能处理Symbol对象");
  }
  if (context === undefined) {
    context = globalThis; // 使用全局对象
  }
  if (typeof context !== "object") {
    throw new TypeError("上下文必须是一个对象");
  }
  context.__myCallTempFn__ = this; // 将原函数绑定到上下文对象
  const result = context.__myCallTempFn__(...args); // 直接调用绑定的函数
  delete context.__myCallTempFn__;
  return result;
};
```

**此时当传入Symbol时,仍会报错,目前直接不处理，symbol可以在做兼容处理**

## 2. apply

> 它与call只有接受参数的形式不一样,利用扩展运算符变动不大

1. 代码示例

```js
// 只有接受参数不一样
Function.prototype.myCall = function (context,args){
    if(typeof context === "symbol"){
        throw new Error("暂时不能处理Symbol对象")
    }
    if(typeof context === "symbol"){
        throw new Error()
    }
   if(context == null){
       context = window;
   }
    // 加入适配基础数据类型
   if(typeof context != "object"){
    // 包装
       context = new context.constructor(context)
   }
   const func = Symbol("func");
   context[func] = this;
   const result = context[func](...args);
   delete context[func];
   return result;
}

```

## 3. bind

> 第一个参数和前面处理方法一致,都是作为this指向
> 其余参数传递给真实函数，后续在调用时传递的参数拼接在后
> bind()返回一个新的函数，该函数的功能为真实函数，只是改变了this指向
> 如果是new执行该函数，新的对象的构造函数指向认识原函数，且bind返回的函数以及传递所改变的this没有任何作用

1. 示例代码

```js
// 固定this
Function.prototype.myBind = function(context,...args){
  // 一些兼容判断
  if(typeof context === "symbol"){
    throw new Error("暂时处理不了symbol")
  }
  if(context == null){
    context = window;
  }else
    if(typeof context !== Object){
      context = new context.constructor(context)
    }
  // 把函数保存下来，以便后续调用
  const _fn = this;
  if(typeof _fn !== "function"){
    throw new TypeError("不是函数")
  }
  // 当使用new调用时，返回的对象的构造函数为原函数，因此需要继承
  const fNOP = function(){};
  // 返回实体函数
  function fBound(...runArgs){
    // 判断是否是new执行，如果是此时this失效，执行原函数
    if(new.target){
      context = this;
    }
    if(!context._fn){
      context._fn = _fn;
    }
    const result = context._fn(...args,...runArgs);
    delete context._fn;
    console.log("返回函数的this",this)
    return result;
  }
  // 继承原型
  fNOP.prototype = _fn.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```
