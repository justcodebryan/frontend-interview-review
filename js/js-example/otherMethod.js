var arr1 = ["孙悟空", "猪八戒", "沙和尚"];
var arr2 = ["白骨精", "玉兔精", "蜘蛛精"];
var arr3 = ["二郎神", "太上老君", "玉皇大帝"];

var result = arr1.concat(arr1, arr3, "牛魔王", "铁扇公主");
// 返回的是字符串
var result1 = arr1.join();
console.log(result);
console.log(result1);

arr = [5, 3, 2, 1, 3, 4, 7, 4, 3, 9, 0];
arr.sort(function (a, b) {
    // if (a > b) {
    //     return 1;
    // } else if (a < b) {
    //     return -1;
    // } else {
    //     return 0;
    // }
    return a - b;
});

console.log(arr);