const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Input must be an array.')
    }

    const result = []
    let count = 0
    const len = promises.length
    if (len === 0 || len === undefined) {
      return resolve(result)
    }

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          count += 1
          result[idx] = res
          if (count === len) {
            return resolve(result)
          }
        })
        .catch(reject)
    })
  })
}

const promiseAny = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Input must be an array.')
    }

    const result = []
    let count = 0
    const len = promises.length

    if (len === 0 || len === undefined) {
      return resolve(result)
    }

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          count += 1
          result[i] = err
          if (count === len) {
            return reject('All promises failed')
          }
        })
    })
  })
}

const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Input must be an array.')
    }

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  })
}

const promiseAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Input must be an array.')
    }

    const result = []
    let count = 0
    const len = promises.length
    if (len === 0 || len === undefined) {
      return resolve(result)
    }

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          count += 1
          result[idx] = {
            value: res,
            status: 'FULFILLED',
          }
          if (count === len) {
            return resolve(result)
          }
        })
        .catch((err) => {
          count += 1
          result[idx] = {
            value: err,
            status: 'REJECTED',
          }
          if (count === len) {
            return resolve(result)
          }
        })
    })
  })
}
