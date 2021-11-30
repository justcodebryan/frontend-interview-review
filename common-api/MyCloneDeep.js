/**
 * 深拷贝 简单实现
 *  - 利用递归调用拷贝对象中属性值
 *  - 其中的对象需要自身调用自身进行下一层的拷贝
 *  - 如果使用JSON.parse(JSON.stringify(obj))进行深拷贝, 
 *    正则表达式, 日期对象, 函数, undefined & null
 *    都会被忽略, 所以采用这个递归调用的方式进行拷贝
 *  - 利用map的属性, 使得方法能够拷贝两个循环引用的对象
 * 
 * @param {*} obj 
 * @param {*} cache 
 * @returns 
 */
function MyCloneDeep (obj, cache = new WeakMap()) {
  // Basic Type
  if (typeof obj !== 'object') return obj;
  // cached obj -> avoid circular reference
  if (cache.get(obj)) return cache.get(obj);
  // Date Type
  if (obj instanceof Date) return new Date(obj);
  // RegExp Type
  if (obj instanceof RegExp) return new RegExp(obj);

  const cloneObj = new obj.constructor();
  cache.set(obj, cloneObj);
  Object.keys(obj).forEach(key => {
    if (target.hasOwnProperty(key)) {
      cloneObj[key] = MyCloneDeep(obj[key], cache);
    }
  });

  return cloneObj;
}

function MyCloneShallow (target) {
  const res = {};

  Object.keys(target).forEach(key => {
    if (target.hasOwnProperty(key)) {
      res[key] = target[key];
    }
  });

  return res;
}
