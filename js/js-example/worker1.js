function fib(n){
    return n <= 2 ? 1 : fib(n - 1) + fib(n - 2);
}

var onmessage = function (event) {
    var number = event.data;
    console.log('分线程接收主线程发送的数据：' + number);
    var result = fib(number);
    postMessage(result);
    console.log('分线程向主线程返回数据：' + number);
    // alert(result) alert是window的方法，在分线程中不能调用
    // 分线程中全局对象不再是window，所以在分线程中不可能更新界面
};