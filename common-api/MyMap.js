function MyMap(fn, thisValue) {
  const res = [];
  thisValue = thisValue || [];
  let arr = this;
  for (let i in arr) {
    res.push(fn(arr[i]));
  }
  return res;
}