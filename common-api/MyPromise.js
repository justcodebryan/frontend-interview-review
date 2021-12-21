const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const isPromise = (target) => {
  return target instanceof MyPromise;
};

/**
 * 
 * @param {*} promise2 链式调用生成的第二个promise
 * @param {*} x 当前需要处理的promise或者对象
 * @param {*} resolve 当promise被resolve的时候调用的函数
 * @param {*} reject 当promise被reject的时候调用的函数
 * @returns 
 */
// 处理Promise的过程
const resolvePromise = (promise2, x, resolve, reject) => {
  // 当x和promise2是同一个对象的时候
  // 抛出TypeError
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  // 确保当前的promise只被调用一次
  // 维护一个变量去判断当前的函数是否被调用
  let called = false;
  // 判断当前需要进行处理的参数是否是一个对象或者函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      // 首先将x.then存起来
      // 确保对象的then被改变的时候还能拿到最开始的那个then属性
      let then = x.then;
      // 如果then是一个函数的话
      // 在x的context下进行调用
      if (typeof then === 'function') {
        // then是一个双参函数
        // 第一个参数是resolve, 第二个参数是reject
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;

            // 此处因为可能返回依旧是一个promise
            // 递归调用
            // 直到最后得到结果
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;

            reject(r);
          }
        );
      } else {
        // 在取x中的then属性的时候报错了
        // 此时无论结果, 直接进行resolve
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;

      reject(e);
    }
  } else {
    // 如果当前元素不是对象直接resolve出去
    resolve(x);
  }
};

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.resolvedCallbacks.forEach((cb) => cb());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.rejectedCallbacks.forEach((cb) => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === 'function'
      ? onRejected
      : (r) => {
        throw r;
      };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.resolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  // static all(arr) {
  //   if (!Array.isArray(arr)) return Promise.resolve();

  //   const result = [];
  //   const len = arr.length;
  //   for (let i = 0; i < len; i++) {
  //     if (!isPromise(arr[i])) {
  //       result.push(arr[i]);
  //     } else {
  //       arr[i].then(
  //         res => {
  //           result.push(res);

  //           if (result.length === len) {
  //             resolve(result);
  //           }
  //         }, err => {
  //           reject(err);
  //         }
  //       );
  //     }
  //   }
  // }

  static resolve(value) {
    if (value && typeof value === 'object' && (value instanceof MyPromise)) {
      return value;
    }

    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((_, reject) => {
      reject(value);
    });
  }

  static all(value) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const result = [];
      const len = value.length;

      if (len === 0 || len === undefined) {
        return resolve(result);
      }

      for (let i = 0; i < len; i++) {
        MyPromise.resolve(value[i])
          .then((res) => {
            count += 1;
            result[i] = res;
            if (count === len) {
              resolve(result);
            }
          })
          .catch(reject);
      }
    });
  }

  static allSettled(value) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const len = value.length;
      const result = [];

      if (len === 0) {
        return resolve(res);
      }

      for(let i = 0; i < len; i++) {
        MyPromise.resolve(value[i])
          .then((res) => {
            count += 1;
            result[i] = {
              status: FULFILLED,
              value: res
            };

            if (count === len) {
              resolve(res);
            }
          })
          .catch((err) => {
            count += 1;
            result[i] = {
              status: REJECTED,
              reason: err
            };

            if (count === len) {
              resolve(res);
            }
          });
      }
    });
  }

  static race(value) {
    return new MyPromise((resolve, reject) => {
      const len = value.length;
      for (let i = 0; i < len; i++) {
        MyPromise.resolve(value[i]).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }

  static any(value) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const len = value.length;
      const result = [];
      for (let i = 0; i < len; i++) {
        MyPromise.resolve(value[i]).then((res) => {
          resolve(res);
        }).catch((err) => {
          count += 1;
          result[i] = err;
          if (count === len) {
            reject('All promises were rejected');
          }
        });
      }
    });
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
