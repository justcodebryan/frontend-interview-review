/**
 * const nextF = {
 *  done: false,
 *  value 
 * }
 * @param {*} genF 
 */
function MySpawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch (err) {
        return reject(err);
      }

      if (next.done) {
        return resolve(next.value);
      }

      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          })
        },
        function (r) {
          step(function () {
            return gen.throw(r);
          })
        }
      )
    }

    step(function () {
      return gen.next(undefined);
    })
  })
}