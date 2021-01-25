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

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.fulfilledFnQueue.forEach((cb) => cb(this.value));
      }
    }
  
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectedFnQueue.forEach((cb) => cb(this.reason));
      }
    }

    try {
      callback(resolve, reject);
    } catch (error) {
      this.reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : (v) => v;
    onRejected = isFunction(onRejected) ? onRejected : (r) => Error(r);

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
}

function isFunction(target) {
  return typeof target === "function";
}

console.log("===========TEST===========");
let p1 = new MyPromise((resolve, reject) => {
  resolve("resolved");
  console.log("constructor");
}).then(
  (res) => {
    console.log(res);
  }
);

console.log("===========REAL PROMISE============");
const p = new Promise((resolve, reject) => {
  resolve("resolved");
  console.log("constructor");
}).then((res) => {
  console.log(res);
});
console.log(p);
