# React 核心概念

> 目录来源于[官网Advanced Guides](https://reactjs.org/docs/getting-started.html)

## 1.高阶组件

> HOC:高阶组件，把组件作为参数，返回一个新的组件，可以用来给一些组件添加一些通用功能。从而实现横切关注点

```javascript
// 实现添加日志
import React from 'react'
export default function withLog(Comp,option){
    return class LopWrapper extends React.Component{
        componentDidMount() {
            console.log(`日志：组件${Comp.name}被创建了！！${Date.now()}`)
        }
        componentWillUnmount() {
            console.log(`日志：组件${Comp.name}被销毁了！！！${Date.now()}`)
        }
        render(){
            return(
                <>
                    <div>{option}</div> {/*显示其他信息*/}
                    <Comp/>
                </>
            )
        }
    }
}
```

**在调用高阶组件时，不要再生命周期钩子中调用，会导致多次销毁和创建**
**不要在高阶组件中更改传入的组件**

2. 错误边界

3. Context

> 上下文

4. Refs

5. 