const MinStack = function () {
  this.stackData = [];
  this.stackMin = [Infinity];
};

MinStack.prototype.push = function (x) {
  this.stackData.push(x);
  this.stackMin.push(Math.min(this.stackMin[this.stackMin.length - 1], x));
};

MinStack.prototype.pop = function () {
  this.stackData.pop();
  this.stackMin.pop();
};

MinStack.prototype.top = function () {
  return this.stackData[this.stackData.length - 1];
};

MinStack.prototype.getMin = function () {
  if (this.stackMin.length === 0) {
    throw new Error('Stack is Empty');
  }

  return this.stackMin[this.stackMin.length - 1];
};
