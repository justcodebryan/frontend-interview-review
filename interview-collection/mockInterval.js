function mockRequest () {
  return new Promise((resolve) => {
    globalThis.setTimeout(() => {
      console.log(Date.now());
      resolve();
    }, Math.ceil(Math.random() * 10000));
  });
}

function mockInterval (func, interval) {
  return Promise.all([func().catch(() => void 0), new Promise(resolve => setTimeout(resolve, interval))]).then(() => mockInterval(func, interval));
}

mockInterval(mockRequest, 3000);