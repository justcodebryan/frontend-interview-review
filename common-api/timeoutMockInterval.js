function timeoutMockInterval (cb, interval = 500) {
  function inside () {
    console.log(Date.now());
    cb();
    setTimeout(inside, interval);
  }
  setTimeout(inside, interval);
}

const func1 = () => {
  console.log(111);
};

timeoutMockInterval(func1, 200);