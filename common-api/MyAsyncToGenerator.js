function MyAsyncToGenerator(generatorFunc) {
  return function () {
    const generatorRes = generatorFunc.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(action) {
        
      }

      step('next');
    });
  }
}