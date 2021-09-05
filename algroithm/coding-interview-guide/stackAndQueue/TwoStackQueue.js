/**
 * 两个栈组成队列
 * 
 * 维护两个栈: stackPush和stackPop
 * stackPush对外只接收元素
 * stackPop对外只拿出元素
 * 利用栈先进后出的特性
 * 先把stackPush里面的数据倒进stackPop里面, 这样就逆序所有数据的顺序
 * 再从stackPop里面拿 
 */
function TwoStackQueue() {
  this.stackPush = [];
  this.stackPop = [];
}

// 将所有的stackPush里的元素倒进stackPop里面
// 中间没有任何停顿, 防止插入任何元素
TwoStackQueue.prototype.pushToPop = function () {
  if (this.stackPop.length === 0) {
    while (this.stackPush.length) {
      this.stackPop.push(this.stackPush.pop());
    }
  }
};

// 先将元素放在stackPush栈里面
// 然后再将所有的stackPush中的元素倒入stackPop中
TwoStackQueue.prototype.add = function (pushInt) {
  this.stackPush.push(pushInt);
  this.pushToPop();
};

// 先将stackPush里面的元素清空
// 再取出stackPop里面的元素
// 
TwoStackQueue.prototype.poll = function () {
  if (this.stackPush.length === 0 && this.stackPop.length === 0) {
    throw new Error();
  }

  this.pushToPop();
  return this.stackPop.pop();
};

// 先将stackPush里面的元素清空
// 然后在取出stackPop里面的元素
// peek是取最下面那个元素, 所以用unshift模拟
TwoStackQueue.prototype.peek = function () {
  if (this.stackPush.length === 0 && this.stackPop.length === 0) {
    throw new Error();
  }

  this.pushToPop();
  return this.stackPop.unshift();
};
