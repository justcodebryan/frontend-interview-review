new Promise((resolve, reject) => {
  resolve(1);
  Promise.resolve().then(() => console.log(2));
  console.log(3);
}).then((num) => {
  console.log(num);
});

console.log(4);

const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promises)) {
      return resolve(promises);
    }

    const len = promises.length;
    const result = [];
    let count = 0;

    for (let i = 0; i < len; i++) {
      promises[i].then((res) => {
        count += 1;
        result[i] = res;

        if (count === len) {
          resolve(result);
        }
      }, (err) => {
        reject(err);
      });
    }
  });
}


