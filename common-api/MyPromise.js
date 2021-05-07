// MyPromise
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(callback) {
    this.status = PENDING;
    this.fulfilledFnQueue = [];
    this.rejectedFnQueue = [];
    this.value = undefined;
    this.reason = undefined;

    try {
      callback(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.fulfilledFnQueue.forEach((cb) => cb());
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.rejectedFnQueue.forEach((cb) => cb());
    }
  };

  then = (onFulfilled, onRejected) => {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : (v) => v;
    onRejected = isFunction(onRejected) ? onRejected : (r) => throw Error(r);

    if (this.status === PENDING) {
      this.fulfilledFnQueue.push(onFulfilled);
      this.rejectedFnQueue.push(onRejected);
    }

    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
  
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(iterableObj) {
    if (!Array.isArray(iterableObj)) {
      const type = typeof iterableObj;
      console.log(`TypeError: Type ${type} is not an iterable object`);
      return;
    }

    return new MyPromise((resolve, reject) => {
      const resArr = [];
      let orderIndex = 0;
      const len = iterableObj.length;

      const checkList = (res, index) => {
        resArr[index] = res;

        if (++orderIndex === len) {
          resolve(resArr);
        }
      };

      for (let i = 0; i < len; i++) {
        const obj = iterableObj[i];
        if (obj && typeof obj.then === 'function') {
          obj.then((res) => {
            checkList(res, i);
          }, reject);
        } else {
          checkList(obj, i);
        }
      }
    });
  }

  static race(iterableObj) {
    if (!Array.isArray(iterableObj)) {
      const type = typeof iterableObj;
      console.log(`TypeError: Type ${type} is not an iterable object`);
      return;
    }

    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        const obj = iterableObj[i];
        if (obj && typeof obj.then === 'function') {
          obj.then(resolve, reject);
        } else {
          resolve(obj);
        }
      }
    });
  }
}

function isFunction(target) {
  return typeof target === "function";
}

console.log("===========TEST===========");
let p1 = new MyPromise((resolve, reject) => {
  resolve("resolved");
  console.log("constructor");
}).then((res) => {
  console.log(res);
});

console.log("===========REAL PROMISE===========");
const p = new Promise((resolve, reject) => {
  resolve("resolved");
  console.log("constructor");
}).then((res) => {
  console.log(res);
});
console.log(p);
