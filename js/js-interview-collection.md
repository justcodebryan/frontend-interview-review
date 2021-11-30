# `var`, `let`, `const`的区别

1. `var`有变量提升, `let`和`const`没有
2. `let`和`const`是块级作用域, `var`声明的范围是函数作用域
   `let`不允许同一个块作用域出现冗余声明 -> 抛出`SyntaxError`
   `JS`引擎会记录用于变量声明的标识符及其所在的块作用域 -> 嵌套使用相同标识符不会报错, 因为同一个块中没有重复声明
3. `let`和`const`具有暂时性死区(Temporary Death Zone, TDZ), `var`没有 -> 因为有变量提升的缘故, 在变量声明之前使用该变量不会造成代码报错
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
- `Object.frozen()`

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

# `Symbol`
