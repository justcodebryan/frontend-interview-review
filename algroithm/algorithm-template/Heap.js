/**
 * 默认最大堆
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
const defaultComparator = (x, y) => x > y;

/**
 * 数组中交换元素
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 * @returns 
 */
const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

/**
 * 数据结构: 堆
 * 
 * 优先队列使用的是堆的数据结构, 堆是二叉树的数组形式
 * 其中具有以下规律:
 *  假设当前结点的索引值为idx
 *  父节点索引为: parentIdx = (idx - 1) >> 1 
 *  左子结点的索引为: leftIdx = idx * 2 + 1
 *  右子结点的索引为: rightIdx = idx * 2 + 2
 * 
 */
class Heap {
  /**
   * 传入比较器
   * 默认比较器生成最大堆
   * 
   * @param {*} comparator 
   */
  constructor(comparator = defaultComparator) {
    this.container = [];
    this.comparator = comparator;
  }

  /**
   * 插入一个新的数据, 需要从底部冒泡到堆的顶部
   * 默认为最大堆, 那么当父节点的值小于子节点值时, 交换父子结点的值, 
   * 然后继续向上冒泡, 找到父节点, 直至整个堆的数据整理完毕, 即在最大堆中父节点的值大于子节点的值
   * 
   * @param {*} data 
   * @returns 
   */
  insert(data) {
    const { container, comparator } = this;

    container.push(data);

    // 当idx还未等于0时, 说明还没冒泡到堆顶, 继续进行循环
    // 从刚插入的元素, 即最后一个元素(堆底)开始进行冒泡
    let idx = this.size() - 1;
    while (idx) {
      let parentIdx = (idx - 1) >> 1;

      // 比较当前元素和父元素的大小
      // 如果当前元素比父元素小, 说明当前元素和父元素符合当前堆的结构
      if (!comparator(container[idx], container[parentIdx])) {
        return;
      }

      // 不符合条件则交换
      swap(arr, idx, parentIdx);

      // 交换完了以后, 往上找父元素的idx, 重新拿到当前元素的idx
      idx = parentIdx;
    }
  }

  /**
   * 弹出堆顶的元素并且返回该元素
   * 最大堆则为当前最大元素, 最小堆则为当前最小元素
   * 弹出堆顶元素以后, 堆的结构就被破坏了, 需要重新进行整理
   * 
   * 
   * @returns 
   */
  pop() {
    const { container, comparator } = this;

    // 当前堆内无任何元素
    if (!this.size()) {
      return null;
    }

    // 堆内有元素
    // 交换第一个和最后一个
    swap(container, 0, this.size() - 1);

    // 弹出最后一个元素
    // 保存最后一个元素
    const res = container.pop();

    const len = this.size();
    let idx = 0,
      exchange = idx * 2 + 1;

    // 从上往下整理
    while (exchange < len) {
      let right = idx * 2 + 2;

      if (right < len && comparator(container[right], container[exchange])) {
        exchange = right;
      }

      if (!comparator(container[exchange], container[idx])) {
        break;
      }

      swap(container, exchange, idx);

      idx = exchange;
      exchange = idx * 2 + 1;
    }

    // 整理完成之后再将结果返回
    return res;
  }

  /**
   * 获取堆的大小
   * 
   * @returns 
   */
  size() {
    return this.container.length;
  }

  /**
   * 获取堆顶元素
   * 
   * @returns 
   */
  peek() {
    // 如果是最小堆的话, 获取堆顶元素就是最小值
    // 如果是最大堆的话, 获取堆顶元素就是最大值
    if (this.size()) return this.container[0];
    return null;
  }
}