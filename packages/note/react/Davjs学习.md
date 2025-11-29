# Dvajs 学习

> react全家桶东西太多，太杂.搭建项目比较繁琐cra,react-router,react-router-dom,redux,react-redux,redux-sage...。
>
> Dvajs把搭建项目的固定操作集成为6个api，简化react项目开发。

# 1. dva APi

> dvajs 默认导出一个函数,通过该函数可以得到一个dva对象

- 1. router: 传入一个函数,返回一个React节点
- 2. modle: 定义redux/redux-saga:state、reduce、effect等
- 3. start: 启动dva程序,该函数需要传递一个css选择器用于确定容器

## 1.router

```js
const app = dva();
//注册渲染根组件
app.router(App);
// 或者使用
app.router(()=><App/>)
```

## 2. modle

```js
// 计数器案例
export default {
  namespace:"counter",
  state:0,
  reducers:{
    increase(state){
      return state + 1;
    },
    decrease(state){
      return state - 1;
    }
  },
  //处理异步
  effects:{
    *asyncIncrease(action,{call,put}){
      yield call(delay,2000);
      yield put({type:"increase"})

    },
    *asyncDecrease(action,{call,put}){
      yield call(delay,2000);
      yield put({type:"decrease"})
    }
  },
  // 初始化时执行的函数对象集合
  subscriptions:{
    onSubscription(obj){
      console.log(obj)

    }
  }
}


function delay(duration){
  return new Promise(resove=>{
    setTimeout(()=>{
      resove()
    },duration)
  })
}
```

## 3. start 

```js
//开启项目
app.start("#root");
```

## 4. dva() 配置项

- 1. history
- 2. initialState
- 3. onError
- 4. onAction
- 5. onStateChange
- 6. onReducer
- 7. onEffect
- 8. extraReducers
- 9. extraEnhancers



## 5. 源码学习

### 1. start

```js
function start() {
    // Global error handler
    const onError = (err, extension) => {
      if (err) {
        if (typeof err === 'string') err = new Error(err);
        err.preventDefault = () => {
          err._dontReject = true;
        };
        plugin.apply('onError', err => {
          throw new Error(err.stack || err);
        })(err, app._store.dispatch, extension);
      }
    };

    const sagaMiddleware = createSagaMiddleware();
    const promiseMiddleware = createPromiseMiddleware(app);
    app._getSaga = getSaga.bind(null);

    const sagas = [];
    const reducers = { ...initialReducer };
    for (const m of app._models) {
      reducers[m.namespace] = getReducer(m.reducers, m.state, plugin._handleActions);
      if (m.effects) {
        sagas.push(app._getSaga(m.effects, m, onError, plugin.get('onEffect'), hooksAndOpts));
      }
    }
    const reducerEnhancer = plugin.get('onReducer');
    const extraReducers = plugin.get('extraReducers');
    invariant(
      Object.keys(extraReducers).every(key => !(key in reducers)),
      `[app.start] extraReducers is conflict with other reducers, reducers list: ${Object.keys(
        reducers,
      ).join(', ')}`,
    );

    // Create store
    app._store = createStore({
      reducers: createReducer(),
      initialState: hooksAndOpts.initialState || {},
      plugin,
      createOpts,
      sagaMiddleware,
      promiseMiddleware,
    });

    const store = app._store;

    // Extend store
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {};

    // Execute listeners when state is changed
    const listeners = plugin.get('onStateChange');
    for (const listener of listeners) {
      store.subscribe(() => {
        listener(store.getState());
      });
    }

    // Run sagas
    sagas.forEach(sagaMiddleware.run);

    // Setup app
    setupApp(app);

    // Run subscriptions
    const unlisteners = {};
    for (const model of this._models) {
      if (model.subscriptions) {
        unlisteners[model.namespace] = runSubscription(model.subscriptions, model, app, onError);
      }
    }
```



### 2. InjectModel

```js
 function injectModel(createReducer, onError, unlisteners, m) {
    m = model(m);

    const store = app._store;
    store.asyncReducers[m.namespace] = getReducer(m.reducers, m.state, plugin._handleActions);
    store.replaceReducer(createReducer());
    if (m.effects) {
      store.runSaga(app._getSaga(m.effects, m, onError, plugin.get('onEffect'), hooksAndOpts));
    }
    if (m.subscriptions) {
      unlisteners[m.namespace] = runSubscription(m.subscriptions, m, app, onError);
    }
  }
```



### 3. unmodel

```js
 function unmodel(createReducer, reducers, unlisteners, namespace) {
    const store = app._store;

    // Delete reducers
    delete store.asyncReducers[namespace];
    delete reducers[namespace];
    store.replaceReducer(createReducer());
    store.dispatch({ type: '@@dva/UPDATE' });

    // Cancel effects
    store.dispatch({ type: `${namespace}/@@CANCEL_EFFECTS` });

    // Unlisten subscrioptions
    unlistenSubscription(unlisteners, namespace);

    // Delete model from app._models
    app._models = app._models.filter(model => model.namespace !== namespace);
  }

```



### 4. replaceModel

```js
function replaceModel(createReducer, reducers, unlisteners, onError, m) {
    const store = app._store;
    const { namespace } = m;
    const oldModelIdx = findIndex(app._models, model => model.namespace === namespace);

    if (~oldModelIdx) {
      // Cancel effects
      store.dispatch({ type: `${namespace}/@@CANCEL_EFFECTS` });

      // Delete reducers
      delete store.asyncReducers[namespace];
      delete reducers[namespace];

      // Unlisten subscrioptions
      unlistenSubscription(unlisteners, namespace);

      // Delete model from app._models
      app._models.splice(oldModelIdx, 1);
    }

    // add new version model to store
    app.model(m);

    store.dispatch({ type: '@@dva/UPDATE' });
  }
```



