const braces = function (s) {
  const len = s.length

  if (len % 2 !== 0) {
    return false
  }

  const stk = []

  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ])

  for (let ch of s) {
    if (pairs.has(ch)) {
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false
      }
      stk.pop()
    } else {
      stk.push(ch)
    }
  }

  return !stk.length
}
