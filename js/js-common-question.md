数据类型

1. 基本数据类型
   - String
   - Number
   - Boolean
   - Undefined
   - Null
2. 引用数据类型
   - Object
   - Function
   - Array

数据类型的判断

1. typeof
   - 可以判断 undefined/数值/字符串/布尔值/function
   - 不能判断: null 与 object, object 与 array
2. instanceof
   - 只能判断对象的具体类型
3. ===
   - 可以判断 undefined/null

其他问题

1. `undefined`与`null`的区别

- `undefined`代表定义了但是未赋值
- `null`代表定义了且赋值为`null`

2. 什么时候需要赋值`null`?

初始赋值为`null`, 表明将要赋值为对象

最后赋值为`null`, 让对象成为垃圾对象(被垃圾回收器回收)

3. 严格区分变量类型与数据类型

- 数据类型
  - 基本类型
  - 对象类型
- 变量类型(变量内存值的类型)
  - 基本类型: 保存的就是基本类型的数据
  - 引用类型: 保存的是内存地址

# 数据/变量/内存

1. 什么是数据

   - 存储在内存中代表特定信息的内容
   - 数据的特点: 可传递, 可运算
   - 一切皆数据
   - 内存中所有操作的目标: 数据
     - 算数运算
     - 逻辑运算
     - 赋值
     - 运算函数

2. 什么是内存

   - 内存条通电以后产生的可存储数据的空间(临时的)

   - 内存的产生和死亡: 内存条(电路板)-通电-产生内存空间-存储数据-处理数据-断电-内存空间和数据都消失
   - 一块小内存中的 2 个数据: 内部存储数据以及地址值
   - 内存分类
     - 栈内存: 全局变量/局部变量
     - 堆内存: 对象

3. 什么是变量

   - 可变化的量, 由变量名和变量值组成
   - 每个变量都对应一小块内存, 变量名用来查找对象的内存, 变量值就是内存中保存的数据

4. 三者的关系
   - 内存用来存储数据的空间
   - 变量是内存的标识

## 赋值与内存的关系

var a = xxx;

赋值的数据:

- xxx 是基本数据, 保存就是这个数据
- xxx 是对象, 保存的就是对象的数据类型
- xxx 是一个变量, 保存的 xxx 的内存内容(可能是基本数据, 也可能是地址值)

n 个引用变量指向同一个对象 - 其中一个对象进行修改, 其他的对象读取值也会改变

2 个引用变量指向了同一个对象, 其中一个引用变量指向另外一个对象, 另一个引用变量依旧指向原对象

在 JS 调用函数时传递变量参数时, 是值传递还是引用传递?

1. 都是值传递(基本值/地址值)
2. 可能是值传递, 也可能是引用传递(地址值)

```JavaScript
var a = 3;
function fn(a){
    a = a + 1;
}

fn(a);
console.log(a); // a = 3
```

JS 引擎如何管理内存?

1. 内存生命周期

   - 分配小内存空间, 得到它的使用权
   - 存储数据, 可以反复进行操作
   - 释放小内存空间

   ```javascript
   function fn() {
     var b = {};
   }
   fn(); // b是自动释放的, b所指向的对象是在后面某个时刻由垃圾回收器回收
   ```

2. 释放内存

   - 局部变量: 函数执行完自动释放
   - 对象: 成为垃圾对象 => 垃圾回收器回收

# 对象

1. 什么是对象?
   - 多个数据的封装体
   - 用来保存多个数据的容器
   - 一个对象代表现实世界中的一个事物
2. 为什么要用对象?

   - 统一管理多个数据

3. 对象的组成

   - 属性: 属性名(字符串)和属性值(任意)组成的
   - 方法: 一种特别的属性(属性值是函数)

4. 如何访问对象内部数据

   - 对象名.属性名: 编码简单, 有时不能使用

   - 对象名['属性名']: 编码复杂, 通用

     - 什么时候必须使用['属性名']的方式?

       1. 属性名包含特殊字符: - 空格
       2. 属性名不确定

       ```JavaScript
       var p = {};
       p['content-type'] = 'text/json';
       console.log(p['content-type']);

       var propName = 'myAge';
       var value = 19;
       p[propName] = value;
       console.log(p[propName]);
       ```

# 函数

1. 什么是函数?

   - 实现特定功能的 n 条语句的封装体
   - 只有函数是可以执行的, 其他类型的数据不能执行

2. 为什么要用函数?

   - 提高代码复用
   - 便于阅读交流

3. 如何定义函数?

   - 函数声明

     ```JavaScript
     function fn1(){
         console.log('fn()');
     }
     ```

   - 表达式

     ```JavaScript
     var fn2 = function(){
         console.log('fn2()');
     }
     ```

4. 如何执行(调用)函数?

   - test(): 直接调用

   - obj.test(): 通过对象调用

   - new Test(): new 调用

   - test.call/apply(obj): 相当于 obj.test(), 临时让 test 方法成为 obj 的方法调用

     ```JavaScript
     var obj = {};
     function test2(){
         this.xxx = 'asdeca';
     }
     test2.call(obj)
     console.log(obj.xxx); // asdeca
     ```

## 回调函数

1. 什么函数才是回调函数?

   - 你定义的
   - 没有调用
   - 但是最终执行了

2. 常见的回调函数

   - DOM 事件回调函数
   - 定时器回调函数

   ```JavaScript
   document.getElementById('btn').onclick = function(){
       // DOM事件回调函数
       alert(this.innerHTML);
   };
   setTimeout(function(){
       alert('到点了');
   }, 3000);
   ```

   - ajax 请求回调函数
   - 生命周期回调函数

## IIFE(立即执行函数表达式)

Immediately-Invoked Function Expression

匿名函数自调用

```JavaScript
(function(){
    var a = 3;
    console.log(a + 3);
})();
var a = 4;
console.log(a);

(function(){
    var a = 1;
    function test(){
        console.log(++a);
    }
    window.$ = function(){// 向外暴露一个全局函数
        return{
            test: test;
        }
    }
})();
$().test();// 1. $是一个函数, 2. $执行后返回的是一个对象
```

作用:

- 隐藏实现
- 不会污染外部(全局)命名空间
- 用他来编写 JS 模块

## this 关键字

```JavaScript
function Person(color){
    console.log(this);
    this.color = color;
    this.getColor = function(){
        console.log(this);
        return this.color;
    };
    this.setColor = function(color){
        console.log(this);
        this.color = color;
    };
}
Person("red");	// window

var p = new Person("yellow");// p

p.getColor(); // p

var obj = {};
p.setColor.call(obj, "black");// obj

var test = p.setColor;
test(); // window

function fun1(){
    function fun2(){
        console.log(this);
    }
    fun2(); // window
}

fun1();
```

this 是什么?

- 任何函数本质上都是通过某个对象来调用的, 如果没有指定就是 window

- 所有函数内部都一个变量 this
- 它的值是调用函数的当前对象

如何确定 this 的值?

- test(): window
- p.test(): p
- new Test(): 新建对象
- p.call(obj): obj

不加分号有问题的情况:

- 小括号开头的前一条语句
- 中括号靠头的前一条语句

# 原型 prototype

函数的 prototype 属性

- 每个函数都有`prototype`属性, 它默认指向一个`Object`空对象(即称为: 原型对象)

- 原型对象中有一个属性`constructor`, 指向函数对象

给原型对象添加属性(一般都是添加方法)

作用: 函数的所有实例对象自动拥有原型中的属性(方法)

显式原型和隐式原型

1. 每个函数`function`都有一个`prototype`, 即显式原型(属性)
2. 每个实例对象都有一个`__proto__`, 可称为隐式原型(属性)
3. 对象的隐式原型的值为其对应构造函数的显示原型的值
4. 内存结构
5. 总结:
   - 函数的`prototype`属性: 在定义函数时自动添加的, 默认是一个空`Object`对象(Object 不满足)
   - 对象的`__proto__`属性: 在创建对象时自动添加的, 默认值为构造函数的`prototype`属性值
   - 程序员能直接操作显式原型, 但不能直接操作隐式原型(ES6 之前)

```JavaScript
function Fn(){

}
console.log(Fn.prototype);
var fn = new Fn();
console.log(fn.__proto__);
console.log(Fn.prototype === fn.__proto__); // true
```

![原型](/Users/huangjifan/Documents/编程学习/JavaScript/img/原型.png)

原型链

```JavaScript
function Fn(){
    this.test1 = function(){
        console.log('test1()');
    }
}
Fn.prototype.test2 = function(){
    console.log('test2()');
};

var fn = new Fn()
fn.test1();
fn.test2();

console.log(fn.toString());
fn.test3();
```

当访问一个对象的属性时,

- 现在自身属性中查找, 找到返回
- 如果没有, 再沿着`__proto__`这条链向上查找, 找到返回
- 如果最终没有找到, 返回`undefined`

别名: 隐式原型链

作用查找对象的属性(方法)

![原型链](/Users/huangjifan/Documents/编程学习/JavaScript/img/原型链.png)

构造函数/原型/实体对象的关系

1. 函数的显式原型指向的对象默认是空 Object 实例对象(但是 Object 不满足)
2. 所有函数都是 Function 的实例(包括 Function)
3. Object 的原型对象是原型链的尽头

```JavaScript
function Fn(){
    this.test1 = function(){
        console.log('test1()');
    }
}

console.log(Fn.prototype instanceof Object); // true
console.log(Object.prototype instanceof Object); // false
console.log(Function.prototype instanceof Object); // true

console.log(Function.__proto__ === Function.prototype); // true

console.log(Object.prototype.__proto__); // null
```

添加属性的时候, 不会在原型链上操作

查找属性的时候在原型链上查找

## instanceof

`instanceof`如何判断的?

表达式: `A instanceof B`

如果 B 函数的显式原型对象在 A 对象的原型链上, 返回`true`, 反之, 返回`false`

```JavaScript
function A(){

}
A.prototype.n = 1;
var b = new A();

A.prototype = {
    n: 2,
    m: 3
}

var c = new A();
console.log(b.n, b.m, c.n, c.m); // 1 undefined 2 3

```

```JavaScript
var F = function(){

}

Object.prototype.a = function(){
        console.log('a()');
}
Function.prototype.b = function(){
    console.log('b()');
}

var f = new F();
f.a(); // a()
f.b(); // undefined
F.a(); // a()
F.b(); // b()
```

# 变量声明提升与函数提升

变量声明提升

- 通过 var 定义(声明)的变量, 在定义语句之前就可以访问到
- 值: undefined

函数声明提升

- 通过 function 声明的函数, 在之前就可以直接调用
- 值: 函数定义(对象)

变量提升和函数提升是如何产生的?

先执行变量提升, 然后再执行函数提升

```JavaScript
function a(){}
var a;
console.log(typeof a); // function
```

```JavaScript
if(!(b in window)){
    var b = 1;
}
console.log(b); // undefined
```

```JavaScript
var c = 1;
function c(c){
    console.log(c);
    var c = 3;
}
c(2); // 报错
```

# 执行上下文与执行上下文栈

1. 代码分类

   - 全局代码
   - 函数(局部)代码

2. 全局执行上下文

   - 在执行全局代码前将 window 确定为全局执行上下文
   - 对全局数据进行预处理
     - var 定义的全局变量 ==> undefined, 添加为 window 的属性
     - function 声明的全局函数 ==> 赋值(fun), 添加为 window 的方法
     - this ==> 赋值(window)
   - 开始执行全局代码

3. 函数执行上下文

   - 在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文
   - 对局部数据进行预处理
     - 形参 ==> 赋值(实参) ==> 添加为执行上下文的属性
     - arguments ==> 赋值(实参列表) ==> 添加为执行上下文的属性
     - var 定义的局部变量 ==> undefined ==> 添加为执行上下文的属性
     - function 声明的函数 ==> 赋值(fun) ==> 添加为执行上下文的方法
     - this ==> 赋值(调用函数的对象)
   - 开始执行函数体代码

4. 全局代码执行前, JS 引擎就会创建一个栈来存储管理所有的执行上下文对象

5. 在全局执行上下文(window)确定后, 将其添加到栈中(压栈)
6. 在函数执行上下文创建以后, 将其添加到栈中(压栈)
7. 在当前函数执行完后, 将栈顶的对象移除(出栈)
8. 当所有的代码执行完后, 栈中只剩下 window

```JavaScript
console.log('gb:' + i);
var i = 1;
foo(1);
function foo(i){
    if(i === 4){
        return;
    }
    console.log('fb:' + i);
    foo(i + 1);
    console.log('fe:' + i);
}
console.log('ge:' + i);
```

# 作用域与作用域链

作用域:

- 全局作用域
- 函数作用域
- 块作用域(ES6)

作用: 隔离变量, 不同作用域下同名变量不会有冲突

作用域与执行上下文的区别

区别 1:

- 全局作用域之外, 每个函数都会创建自己的作用域, 作用域在函数定义时就已经确定了, 而不是在函数调用时
- 全局执行上下文环境是在全局作用域确定之后, js 代码马上执行之前创建
- 函数执行上下文环境是在调用函数时, 函数体代码执行之前创建

区别 2:

- 作用域是**静态**的, 只要函数定义好了就一直存在, 且不会再变化
- 上下文环境是**动态**的, 调用函数时创建, 函数调用结束时上下文环境就会被自动释放

联系:

- 上下文环境(对象)是从属于所在的作用域
- 全局上下文环境 ==> 全局作用域
- 函数上下文环境 ==> 对应的函数作用域

```JavaScript
var x = 10;
function fn(){
    console.log(x);
}
function show(f){
    var x = 20;
    f();
}
show(fn); // 10
```

```javascript
var fn = function () {
  console.log(fn);
};
fn(); // 输出fn

var obj = {
  fn2: function () {
    console.log(fn2);
  },
};
obj.fn2(); // 报错
```

# 闭包

如何产生闭包?

- 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包

闭包的理解:

- 使用 chrome 调试查看
- 理解 1: 闭包是嵌套的内部函数(绝大部分人)
- 理解 2: 包含被引用变量(函数)的对象
- 注意: 闭包存在于嵌套的内部函数

产生条件:

- 函数嵌套
- 内部函数引用了外部函数的数据(变量/函数)

```javascript
function fn1() {
  var a = 2;
  var b = 'abc';
  function fn2() {
    // 执行函数定义就会产生闭包(不用调用函数)
    console.log(a);
  }
  fn2();
}
fn1();
```

## 常见的闭包

1. 将函数作为另外一个函数的返回值

```JavaScript
function fn1(){
	var a = 2;
    function fn2(){
        a++;
        console.log(a);
    }
    return fn2;
}
var f = fn1();
f(); // 3
f(); // 4
```

外部函数执行多少次就会有多少个闭包

将函数作为实参传递给另外一个函数调用

```JavaScript
function showDelay(msg, time){
    setTimeout(function(){
        alert(msg);
    }, time);
}
showDelay('msg', 2000);
```

闭包的作用:

1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)

问题:

1. 函数执行完以后, 函数内部声明的局部变量是否还存在?
   - 一般情况下是不存在的
   - 存在于闭包中的变量才会保存
2. 在函数外部能直接访问函数内部的局部变量吗?
   - 不能
   - 可以通过闭包让外部操作他的数据

闭包的声明周期

1. 产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)
2. 死亡: 在嵌套的内部函数称为了垃圾对象时

闭包的应用

定义 JS 模块

- 具有特定功能的 js 文件
- 将所有的数据和功能都封装到一个函数内部(私有的)
- 只向外部暴露一个包含 n 个方法的对象或函数
- 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能

```javascript
function myModule() {
  // 私有数据
  var name = 'hhhhh';
  // 操作数据的函数
  function doSomething() {
    console.log('doSomething() ' + name.toUpperCase());
  }
  function doOtherthing() {
    console.log('doOtherthing() ' + name.toLowerCase());
  }
  // 向外暴露对象(给外部使用的方法)
  return {
    doSomething: doSomething,
    doOtherthing: doOtherthing,
  };
}
```

```javascript
(function myModule() {
  // 私有数据
  var name = 'hhhhh';
  // 操作数据的函数
  function doSomething() {
    console.log('doSomething() ' + name.toUpperCase());
  }
  function doOtherthing() {
    console.log('doOtherthing() ' + name.toLowerCase());
  }
  window.myModule2 = {
    doSomething: doSomething,
    doOtherthing: doOtherthing,
  };
})();
```

闭包的缺点:

- 函数执行完后, 函数内的局部变量没有释放, 占用内存时间会变长
- 容易造成内存泄漏

解决方案:

- 能不使用就不用
- 及时释放: 让内部函数成为垃圾对象 —> 回收闭包

内存溢出与内存泄露

内存溢出

- 一种程序运行出现的错误
- 当程序需要的内存超过了剩余的内存, 就抛出内存溢出的错误

内存泄露

- 占用的内存没有及时释放
- 内存泄露累积多了容易导致内存溢出
- 常见的内存泄露:
  - 意外的全局变量
  - 没有及时清理的计时器或回调函数
  - 闭包

# 对象创建模式

## Object 构造函数模式

- 先创建空 Object 对象, 再动态添加属性/方法
- 适用场景: 起始时不确定对象内部数据
- 问题: 语句太多

```JavaScript
var p = new Object()
p.name = 'Tom'
p.age = 12
p.setName = function(name){
    this.name = name
}
```

## 对象字面量模式

- 套路: 使用`{}`创建对象, 同时制定属性/方法
- 适用场景: 起始对象内部数据是确定的
- 问题: 如果创建多个对象, 有重复代码

```javascript
var p = {
  name: 'Tom',
  age: 12,
  setName: function (name) {
    this.name = name;
  },
};
```

## 工厂模式

- 通过工厂函数动态创建对象并返回
- 适用场景: 需要创建多个对象
- 问题: 对象没有一个具体的类型, 都是 Object 类型

```javascript
function createPerson(name, age) {
  var obj = {
    name: name,
    age: age,
    setName: function (name) {
      this.name = name;
    },
  };
  return obj;
}

var p1 = createPerson('Tom', 12);
```

## 自定义构造函数模式

- 自定义构造函数, 通过 new 创建对象
- 需要创造多个类型确定的对象
- 问题: 每个对象都有相同的数据, 浪费内存

```JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;
    this.setName = function(name){
        this.name = name;
    }
}

var p1 = new Person();
```

## 构造函数+原型的组合模式

- 自定义构造函数, 属性在函数中初始化, 方法添加到原型上
- 适用场景: 需要创建多个类型确定的对象

```JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.setName = function(name){
    this.name = name;
}
var p1 = new Person('Tom', 23);

```

# 继承模式

构造函数+原型

1. 定义父类型构造函数
2. 给父类型的原型添加方法
3. 定义子类型的构造函数
4. 创建父类型的对象赋值给子类型的原型
5. 将子类型原型的构造属性设置为子类型
6. 给子类型原型添加方法
7. 创建子类型的对象: 可以调用父类型的方法

关键: 子类型的原型为父类型的一个实例对象

```javascript
function Supper() {
  this.supProp = 'Supper property';
}
Supper.prototype.showSupperProp = function () {
  console.log(this.supProp);
};

function Sub() {
  this.subProp = 'Sub property';
}

Sub.prototype = new Supper();
// 让子类型的原型的constructor指向子类型
Sub.prototype.constructor = Sub;
Sub.prototype.showSubProp = function () {
  console.log(this.subProp);
};

var sub = new Sub();
sub.showSupperProp();
sub.showSubProp();
```

借用构造函数继承(假继承)

1. 定义父类型构造函数
2. 定义子类型构造函数
3. 在子类型构造函数中调用父类型构造

关键: 在子类型构造函数中用 call()调用父类型构造函数

```JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;
}
function Student(name, age, price){
    Person.call(this, name, age); // 相当于this.Person(name, age)
    this.price = price;
}
```

## 组合继承

原型链+借用构造函数的组合继承

1. 利用原型链实现对父类型对象的方法继承
2. 利用 call()借用父类型构造函数初始化相同属性

```JavaScript
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.setName = function(name){
    this.name = name;
}

function Student(name, age, price){
    Person.call(this, name, age);
    this.price = price;
}

Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.setPrice = function(price){
    this.price = price;
}

var s = new Student('Tom', 24, 15000);
s.setName('Bob');
s.setPrice(16000);
console.log(s.name, s.age, s.price);
```

# 进程与线程

线程

- 是进程内的一个独立执行单元
- 是程序执行的一个完整流程
- 是 CPU 的最小调度单位

单线程与多线程

- 多线程
  - 优点
    - 能有效提升 CPU 的利用率
  - 缺点
    - 创建多线程开销
    - 线程间切换开销
    - 死锁与状态同步问题
- 单线程
  - 优点
    - 顺序编程简单易懂
  - 缺点
    - 效率低

JS 是单线程的, 但是 H5 中的 Web Workers 可以多线程运行

浏览器是多线程运行的

浏览器进程

- 单进程
  - Firefox
  - 老版本 IE
- 多进程
  - chrome
  - 新版 IE
- 如何查看

相关知识:

1. 应用程序必须运行在某个进程的某个线程上
2. 一个进程中至少有个一个运行的线程: 主线程, 进程启动后自动创建
3. 一个进程中也可以同时运行多个线程, 这个程序是多线程运行的
4. 一个进程内的数据可以供其中的多个线程直接共享
5. 多个进程之间的数据不能直接共享
6. 线程池(thread pool): 保存多个线程对象的容器, 实现线程对象的反复利用

## 浏览器内核

- 支撑浏览器运行的最核心的程序
  - Chrome, Safari: webkit
  - Firefox: Gecko
  - IE: Trident
  - 360, 搜狗: Trident + webkit
- 内核由很多模块组成
  - 主线程
    - JS 引擎模块: 负责 JS 程序的编译与运行
    - HTML, CSS 文档解析模块: 负责页面文本解析
    - DOM/CSS 模块: 负责 DOM/CSS 在内存中的相关处理
    - 布局和渲染模块: 负责页面的布局和效果的绘制(内存中的对象)
  - 分线程
    - 定时器模块: 负责定时器的管理
    - 事件响应模块: 负责事件的管理
    - 网络请求模块: 负责 ajax 请求

定时器是否是定时执行的?

- 定时器并不能保证真正定时执行
- 一般会会延迟一点(可以接受), 也有可能延迟很久

定时器回调函数都是在主线程中执行的, 因为`js`是单线程的

定时器是通过事件循环模型实现的

```JavaScript
document.getElementById('btn').onclick = function(){
    var start = Date.now();
    console.log("Before timer start...");
    setTimeout(function(){
        console.log("Timer start...", Date.now() - start);
    }, 200);
    console.log("After timer end...");
}
```

证明`JS`是单线程

`setTimeout()`的回调函数是在主线程执行的

定时器回调函数只有在运行栈中的代码全部执行完才有可能执行

```javascript
setTimeout(function () {
  console.log('timeout 22222');
  alert('22222');
}, 2000);

setTimeout(function () {
  console.log('timeout 22222');
  alert('22222');
}, 2000);

function fn() {
  console.log(fn);
}

fn();

console.log('alert start');
alert('----------');
console.log('alert end');
```

代码分成两类:

1. 初始化代码
2. 回调代码

js 引擎执行代码的基本流程

异步执行: 所有的初始化代码执行完了, 才有可能被执行

1. 先执行初始化代码: 包含一些特别的代码 -> 回调函数(异步执行)
   1. 设置定时器
   2. 绑定监听
   3. 发送 ajax 请求
2. 后面在某个时刻才会执行回调函数

所有代码的分类:

- 初始化执行代码(同步代码): 包含绑定 dom 事件监听, 设置定时器, 发送 ajax 请求代码
- 回调执行代码(异步代码): 处理回调逻辑

js 引擎执行代码的基本流程:

- 初始化代码 ===> 回调代码

模型的 2 个重要组成部分:

- 事件(定时器/DOM 事件)管理模块
- 回调队列

模型的运转流程

- 执行初始化代码, 将事件回调函数交给对应的模块管理
- 当事件发生时, 管理模块会将回调函数及其数据添加到回调队列中
- 只有当初识化代码执行完后(可能要一定时间), 才会遍历读取回调队列中的回调函数执行

基本概念:

- 执行栈
  - execution stack
  - 所有的代码都是在此空间中执行的
- 浏览器内核
  - browser core
  - js 引擎模块(在主线程处理)
  - 其他模块(在主/分线程处理)
- 同一 callback queue
  - 任务队列(task queue)
  - 消息队列(message queue)
  - 事件队列(event queue)
- 事件轮询
  - event loop
  - 从任务队列中循环取出回调函数放入执行栈中处理
- 事件驱动模型(event-driven interaction model)
- 请求响应模型(request-response model)

# `H5 Web Workers`

`H5`规范提供了`js`分线程的实现, 取名为`Web Workers`

相关的`API`:

- `Worker`: 构造函数, 加载分线程执行的`js`文件
- `Worker.prototype.onmessage`: 用于接收另一个线程的回调函数
- `Worker.prototype.postMessage`: 向另一个线程发送消息

不足:

- `worker`内代码不能操作 DOM(更新 UI)
- 不能跨域加载 JS
- 不是每个浏览器都支持这个新特性

`Web Workers`是`HTML5`提供的一个`JavaScript`多线程解决方案

可以将一些大计算量的代码交给`web worker`运行而不冻结用户界面

但是子线程完全受到主线程控制, 且不能操作 DOM

所以这个新标准没有改变 JS 单线程的实质

![H5_web_worker](/Users/huangjifan/Documents/编程学习/JavaScript/img/H5_web_worker.png)

不足

1. 慢
2. 不是所有的浏览器都支持这个新特性
3. worker 内的代码不能访问 DOM
4. 不能跨域加载 JS
