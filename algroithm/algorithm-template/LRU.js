/**
 *  描述
 *  设计LRU(最近最少使用)缓存结构，该结构在构造时确定大小，假设大小为 k ，并有如下两个功能
 *  1. set(key, value)：将记录(key, value)插入该结构
 *  2. get(key)：返回key对应的value值
 * 
 *  提示:
 *  1.某个key的set或get操作一旦发生，认为这个key的记录成了最常使用的，然后都会刷新缓存。
 *  2.当缓存的大小超过k时，移除最不经常使用的记录。
 *  3.输入一个二维数组与k，二维数组每一维有2个或者3个数字，第1个数字为opt，第2，3个数字为key，value
 *  若opt=1，接下来两个整数key, value，表示set(key, value)
 *  若opt=2，接下来一个整数key，表示get(key)，若key未出现过或已被移除，则返回-1
 *  对于每个opt=2，输出一个答案
 *  4.为了方便区分缓存里key与value，下面说明的缓存里key用""号包裹
 * 
 *  要求：set和get操作复杂度均为O(1)
 */
/**
 * lru design
 * @param operators int整型二维数组 the ops
 * @param k int整型 the k
 * @return int整型一维数组
 */
function LRU (operators, k) {
  // 创建一个map存储所有的缓存
  const map = new Map();
  // 数组存储get方法获得的结果
  const result = [];
  // 遍历传入的操作
  for (let i = 0; i < operators.length; i++) {
    // set 操作
    if (operators[i][0] === 1) {
      // 当缓存中存在相应的数据时
      if (map.has(operators[i][1])) {
        // 因为需要更新数据, 且将数据放在最前面, 所以此时先将数据删除
        map.delete(operators[i][1]);
      } else {
        // 如果当前缓存中没有该数据的内容
        // 判断缓存是否已经存满了
        if (map.size === k) {
          // 进入逻辑分支则表示已经存满
          // 删除缓存中最后一个数据
          const iterator = map.entries();
          map.delete(iterator.next().value[0]);
        }
      }
      // set 最新的数据
      map.set(operators[i][1], operators[i][2]);
    } else {
      // get 操作
      // 判断缓存中是否存在当前数据
      if (map.has(operators[i][1])) {
        // 先将数据存储起来
        // 因为需要更新数据了, get操作使得该数据应该放在最前面, 所以先将数据删除, 然后再将数据存入, 达到刷新数据的目的
        let tmp = map.get(operators[i][1]);
        map.delete(operators[i][1]);
        map.set(operators[i][1], tmp);
        // 将获取到的数据结果放在数组里面
        result.push(tmp);
      } else {
        // 当前缓存中没有该数据, 则将 -1 存入
        result.push(-1);
      }
    }
  }
  return result;
}

module.exports = {
  LRU: LRU
};