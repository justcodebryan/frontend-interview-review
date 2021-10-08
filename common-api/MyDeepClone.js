function MyDeepClone(target) {
  return;
}

function MyShallowClone(target) {
  const res = {};

  Object.keys(target).forEach(key => {
    if (target.hasOwnProperty(key)) {
      res[key] = target[key];
    }
  });

  return res;
}
