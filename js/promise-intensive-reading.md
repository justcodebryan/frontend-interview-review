# 精读 Promise

定义: `Promise` 是一个对象，它代表了一个异步操作的最终完成或者失败。

**约定**

- 在本轮事件循环运行完成之前, 回调函数是不会被调用的
- 即使异步操作已经完成(成功或者失败), 在这之后通过 `then()` 添加的回调函数也会被调用
- 通过多次调用 `then()` 可以添加多个回调函数, 他们会按照插入顺序进行执行

`catch()` 实际上是简化版的 `then()` (即将成功那一部分的回调去掉的 `then()` 函数, `catch(failureCallback)` -> `then(null, failureCallback)`)

`then()` 函数会立即返回一个和原来不同的新的 `Promise`

在 `then()` 或者 `catch()` 中一定要有返回值, 不然, `callback` 将无法获取上一个 `Promise` 的结果

```javascript
new Promise((resolve, reject) => {
  console.log('初始化');
  resolve();
})
  .then(() => {
    throw new Error('有哪里不对了');

    console.log('执行[这个]');
  })
  .catch(() => {
    console.log('执行[那个]');
  })
  .then(() => {
    console.log('执行「这个」，无论前面发生了什么');
  });
```

当`Promise`被拒绝时, `rejectionhandled` 或者 `unhandledrejection` 两个事件之一会被派发到全局作用域中
`rejectionhandled` - 当 `Promise` 被拒绝, 并且在 `reject` 函数处理该`rejection`之后会派发此事件
`unhandledrejection` - 当 `Promise` 被拒绝, 但没有提供 `reject` 函数来处理该 `rejection` 时, 会派发此事件

```javascript
const applyAsync = (acc, val) => acc.then(val);
const composeAsync = (...funcs) => (x) =>
  funcs.reduce(applyAsync, Promise.resolve(x));
```

```javascript
async function foo() {
  return 1;
}
```

等价于

```javascript
function foo() {
  return Promise.resolve(1);
}
```

`async` 函数的函数体可以被看做由 0 个或者多个 `await` 表达式分割开来的
从第一行代码直到（并包括）第一个 `await` 表达式（如果有的话）都是同步运行的。这样的话，一个不含 `await` 表达式的 `async` 函数是会同步运行的。
然而，如果函数体内有一个 `await` 表达式，`async` 函数就一定会异步执行。

```javascript
async function foo() {
  await 1;
}
```

等价于

```javascript
function foo() {
  return Promise.resolve(1).then(() => undefined);
}
```

`return await promiseValue;` 与 `return promiseValue;`的比较
返回隐式的传递给`Promise.resolve` , 并不意味着 `return await promiseValue;` 和 `return promiseValue;`在功能上相同

```javascript
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  try {
    return await processDataInWorker(v); // 注意 `return await` 和单独 `return` 的比较
  } catch (e) {
    return null;
  }
}
```

简单地写上 `return processDataInworker(v);` 将导致在 `processDataInWorker(v)` 出错时 `function` 返回值为 `Promise` 而不是返回 `null`。`return foo;` 和 `return await foo;` ，有一些细微的差异: `return foo;` 不管 `foo` 是 `promise` 还是 `rejects` 都将会直接返回 `foo` 。相反地，如果 `foo` 是一个 `Promise` ，`return await foo;` 将等待 `foo` 执行 `(resolve)` 或拒绝 `(reject)` ，如果是拒绝，将会在返回前抛出异常。

出现异常的时候, 直接在 `async` 函数中 `return value;` 会返回一个 `Promise` 此时不能够捕获到错误, 如果是 `return await value;` 的话, 会等待这个函数执行完毕以后, 如果是 `reject` 的结果将会抛出错误并被外面的 `catch` 捕获
