# setState 源码阅读

用到的数据结构: 最小堆

```javascript
// SchedulerMinHeap.js

type Heap = Array<Node>;
type Node = {|
  id: number,
  sortIndex: number,
|};

// 添加堆的结点
export function push(heap: Heap, node: Node): void {
  const index = heap.length;
  // 将添加的结点放在堆的最后
  heap.push(node);
  // 自底向下整理整个堆
  siftUp(heap, node, index);
}

// 获取堆顶的元素
export function peek(heap: Heap): Node | null {
  return heap.length === 0 ? null : heap[0];
}

export function pop(heap: Heap): Node | null {
  if (heap.length === 0) {
    return null;
  }
  const first = heap[0];
  const last = heap.pop();
  if (last !== first) {
    // 将最后一个元素填到整个堆的顶部
    heap[0] = last;
    // 自顶向下整理整个堆
    siftDown(heap, last, 0);
  }
  return first;
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
  let index = i;
  // 遍历整个堆, 使得堆顶的元素是最小的
  while (index > 0) {
    // 找到自己的父节点的index
    const parentIndex = (index - 1) >>> 1;
    // 获取父节点
    const parent = heap[parentIndex];
    // 比较当前父节点和插入的元素
    if (compare(parent, node) > 0) {
      // 如果父节点比较大的话, diff或者a.id - b.id
      // 在此处diff = parent.sortIndex - node.sortIndex
      // 交换位置
      // 保持最小堆的父节点为最小
      // 遍历整棵树, 保证最小堆的特性
      // The parent is larger. Swap positions.
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // The parent is smaller. Exit.
      return;
    }
  }
}

// 自顶向下整理堆的数据
function siftDown(heap, node, i) {
  let index = i;
  // 整个堆的长度
  const length = heap.length;
  // 通过计算就可以整理到最后一个结点了
  const halfLength = length >>> 1;
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];
    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    // If the left or right node is smaller, swap with the smaller of those.
    // 当左子树小于父节点时
    if (compare(left, node) < 0) {
      // 右子树最小的情况
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
      // 左子树大于父节点, 右子树小于父节点
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // Neither child is smaller. Exit.
      return;
    }
  }
}

// 比较
// 如果相同的index, 则比较task的id
function compare(a, b) {
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}
```
