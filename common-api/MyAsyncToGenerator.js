/**
 * async/await 手动实现
 *  - 因为async/await被编译成generator函数, 而generator函数在babel里面会被转译成
 *    ['next', 'throw', 'return'].forEach(function(method) {
 *      prototype[method] = function(arg) {
 *        return this._invoke(method, arg);
 *      }
 *    })
 *  - 在polyfill里面的实现返回的数据结构是
 *    { value: any, done: 'next' | 'throw' | 'done' }
 *  - 当done的值为'next'时, 说明自执行函数还未完成, 返回新的Promise.resolve
 *  - 当done的值为'throw时''
 * @param {*} generatorFunc 
 * @returns 
 */
function MyAsyncToGenerator(generatorFunc) {
  return function (...args) {
    const gen = generatorFunc.apply(this, args);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        let genRes;
        try {
          genRes = gen[key](arg);
        } catch (err) {
          return reject(err);
        }
        const { value, done } = genRes;
        if (done) {
          return resolve(value);
        }
        return Promise.resolve(value).then(
          (val) => {
            step('next', val);
          },
          (err) => {
            step('throw', err);
          }
        );
      }

      step('next');
    });
  }
}