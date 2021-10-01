# 作用域

## 编译原理

`JavaScript`是动态, 解释执行语言

`JS`代码执行过程

- 分词/词法分析(Tokenizing/Lexing)

  将代码由字符组成的字符串分解成有意义的代码块(词法单元`token`)

  

  分词(`tokenizing`)和词法分析(`Lexing`)的区别

  	- 词法单元的识别是通过有状态还是无状态的方式进行的
  	- 如果词法单元生成器在判断a是一个独立的词法单元还是其他词法单元的一部分时, 调用的是有状态的解析规则, 那么这个过程就被称为是词法分析

- 解析/语法分析(Parsing)

  - 将词法单元流(数组)转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树(抽象语法树, `AST`)

- 代码生成

  - 将`AST`转化为可执行的代码的过程称为代码生成



变量的赋值操作

1. 编译器会在当前作用域中声明一个变量(如果之前没有声明过的话)
2. 运行时引擎会在作用域中查找该变量, 如果能够找到就会对他赋值



`LHS`- 找到容器, 赋值操作的目标是谁

`RHS` - 找到对应的值, 谁是复制



## 作用域嵌套

当一个块或函数嵌套在另一个块或函数中时, 就发生嵌套

因此在当前作用域中无法找到某个变量时, 引擎就会在外层嵌套的作用中继续查找, 直到找到该变量或者抵达最外层的作用域(也就是全局作用域)为止



在变量还没有声明的情况下, 两种查询的行为是不一样的

`RHS`查询在所有嵌套的作用域中遍寻找不到所需的变量, 引擎就会抛出`ReferenceError`异常

`LHS`查询在顶层无法找到目标变量, 全局作用域中就会创建一个具有该名称的变量, 并将其返回给引擎(前提: 非严格模式下)



`ReferenceError`同作用域判别失败相关

`TypeError`代表作用域判别成功, 但是对结果的操作是非法或不合理的





# 函数作用域和块作用域

## 函数作用域

利用函数作用域能够将代码片段隐藏起来, 创建一个作用域

在软件设计中, 应该最小限度地暴露必要内容, 而将其他内容都隐藏起来



隐藏作用中的变量和函数带来的另外一个好处是避免同名标识符之间的冲突(命名空间)

- 全局命名空间
- 模块管理



匿名和具名函数

- 没有名称标识符
- 书写简单快捷

缺点:

	- 匿名函数在栈追踪中不会显示出有意义的函数名, 使得调试很困难
	- 没有函数名, 函数要引用自身时只能使用已经过期的`arguments.callee`引用
	- 匿名函数省略了对于代码可读性/可理解性很重要的函数名



立即执行函数

立即执行函数最常见的用法是使用一个匿名函数表达式

```javascript
var a = 2;
(function IIFE() {
  var a = 3;
  console.log(a);
})();

console.log(a);
```



```javascript
var a = 2;

(function IIFE(global) {
  var a = 3;
  console.log(a);
  console.log(global.a);
})(window);

console.log(a);
```





## 块作用域

```javascript
for (var i = 0; i < 10; i++) {
  console.log(i);
}
```

```javascript
for (var i = 0; i < 10; i++) {
  (function(i) {
    console.log(i);
  })(i);
}
```



`with`关键字也会创建一个块作用域, `with`从对象中创建出来的作用域仅在`with`声明中而非外部作用域中有效

在`ES3`规范中, `try/catch`的`catch`分句也会创建一个块作用域, 其中声明的变量仅在`catch`内部有效

`let`关键字可以将变量绑定到所在的任意作用域, `let`为其声明的变量隐式劫持了所在的块作用域





1. 垃圾回收

   闭包会产生不需要存在的数据结构

2. `let`循环

   `let`声明附属于一个新的作用域而不是当前的函数作用域(也不属于全局作用域)



# 提升

包含变量和函数在内的所有声明都会在任何代码被执行前首先被处理

变量和函数的声明都是在编译阶段进行的

函数声明和变量声明都会被提升, 但是函数会首先被提升, 然后才是变量

```javascript
foo();

var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
};

// output: 1
```

函数和变量的重复声明会忽略掉, 因为函数声明会被提前到普通变量前面

```javascript
function foo() {
  console.log(1);
}

foo();

foo = function() {
  console.log(2);
};
```





# 作用域闭包

函数在定义时的词法作用域以外的地方被调用

将(访问他们各自词法作用域的)函数当做第一级的值类型并到处传递

在定时器, 事件监听器, Ajax请求, 跨窗口通信, Web Workers或者其他任何的异步(或者同步)任务中, 只要使用了回调函数就是在使用闭包

模块有两个主要特征:

1. 为创建内部作用域而调用了一个包装函数
2. 包装函数的返回值必须至少包括一个对内部函数的引用, 这样就会创建涵盖整个包装函数内部作用域的闭包







# this

## 误解

1. this指向自身(错误)

   ```javascript
   function foo(num) {
     console.log("foo: " + num);
     this.count++;
     console.log(this);
   }
   
   foo.count = 0;
   
   var i;
   
   for (i = 0; i < 10; i++) {
     if (i > 5) {
       foo(i);
     }
   }
   
   // foo: 6
   // foo: 7
   // foo: 8
   // foo: 9
   
   // foo被调用了多少次
   console.log(foo.count); // 0
   ```

   

2. `this`的作用域
   在某些情况下是正确的, 但是在某些情况下是错误的
   `this`在任何情况在都不指向函数的词法作用域, 

   ```javascript
   function foo() {
     var a = 2;
     this.bar();
   }
   
   function bar() {
     console.log(this.a);
   }
   
   foo();	// ReferenceError: a is not defined
   ```



`this`的机制

- 运行时绑定, 上下文取决于函数调用时的各种条件, `this`的绑定和函数声明的位置没有任何关系, 只取决于函数的调用方式
- 函数被调用的时候, 会创建一个活动记录(有时候也称为执行上下文), 记录函数在哪里被调用(调用栈), 调用方式, 传入参数等信息



调用位置: 函数在代码中被调用的位置



绑定规则

- 默认绑定
  最常见的调用类型: 独立函数调用
  直接不用任何修饰的函数引用进行调用的, 只能用默认绑定, 无法应用其他规则

  ```javascript
  function foo() {
    console.log(this.a);
  }
  
  var a = 2;
  
  foo(); // 2
  ```

  如果使用严格模式(`strict mode`), 则不能将全局对象用于默认绑定, `this`会绑定到`undefined`


  ```javascript
  function foo() {
    console.log(this.a);
  }
  
  var a = 2;
  
  (function() {
    "use strict";
    foo(); // 2
  })();
  ```

  严格模式下调用函数, 不影响函数内部的默认绑定

- 隐式绑定
  需要考虑的规则是调用位置是否有上下文对象, 或者说是否被某个对象拥有或者包含
  对象属性引用链中只有上一层或者说最后一层在调用位置中起作用

  ```javascript
  function foo() {
    console.log(this.a);
  }
  
  var obj2 = {
    a: 42,
    foo: foo
  };
  
  var obj1 = {
    a: 2,
    obj2: obj2
  };
  
  obj1.obj2.foo();
  ```


  隐式丢失问题

  被隐式绑定的函数会丢失绑定对象, 会应用默认绑定, 从而把`this`绑定到全局对象或者`undefined`

  ```javascript
  function foo() {
    console.log(this.a);
  }
  
  var obj = {
    a: 2,
    foo: foo
  };
  
  var bar = obj.foo;
  
  var a = "oops, global";
  
  bar();	// "oops, global"
  ```

  ```javascript
  function foo() {
    console.log(this.a);
  }
  
  function doFoo(fn) {
    fn();
  }
  
  var obj = {
    a: 2,
    foo: foo
  };
  
  var a = "oops, global";
  
  doFoo(obj.foo);	// oops, global
  ```

  

  调用回调函数可能会修改`this`

- 显式绑定
  用`call`或者`apply`进行显式绑定
  显式绑定仍然无法解决绑定丢失的问题

  1. 硬绑定

     ```javascript
     function foo() {
       console.log(this.a);
     }
     
     var obj = {
       a: 2
     };
     
     var bar = function() {
       foo.call(obj);
     };
     
     bar();	// 2
     setTimeout(bar, 100); // 2
     
     // 硬绑定的bar不可能在修改他的this
     bar.call(window);
     ```

     应用场景:

     ```javascript
     /**
      * 创建一个包裹函数, 负责接收参数并且返回值
      */
     function foo(something) {
       console.log(this.a, something);
       return this.a + something;
     }
     
     var obj = {
       a: 2
     };
     
     var bar = function() {
       return foo.apply(obj, arguments);
     };
     
     var b = bar(3);	// 2 3
     console.log(b);	// 5
     ```

     ```javascript
     /**
      * 创建一个可以重复使用的辅助函数
      */
     function foo(something) {
       console.log(this.a, something);
       return this.a + something;
     }
     
     function bind(fn, obj) {
       return function () {
       	return fn.apply(obj, arguments);
       };
     }
     
     var obj = {
       a: 2
     };
     
     var bar = bind(foo, obj);
     
     var b = bar(3);	// 2 3
     
     console.log(b);	// 5
     ```

  2. `API`调用的上下文

- new绑定
  构造函数只是一些使用new操作符时被调用的函数, 并不会属于某个类, 也不会实例化一个类

  用new来代用函数会自动执行下面的操作:

  1. 创建一个全新的对象

  2. 这个对象会被执行`[[Prototype]]`连接
  3. 这个新对象会绑定到函数调用的`this`
  4. 如果函数没有返回其他对象, 那么`new`表达式中的函数调用会自动返回这个新对象



优先级

默认绑定优先级最低

隐式绑定和显式绑定比较

```javascript
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo();	// 2
obj2.foo();	// 3

obj1.foo.call(obj2);	// 3
obj2.foo.call(obj1);	// 2
// 显式绑定优先级高于隐式绑定
```

`new`绑定和隐式绑定比较

```javascript
function foo(something) {
	this.a = something;
}

var obj1 = {
  foo: foo
};

obj1.foo(2);
console.log(obj1.a);	// 2

obj1.foo.call(obj2, 3);	
console.log(obj2.a);	// 3

var bar = new obj1.foo(4);
console.log(obj1.a);	// 2
console.log(bar.a);	// 4
// new绑定优先级高于隐式绑定
```

`new`绑定和显式绑定比较

```javascript
function foo(something) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);	// 2

var baz = new bar(3);
console.log(obj1.a);	// 2
console.log(baz.a);	// 3
```

`bind`会判断硬绑定函数是否是被`new`调用, 如果是的话就会使用新创建的`this`替换硬绑定的`this`



判断`this`

1. 函数是否在`new`中调用(`new`绑定)? 如果是的话`this`绑定的是新创建的对象

   `var bar = new foo();`

2. 函数是否通过`call`, `apply`(显式调用)或者硬绑定调用? 如果是的话, `this`绑定的是指定对象
   `var bar = foo.call(obj2);`

3. 函数是否在某个上下文对象中调用(隐式绑定)? 如果是的话, `this`绑定的是那个上下文对象
   `var bar = obj1.foo();`

4. 如果都不是的话, 使用默认绑定, 严格模式 -> `undefined`, 否则是`window`对象

   `var bar = foo();`



例外: 

- 传入`null`或者`undefined`作为`this`的绑定对象传入`call`, `apply`或者`bind`, 这些值在调用的时候会被忽略, 应用默认绑定
  传入`null`或`undefined`可能会导致副作用 -> 利用空的委托对象替代`var a = Object.create(null);`
  `Object.create(null)`和`{}`很像, 但是不会创建`Object.prototype`这个委托

- 间接引用

  ```javascript
  var a = 2;
  var o = {a: 3, foo: foo};
  var p = {a: 4};
  
  o.foo();	// 3
  (p.foo = o.foo)();	// 2
  ```



软绑定

```javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this;
    var curried = [].slice.call(arguments, 1);
    var bound = function() {
      return fn.apply(
      	(!this || this === (window || global)) ? obj : this,
        curried.cocat.apply(curried, arguments)
      );
    }
    bound.prototype = Object.create(fn.prototype);
    return bound;
  }
}
```



箭头函数

箭头函数不使用四种标准规则, 根据外层(函数或全局)作用域来决定`this`

箭头函数的`this`指向无法修改, `new`操作符也无法修改

```javascript
function foo() {
	setTimeout(() => {
    console.log(this.a);
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj);	// 2
```

1. 只使用词法作用域并完全抛弃错误`this`风格的代码
2. 完全采用`this`风格, 并在必要时使用`bind(...)`, 尽量避免使用`self = this`和箭头函数



# 对象

