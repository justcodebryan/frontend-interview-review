function MyCall(thisArgs) {
  // node环境下用globalThis
  let context = thisArgs || window;
  context.fn = this;

  let args = [].slice.call(arguments, 1);
  context.fn(...args);

  delete context.fn;
}

function add(x, y) {
  return x + y;
}

Function.prototype.MyCall = MyCall;


console.log('=======TEST=======');
console.log('---------使用 call 方法调用父构造函数----------');
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.MyCall(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"

console.log('-------使用 call 方法调用匿名函数-------');
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log('#' + i + ' ' + this.species
        + ': ' + this.name);
    };
    this.print();
  }).MyCall(animals[i], i);
}


console.log('-------使用 call 方法调用函数并且指定上下文的this-------');
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.MyCall(obj);  // cats typically sleep between 12 and 16 hours

console.log('-------使用 call 方法调用函数并且不指定第一个参数（argument）-------');
'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.MyCall(); // Cannot read the property of 'sData' of undefined