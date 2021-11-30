- `var`, `let`, `const`的区别



- `Object.create()`, `new Object()`和`{}`的区别
直接字面量创建
```javascript
var objA = {};
objA.name = 'a';
objA.sayName = function () {
  console.log(`My name is ${this.name} !`);
}
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
objB.sayName = function() {
  console.log(`My name is ${this.name} !`);
}
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
  sayName: function() {
    console.log(`My name is ${this.name} !`)
  }
};

const p = Object.create(person); // p.__proto__ = person
```
`Object.create(proto[, propertiesObject])`
  - proto为必填参数, 是新对象的原型对象(如果参数是null, 那新对象就是彻底的空对象, 没有继承`Object.prototype`上面的方法和属性, 例如`hasOwnProperty()`, `toString()`)

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
          configurable: true
        }
      });

      console.dir(bb);  // {a: 2}
      console.log(bb.__proto__);  // undefined
      console.log(bb.__proto__ === Object.prototype); // false
      console.log(bb instanceof Object);  // false
    ```

    ```javascript
      var cc = Object.create({b: 1}, {
        a: {
          value: 2,
          writable: true,
          configurable: true
        }
      });

      console.log(cc);
      console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b'));  // true false, 说明第二个参数设置的是新对象自身可枚举的属性
      console.log(cc.__proto__);  // {b: 1}
      console.log(cc.__proto__ === Object.prototype)  // false
      console.log(cc instanceof Object);  // true, cc是对象, 原型链上出现Object 
    ```

手动实现`Object.create()`
```javascript
Object.myCreate = function(proto, propertiesObject) {
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
}
```

- `Javascript`中的`hasOwnProperty`和`in`操作符的不同点

1. `in`操作符只要通过对象能访问到属性 -> 返回`true`
    `hasOwnProperty`只有属性存在于实例时 -> 返回`true`
2. `in`只会遍历可枚举属性
    `hasOwnProperty`是严格限制于可枚举项目


- `Symbol`

