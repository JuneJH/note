# call、apply、bind改变this的指向

> 在JavaScript中改变this指向,可以通过call,apply,bind
> call()通过第一个参数来指定this,后续参数将传递给实际函数
> apply()通过第一个参数指定this,第二参数为**一个包含多个参数的数组**与call唯一不同
> bind()通过第一个参数指定this,其余参数传递给真实函数,返回一个this固定的新函数,固定this


## 1. 实现call

> call的调用方式为函数直接调用 ```fn.call(null,params)```,所以它是在原型上
> 第一个参数可以传任意值

1. 代码示例

```js
// 在原型上增加方法
Function.prototype.myCall = function (context,...args){
  // null/undefined:指向window
  if(context == null){
    context = window;
  }
  const func = Symbol("func");
  context[func] = this;
  // this的指向在此时此景应该通过`谁调用的指向谁`这条规则来实现
  // 由于`谁调用this就指向谁`,可以在该函数中通过this获取真实函数
  const result = context[func](...args);
  // 删除该属性避免污染属性
  delete context[func];
  return result;
}

```

**此时如果第一个参数传入基础数据类型,则会报错, 升级兼容处理基础数据类型**

2. 代码示例

```js
// 处理基础数据类型
Function.prototype.myCall = function (context,...args){
  if(typeof context === "symbol"){
    throw new Error("暂时不能处理Symbol对象")
  }
  if(typeof context === "symbol"){
    throw new Error()
  }
  if(context == null){
    context = window;
  }
  // 基础数据类型string/number/boolean,指向其实例(Symbol暂不考虑)
  // 加入适配基础数据类型
  if(typeof context != "object"){
    // 利用包装类实例
    context = new context.constructor(context)
  }
  const func = Symbol("func");
  context[func] = this;
  const result = context[func](...args);
  delete context[func];
  return result;
}
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
