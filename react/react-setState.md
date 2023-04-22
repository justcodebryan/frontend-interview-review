# setState 源码阅读

# 概念

fiber 节点：React 内部的一种数据结构，是为了解决 React 15 版本中栈调和带来的卡顿问题。通过 React Fiber 这种数据结构使得 React 的调度算法支持可中断渲染，当优先级不够的时候，将执行权还给渲染线程，当有空闲时机的时候再继续执行调和。

render 阶段、commit 阶段：render 阶段和 commit 阶段指的是 React 内部执行的两个阶段：React 内部采用了双缓存的设计，有两棵树。页面上展示的是 current 树、当发生更新时，内存中会去构建一颗 workInProgress 树。render 阶段的主要工作就是根据下一次的 JSX 对象去构建 workInProgress 树用于下一次渲染的展示，同时会收集 effectList 用于之后 commit 阶段的 DOM 操作。我们经常提起的 diff 算法，就是发生在这个阶段，diff 算法的本质上就是尽可能复用 current 树中的节点去构建 workInProgress 树。

在调用`this.setState`之后，`React`会自动重新调用`render`方法

```
this.setState // ReactComponent.js
this.updater.enqueueSetState  // ReactUpdateQueue.js
获取当前组件的pendingStateQueue, 并将新的state push进去 // ReactUpdateQueue.js
enqueueUpdate // ReactUpdates.js
if (当前不在一次batchUpdate的过程中)
  执行 batchingStreategy.batchUpdates 方法
else
  当前 component 存入 dirtyComponents 数组中

if (setState 方法存在 callback) // ReactComponent.js
  调用 this.updater.enqueueCallback 将 callback 存入队列中
```

# 数据结构

用到的数据结构: 最小堆

```javascript
// SchedulerMinHeap.js

type Heap = Array<Node>
type Node = {|
  id: number,
  sortIndex: number,
|}

// 添加堆的结点
export function push(heap: Heap, node: Node): void {
  const index = heap.length
  // 将添加的结点放在堆的最后
  heap.push(node)
  // 自底向下整理整个堆
  siftUp(heap, node, index)
}

// 获取堆顶的元素
export function peek(heap: Heap): Node | null {
  return heap.length === 0 ? null : heap[0]
}

export function pop(heap: Heap): Node | null {
  if (heap.length === 0) {
    return null
  }
  const first = heap[0]
  const last = heap.pop()
  if (last !== first) {
    // 将最后一个元素填到整个堆的顶部
    heap[0] = last
    // 自顶向下整理整个堆
    siftDown(heap, last, 0)
  }
  return first
}

/**
 * 最小堆的特性: 数组形式的二叉树
 *  当前结点小于左子树结点且小于右子树结点(最大堆反之)
 *  当前结点为: i
 *  左子树的结点应该为: 2 * i
 *  右子树的结点应该为: 2 * i + 1
 */
// 插入元素后开始自底向上整理整个堆
function siftUp(heap, node, i) {
  let index = i
  // 遍历整个堆, 使得堆顶的元素是最小的
  while (index > 0) {
    // 找到自己的父节点的index
    const parentIndex = (index - 1) >>> 1
    // 获取父节点
    const parent = heap[parentIndex]
    // 比较当前父节点和插入的元素
    if (compare(parent, node) > 0) {
      // 如果父节点比较大的话, diff或者a.id - b.id
      // 在此处diff = parent.sortIndex - node.sortIndex
      // 交换位置
      // 保持最小堆的父节点为最小
      // 遍历整棵树, 保证最小堆的特性
      // The parent is larger. Swap positions.
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    } else {
      // The parent is smaller. Exit.
      return
    }
  }
}

// 自顶向下整理堆的数据
function siftDown(heap, node, i) {
  let index = i
  // 整个堆的长度
  const length = heap.length
  // 通过计算就可以整理到最后一个结点了
  const halfLength = length >>> 1
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1
    const left = heap[leftIndex]
    const rightIndex = leftIndex + 1
    const right = heap[rightIndex]

    // If the left or right node is smaller, swap with the smaller of those.
    // 当左子树小于父节点时
    if (compare(left, node) < 0) {
      // 右子树最小的情况
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right
        heap[rightIndex] = node
        index = rightIndex
      } else {
        heap[index] = left
        heap[leftIndex] = node
        index = leftIndex
      }
      // 左子树大于父节点, 右子树小于父节点
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right
      heap[rightIndex] = node
      index = rightIndex
    } else {
      // Neither child is smaller. Exit.
      return
    }
  }
}

// 比较
// 如果相同的index, 则比较task的id
function compare(a, b) {
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex
  return diff !== 0 ? diff : a.id - b.id
}
```
