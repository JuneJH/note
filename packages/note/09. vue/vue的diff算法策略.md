# vue diff算法策略

> vue通过发布订阅模式实现数据驱动页面,通常一个组件只有一个`watcher`(*除用户watcher*),所以如果不做任何策略,只要有数据发生改变就更新整个组件
>
> 通过算法找到发生变化的位置进行局部更新,从而实现高效的、高性能的更新

## 1. diff算法

- 通常为了得到两棵树的差异,可以使用`diff`算法来求的差异集
- 一个简版的diff算法实现

```js
function diff(root1,root2,info=[]){
    if(root1 == root2) return true;	
    if(root1 != null && root2 == null){ // 删除
        info.push({
            type:'删除',
            origin:root1,
            nowNode:null
        })
    }else if(root1 == null && root2 != null){ // 新增
        info.push({
            type:'新增',
            origin:null,
            newNode:root2
        })
    }else if(root1.value != root2.value){ // 修改
        info.push({
            type:'修改',
            origin:root1,
            nowNode:root2
        })
        diff(root1.left,root2.left,info);  // 深度优先
        diff(root1.right,root2.right,info)
    }else{  // 相同
        diff(root1.left,root2.left,info);
        diff(root1.right,root2.right,info)
    }
    return info;
}
```

## 2. vue中的diff算法

> 以上的`diff`算法复杂过高,性能损耗过大对构建一个大型应用程序不友好
>
> vue的diff算法在此基础上做了一系列优化,利用空间换时间

1. 页面的更新是因为数据发生变化而触发的`watcher`执行了更新函数,但并不是立即执行`flushSchedulerQueue`队列会去重收集这些`watcher`,最终被放入`nexttick`函数中,等待异步批量执行

```js
nextTick(flushSchedulerQueue)  // 放入nextTick的callbacks队列中等待执行
```

2. 数据发生变化边会导致`render`函数重新运行生成新的`vnode`,最终通过`patchVnode`函数进行计算更新变化部分

```js
 patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
```

3. `patchVnode`用于更新属性,协调递归`updateChildren`

```js
  function patchVnode (oldVnode,vnode,insertedVnodeQueue,ownerArray,index,removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    const elm = vnode.elm = oldVnode.elm
    let i
    const data = vnode.data
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)
    }
    const oldCh = oldVnode.children
    const ch = vnode.children
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }
```

4. `updateChildren`diff的实现着
   - 通过定义游标提高diff效率减少循环次数,按照以下顺序对比
   - 1. 老节点的开始下标和新节点的开始下标对比
   - 2. 老节点的尾节点和新节点的尾节点对比
   - 3. 老节点的开始节点和新节点的尾节点对比、
   - 4. 老节点的尾节点和新节点的开始对比

```js
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm
    
    const canMove = !removeOnly  // <transition-group>
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) { //游标不能越界，无论是老节点还是新节点有越界产生就可能存在新增、删除的可能
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] 
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]  // 调整游标
      } else if (sameVnode(oldStartVnode, newStartVnode)) {	// 开始下标对比
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx) // 递归处理
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { 
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) { // 新增所有老节点不存在的节点
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) { // 删除所有新节点不存在的节点
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
```

5. 通过以上算法,vue就算完成局部更新的工作了

## 3. key值的作用

> 在`diff`算法时,为了确定是否同一个节点,避免发生错误的匹配导致性能大减,需要用户提供`key`来提高匹配准确率

1. 在`diff`算法时确定是否为同一个节点需要调用`sameVnode`函数
   - 首先比对的就是`key`
   - 使用`v-for`时传入`key`会大大提高准确性,避免比对错误导致大量新建和移除工作

```js
function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

