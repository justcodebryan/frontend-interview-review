/**
 * 原型链继承
 * 缺点: 
 *  1. 引用类型的属性被所有实例共享
 *  2. 在创建 Child 的实例时，不能向Parent传参
 */
(function () {
  console.log('--------Herit Via Prototype----------');

  function Parent() {
    this.name = 'Kevin';
  }

  Parent.prototype.getName = function () {
    console.log(this.name);
  };

  function Child() {

  }

  Child.prototype = new Parent();

  const child = new Child();
  child.getName();
})();

/**
 * 
 */
(function () {
  console.log('----------Herit Via ES6 Class----------');

  class Parent {
    constructor() {
      this.name = 'Kevin';
    }

    getName() {
      console.log(this.name);
    }
  }

  class Child extends Parent {
    constructor() {
      super();
    }
  }

  const child = new Child();
  child.getName();
})();

/**
 * 借用构造函数(经典继承)
 * 优点:
 *  1. 避免了引用类型的属性被所有实例共享
 *  2. 可以在 Child 中向 Parent 传参
 * 缺点:
 *  方法都在构造函数中定义，每次创建实例都会创建一遍方法
 */
(function () {
  console.log('----------Herit Via Contrustor call---------');

  function Parent() {
    this.name = 'Kevin';
  }

  Parent.prototype.getName = function () {
    console.log(this.name);
  };

  function Child() {
    Parent.call(this);
  }

  Child.prototype = new Parent();

  const child = new Child();
  child.getName();
})();
