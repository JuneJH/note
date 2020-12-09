# Hook使用

> Hook 为函数组件添加了类组件的能力了
> 使用 `useState` 添加`state`能力
> 使用 `useEffect` 添加处理副作用(相当于在类组件的生命周期函数中`componentDidMount`,`componentDidUpdate`,`componeentWillUnmount`)能力
> 同时可自定义`Hook`为函数组件添加更多的能力


## useState

1. 使用该函数返回一个数组，其一为状态值，其二为改变状态的函数
2. 使用该函数可以传递当前状态的初始值作为第一个参数
3. 使用第二参数(修改状态函数)时，参数会直接替换原有值，与`setState`覆盖不一致
4. 同理，如果在同一次操作中想要修改状态，需要传递函数(参数为上一次状态的值)
5. 第二参数(修改状态函数)的始终为同一函数

```js
    // 示例，验证以上观点
    function Hook4useState() {
        const countArr = useState(0);
        const count = countArr[0];
        const setCount = countArr[1];
        console.log(count);
        console.log(setCount)
        return (<div>
            <div>
                <div>{count}</div>
                <button onClick={() => {
                    setCount(count + 1);
                }}>+1</button>
                <button onClick={() => {
                    setCount(count + 1); // count => 0
                    setCount(count + 1);// count => 0
                }}>+2</button>
                <button onClick={() => {
                setCount(prevState => prevState + 1);  // prevState => 0
                setCount(prevState => prevState + 1);  // prevState => 1
                }}>+2传递函数</button>
            </div>
        </div>)
    }

```

1. 在更改状态的值时，如果数据未发生改变，则不会重新渲染
1. 如果需要强制重新渲染，可采用一下方案

```js

    // 示例
    function Hook4useState() {
        const [count,setCount] = useState(0);
        const [,setFresh] = useState();
        console.log("重新渲染")
        return (
            <div>
                <p>{count}</p>
                <button onClick={() => {
                    setCount(count)
                }}>
                    不会触发重新刷新
                </button>
                <button onClick={() => {
                    setFresh({})
                }}>
                    强制刷新
                </button>
            </div>
        )
    }

```

### 注意

>1. 使用`useState`产生的状态会有一个'表'维护,该表依赖其索引，因此不要在判断、循环中使用该函数
>2. 该表挂载在节点(函数组件)上,因此所有数据只属于该节点，不会造成混乱

## useEffect

1. 在不恰当的位置使用副作用(异步修改)函数，会导致页面多次渲染，不稳定等等问题
2. 在类组件中可以在`componentDidMount`,`componentDidUpdate`,`componeentWillUnmount`生命周期运行副作用函数
3. 使用`useEffect`专门用于函数组件处理副作用函数
4. 使用`useEffect`时需要传递一个函数(存在第二个参数)，在该函数中执行具有副作用的操作
5. `useEffect`没有返回值
6. 传递`useEffect`的第二参数(数组),该参数记录副作用操作的依赖，如果依赖数据没有发生变化(如果为空数组，则该副作用函数只会首次运行，清理函数仅在卸载执行)，则该函数不会再执行

```js

    function Hook4useEffect(){
        const [count,setCount] = useState(0);
        const [,setFresh] = useState();
        const a = useEffect(()=>{
            console.log("执行副作用函数") // 依赖项未发生改变不执行
            setTimeout(()=>{
                document.title = "异步修改"+count
            },1000)
        },[count])
        console.log(a)  // undefined
        return (<div>
            <p>{count}</p>
            <button onClick={
                ()=>{
                    setCount(count+1)
                }
            }>+ 1</button>
            <button onClick={() => {
                setFresh({})
            }}>
                强制刷新
            </button>
        </div>);
    }

```

1. 副作用函数在页面完成真实更新后执行，与类组件中`componentDidMount`、`componentDidUpdate`执行时间有差异
2. 副作用函数的返回值必须为一个函数(清理副作用函数所产生的影响),该函数(`清理函数`)会在每次运行副作用函数前运行(首次不执行，销毁时执行);
3. 正常情况下，卸载后只会执行清理函数


```js
    function Hook4useEffect() {
        
        const [, setFresh] = useState();
        useEffect(() => {
            console.log("执行副作用函数") // 依赖项未发生改变不执行
            setTimeout(() => {
                console.log("执行异步")
            }, 1000)

            return ()=>{
                console.log("执行清理函数");
            }
        })
        return (<div>

            <button onClick={() => {
                setFresh({})
            }}>
                强制刷新
            </button>
        </div>);
    }
    // 首次渲染时输出

    // 同步代码1
    // 同步代码2
    // 执行副作用函数
    // 执行异步

    // 后期重新渲染时

    // 同步代码1
    // 同步代码2
    // 执行清理函数
    // 执行副作用函数
    // 执行异步

    // 卸载执行

    // 执行清理函数

```
### 注意

> 每次执行`useEffect`能拿到外部的值，这是因为闭包
> 每次执行`useEffect`时，它的第一个参数每次会覆盖执行，如果该参数不固定，那么他所返回的清理函数执行时机将发生混乱