# `var`, `let`, `const`的区别

1. `var`有变量提升, `let`和`const`没有
2. `let`和`const`是块级作用域, `var`声明的范围是函数作用域
   `let`不允许同一个块作用域出现冗余声明 -> 抛出`SyntaxError`
   `JS`引擎会记录用于变量声明的标识符及其所在的块作用域 -> 嵌套使用相同标识符不会报错, 因为同一个块中没有重复声明
3. `let`和`const`具有暂时性死区(Temporal Death Zone, TDZ), `var`没有 -> 因为有变量提升的缘故, 在变量声明之前使用该变量不会造成代码报错, 抛出`ReferenceError`, `typeof`不再是百分之百安全的操作
4. `var`声明的变量是会挂载到全局对象上面的`window`, `let`和`const`声明的变量是不会挂载在全局对象上面的
   `for`循环中为什么不会出现`ES5`之前的重复打印同一个数据的情况
   用`let`声明迭代变量时, `JavaScript`引擎在后台会为每个迭代循环声明一个新的迭代变量, 每个`setTimeout`引用的都是不同的变量实例

`let`和`const`的不同之处

- `const`必须要在声明时赋值, 且后续不能重新赋值
- `let`可以在声明时不初始化, 且后续可以重新赋值

尽量采用`const`声明变量
当对象赋值给`const`声明的变量时, 赋值给到变量的是对象存在内存里面的地址, 而不是对象本身的变量

# 冻结对象的属性

- `Object.defineProperty()`

- `Object.seal()`
  `Object.seal()`方法封闭一个对象

  - 阻止添加新属性并将**所有现有属性标记为不可配置**
  - 当前属性的值只要原来可写的就可以改变
  - 尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性, 结果会静默失败或抛出`TypeError`(在严格模式中最常见的, 但不唯一)
  - 不会影响从原型链上继承的属性, 但`__proto__`属性的值也不能修改

  ```javascript
  const object1 = {
    property1: 42,
  };

  Object.seal(object1);
  object1.property1 = 33;
  console.log(object1.property1); // expected output: 33

  delete object1.property1;
  console.log(object1.property1);
  ```

  **与`Object.freeze()`对比**: 使用`Object.freeze()`冻结的对象中的现有属性值是不可变的, 用`Object.seal()`密封的对象可以改变其现有属性值

- `Object.frozen()`

- `Object.preventExtensions()`
  `Object.preventExtensions()`方法让一个对象变的不可扩展, 也就是永远不能再添加新的属性

# 对象`Object`的分类

在`ES5`时代, 对象分为三种:

- `native object`(原生对象), 指语义完全由规范定义并且不掺杂任何宿主环境定义的对象
- `host object`(宿主对象), 由执行环境提供, 比如浏览器的`window`对象和`history`对象. `JS`里的对象不是原生对象就是宿主对象
- `build-in object`(内置对象), 由`ECMA`实现提供, 程序执行时就存在的对象, 所有内置对象都是原生对象

```text
`null` -> `Object` -> `native` & `host`
                        |-> `build-in`
```

在`ES6`时代, 规范中有关对象的划分变成 4 种:

- `ordinary object`: 普通对象, 需要具备了对象的所有基本内置方法
- `exotic object`: 外来对象, 如果不完全具备标准对象拥有的基本内置方法, 就是外来对象, `JS`里的对象不是普通对象就是外来对象
- `standard object`: 标准对象, 语义由本规范定义的对象
- `build-in object`: 内置对象

`ES5`中对象是以宿主环境为条件划分的
`ES6`中则是根据对象的基本内置方法

# `Object.create()`, `new Object()`和`{}`的区别

直接字面量创建

```javascript
var objA = {};
objA.name = 'a';
objA.sayName = function () {
  console.log(`My name is ${this.name} !`);
};
objA.sayName();
console.log(objA.__proto__ === Object.prototype); // true
console.log(objA instanceof Object); // true
```

`new`关键字创建
和直接用字面量创建没有区别
创建的新对象的`__proto__`都指向`Object.prototype`

```javascript
var objB = new Object();
objB.name = 'b';
objB.sayName = function () {
  console.log(`My name is ${this.name} !`);
};
objB.sayName();
console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true
```

```javascript
// new 操作符
function new(Ctor) {
  var obj = new Ctor();
  obj.__proto__ = Ctor.prototype;
  var result = Ctor.call(obj);
  return result;
}
```

- `Object.create()`

```javascript
const person = {
  name: 'a',
  sayName: function () {
    console.log(`My name is ${this.name} !`);
  },
};

const p = Object.create(person); // p.__proto__ = person
```

`Object.create(proto[, propertiesObject])`

- proto 为必填参数, 是新对象的原型对象(如果参数是 null, 那新对象就是彻底的空对象, 没有继承`Object.prototype`上面的方法和属性, 例如`hasOwnProperty()`, `toString()`)

  `console.dir` - 打印出该对象的所有属性和属性值

  ```javascript
  var a = Object.create(null);
  console.dir(a); // {}
  console.log(a.__proto__); // undefined
  console.log(a.__proto__ === Object.prototype); // false
  console.log(a instanceof Object); // false
  ```

- `propertiesObject`是可选参数, 指定要添加到新对象上的可枚举的属性(即自定义的属性和方法, 可用`hasOwnProperty()`获取的, 而不是原型对象上的)的描述符及相应的属性名称

  ```javascript
  var bb = Object.create(null, {
    a: {
      value: 2,
      writable: true,
      configurable: true,
    },
  });

  console.dir(bb); // {a: 2}
  console.log(bb.__proto__); // undefined
  console.log(bb.__proto__ === Object.prototype); // false
  console.log(bb instanceof Object); // false
  ```

  ```javascript
  var cc = Object.create(
    { b: 1 },
    {
      a: {
        value: 2,
        writable: true,
        configurable: true,
      },
    },
  );

  console.log(cc);
  console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b')); // true false, 说明第二个参数设置的是新对象自身可枚举的属性
  console.log(cc.__proto__); // {b: 1}
  console.log(cc.__proto__ === Object.prototype); // false
  console.log(cc instanceof Object); // true, cc是对象, 原型链上出现Object
  ```

手动实现`Object.create()`

```javascript
Object.myCreate = function (proto, propertiesObject) {
  // 定义一个构造器
  function Ctor() {}

  // 将新定义的构造器的原型指向传入的原型
  Ctor.prototype = proto;

  // 创建新的对象
  const res = new Ctor();

  // 如果传入了第二个参数propertiesObject
  if (propertiesObject) {
    // 定义到新创建的对象上面
    Object.defineProperties(res, propertiesObject);
  }

  return res;
};
```

# `Javascript`中的`hasOwnProperty`和`in`操作符的不同点

1. `in`操作符只要通过对象能访问到属性 -> 返回`true`
   `hasOwnProperty`只有属性存在于实例时 -> 返回`true`
2. `in`只会遍历可枚举属性
   `hasOwnProperty`是严格限制于可枚举项目

`Object.getOwnPropertyDescriptor()`方法返回制定对象上一个自有属性对应的属性描述符
  - 自有属性指的是直接赋予该对象的属性, 不需要从原型链上进行查找的属性

`Object.getOwnPropertyName()` 返回一个所有属性的数组
  - 包含不可枚举的属性但不包括`Symbol`值作为名称的属性, 不会包含原型链上面的属性
  - 注意: ES5中, 如果方法的参数不是对象, 而是原始值, 则会抛出`TypeError`; 在`ES2015`中, 非对象的参数将被强制转换为一个对象

`Object.keys()`方法会返回一个由一个给定对象的自身可枚举属性组成的数组, 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
  - 注意: ES5中, 如果方法的参数不是对象, 而是原始值, 则会抛出`TypeError`; 在`ES2015`中, 非对象的参数将被强制转换为一个对象
  - 不会获取原型链上面的属性名


# `Symbol`
ES6引入的一种新的原始数据类型

`Symbol`函数前面不能使用`new`操作符, 否则会报错
`Symbol`函数的参数只是表示对当前`Symbol`值的描述, 因此相同参数的`Symbol`函数的返回值是不同
`Symbol`值不能和其他类型的值进行运算, 会报错
`Symbol`值可以显式转为字符串
`Symbol`值也可以转为布尔值, 但是不能转为数值

## `Symbol.prototype.description`
返回`Symbol`的描述
```javascript
const sym = Symbol('foo');

sym.description // foo
```

`Symbol`作为属性名, 遍历对象的时候, 不会出现在`for...in`, `for...of`循环中, 也不会被`Object.keys()`, `Object.getOwnPropertyNames()`, `JSON.stringify()`返回
但也不是私有属性, 可以通过`Object.getOwnPropertySymbols()`, 用`Reflect.ownKeys()`可以返回所有类型的键名, 包括常规键名和`Symbol`键名

## `Symbol.for()` `Symbol.keyFor()`
`Symbol.for()`: 重新使用同一个`Symbol`值
```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2; // true
```
`Symbol.for()`与`Symbol()`
- 都会生成新的`Symbol`
- 区别: 前者会被登记在全局环境中供搜索, 后者不会
- `Symbol.for()`不会每次调用就返回一个新的`Symbol`类型的值, 而是会先检查给定的`key`是否已经存在, 如果不存在才会新建一个值, 如果存在则会返回搜索到的那个值

`Symbol.keyFor()`方法返回一个已登记的`Symbol`类型值的`key`
```javascript
let s1 = Symbol.for('foo');
Symbol.keyFor(s1);  // 'foo'

let s2 = Symbol('foo');
Symbol.keyFor(s2) // undefined
// s2属于未登记的Symbol值, 所以返回undefined
```

`Symbol.for()`为`Symbol`值登记的名字是全局环境, 不管有没有在全局环境运行

可以用在不同`iframe`或`service worker`中取到同一个值
```javascript
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo');
```




# `Set` `Map` `WeakMap` `WeakSet`的区别
