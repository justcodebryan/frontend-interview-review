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

/**
 * 组合继承
 * 优点:
 *  1. 融合原型链继承和构造函数的优点, 是JavaScript中最常用的继承模式
 */
(function () {
  console.log('----------Herit Via Composition---------');

  function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }

  Parent.prototype.getName = function () {
    console.log(this.name);
  };

  function Child(name, age) {
    Parent.call(this, name);

    this.age = age;
  }

  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  const child1 = new Child('Kevin', 18);

  child1.colors.push('white');

  console.log(child1.name);
  console.log(child1.age);
  console.log(child1.colors);

  const child2 = new Child('Daisy', 20);

  console.log(child2.name);
  console.log(child2.age);
  console.log(child2.colors);
})();

/**
 * 原型式继承
 */
(function () {
  console.log('----------Herit Via Prototype Factory---------');

  function createObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
  }

  const person = {
    name: 'Kevin',
    friends: ['Daisy', 'Kelly']
  };

  const person1 = createObj(person);
  const person2 = createObj(person);

  // 在person1对象上面添加了name属性, 没有改变原型链上面的name属性
  person1.name = 'person1';
  console.log(person2.name);

  person1.friends.push('Taylor');
  console.log(person2.friends);
})();

/**
 * 寄生式继承
 */
(function () {
  console.log('----------Herit Via Parasitic inheritance---------');
  
  function createObj(o) {
    const clone = Object.create(o);

    clone.sayName = function () {
      console.log('hi');
    };

    return clone;
  }
})();

/**
 * 寄生组合式继承
 */
(function () {
  console.log('----------Herit Via Parasitic combinatorial inheritance---------');

  function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }

  Parent.prototype.getName = function () {
    console.log(this.name);
  };

  function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
  }

  const F = function () { };

  F.prototype = Parent.prototype;

  Child.prototype = new F();

  const child1 = new Child('Kevin', 18);

  console.log(child1);
})();

/**
 * ES6 class语法糖继承
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