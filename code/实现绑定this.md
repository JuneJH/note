# call、apply、bind

> 在JavaScript中改变this指向,可以通过call,apply,bind
> call()通过第一个参数来指定this,后续参数将传递给实际函数
> apply()通过第一个参数指定this,第二参数为**一个包含多个参数的数组**与call唯一不同
> bind()通过第一个参数指定this,其余参数传递给真实函数,返回一个this固定的新函数


## 1. 实现call

> call的调用方式为函数直接调用 ```fn.call(null,params)```,所以它是在原型上
> 第一个参数可以传任意值
> > null/undefined:指向window
> > 基础数据类型string/number/boolean,指向其示例(Symbol暂不考虑)
> this的指向在此时此景应该通过`谁调用的指向谁`这条规则来实现
> 由于`谁调用this就指向谁`,可以在该函数中通过this获取真实函数
> **浏览器环境,一通百通**

1. 代码示例

```js

    Function.prototype.myCall = function (context,...args){
        if(context == null){
            context = window;
        }
        const func = Symbol("func");
        context[func] = this;
        const result = context[func](...args);
        delete context[func];
        return result;
    }

```

**此时如果第一个参数传入基础数据类型,则会报错**

2. 代码示例

```js

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

**此时当传入Symbol时,仍会报错,目前直接不处理**

## 2. apply

> 它与call只有接受参数的形式不一样
> 目前用的时扩展运算符,因此变动很小

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
> 其余参数传递给真实函数
> bind()返回一个新的函数，该函数的功能为真实函数，只是改变了this指向
> 如果是new执行该函数，新的对象的构造函数指向认识原函数，且bind返回的函数以及传递所改变的this没有任何作用

