function fib(n){
    return n <= 2 ? 1 : fib(n - 1) + fib(n - 2);
}

var onmessage = function (event) {
    var number = event.data;
    console.log('分线程接收主线程发送的数据：' + number);
    var result = fib(number);
    postMessage(result);
    console.log('分线程向主线程返回数据：' + number);
};