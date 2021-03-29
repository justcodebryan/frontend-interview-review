# 输出 

```HTML 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--
        可以将JS代码编写到外部JS文件中，然后通过script标签引入
        写到外部文件中可以在不同的页面中同时引用，也可以利用到浏览器的缓存机制
    -->
    <!--
        script标签一旦用于引入外部文件了，就不能再编写代码了，即使有也会被忽略
        如果需要可以再创建一个新的script标签用于编写内部代码
    -->
    <script src="js/script.js"></script>
    <!--<script type="text/javascript">-->
        <!--alert("Hello, world!");-->
        <!--document.write("Hello, world!");-->
        <!--console.log("Hello, world!");-->
    <!--</script>-->
</head>
<body>

    <br data-tomark-pass>
    <!--
        可以将JS代码编写到标签的onclick属性中
        当点击按钮时，JS代码才会执行

        虽然可以写在标签的属性中，但是他们属于结构与行为耦合，不方便维护
    -->
    <button onclick="alert('Hello, world!');">Click please!</button>
    <br data-tomark-pass>
    <!--
        可以将JS代码写在超链接的href属性中，这样当点击超链接的时候，会执行JS代码
    -->
    <a href="javascript: alert('a');">Click please!</a>
    <a href="javascript:;">Do nothing!</a>

</body>
</html>


```

<!DOCTYPE html> 

外部引入: `src="" `

# 基本语法 

1. 严格区分大小写 

2. 每一条语句以分号(;)结尾 

* 如果不写分号, 浏览器会自动添加, 但是会消耗资源 

* 而且有时候浏览器会加错分号 

3. 忽略多个空格和换行, 可以通过空格和换行来格式化代码 

# 字面量和变量 

字面量: 都是一些不可改变的值 

变量: 可以用来保存字面量, 变量的值可以任意修改 

用`var`关键字来声明变量 

声明和赋值可以同时进行 

# 标识符 

所有的可以自主命名的都可以称为是标识符 

# 数据类型 

* `String` 字符串 
  * 使用引号包含起来 
  * 单引号和双引号都行,但是不能混着用 
  * 引号不能嵌套 

* `Number` 数值 

* `Boolean` 布尔值 

* `Null` 空值 

* `Undefined` 未定义 

* `Object` 对象 

其中`String/Number/Boolean/Null/Undefined`属于基本数据类型 

`Object`属于引用数据类型 

可以用一个运算符`typeof`来检查一个变量的类型 

语法: `typeof 变量` 

## `Number` 整数和浮点数 

`Infinity`表示正无穷 

`-Infinity`表示负无穷 

`typeof`检查`Infinity`也会返回`number` 

`NaN`是一个特殊的数字,表示`Not A Number` 

使用`typeof`检查一个`NaN`也会返回`number` 

`number`的最大值为`Number.MAX_VALUE`(1.7976931348623157e+308), 最小值为`Number.MIN_VALUE`(5e-324) 

## `Boolean` 布尔值 

`true`和`false` 

## `Null`和`Undefined` 

`Null`类型只有一个值 

`null`这个值专门用来表示一个为空的对象 

使用`typeof`检查一个`null`值时, 会返回`object` 

`Undefined`类型的值只有一个, 就是`undefined` 

当声明一个变量, 但是不给变量赋值, 值为`undefined` 

使用`typeof`检查一个`undefined`值时, 会返回`object` 

## 强制类型转换 

将一个数据类型强制转换为其他的数据类型 

类型转换主要指将其他数据类型, 转换为`String`/`Number`/`Boolean` 

### 将其他的数据类型转换为`String` 

* 调用被转换数据类型的`toString()`方法 
  * 该方法不会影响到原变量, 他会将转换的结果返回 
  * `null`和`undefined`这两个值没有`toString()`方法 

* 调用`String()`函数, 并将转换的数据传递给方法 
  * 使用`String()`函数做强制类型转换时, 

    * 对于`Number`和`Boolean`实际上就是调用`toSring()`方法 
    * 对于`null`和`undefined`, 就不会调用`toString()` 

    会将`null`直接转换为"null" 

    将`undefined`直接转化为"undefined" 

  * 可以将`null`和`undefined`这两个值直接转换为`String`字符串 

### 将其他的数据类型转换为`Number` 

* 使用`Number()`函数 

* 字符串 ---> 数字 
  * 如果是纯数字的字符串, 则直接将其转换为数字 
  * 如果字符串中有非数字内容, 则转换为NaN 
  * 如果字符串是一个空串或者是一个全是空格的字符串, 则转换为0 

* 布尔 ---> 数字 
  * true 转换为 1 

  * false 转换为 0 

* Null ---> 数字 0 

* undefined ---> 数字 NaN 

```JavaScript 
var a = "123"; 

a = Number(a); 
```



* 专门用来对付字符串 

  * `parseInt()`可以将一个字符串有效的整数内容提取出来 

  * `parseFloat()`可以将一个字符串有效的浮点数内容提取出来 

  * 对于非`String`使用`parseInt()`和`parseFloat()`, 会先将其转换为`String`然后传入方法中 

### 其他进制的数字 

`0x`开头的数字是16进制 

`0`开头的数字是8进制 

`0b`开头的数字是2进制, 但是不是所有的浏览器都支持 

`parseInt()`和`parseFloat()`后面出入多一个参数能让浏览器按指定的进制解析 

### 将其他的数据类型转换为`Boolean` 

* 数字 ---> 布尔 
  * 除了`0`和`NaN`, 其余的都是`true` 

* 除了空串, 其余都是`true` 

* `null` ---> `false` 

* `undefined` ---> `false` 

* 对象`object`也会转换为`true` 

# 运算符 

通过运算符可以对一个或多个值进行计算 

`typeof`就是运算符 

## 算数运算符 

当对非`Number`类型的值进行运算时, 会将这些值转换为`Number`, 然后进行运算 

任何值和`NaN`做运算都得到`NaN` 

如果对两个字符串进行`+`操作, 两个字符串就会拼接在一起 

任何值和字符串做加法操作, 都会先转换为字符串, 然后再做拼串操作 

任何值做- * / 运算都会自动转换为`Number` 

可以利用这一特点做隐式的类型转换, 通过为一个值 -0 \*1 /1等操作来转换成Number 

## 一元运算符 

### 正号和负号 

\+ 正号 

正号不会对数字产生任何影响 

\- 负号 

负号可以对数字进行负号的取反 

对于非`Number`类型的值, 会先转换为`Number`, 然后再运算 

可以对一个其他的数据类型使用 \+ 来进行数据类型转换 

### 自增 

无论是`a++`还是`++a`, 都会使得原变量的值自增1 

不同的是`a++`和`++a`的值不同 

`a++`的值等于原变量的值(自增前的值) 

`++a`的值等于原变量的新值(自增后的值) 

## 逻辑运算符 

! 非 

可以对任意一个数据类型取两次非, 将其转换为布尔值 

&&和||是短路与和短路或 

对于非布尔值进行与或运算时, 会现将其转换为布尔值, 然后再运算, 并且返回原值 

&& 与运算: 

\* 如果两个值都为`true`, 则返回后边的 

\* 如果两个值中有`false`, 则返回靠前边的`false` 

如果第一个值为`true`, 则必然返回第二个值 

如果第一个值为`false`, 则直接返回第二个值 

|| 或运算: 

\* 如果第一个值为`true`, 则直接返回第一个值 

\* 如果第一个值为`false`, 则直接返回第二个值 

\## 赋值运算符 

= 

+= 

-= 

\*= 

/= 

%= 

## 关系运算符 

对于非数值进行比较, 转化为数字再进行比较 

任何值和`NaN`做比较都是`false` 

* 如果符号两边的值都是字符串时, 不会将其转换为数字比较, 而会分别比较字符串中字符的`Unicode`编码, 比较字符编码是一位一位的进行比较, 如果两位一样, 则比较下一位, 所以借用这个属性进行英文排序 

* 如果比较两个字符串型的数字, 可能会得到不可预期的结果, 所以比较两个字符串型的数字, 一定要先进行类型转换 

## 相等运算符 

### `==` 相等 

相等运算符用来比较两个值是否相等 

当使用`==`来比较两个值时, 如果值的类型不同 

则会自动进行类型转换, 将其转换为相同的类型, 然后再进行比较 

`undefined`衍生自`null`, 所以这两个值做相等判断, 会返回`true` 

`NaN`不和任何值相等, 包括他本身, 可以通过`isNaN()`函数来判断一个值是否是`NaN` 

### `!=` 不相等 

不相等用来判断两个值是否不相等, 如果不相等返回`true`, 否则返回`false` 

不相等也会对变量进行自动的类型转换, 如果转换后相等他也会返回`false` 

### `===` 全等 

用来判断两个值是否全等, 与相等类似, 但是不会做自动类型转换 

如果两个值的类型不同, 直接返回`false` 

### `!==` 全不等 

用来判断两个值是否全不等, 与不相等类似, 但是不会做自动类型转换 

如果两个值的类型不同, 直接返回`true` 

## 条件运算符 

条件运算符也叫三元运算符 

```JavaScript 
条件表达式 ? 语句1 : 语句2; 

\- 执行流程 

条件运算符在执行时, 首先对条件表达式进行求值 

如果该值为true, 则执行语句1, 并返回执行结果 

如果该值为false, 则执行语句2, 并返回执行结果 
```

如果条件表达式不是布尔值, 会转换成布尔值再进行计算 

## 运算符优先级 

先乘除后加减 

&& 与的优先级高于 || 或的优先级 

优先级一样时, 从左到右计算 

可以通过`()`来改变优先级 

## 代码块 

`{}` 

`JS`中的代码块只是分组的作用, 没有其他的作用 

代码块的内容在外部是完全可见的 

# 对象 

1. 内建对象 

* 由ES标准中定义的对象, 在任何的ES的实现中都可以使用 

* 比如, `Math/String/Number/Boolean/Function/Object` 

2. 宿主对象 

* 由JS的运行环境提供的对象, 目前来讲主要指由浏览器提供的对象 

* 比如`BOM`, `DOM` 

```JavaScript 
// BOM对象 

console.log(); 

// DOM对象 

document.write(); 
```



3. 自定义对象 

由开发人员自己创建的对象 

```JavaScript 
//创建对象
/**
 *  使用new关键字调用的函数, 是构造函数constructor
 *  构造函数是专门用来创建对象的函数
 *  在对象中保存的值称为属性
 *  向对象添加属性
 *  - 语法: 对象.属性名 = 属性值;
 *  读取对象中的属性
 *  - 语法: 对象.属性名
 *  如果读取对象中没有的属性, 不会报错而是会返回undefined
 *  修改对象的属性
 *  - 语法: 对象.属性名 = 新值;
 *  删除对象打的属性
 *  - 语法: delete 对象.属性名;
 */
 var obj = new Object();
 
 console.log(obj);
```

向对象中添加属性: 

属性名: 

* 对象的属性不强制要求准守标识符的规范 

* 尽量按照标识符的规范去做 

如果要使用特殊的属性名, 不能采用.的方式来操作 

需要使用另外一种方式: 

`对象["属性名"] = 属性值;` 

使用`[]`这种形式去操作属性, 更加的**灵活** 

在`[]`中可以直接传递一个变量, 这样变量值时多少就会读取那个属性值 

属性值: 

JS对象的属性值, 可以是任意的数据类型 

甚至也可以是一个对象 

使用对象字面量, 可以创建对象 

`语法: {属性名: 属性值, 属性名: 属性值, ....};` 

如果要使用一些特殊的名字, 必须用引号包含 

属性名和属性值一组一组的名值对结构 

名和值之间使用`:`连接, 多个名值之间使用`,`隔开 

如果一个属性之后没有其他的属性了, 就不要写`,` 

# 数据类型 

当比较两个基本数据类型时, 就是比较字面值 

当比较两个引用数据类型时, 比较的是对象的内存地址 

如果两个对象一样, 但是内存地址不一样, 返回false 

## 基本数据类型 

`String/Number/Boolean/Null/Undefined` 

基本数据类型的值直接在栈内存中存储, 

值与值之间是独立存在, 修改一个变量不会影响其他的变量 

## 引用数据类型 

`Object` 

对象是保存到堆内存中的, 每创建一个新的对象, 就会在堆内存中开辟出一块新的空间 

而变量保存的是对象的内存地址(对象的引用) 

当两个变量都指向同一个对象, 其中一个变量的修改了对象, 另外一个也会受到影响 

# 函数 

* 函数也是一个对象 

* 函数中可以封装一些功能(代码), 在需要时可以执行这些功能 

* 函数中可以保存一些代码在需要的时候调用 

* 使用`typeof`检查一个函数对象时, 会返回`function` 

```JavaScript 
// 很少使用构造函数来创建函数对象 

// 可以创建一个函数对象 

// 可以将要封装的代码以字符串的形式传递给构造函数 

var fun = new Function("console.log('Hello');"); 

// 封装到函数中的代码不会立即执行 

// 函数中的代码会在函数调用的时候执行 

// 调用函数的语法: 函数对象(); 

// 当调用的函数的时候, 函数的中封装的代码会按照顺序执行 

// 具有所有普通对象的功能 

fun(); 
```

主要用以下两种方式: 

```JavaScript 
/*
 * 使用函数声明来创建一个函数
 * 语法:
 *  function 函数名([形参1, 形参2, ..., 形参N]){
 *      语句;
 *  }
 *  
 */
 function fun2(){
    console.log("这是我的第二个函数---");
 }
 // 这里可以不写分号, 因为是声明
 console.log(fun2);
 fun2();
```

```JavaScript 
/*
 * 使用函数表达式来创建一个函数
 * 语法:
 *  var 函数名 = function([形参1, 形参2, ..., 形参N]){
 *      语句;
 *  }
 *  
 */
 // 这里最好写上分号, 因为这是一个赋值语句
 var fun3 = function(){
    console.log("这是我的第二个函数---");
 };
 
 fun3();
```

## 函数的参数 

* 可以在函数的`()`中指定一个或者多个形参(形式参数) 

* 多个形参之间用`,`隔开, 声明形参就相当于在函数内部声明了对应的变量, 但是并不赋值 

* 可以将多个数据封装到一个对象中, 然后再传入函数当中 

* 可以将函数对象当做实参传入另外一个函数 

`函数名()` 

+ 调用函数 

+ 相当于使用的函数的返回值 

`函数名` 

+ 函数对象 

+ 相当于直接使用函数对象 

```JavaScript 
function sum(a, b){ 

console.log(a + b); 

} 

sum(1, 2); 

// 调用函数时解析器不会检查实参的类型 

// 函数的实参可以是任意的数据类型 

// sum(123, "hello"); // 123hello 

// 调用函数时, 解析器也不会检查实参的数量 

// 多余实参不会被赋值 

// 如果实参的数量少于形参的数量, 则没有对应实参的形参会被赋值undefined 
```

## 函数的返回值 

返回值可以是任意的数据类型 

也可以是一个对象, 也可以是一个函数 

```JavaScript 
function sum(a, b, c){ 
    return a + b + c; 
} 

var result = sum(4, 7, 8); 

console.log(result); 
```



`return` 后的语句不会执行 

`return;`和不写`return`语句相当于`return undefined;` 

`return`可返回任意类型的值 

```JavaScript 
function fun3(){ 

function fun4(){ 

alert("fun4"); 

} 

fun4(); 

} 

fun3(); 
```

```JavaScript 
function fun3(){ 

function fun4(){ 

alert("fun4"); 

} 

// 将fun4函数对象作为返回值返回 

return fun4; 

} 
a = fun3(); 
console.log(a); 
// 相当于调用fun4() 
a(); 
fun3()(); 
```



## 立即执行函数 

直接写匿名函数会报错, 但是如果加了括号就不会了 

立即执行函数: 

* 函数定义完立即被调用, 这种函数就叫做立即执行函数 

* 立即执行函数往往只会执行一次 

```JavaScript 
// 调用: 函数对象(); 

(function(){ 
	alert("Hello"); 
})();  
```

```JavaScript 
(function(a, b){ 
    console.log("a = " + a); 
    console.log("b = " + b); 
})(123, 456); 
```

## 对象的方法 

如果一个函数作为一个对象的属性保存 

那么我们称这个函数时这个对象的方法 

调用这个函数就是调用对象的方法`(method)` 

实际上只是名称上的区别, 没有其他区别 

```JavaScript 
obj.sayName = function(){ 
    console.log(obj.name); 
}; 

function fun(){ 
    console.log(obj.name); 
}; 

// 调用方法 
obj.sayName(); 

//调用函数 
fun(); 
```

遍历对象中的属性 

用`for 变量名 in 对象`语句 

```JavaScript 
var obj = { 
    name: "a", 
    age: 18, 
    address: "b", 
    gender: "男" 
}; 

for(var n in obj){ 
    console.log(n); // 属性名 
    console.log(obj[n]);// 属性值 
} 
```

## 作用域(旧标准)

作用域指一个变量的作用范围 

* 全局作用域 
  * 直接编写在`script`标签中的`JS`代码, 都是全局作用域 

  * 全局作用域在页面打开时创建, 在页面关闭时销毁 

  * 在全局作用域中有一个全局对象`window`, 他代表的是一个浏览器窗口, 他由浏览器创建我们可以直接使用 
  * 在全局作用域中: 
    * 创建的变量都会作为`window`对象的属性保存 
    * 创建的函数会作为`window`对象的方法保存 
  * 全局作用域中的变量都是全局变量, 在页面的任意的部分都可以访问到 

* 函数作用域 
  * 调用函数时创建函数作用域, 函数执行完毕之后, 函数作用域被销毁 
  * 每调用一次函数就会创建一个新的函数作用域, 互相独立 
  * 函数作用域中可以访问到全局作用域的变量 
  * 在全局作用域中无法访问到函数作用域中的变量 
  * 当在函数作用域操作一个变量会先在自身作用域中寻找, 如果有就直接使用, 如果没有则向上一级作用域中寻找, 同名互不干扰, 如果全局作用域中没有就会报错 
  * 在函数中要访问全局变量可以使用`window.变量名` 
  * 函数作用域中也有声明提前的特性 

* 使用`var`关键字声明的变量, 会在函数所有代码执行之前被声明, 函数声明也会提前 

* 在函数中, 不使用`var`声明的变量都会成为全局变量 

* 定义形参相当于在函数作用域中声明变量 

```JavaScript 
var c = 33; 

function fun5(){ 

console.log(c); 

c = 10; 

// 没有var关键字就会设置成为全局变量 

d = 100; 

} 

fun5(); 

console.log(c); 

console.log(d); 
```

### 变量声明提前 

* 使用`var`关键字声明的变量, 会在所有的代码执行之前被声明 

* 如果声明变量时不使用`var`关键字, 则变量不会被声明提前 

```JavaScript 
console.log(a); 

var a = 123; 
```



函数声明提前 

* 使用函数声明形式创建的函数`function 函数(){}`, 会在所有代码执行执行之前就被执行 

```JavaScript 
fun(); 

fun2(); // 报错, undefined is not a function 

// 函数声明, 会被提前 

function fun(){ 

console.log("我是一个fun函数"); 

} 

// 函数表达式, 不会被提前 

var fun2 = function(){ 

console.log("我是fun2函数"); 

}; 
```

## `this` 

解析器在调用函数每次都会向函数内部传递一个隐含的参数 

`this`指向一个对象, 这个对象我们称为函数执行的上下文 

根据函数调用方式不同, `this`会指向不同的对象 

* 以函数的形式调用, `this`永远是`window` 

* 以方法的形式调用, `this`就是调用方法的那个对象 

```JavaScript 
function fun(){ 

console.log(this.name); 

} 

var obj = { 

name: "a", 

sayName: fun 

}; 

fun(); 

obj.sayName(); 

```



## 使用工厂方法创建对象 

通过该方法可以大批量生产对象 

使用的构造函数都是`Object` 

所有对象都是`Object`类型的 

无法区分多种不同的对象 

```JavaScript 
function createPerson(name, age, gender){ 

var obj = new Object(); 

obj.name = name; 

obj.age = age; 

obj.gender = gender; 

obj.sayName = function(){ 
    console.log(this.name); 
} 

return obj; 

} 

var obj1 = createPerson("孙悟空", 18, "男"); 

console.log(obj1); 
```

## 构造函数创建对象 

构造函数就是一个普通的函数, 创建方式和普通函数没有区别 

不同的是构造函数习惯上首字母大写 

构造函数和普通函数的区别就是调用方式不同 

* 普通函数是直接调用 

* 而构造函数需使用`new`关键字来调用 

构造函数执行流程: 

1. 立刻创建一个新的对象 

2. 将新建的对象设置为函数中`this`, 在构造函数中可以用`this`来引用新家你的对象 

3. 逐行执行函数中的代码 

4. 将新建的对象作为返回值返回 

`this`就是新建的对象 

使用同一个构造函数创建的对象, 我们称为一类对象, 也将构造函数称为一个类 

一个构造函数创建的对象是该类的实例 

```JavaScript 
function Person(name, age, gender){ 

    this.name = name;
    this.age = age; 
    this.gender = gender; 
    this.sayName = function(){ 
        alert(this.name); 
	}; 
} 

// var per = Person(); // undefined 

var person = new Person(); 
```



使用`instanceof`可以检查一个对象是否是一个类的实例 

语法: `对象 instanceof 构造函数` 

所有对象都是`Object`的后代 

所有对象和`Object`进行类型检查都会返回`true` 

将函数定义在全局作用域中, 虽然节省了空间, 但是污染了全局作用域的命名空间 

定义在全局作用域中也很不安全 

```JavaScript 
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    //this.sayName = fun;
}

//function fun(){
//        alert(this.name);
//};

Person.prototype.sayName = function(){
    console.log(this.name);
}

var person = new Person();
```

## 原型`prototype` 

我们创建的每一个函数, 解析器都会向函数中添加一个属性`prototype` 

这个属性对应着一个对象, 这个对象就是我们所谓的原型对象 

如果函数作为普通函数调用`prototype`没有任何作用 

当函数通过构造函数调用时, 它所创建的对象中都会有一个隐含的属性指向该构造函数的原型对象 

可以通过`__proto__`来访问属性 

原型对象就相当于一个公共的区域, 所有同一类的实例都可以访问到这个原型对象 

可以将对象共有的内容同一设置到原型对象中 

当访问对象的一个属性或方法时 

* 先在自身中寻找, 如果有直接使用 

* 如果没有则去原型对象中寻找 

**创建构造函数时, 可以将对象共有的属性和方法, 同一添加到构造函数的原型对象中, **

**这样就不用分别为每一个对象添加, 也不会影响到全局作用域, 就可以使每个对象都具有这些属性和方法** 

```JavaScript 
function MyClass(){

}

MyClass.prototype.a = 123;
MyClass.prototype.sayHello = function(){
    alert("Hello");
};

var mc1 = new MyClass();
var mc2 = new MyClass();

mc1.a = "456";

console.log(MyClass.prototype);
console.log(mc2.__proto__ == MyClass.prototype);

console.log(mc1.a);
```



```JavaScript 
function MyClass(){
    
}

MyClass.prototype.name = "原型";

var mc = new MyClass();

console.log(mc.name);

// in检查对象中是否含有某个属性时, 如果对象中没有但是原型中有, 还是会返回true
console.log("name" in mc);

// 检查对象自己是否含有的属性
mc.hasOwnProperty();
console.log(mc.__proto__.__proto__);
```



`mc.__proto__` ---> `MyClass.prototype` 

`mc.__proto__.__proto__` ---> `Object` 

使用一个对象的属性或者方法时, 

自身中有就直接用 

如果没有就去原型中找, 如果有就用原型对象的 

如果没有则去原型的原型中找, 直到找到`Object`对象的原型, 

`Object`的原型没有原型, 如果在`Object`中依然没有找到, 则返回`undefined` 

`Object`的原型的原型是`null` 

## 垃圾回收`(GC)` 

当一个对象没有任何变量或者属性对他进行引用, 此时永远无法操作该对象 

这种对象就是一个垃圾, 这种对象过多会占用大量的内存 

`JS`中具有自动回收垃圾的机制, 会自动将没有引用的对象销毁 

我们不能也不需要进行手动的垃圾回收 

我们只需要将不再使用的对象设置为`null`即可 

## 函数对象的常用方法 

`this`的情况: 

1. 以函数的形式调用时, `this`永远都是`window` 

2. 以方法的形式调用时, `this`是调用方法的对象 

3. 以构造函数的形式调用时, `this`是新创建的那个对象 

4. 使用`call()`和`apply()`调用时, `this`是指定的那个对象 

`call()和apply()` 

这两个方法都是函数对象的方法, 需要通过函数对象来调用 

当对函数调用`call()`和`apply()`都会调用函数执行 

在调用`call()`和`apply()`可以将一个对象指定为第一个参数 

此时这个对象将会称为函数执行时的`this` 

不同点: 

`call()`方法可以将实参在对象之后一次传递 

`apply()`方法需要将实参封装到一个数组中同一传递 

```JavaScript 
function fun(){
    console.log("function");
}

fun.apply();
fun.call();
fun();
```

```JavaScript 
function fun(){
    console.log(this);
}

var obj = {
    name: "obj",
    sayName: function(){
        console.log(this.name);
    }
};
var obj2 = {name: "obj2"};

fun();// window
fun.call(obj);// object
fun.apply(obj);
obj.sayName.apply(obj2);// obj2
```



```JavaScript 
// call()方法可以将是实参在对象之后依次传递
function fun(a, b){
    console.log(a);
    console.log(b);
    console.log(this.name);
}

var obj = {
    name: "obj",
    sayName: function(){
        console.log(this.name);
    }
};

fun.call(obj, 2, 3);
fun.apply(obj, [2, 3]);
```

# 数组 

* 数组也是一个对象 

* 和普通对象功能相似, 也是用来存储一些值的 

* 不同的是普通对象是使用字符串作为属性名的, 而数组使用数字来作为索引操作元素 

* 数组的存储性能比普通对象好 

```JavaScript 
var arr = new Array();
// 使用typeof检查数组, 会返回object
console.log(typeof arr);
arr[0] = 10;
arr[1] = 11;
arr[2] = 33;
console.log(arr);

```

如果读取不存在的索引, 返回`undefined` 

获取数组的长度`arr.length` 

对于非连续的数组, 会返回最大索引+1 

修改`length`大于原长度, 则多出的部分会空出来 

修改`length`小于原长度, 则多出的部分会被删除 

```JavaScript 
// 使用字面量来创建数组
// 语法: []
var arr = [];
// 使用字面量创建数组, 可以在创建数组的时候就指定数组元素
var arr1 = [1, 2, 3, 4, 5, 6];
// 使用构造函数创建数组时, 也可以同时添加元素, 将要添加的元素作为构造函数的的参数传递
// 元素之间用 , 隔开
var arr2 = new Array(1, 2, 3, 4, 5, 6);
console.log(typeof arr);

// 创建一个数组, 数组中只有10一个元素
arr3 = [10];

// 创建一个长度为10的数组
arr4 = new Array(10);

var obj = {name: "swk"};
arr[arr.length] = obj;
arr = [{name:"swk"}, {name:"shs"}, {name:"zbj"}];

arr = [function(){alert(1)}, function(){alert(2)}]
```



数组中的元素可以是任意数据类型, 也可以是对象, 也可以是函数, 也可以放数组 

## 数组的常用方法 

`push()` 

* 该方法可以向数组的末尾添加一个或多个元素, 并返回新数组的长度 

* 可以将要添加的元素作为方法的参数传递 

```JavaScript 
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var result = arr.push("唐僧");
console.log(result);
```

`pop()` 

* 该方法可以删除数组的最后一个元素 

* 返回被删除的元素 

`unshift()` 

向数组的开头添加元素, 并且返回新的数组长度 

向前边插入元素以后, 其他元素索引会依次调整 

`shift()` 

删除数组的第一个元素, 并且返回被删除的元素 

`slice()` 

* 可以用来从数组中提取元素 

* 不会改变数组, 而是将截取到的元素封装到一个新数组中返回 

* `arrayObject.slice(start, end);` 
  * `start` 开始位置, **包含开始的索引** - 必须 
  * `end` 结束位置, **不包含结束的索引** - 可选, 不写的话从开始索引到最后一个 

* 索引可以传递负值, 从后往前 

`splice()` 

* 删除数组中的指定元素, 并且增加新的元素 

* 使用`splice()`会影响原数组, 会将指定的元素从原数组中删除, 并且返回被删除的元素 

* `arr.splice(0, 2);` 
  * 形参1: 表示开始位置的索引 
  * 形参2: 表示删除的数量 
  * 形参3及以后的参数: 传递新的元素, 这些元素会自动插入到开始位置的索引值位置前面 

`splice()`可以做:(1)删除指定索引的元素(2)在指定位置插入元素(3)截取前面的元素 

`concat()` 

可以连接两个或多个数组, 并将新的数组返回 

该方法不会对原数组进行操作 

```JavaScript 
var arr1 = ["孙悟空", "猪八戒", "沙和尚"]; 

var arr2 = ["白骨精", "玉兔精", "蜘蛛精"]; 

var arr3 = ["二郎神", "太上老君", "玉皇大帝"]; 

var result = arr1.concat(arr1, arr3, "牛魔王", "铁扇公主"); 

console.log(result); 
```

`join()` 

该方法可以将数组转换为一个字符串 

该方法不会对原数组产生影响, 而是将转换后的字符串作为结果返回 

在`join()`中可以指定一个字符串作为参数, 这个字符串将会成为数组元素的连接符 

如果不指定连接符, 则默认使用`,`作为连接符 

```JavaScript 
var arr1 = ["孙悟空", "猪八戒", "沙和尚"]; 

var arr2 = ["白骨精", "玉兔精", "蜘蛛精"]; 

var arr3 = ["二郎神", "太上老君", "玉皇大帝"]; 

result = arr1.join(); 

console.log(result); 
```

`reverse()` 

该方法用来反转数组 

该方法会直接修改原数组 

`sort()` 

可以用来对数组进行排序 

也会影响原数组, 默认会按照`Unicode`编码进行排序 

即使对于纯数字的数组, 使用`sort()`排序时, 也会按照`Unicode`编码进行排序 

可以在`sort()`中添加一个回调函数, 来指定排序规则 

* 回调函数需要定义两个形参 

* 浏览器将会分别使用数组中的元素作为实参去调用回调函数 

* 使用哪个元素调用不确定, 但是肯定的是数组中`a`一定在`b`前面 

* 浏览器会根据回调函数的返回值来决定元素的顺序 
  * 返回一个大于0的值, 则元素位置交换 
  * 返回一个小于0的值, 则元素位置不交换 
  * 返回一个等于0的值, 则元素位置不交换 

```JavaScript 
arr = [5, 3, 2, 1, 3, 4, 7, 4, 3, 9, 0];
arr.sort(function (a, b) {
    // if (a > b) {
    //     return 1;
    // } else if (a < b) {
    //     return -1;
    // } else {
    //     return 0;
    // }
    // 升序排列
    return a - b;
});

console.log(arr);
```

## 数组的遍历 

```JavaScript 
var arr = ["孙悟空", "猪八戒", "沙和尚"];
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
```



`forEach()` 

`IE8`及以下的浏览器不支持 

这种函数由我们创建但是不由我们调用的, 称为**回调函数** 

* 数组中有几个元素函数就会执行几次, 每次执行时, 浏览器会将遍历到的元素以实参的形式传递进来, 我们可以来定义形参, 来读取这些内容 

* 浏览器会在回调函数中传递三个参数: 
  * 数组中的正在遍历的元素`value` 
  * 正在遍历的元素的索引`index` 
  * 正在遍历的数组`obj` 

`forEach(value, index, obj){}` 

```JavaScript 
var arr = ["孙悟空", "猪八戒", "沙和尚"];
arr.forEach(function(){
    console.log("hello");
});
```



# `arguments` 

在调用函数时, 浏览器每次都会传递进两个隐含的参数 

1. 函数的上下文对象`this` 

2. 封装实参的对象`arguments` 

* `arguments`是一个**类数组对象**, 他也可以通过索引来操作 

* 在调用函数时, 我们所传递的实参都会封装在`arguments`中保存 

* `arguments.length`可以用来获取实参的长度 

* 即使不定义形参也可以通过`arguments`来操作传入实参 

* 里面的有个对象叫做`callee`, 这个属性对应一个函数对象, 就是当前正在指向的函数对象 

```JavaScript 
function fun(){
    console.log(arguments);
}
fun();
```



# `Date`对象 

在`JS`中使用`Date`对象来表示一个时间 

如果直接使用构造函数创建一个`Date`对象, 则会封装为当前的时间 

```JavaScript 
var d = new Date(); 

// 创建一个指定的时间对象 

// 需要在构造函数中传递一个表示时间的字符串作为参数 

// 日期格式: 月份/日/年 时:分:秒 

var d2 = new Date("12/03/2019 11:10:00"); 

console.log(d); 
```

* `getDate()` 

获取当前日期对象是几号 

* `getDay()` 

获取当前日期对象是星期几 

会返回一个0-6的值, 0表示周日 

* `getMonth()` 

获取当前日期对象的月份 

会返回一个0-11的值, 0表示1月 

* `getFullYear()` 

获取当前日期的年份 

* `getTime()` 

获取当前日期对象的时间戳 

时间戳, 指的是从格林威治标准时间1970/01/01 00:00:00到当前日期所花费的毫秒数 

(1秒 = 1000毫秒) 

* `Date.now()` 

获取当前的时间戳 

# `Math` 

`Math`和其他对象不同, 不是一个构造函数 

属于一个工具类, 不用创建对象, 里面封装了数学运算相关的属性和方法 

`Math.PI` - 表示圆周率 

* `Math.abs(x)` 

可以用来计算一个数的绝对值 

* `Math.ceil()` 

可以对一个数进行向上取整 

* `Math.floor()` 

可以对一个数进行向下取整 

* `Math.round()` 

可以对一个数进行四舍五入 

* `Math.random()` 

生成`0-1`之间的随机数, 取值范围`(0, 1)` 

生成`0-x`之间的随机数, `Math.round(Math.random() * x)` 

生成`x-y`之间的随机数, `Math.round(Math.random() * (y - x) + x)` 

* `Math.max()` 

可以获取多个数中的最大值 

* `Math.min()` 

可以获取多个数中的最小值 

* `Math.pow(x, y)` 

返回`x`的`y`次幂 

* `Math.sqrt(x)` 

返回`x`的平方根 

# 包装类 

在`JS`中提供了三个包装类, 通过这三个包装类可以将基本数据类型转换为对象 

在实际应用中基本不会使用基本数据类型的对象, 因为在做比较的时候会出现不可预期的结果 

* `String()` 

可以将基本数据类型字符串转换为`String`对象 

* `Number()` 

可以将基本数据类型数字转换为`Number`对象 

* `Boolean()` 

可以将基本数据类型布尔值转换为`Boolean`对象 

```JavaScript 
var num = new Number(3);
var num2 = new Number(3);
var st = new String("hello");
var bool = new Boolean(true);
var bool2 = true;

num.hello = "abcsd";

console.log(num.hello);
console.log(num == num2);// false, 两个对象, 比较的是内存地址
console.log(bool == bool2);// true, 进行自动类型转换

var b = new Boolean(false);// 传入的是对象, 所以先转换为布尔值再判断
if(b){
    console.log("run");
}

// 方法和属性只能添加给对象, 不能添加给基本数据类型
// 当对一些基本数据类型的值去调用属性和方法时
// 浏览器会临时使用包装类将其转换为对象, 然后再调用对象的属性和方法
// 调用完了以后, 再将其转换为基本数据类型-
var s = 123;
s = s.toString();
```

# `String`对象方法 

基本都不会影响原字符 

字符串底层是以字符数组的形式保存的 

`str.length` 

获取字符串的长度 

`str.charAt()` 

返回指定位置的字符 

`str.charCodeAt()` 

返回指定位置字符编码(`Unicode编码`) 

`String.formCharCode()` 

根据字符编码去获取字符 

`concat()` 

可以用来连接两个或多个字符串 

作用和`+`一样 

`indexOf()` 

可以检索一个字符串中是否含有指定内容 

如果字符串中含有该内容, 则会返回其第一次出现的索引 

如果没有找到, 就会返回-1 

可以指定第二个参数, 指定开始查找的位置 

`lastIndexOf()` 

该方法的用法和`indexOf()`一样 

不同的是`indexOf`是从前往后找 

而`lastIndexOf`是从后往前找 

也可以指定开始查找的位置 

`slice()` 

截取字符串指定内容 

不会影响原字符串, 而是将截取到的内容返回 

参数: 

* 形参1: 开始位置的索引(包括开始位置) 

* 形参2: 结束位置的索引(不包括结束位置) 

如果省略第二个参数, 则会截取后边所有 

也可以传递负数作为参数, 负数的话从后边开始计算 

`substring()` 

可以用来截取一个字符串, 和`slice()`类似 

参数: 

* 形参1: 开始截取位置的索引(包括开始位置) 

* 形参2: 结束位置的索引(不包括结束位置) 

* 与`slice()`不同的是: 不能接受负值作为参数, 如果传递了负数, 则默认为0 

* 自动跳转参数的位置, 如果第二个参数小于第一个, 自动交换 

`substr()` 

用来截取一个字符串 

参数: 

* 形参1: 开始位置的索引 

* 形参2: 截取长度 

`split()` 

可以将一个字符串拆分为一个数组 

参数: 一个字符串作为参数, 会根据该字符串去拆分数组 

返回一个数组 

传递一个空串作为参数, 将会把每个字符都拆分为数组的一个元素 

`toUpperCase()` 

将一个字符串转换为大写并返回 

`toLowerCase()` 

将一个字符串转换为小写并返回 

# 正则表达式 

正则表达式用于定义一些字符串的规则 

计算机可以根据正则表达式, 来检查一个字符串是否符合规则 

获取字符串中符合规则的内容 

语法: `var 变量 = new RegExp("正则表达式", "匹配模式");` 

使用`typeof`检查正则对象, 会返回`object` 

匹配模式: 

* `i` --- 忽略大小写 

* `g` --- 全局匹配模式 

```JavaScript 
// 创建正则表达式的对象 

// 检查字符串是否有a, 严格区分大小写 

var reg = new RegExp("a"); 

var str = "a"; 
```



使用字面量创建正则表达式 

语法: `var 变量 = /正则表达式/匹配模式` 

```JavaScript 
var reg = /a/i; 

console.log(reg.test("abc")); 
```

使用字面量的方式创建更加简单 

使用构造函数创建更加灵活 

创建一个正则表达式, 检查一个字符串是否有`a`或`b` 

使用`|`表示或者的意思 

```JavaScript 
var reg = /a|b/; 

console.log(reg.test("abc")); 
```



创建一个正则表达式, 检查一个字符串是否有字母 

`[]`里面的内容也是或的关系 

`[a-z]` 任意小写字母 

`[A-Z]` 任意大写字母 

`[A-z]` 任意字母 

`[0-9]` 任意数字 

```JavaScript 
var reg = /[a-z]/; 
```



创建一个正则表达式, 检查一个字符串是否有`abc`或`adc`或`aec` 

```JavaScript 
var reg = /a[bde]c/; 
```

`[^]`除了 

```JavaScript 
var reg = /[^ab]/; 

console.log(reg.test("abc"));// true  
```

正则表达式的方法: 

`test()` 

使用这个方法可以检查一个字符串是否符合正则表达式的规则 

符合返回`true`, 否则返回`false` 

## 字符串和正则表达式相关的方法 

`split()` 

方法中可以传递正则表达式作为参数, 方法会根据正则表达式来拆分 

```JavaScript 
var str = "1a2b3c4d5e6f7g8"; 

var result = str.split(/[A-z]/); 

console.log(result); 
```

 `search()` 

搜索字符串中是否含有指定内容 

如果搜索到指定内容, 则会返回第一次出现的索引, 如果没有就会返回-1 

方法中可以传递正则表达式作为参数, 方法会根据正则表达式来搜索 

```JavaScript 
var str = "hello abc hello abc"; 

var result = str.search("abcd"); 
```

`match()` 

可以根据正则表达式, 从一个字符串中将符合条件的内容提取出来 

默认情况下只会找到第一个符合要求的内容 

可以设置为全局匹配模式, 这样就会匹配到所有内容 

可以为一个正则表达式设置多个匹配模式, 顺序无关紧要 

`match()`会将匹配到的内容封装到一个数组中, 即使只查询到一个 

`replace()` 

参数: 

* 形参1: 替换的内容, 可以传入正则表达式

* 形参2: 新的内容 



正则表达式中的量词

`{}`表示多个重复的量词

只对前面最靠近的一个元素(括号内)起作用

`{m, n}` 正好m~n次

`{m, }` m次以上



`n+`表示至少一个, 相当于`{1, }`

```JavaScript
var reg = /ab+c/;

console.log(reg.test("abc"));
```

`n*`表示任意个, 相当于`{0, }`

`n?`表示0个或1个, 相当于`{0, 1}`



`^n`表示以n开头

`n$`表示以n结尾

如果在正则表达式中同时使用`^`和`$`则要求字符串完全符合正则表达式

`^n$` —> 完全和n相同

n开头或n结尾 --> `^n|n$`



```JavaScript
/**
 *	手机号规则(11位)
 *		1. 以1开头
 *		2. 第二位3-9任意数字
 *		3. 三位以后任意数字9个
 *		
 *	^1[3-9][0-9]{9}$
 */
var phoneReg = /^1[3-9][0-9]{9}$/;
```



检查字符串中是否含有`.`

`.`表示任意字符

在正则表达式中用`\`作为转义字符

注意: 使用构造函数时, 由于他的参数是一个字符串, `\`也是转义字符

如果要使用`\`则需要用`\\`代替

```JavaScript
var reg = /\./;


reg = /\\/;

reg = new RegExp("\\.");

console.log(reg.test("@$@#!#"));
```

```JavaScript
/**
 *	\w - 表示任意字母/数字和_ - [A-z0-9_]
 *	\W - 除了字母/数字和_ - [^A-z0-9_]
 *	\d - 任意数字 - [0-9]
 *	\D - 除了数字 - [^0-9]
 *	\s - 空格
 *	\S - 除了空格
 *	\b - 单词边界
 *	\B - 除了单词边界
 */
var reg = /\bchild\b/;

// 去除字符串前后的空格
str = str.replace(/^\s*|\s*$/g, "");


```

电子邮件

```JavaScript
var emailReg = /^\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2, 5}){1, 2}$/;

```

# 宿主对象

`DOM` - `Document Object Model` 文档对象模型

通过`JS`来操作HTML网页

Node节点 - 构成HTML文档最基本的单元

* 文档节点: 整个HTML文档
* 元素节点: HTML文档中的HTML标签
* 属性节点: 元素的属性
* 文本节点: HTML标签中的文本内容

|          | nodeName   | nodeType | nodeValue |
| -------- | ---------- | -------- | --------- |
| 文档节点 | \#document | 9        | null      |
| 元素节点 | 标签名     | 1        | null      |
| 属性节点 | 属性名     | 2        | 属性值    |
| 文本节点 | \#text     | 3        | 文本内容  |

```html
<!DOCTYPE html>

<head>
    <title>Document</title>
</head>

<body>
    <button id="btn">Btn</button>
    <script type="text/javascript">
        /**
         * 浏览器已经为我们提供文档节点 这个对象就是window属性
         * 可以在页面中直接使用, 文档节点代表的是整个网页
         * 
         */
        var btn = document.getElementById("btn");
        console.log(btn.innerHTML);
        btn.innerHTML = "I'm a Button"
    </script>
</body>

</html>
```

事件就是用户和浏览器之间的交互行为

```html
<!DOCTYPE html>

<head>
    <title>Document</title>
</head>
<!-- 将事件处理逻辑直接编写到标签当中
     当事件被触发的时候, 代码将会执行
     这种写法称为结构和行为耦合, 不方便维护 -->

<body>
    <!-- <button id="btn1" onclick="alert('You click the button1');">Btn1</button> -->
    <button id="btn">Btn</button>
    <script type="text/javascript">
        var btn = document.getElementById("btn");
        /**
         * 可以为按钮对应事件绑定处理函数的形式来响应事件
         * 当事件被触发时, 其对应函数将会被调用, 回调函数
         */

        // 绑定一个单击事件
        // 单击响应函数
        btn.onclick = function(){
            alert("btn");
        };
    </script>
</body>

</html>
```

浏览器加载页面是自上而下

读取到一行就运行一行, 如果将`script`标签写在`head`标签中, 将会导致代码在执行时, 页面还没有加载的情况出现

```html
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body>
    <button id="btn">Btn</button>
    <script type="text/javascript">
        var btn = document.getElementById("btn");

        btn.onclick = function(){
            alert("hello");
        };
    </script>
</body>

</html>
```

`onload`事件会在整个页面加载完成之后才触发, 为`window`绑定一个`onload`事件, 该事件对应的响应函数将会在页面加载完成之后执行, 这样可以确保代码执行时所有的DOM对象已经加载完毕了

```html
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
    <script type="text/javascript">
        window.onload = function(){
            var btn = document.getElementById("btn");
    
            btn.onclick = function(){
                alert("hello");
            };
        };
    </script>
</head>

<body>
    <button id="btn">Btn</button>
</body>

</html>
```

最优写法: 写在下边, 因为写在上面的话, 先加载了代码, 但是没有执行, 影响下面的页面加载

`getElementById()`

通过id属性获取一个元素节点对象

`getElementsByTagName()`

通过标签名获取**一组**元素节点对象

`getElementsByName()`

通过`name`属性获取**一组**元素节点对象



`innerHTML`用于获取元素内部的HTML代码

对于自结束标签, 这个属性没有意义

如果需要读取元素节点属性, 直接使用`元素.属性名`

注意: `class`属性不能采用这种方式, 读取`class`属性时需要使用元素`.className`

```html
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        * {
            margin: 0px;
            padding: 0px;
        }

        #outer {
            width: 250px;
            margin: 50px auto;
            padding: 30px;
            background-color: greenyellow;
            text-align: center;
        }
    </style>

    <script>
        window.onload = function () {
            var img = document.getElementsByTagName("img")[0];
            var imgArr = ["img/1.jpeg", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png"];
            var index = 0;

            var info = document.getElementById("info");
            function setText(){
                info.innerHTML = "一共有" + imgArr.length + "张图片, 当前是第" + (index + 1) + "张";
            }
            setText();

            var prevBtn = document.getElementById("prev");
            prevBtn.onclick = function () {
                index--;
                if (index < 0) {
                    index = imgArr.length - 1;
                }
                img.src = imgArr[index];
                setText();
            };

            var nextBtn = document.getElementById("next");
            nextBtn.onclick = function () {
                index++;
                if (index > imgArr.length - 1) {
                    index = 0;
                }
                img.src = imgArr[index];
                setText();
            };
        };
    </script>
</head>

<body>
    <div id="outer">
        <p id="info"></p>
        <img src="img/1.jpeg" alt="person_pic" />

        <button id="prev">
            <上一张</button> <button id="next">下一张>
        </button>
    </div>

</body>

</html>
```

## 获取元素节点的子节点

通过具体的元素节点调用

1. `getElementsByTagName()`
   * 方法, 返回当前节点指定标签名后代节点
2. `childNodes`
   * 属性, 表示当前节点的所有子节点
   * `childNodes`会获取包括文本节点在内的节点
   * 根据DOM标签之间的空白也会当成文本节点
   * 注意IE8以下的浏览器不会将空白文本算作子节点
   * `children`属性会获取当前元素的所有子元素
3. `firstChild`
   * 属性, 表示当前节点的第一个子节点
   * `firstElementChild`获取当前元素的第一个子元素
     * 不支持IE8以下的浏览器
4. `lastChild`
   * 属性, 表示当前节点的最后一个子节点

## 获取元素节点的父节点和兄弟节点

`innerText`

可以获取元素内部的文本内容

他和`innerHTML`类似, 不同的是它会自动将`html`去除

1. `parentNode`
   * 属性, 表示当前节点的父节点
   * 父节点必然是单一的
2. `previousSibling`
   * 属性, 表示当前节点的前一个兄弟节点
   * 也可能获取到空白文本
   * `previousElementSibling`获取前一个兄弟元素, 不包括空白文本
   * IE8及以下不支持
3. `nextSibling`
   * 属性, 表示当前节点的后一个兄弟节点



## 全选反选全不选功能

```html
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html">
    <title>全选</title>
    <script type="text/javascript">
        window.onload = function () {
            let items = document.getElementsByName("items");
            let checkedAllBox = document.getElementById("checkedAllBox");
            for (let i = 0; i < items.length; i++) {
                items[i].onclick = function(){
                    checkedAllBox.checked = true;
                    for (let j = 0; j < items.length; j++) {
                        if (!items[j].checked) {
                            checkedAllBox.checked = false;
                            break;
                        }
                    }
                };
            }

            /**
             * 全选
             * 点击按钮以后， 四个多选框都选中
             */
            const checkedAllBtn = document.getElementById("checkedAllBtn");
            checkedAllBtn.onclick = function () {
                for (let i = 0; i < items.length; i++) {
                    items[i].checked = true;
                }
                checkedAllBox.checked = true;
            };

            const checkedNoBtn = document.getElementById("checkedNoBtn");
            checkedNoBtn.onclick = function () {
                for (let i = 0; i < items.length; i++) {
                    items[i].checked = false;
                }
                checkedAllBox.checked = false;
            };

            const checkedRevBtn = document.getElementById("checkedRevBtn");
            checkedRevBtn.onclick = function () {
                checkedAllBox.checked = true;
                for (let i = 0; i < items.length; i++) {
                    items[i].checked = !items[i].checked;
                    if (!items[i].checked) {
                        checkedAllBox.checked = false;
                    }
                }
            };

            const sumbitBtn = document.getElementById("submitBtn");
            sumbitBtn.onclick = function () {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].checked) {
                        alert(items[i].value);
                    }
                }
            };

            // 给谁绑定， this就是谁
            checkedAllBox.onclick = function () {
                for (let i = 0; i < items.length; i++) {
                    items[i].checked = this.checked;
                }
            };
        };
    </script>
</head>
<body>
<form method="post" action="">
    你爱好的运动是？<input type="checkbox" id="checkedAllBox"/>全选/全不选
    <br/>
    <input type="checkbox" name="items" id="footballBox" value="足球"/> 足球&nbsp;
    <input type="checkbox" name="items" id="basketballBox" value="篮球"/> 篮球&nbsp;
    <input type="checkbox" name="items" id="badmintonBox" value="羽毛球"/> 羽毛球&nbsp;
    <input type="checkbox" name="items" id="tableTennisBox" value="乒乓球"/> 乒乓球&nbsp;
    <br/>
    <input type="button" id="checkedAllBtn" value="全 选"/>
    <input type="button" id="checkedNoBtn" value="全不选"/>
    <input type="button" id="checkedRevBtn" value="反 选"/>
    <input type="button" id="submitBtn" value="提 交"/>
</form>
</body>
</html>
```

## 获取`body`标签

```JavaScript
var body = document.getElementsByTagName("body");
/*
 *	在document中有一个属性body, 保存的是body的引用
 */
var body = document.body;
var html = document.documentElement;

// document.all代表所有的元素
// 两条语句一样的效果
var all = document.all;
all = document.getElementsByTagName("*");
console.log(all.length);
```

根据元素的`class`属性值查询一组元素节点对象

`getElementsByClassName()`可以根据class属性值获取元素

但是该方法不支持IE8及以下的浏览器

`document.querySelector()`

需要一个选择器的字符串作为参数, 可以根据一个CSS选择器来查询一个元素节点对象

使用该方法只会返回第一个

`document.querySelectorAll()`

该方法和`querySelector()`一样, 不同的是他会将符合条件的元素封装到数组中返回

即使符合条件的元素只有一个, 也会返回一个集合

## `DOM`增删改

`appendChild()`

把新的子节点添加到指定节点

`removeChild()`

删除子节点

语法: 父节点.removeChild(子节点);

`replaceChild()`

替换子节点

语法: 父节点.replaceChild(新节点, 旧节点);

`insertBefore()`

在指定子节点前面插入新的子节点

语法: 父节点.insertBefore(新节点, 旧节点);

`createElement()`

创建元素节点

语法: document.createElement(字符串);

`createTextNode()`

创建文本节点

语法: document.createTextNode(字符串);

```javascript
var li = document.createElement("li");
var gzText = document.createTextNode("广州");
li.appendChild(gzText);
```

**常用: 子节点.parentNode = 父节点**

使用innerHTML也可以完成DOM相关的增删改

一般会两种方式结合使用,

```javascript
var li = document.createElement("li");
li.innerHTML = "广州";
city.appendChild(li);
```



For循环和响应点击函数的执行时机不一样

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html">
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function delA() {
            let tr = this.parentNode.parentNode;
            // let name = tr.getElementsByTagName("td")[0].innerHTML;
            let name = tr.children[0].innerHTML;
            if (confirm("确认删除" + name + "吗？")) {
                tr.parentNode.removeChild(tr);
            }
        }

        window.onload = function () {
            var allA = document.getElementsByTagName("a");
            for (let i = 0; i < allA.length; i++) {
                /**
                 * 下面的a标签中如果不写href="javascript:"
                 * 需要在onclick中添加return false; 取消超链接默认行为
                 * 两种方式都行
                 */
                allA[i].onclick = delA;
            }

            const addEmpBtn = document.getElementById("addEmpBtn");
            addEmpBtn.onclick = function () {

                let tr = document.createElement("tr");

                let name = document.getElementById("empName").value;
                let email = document.getElementById("email").value;
                let salary = document.getElementById("salary").value;

                tr.innerHTML = "<td>" + name + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>" + salary + "</td>" +
                    "<td><a href='javascript:;'>Delete</a></td>";

                let a = tr.getElementsByTagName("a")[0];
                a.onclick = delA;

                let employeeTable = document.getElementById("employeeTable");
                let tbody = employeeTable.getElementsByTagName("tbody")[0];
                tbody.appendChild(tr);
            }
        };
    </script>
</head>
<body>
<table id="employeeTable">
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Salary</th>
        <th>&nbsp;</th>
    </tr>
    <tr>
        <td>Tom</td>
        <td>tom@tom.com</td>
        <td>5000</td>
        <td><a href="javascript:">Delete</a></td>
    </tr>
    <tr>
        <td>Bob</td>
        <td>bob@tom.com</td>
        <td>10000</td>
        <td><a href="javascript:">Delete</a></td>
    </tr>
    <tr>
        <td>Jerry</td>
        <td>jerry@sohu.com</td>
        <td>8000</td>
        <td><a href="javascript:">Delete</a></td>
    </tr>
</table>
<div id="formDiv">
    <h4>添加新员工</h4>
    <table>
        <tr>
            <td class="word">name:</td>
            <td class="inp">
                <input type="text" name="empName" id="empName"/>
            </td>
        </tr>
        <tr>
            <td class="word">email:</td>
            <td class="inp">
                <input type="text" name="email" id="email">
            </td>
        </tr>
        <tr>
            <td class="word">salary:</td>
            <td class="inp">
                <input type="text" name="salary" id="salary">
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <button id="addEmpBtn" value="addEmpBtn">
                    Submit
                </button>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
```



JS修改元素样式

语法: `元素.style.样式名 = 样式值;`

注意: 如果CSS的样式中含有`-`, 在`JS`中是不合法的, 需要改成驼峰命名法

通过style属性的修改的样式是内联样式, 内联样式的优先级比较高

如果在样式中有`!important`, 这样该样式拥有最高的优先级

通过style属性设置和读取的都是内联样式, 无法读取样式表中的样式

```html
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript">
        window.onload = function () {
            let box01 = document.getElementById("box01");

            let btn01 = document.getElementById("btn01");
            btn01.onclick = function () {
                box01.style.width = "300px";
                box01.style.height = "300px";
                box01.style.backgroundColor = "yellow";
            };
        };
    </script>
    <style type="text/css">
        #box01 {
            width: 200px;
            height: 200px;
            background-color: red;
        }
    </style>
</head>

<body>
    <button id="btn01">change color</button>
    <br /><br />
    <div id="box01"></div>
</body>

</html>
```

currentStyle只有IE浏览器支持, 能读取元素当前的样式

在其他的浏览器中可以用`getComputedStyle()`来获取

这个方法是window的方法, 可以直接使用

需要两个参数

参数1: 获取样式的元素

参数2: 可以传递一个伪元素, 一般都传null

该方法会返回一个对象, 对象中封装了当前元素对应的样式

可以通过对象.样式名来读取样式

如果获取样式没有设置, 则会获取到真实的值, 而不是默认值

比如: 没有设置width, 不会获取到auto

该方法不支持IE8以下, IE8用currentStyle



```html
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript">
        window.onload = function () {
            let box01 = document.getElementById("box01");

            let btn01 = document.getElementById("btn01");
            btn01.onclick = function () {
                // currentStyle只有IE浏览器支持
                alert(box01.currentStyle.width);
            };
        };
    </script>
    <style type="text/css">
        #box01 {
            width: 200px;
            height: 200px;
            background-color: red;
        }
    </style>
</head>

<body>
    <button id="btn01">change color</button>
    <br /><br />
    <div id="box01"></div>
</body>

</html>
```

通过getComputedStyle()和currentStyle获取的属性都是只读的

不能修改, 如果要修改的话必须通过style属性



## 其他样式操作的属性

`clientWidth`/`clientHeight` 

这两个属性可以获取元素的可见宽度和高度

这些属性都是不带px的, 返回都是一个数字, 可以直接进行计算

会获取元素的宽度和高度, 包括内容区和内边距

这些属性都是只读的, 不能修改

`offsetHeight`/`offsetWidth`

获取元素整个宽度和高度, 包括内容区, 内边距和边框

`offsetParent`

可以用来获取当前元素的定位父元素

会获取到离当前元素最近的开启了定位的祖先元素

如果所有的祖先元素都没有开启定位, 则返回`body`

`offsetLeft`

当前元素相对于其定位父元素的水平偏移量

`offsetTop`

当前元素相对于其定位父元素的垂直偏移量

`scrollWidth`/`scrollHeight`

可以获取元素整个滚动区域的宽度和高度

`scrollLeft`

可以获取水平滚动条滚动的距离

`scrollTop`

可以获取垂直滚动条滚动的距离

当满足scrollHeight - scrollTop == clientHeight时, 说明垂直滚动条滚动到底了

当满足scrollWidth - scrollLeft == clientWidth时, 说明水平滚动条滚动到底了

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #box1 {
            width: 100px;
            height: 100px;
            background-color: red;
            padding: 10px;
            border: 10px solid yellow;
        }

        #box2 {
            padding: 100px;
            background-color: #bfa;
        }

        #box4 {
            width: 200px;
            height: 300px;
            background-color: #bfa;
            overflow: auto;
        }

        #box5 {
            width: 500px;
            height: 600px;
            background-color: yellow;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let btn = document.getElementById("btn");
            let box1 = document.getElementById("box1");
            let box4 = document.getElementById("box4");
            btn.onclick = function () {
                // alert(box1.clientHeight);
                // alert(box1.offsetWidth);
                let op = box1.offsetParent;
                alert(op);
                alert(box4.scrollHeight);
                alert(box4.scrollLeft);
            };
        }
    </script>
</head>

<body>
    <button id="btn">click to get attr</button>
    <br /><br />
    <div id="box4">
        <div id="box5">

        </div>
    </div>
    <br /><br />
    <div id="box3">
        <div id="box2" style="position:relative;">
            <div id="box1"></div>
        </div>
    </div>
</body>

</html>
```

`onscroll`事件: 当滚动条滚动时触发



```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #info {
            width: 180px;
            height: 500px;
            background-color: #bbffaa;
            overflow: auto;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let info = document.getElementById("info");
            let form = document.getElementsByTagName("input");
            info.onscroll = function () {
                if (info.scrollHeight - info.scrollTop == info.clientHeight) {
                    form[0].disabled = false;
                }
            };
            form[0].onclick = function () {
                form[1].disabled = false;
            };
        };
    </script>
</head>

<body>
    <h4>用户协议, 请仔细阅读。</h4>
    <p id="info">
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
        用户协议, 请仔细阅读。
    </p>
    <input type="checkbox" id="checkbox" disabled="disabled" />我已仔细阅读
    <input type="submit" value="注册" disabled="disabled" />
</body>

</html>
```



```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        div {
            width: 300px;
            height: 0px;
            border: 1px solid black;
        }

        #areaDiv {
            height: 100px;
        }

        #showMsg {
            margin-top: 20px;
            height: 50px;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let areaDiv = document.getElementById("areaDiv");
            let showMsg = document.getElementById("showMsg");

            // onmousemove - 该事件会在鼠标在元素中移动触发
            /**
             * 事件对象
             *  - 当事件的响应函数被触发时, 浏览器每次都会将一个事件对象作为实参传递进响应函数
             *    在事件对象中封装了当前事件相关的一切信息, 比如鼠标的坐标, 键盘哪个按键被按了
             */
            areaDiv.onmousemove = function (event) {

                // 在IE8中, 响应函数被触发时, 浏览器不会传递事件对象
                // 在IE8及以下的浏览器中, 是将事件对象作为window对象保存

                // if (!event) {
                //     event = window.event;
                // }

                event = event || window.event;

                // clientX 可以获取鼠标指针的水平坐标
                // clientY 可以获取鼠标指针的垂直坐标
                let x = event.clientX;
                let y = event.clientY;

                // alert("x = " + x + ", y = " + y);
                showMsg.innerHTML = "x = " + x + ", y = " + y;
            };
        }
    </script>
</head>

<body>
    <div id="areaDiv"></div>
    <div id="showMsg"></div>
</body>

</html>
```

事件的委派

事件统一绑定给元素的共同的祖先元素, 这样当后代元素上的事件触发时, 会一直冒泡到祖先元素, 从而通过祖先元素的响应函数来处理事件, 事件委派是利用了冒泡, 通过委派可以减少事件绑定的次数, 提高程序的性能

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <script type="text/javascript">
        window.onload = function () {
            let add = document.getElementById("add");
            let u1 = document.getElementById("u1");
            add.onclick = function () {
                let newLi = document.createElement("li");
                newLi.innerHTML = "<a href='javascript:' class='link'>Link_1</a>"
                u1.appendChild(newLi);
            };

            /**
             *  事件的委派
             *  指将事件统一绑定给元素的共同的祖先元素, 
             *	这样当后代元素上的事件触发时, 会一直冒泡到祖先元素 
             *  从而通过祖先元素的响应函数来处理事件
             *  事件委派是利用了冒泡, 通过委派可以减少事件绑定的次数, 提高程序的性能
             */
            u1.onclick = function (event) {
                event = event || window.event;
                // target - event中的target表示触发事件的对象
                if(event.target.className == "link") {
                    alert("you clicked the link");
                }
            };
        }
    </script>
</head>

<body>
    <button id="add">添加超链接</button>
    <ul id="u1">
        <li><a href="javascript:" class="link">Link_1</a></li>
        <li><a href="javascript:" class="link">Link_2</a></li>
        <li><a href="javascript:" class="link">Link_3</a></li>
    </ul>
</body>

</html>
```

事件的绑定

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <script type="text/javascript">
        window.onload = function(){
            let btn01 = document.getElementById("btn01");
            // btn01.onclick = function(){
            //     alert(1);
            // }

            /**
             * addEventListener()
             * - 通过这个方法也可以为元素绑定响应函数
             * - 参数:
             *      1. 事件的字符串, 不用在前面添加on
             *      2. 回调函数, 当事件触发时该函数会被调用
             *      3. 是否在捕获阶段触发事件, 需要一个布尔值, 一般都传入false
             * 
             * 使用addEventListener()可以同时为一个元素的相同事件同时绑定多个响应函数
             * 当事件被触发时, 响应函数会按照事件的顺序触发
             * 
             * 不支持IE8及以下的浏览器
             */
            btn01.addEventListener("click", function () {
                alert(1);
            }, false);
            btn01.addEventListener("click", function () {
                alert(2);
            }, false);
            
            /**
             *  在IE8中可以用attachEvent()来绑定事件
             *  参数:
             *      1. 事件的字符串, 前面要加on
             *      2. 回调函数
             *  这个方法也可以同时为一个事件绑定多个处理函数
             *  不同的是它是后绑定先执行, 执行顺序和addEventListener()相反
             */
            // btn01.attachEvent("onclick", function(){
            //     alert(1);
            // });

            /**
             * addEventListener()中的this, 是绑定事件的对象
             * attachEvent()中的this, 是window
             * 需要统一两个方法的this
             * 定义一个函数, 用来为指定元素绑定响应函数
             * 参数:
             *      object 绑定事件的对象
             *      eventStr 事件的字符串
             *      callback 回调函数
             */
            function bind(object, eventStr, callback) { 
                if (object.addEventListener) {
                    object.addEventListener(eventStr, callback, false);
                } else {
                    /**
                     * this是谁由调用方式决定
                     * callback.call(object);
                     */
                    object.attachEvent("on" + eventStr, function () {
                        callback.call(object);
                    });
                }
            }
        }
    </script>
</head>

<body>
    <button id="btn01">click</button>
</body>

</html>
```

事件的传播

关于事件的传播微软和网景有不同的设计

   * 微软公司认为事件应该是由内向外传播的, 也就是当事件触发时, 应该先触发当前元素上的事件, 然后再向当前元素的祖先元素向上传播, 也就是说事件应该在冒泡阶段执行

   * 网景公司认为事件应该是由外向内传播的, 也就是当前事件触发时, 应该先触发当前元素最外层的祖先元素的事件, 然后再向内传播给后代元素的, 事件的捕获阶段

   * W3C综合了两个公司的方案, 将事件分成了三个阶段:

     1. 捕获阶段

     在捕获阶段时从最外层的祖先元素, 向目标元素进行事件的捕获, 但是默认此时不会触发事件

     2. 目标阶段

     事件捕获到目标元素, 捕获结束开始在目标元素上触发事件

     3. 冒泡阶段

     事件从目标元素向他的祖先元素传递, 依次触发祖先元素上的事件

   * 如果希望在捕获阶段执行事件, 可以将addEventListener()的第三个参数设置为true, 一般情况下不会使用

   * IE8及以下的浏览器没有捕获阶段

```html
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
    <style type="text/css">
        #box1{
            width: 300px;
            height: 300px;
            background-color: yellowgreen;
        }

        #box1{
            width: 200px;
            height: 200px;
            background-color: yellow;
        }

        #box1{
            width: 150px;
            height: 150px;
            background-color: skyblue;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let box1 = document.getElementById("box1");
            let box2 = document.getElementById("box2");
            let box3 = document.getElementById("box3");

            /**
             * 事件的传播
             *  - 关于事件的传播微软和网景有不同的设计
             *  - 微软公司认为事件应该是由内向外传播的, 也就是当事件触发时, 应该先触发当前元素上的事件
             *      然后再向当前元素的祖先元素向上传播, 也就是说事件应该在冒泡阶段执行
             *  - 网景公司认为事件应该是由外向内传播的, 也就是当前事件触发时, 应该先触发当前元素最外层的祖先元素的事件
             *      然后再向内传播给后代元素的, 事件的捕获阶段
             *  - W3C综合了两个公司的方案, 将事件分成了三个阶段:
             *      1. 捕获阶段
             *      在捕获阶段时从最外层的祖先元素, 向目标元素进行事件的捕获, 但是默认此时不会触发事件
             *      2. 目标阶段
             *      事件捕获到目标元素, 捕获结束开始在目标元素上触发事件
             *      3. 冒泡阶段
             *      事件从目标元素向他的祖先元素传递, 依次触发祖先元素上的事件
             *  - 如果希望在捕获阶段执行事件, 可以将addEventListener()的第三个参数设置为true
             *      一般情况下不会使用
             *  - IE8及以下的浏览器没有捕获阶段
             *          
             */
            bind(box1, "click", function(){
                alert("box1");
            });
            bind(box2, "click", function(){
                alert("box2");
            });
            bind(box3, "click", function(){
                alert("box3");
            });


        };

        function bind(object, eventStr, callback) { 
                if (object.addEventListener) {
                    object.addEventListener(eventStr, callback, false);
                } else {
                    /**
                     * this是谁由调用方式决定
                     * callback.call(object);
                     */
                    object.attachEvent("on" + eventStr, function () {
                        callback.call(object);
                    });
                }
            }
    </script>
</head>

<body>
    <div id="box1">
        <div id="box2">
            <div id="box3">

            </div>
        </div>
    </div>
</body>

</html>
```

## 鼠标事件

拖拽效果

拖拽流程分析: 

1. 当鼠标在被拖拽元素上按下时, 开始拖拽 `onmousedown`
2. 当鼠标移动时, 元素跟随鼠标 `onmousemove`
3. 当鼠标松开时, 被拖拽的元素重新固定在新的位置上 `onmouseup`

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #box1 {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let box1 = document.getElementById("box1");
            box1.onmousedown = function (event) {
                /**
                 * setCapture()
                 *  - 只有IE支持, 但是在火狐中调用时不会报错
                 * 而如果使用chrome调用会报错
                 */
                // if (box1.setCapture) {
                //     box1.setCapture();
                // }
                box1.serCapture && box1.setCapture();
                event = event || window.event;
                // div的偏移量 鼠标.clientX - 元素.offsetLeft
                var ol = event.clientX - box1.offsetLeft;
                // div的偏移量 鼠标.clientY - 元素.offsetTop
                var ot = event.clientY - box1.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    let left = event.clientX - ol;
                    let top = event.clientY - ot;

                    box1.style.left = left + "px";
                    box1.style.top = top + "px";
                };
                document.onmouseup = function () {
                    // 当鼠标松开时, 被拖拽元素固定到当前位置
                    // 取消document的onmousemove事件
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (box1.releaseCapture) {
                        box1.releaseCapture();
                    }
                };
                /**
                 * 当拖拽一个网页的内容时, 浏览器会默认去搜索引擎中搜索内容
                 * 此时会导致拖拽功能的异常, 这个是浏览器提供的默认行为
                 * 可以通过return false; 语句取消默认行为
                 * 
                 * IE8兼容
                 */
                return false;
            };
        };
    </script>
</head>

<body>
    <div id="box1"></div>
</body>

</html>
```

解耦

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #box1 {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }

        #box2 {
            width: 100px;
            height: 100px;
            background-color: yellow;
            position: absolute;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let box1 = document.getElementById("box1");
            let box2 = document.getElementById("box2");

            drag(box1);
            drag(box2);
        };

        function drag(object) {
            object.onmousedown = function (event) {
                /**
                 * setCapture()
                 *  - 只有IE支持, 但是在火狐中调用时不会报错
                 * 而如果使用chrome调用会报错
                 */
                object.serCapture && object.setCapture();
                event = event || window.event;
                // div的偏移量 鼠标.clientX - 元素.offsetLeft
                var ol = event.clientX - object.offsetLeft;
                // div的偏移量 鼠标.clientY - 元素.offsetTop
                var ot = event.clientY - object.offsetTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    let left = event.clientX - ol;
                    let top = event.clientY - ot;

                    object.style.left = left + "px";
                    object.style.top = top + "px";
                };
                document.onmouseup = function () {
                    // 当鼠标松开时, 被拖拽元素固定到当前位置
                    // 取消document的onmousemove事件
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (object.releaseCapture) {
                        object.releaseCapture();
                    }
                };
                /**
                 * 当拖拽一个网页的内容时, 浏览器会默认去搜索引擎中搜索内容
                 * 此时会导致拖拽功能的异常, 这个是浏览器提供的默认行为
                 * 可以通过return false; 语句取消默认行为
                 * 
                 * IE8兼容
                 */
                return false;
            };
        }
    </script>
</head>

<body>
    <div id="box1"></div>
    <div id="box2"></div>
</body>

</html>
```





**使用addEventListener()方法绑定响应函数, 取消默认行为时不能使用return false;**

**要是用event来取消默认行为event.preventDefault();**

但是IE8不支持event.preventDefault();





鼠标滚轮的事件

`onwheel`鼠标滚轮滚动事件, 会在滚轮滚动时触发, 但是火狐不支持该属性

在火狐中需要使用`DOMMouseScroll`来绑定滚动事件

注意该事件需要通过`addEventListener()`方法绑定

`event.wheelDelta`可以获取鼠标滚轮的方向, 向上滚动为120, 向下滚动为-120

`wheelDelta`这个属性值不看大小, 只看正负, 火狐不支持该属性

在火狐中用`detail`获取鼠标滚滚轮滚动方向, 向上为-3, 向下为3

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #box1 {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let box1 = document.getElementById("box1");
            
            box1.onwheel = function (event) {
                event = event || window.event;
                if (event.wheelDelta > 0 || event.detail < 0) {
                    box1.style.height = box1.clientHeight - 10 + "px";
                } else {
                    box1.style.height = box1.clientHeight + 10 + "px";
                }
                // 使用addEventListener()方法绑定响应函数, 取消默认行为时不能使用return false;
                // 要是用event来取消默认行为
                event.preventDefault && event.preventDefault();

                // 当滚动条滚动时, 如果浏览器有滚动条, 滚动条会随之滚动, 可以通过return false; 取消默认行为
                return false;
            };

            bind(box1, "DOMMouseScroll", box1.onwheel);
        };

        function bind(object, eventStr, callback) {
            if (object.addEventListener) {
                object.addEventListener(eventStr, callback, false);
            } else {
                /**
                 * this是谁由调用方式决定
                 * callback.call(object);
                 */
                object.attachEvent("on" + eventStr, function () {
                    callback.call(object);
                });
            }
        }
    </script>
</head>

<body style="height:1000px;">
    <div id="box1">

    </div>
</body>

</html>
```

## 键盘事件

onkeydown

- 按键被按下时触发
- 对于onkeydown, 按住某一个按键的会一直触发
- 当onkeydown连续触发, 第一次和第二次之间的间隔比较长(防误触)

onkeyup

- 按键被松开时触发



可以通过event.keyCode来获取按键的编码

通过他可以判断哪个按键被按下

除了keyCode, 事件对象中还提供了以下的属性

* altKey

* ctrlKey

* shiftKey

    这三个key可以用来判断alt, ctrl和shift是否被按下, 按下会返回true

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #box1 {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
    <script type="text/javascript">
        window.onload = function(){
            let box1 = document.getElementById("box1");
            document.onkeydown = function(event){
                event = event || window.event;
                let speed = 10;

                if (event.ctrlKey) speed = 50;
                // 可以通过keyCode来获取按键的编码
                // 通过他可以判断哪个按键被按下
                switch (event.keyCode) {
                    case 37:
                        box1.style.left = box1.offsetLeft - speed + "px";
                        break;
                    case 39:
                        box1.style.left = box1.offsetLeft + speed + "px";
                        break;
                    case 38:
                        box1.style.top = box1.offsetHeight - speed + "px";
                        break;
                    case 40:
                        box1.style.top = box1.offsetHeight + speed + "px";
                        break;
                }
            };
        };
    </script>
</head>

<body>
    <div id="box1">

    </div>
</body>

</html>
```

# BOM 浏览器对象模型

通过JS操作浏览器

BOM对象

- Window
    - 代表的是整个网页的窗口, 也是网页的全局对象
- Navigator
    - 代表的是当前浏览器的信息, 可以通过该对象来识别不同的浏览器
- Location
    - 代表当前浏览器的地址栏信息, 通过Location可以获取地址栏信息, 或者操作浏览器跳转页面
- History
    - 代表浏览器的历史记录, 可以通过该对象来操作浏览器的历史记录
    - 由于隐私原因, 该对象不能获取到具体的历史记录, 只能操作浏览器向前或向后翻页, 而且该操作只在当次访问时有效
- Screen
    - 代表用户的屏幕的信息, 通过该对象可以获取到用户的显示器的相关信息

这些BOM对象在浏览器中都是作为window对象的属性保存的

可以通过window对象来使用, 也可以直接使用



## Navigator

appName代表当前浏览器信息, 通过该对象可以识别不同的浏览器

由于历史原因, Navigator对象中的大部分属性都已经不能帮我们识别浏览器了

一般只会使用userAgent来判断浏览器的信息

userAgent是一个字符串, 这个字符串中包含有描述浏览器的信息的内容

不同的浏览器会有不同的userAgent

因为IE11中已经将微软和IE相关的标识都去除了, 所以我们基本已经不能通过userAgent来识别一个浏览器是否是IE了

可以通过一些浏览器中特有的对象去判断浏览器的信息

比如: ActiveXObject

## History

History对象可以用来操作浏览器向前或者向后翻页

length

- 属性, 可以获取当次访问的链接数量

back()

- 可以用来回退到上一个页面, 作用和浏览器的回退按钮一样
- 调用: history.back()

forward()

- 可以用来前进到下一个页面, 作用和浏览器的前进按钮一样
- 调用: history.forward()

go()

- 可以用来跳转到指定的页面
- 他需要一个整数作为参数
    1. 表示向前跳转一个页面, 相当于forward() - 传入参数: 1
    2. 表示向后跳转一个页面, 相当于back() - 传入参数: -1









## Location

该对象封装了浏览器的地址栏信息

`assign()`

加载新的文档

用来跳转到其他页面, 和直接修改location一样

`reload()`

重新加载当前文档

和刷新按钮一样

传入true作为参数, 则会强制清空缓存, 刷新页面

`replace()`

用新的文档替换当前文档, 也会跳转页面

不会生成历史记录, 不能使用回退按钮回退

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <script type="text/javascript">
        window.onload = function () {
            let btn = document.getElementById("btn");
            btn.onclick = function () {
                // 修改location会生成历史记录
                location = "http://www.baidu.com";

            };
        };
    </script>
</head>

<body>
    <button id="btn">click</button>
    <h1>Location</h1>
    <a href="javascript:"></a>
</body>

</html>
```



## window对象的其他方法

`setInterval()`

- 定时调用

- 可以将一个函数, 每隔一段时间执行一次
- 参数: 
    - 回调函数, 该函数会每隔一段时间被调用一次
    - 每次调用间隔的时间, 单位是毫秒
- 返回值:
    - 返回一个Number类型的数据
    - 这个数字用来作为定时器的唯一标识

clearInterval()

- 可以用来关闭一个定时器
- 可以接受任意参数
    - 如果参数是一个有效的定时器的标识, 则停止对应的定时器
    - 如果参数不是一个有效的标识, 则什么也不做

```html
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
    <script type="text/javascript">
        window.onload = function () {
            let img1 = document.getElementById("img1");
            let btn01 = document.getElementById("btn01");
            let btn02 = document.getElementById("btn02");
            
            let imgArr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
            
            let index = 0;
            var timer;
            btn01.onclick = function(){
                clearInterval(timer);
                timer = setInterval(function(){
                    index++;
                 // if(index >= imgArr.length){
                 //		index = 0;
                 // }
                    index %= imgArr.length;
                    img1.src = imgArr[index];
                }, 1000);
            };
            btn02.onclick = function(){
                clearInterval(timer);
            };
        };
    </script>
</head>

<body>
    <img id="img1" src="img/1.jpg"/> 
    <button id="btn01">开始</button>
    <button id="btn02">停止</button>
</body>

</html>
```

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        #box1 {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let speed = 10;
            let box1 = document.getElementById("box1");
            let direction = 0;
            setInterval(function () {
                switch (direction) {
                    case 37:
                        box1.style.left = box1.offsetLeft - speed + "px";
                        break;
                    case 39:
                        box1.style.left = box1.offsetLeft + speed + "px";
                        break;
                    case 38:
                        box1.style.top = box1.offsetTop - speed + "px";
                        break;
                    case 40:
                        box1.style.top = box1.offsetTop + speed + "px";
                        break;
                }

            }, 30);
            document.onkeydown = function (event) {
                event = event || window.event;

                if (event.ctrlKey) {
                    speed = 50;
                } else {
                    speed = 10;
                }
                // 可以通过keyCode来获取按键的编码
                // 通过他可以判断哪个按键被按下
                direction = event.keyCode;
            };
            document.onkeyup = function () {
                direction = 0;
            };
        };
    </script>
</head>

<body>
    <div id="box1">

    </div>
</body>

</html>
```



延时调用 - setTimeout()

一个函数不马上执行, 隔一段时间之后再执行, 而且只执行一次

延时调用和定时调用的区别, 定时调用会执行多次, 而延时调用只会执行一次

延时调用和定时调用实际上可以互相代替



轮播图 + 下方导航链接

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        #outer {
            width: 520px;
            height: 300px;
            margin: 50px auto;
            background-color: yellowgreen;
            padding: 10px 0 30px 0;
            position: relative;
            overflow: hidden;
        }

        #imgList {
            list-style: none;
            /* width: 2600px; */
            position: absolute;
            left: 0;
        }

        #imgList li {
            float: left;
            margin: 0 10px;
        }

        #navDiv {
            position: absolute;
            bottom: 10px;
        }

        #navDiv a {
            float: left;
            width: 15px;
            height: 15px;
            margin: 0 5px;
            background-color: red;
            opacity: 0.5;
            filter: alpha(opacity=0.5);
        }

        #navDiv a:hover {
            background-color: black;
        }
    </style>
    <script src="js/tools.js"></script>
    <script type="text/javascript">
        window.onload = function () {
            let imgList = document.getElementById("imgList");
            let imgArr = document.getElementsByTagName("li");

            imgList.style.width = imgArr.length * 520 + "px";

            let navDiv = document.getElementById("navDiv");
            let outer = document.getElementById("outer");
            navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth) / 2 + "px";

            let index = 0;
            let allA = document.getElementsByTagName("a");
            allA[index].style.backgroundColor = "black";

            for (let i = 0; i < allA.length; i++) {
                allA[i].num = i;
                allA[i].onclick = function () {
                    clearInterval(timer);
                    index = this.num;
                    // imgList.style.left = index * (-520) + "px";
                    setA();
                    move(imgList, "left", -520 * index, 30, function () {
                        autoChange();
                    });
                };
            }

            autoChange();

            function setA() {
                if (index >= imgArr.length - 1) {
                    index = 0;

                    imgList.style.left = 0 + "px";
                }
                for (let i = 0; i < allA.length; i++) {
                    // 将设置的内联样式去除, 只剩css中的样式
                    // 不直接设置为red是因为这样设置会覆盖掉hover属性
                    allA[i].style.backgroundColor = "";
                }
                allA[index].style.backgroundColor = "black";
            }
            var timer;

            function autoChange() {
                timer = setInterval(function () {
                    index++;
                    index %= imgArr.length;
                    move(imgList, "left", -520 * index, 30, function () {
                        setA();
                    });
                }, 3000);
            }
        };
    </script>
</head>

<body>
    <div id="outer">
        <ul id="imgList">
            <li><img src="img/2.jpg" /></li>
            <li><img src="img/3.jpg" /></li>
            <li><img src="img/4.jpeg" /></li>
            <li><img src="img/5.jpeg" /></li>
            <li><img src="img/6.jpg" /></li>
            <li><img src="img/2.jpg" /></li>
        </ul>
        <div id="navDiv">
            <a href="javascript:"></a>
            <a href="javascript:"></a>
            <a href="javascript:"></a>
            <a href="javascript:"></a>
            <a href="javascript:"></a>
        </div>
    </div>
</body>

</html>
```

## 类的操作

之前 元素.style.属性 = 新样式; 这种方式每执行一次都会让浏览器重新渲染一次, 浪费资源

通过class属性来间接的操作样式

只修改一次, 即可同时修改多个样式

浏览器只需要重新渲染页面一次, 性能比较好, 而且这种方式, 可以使表现和行为进一步分离

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <style type="text/css">
        .b1 {
            width: 100px;
            height: 100px;
            background-color: red;
        }

        .b2 {
            width: 200px;
            height: 200px;
            background-color: yellow;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            let btn01 = document.getElementById("btn01");
            let box = document.getElementById("box");

            btn01.onclick = function () {
                box.className += " b2";
            };
        };
    </script>
</head>

<body>
    <button id="btn01">修改box的样式</button>
    <br /><br />
    <div id="box" class="b1"></div>
</body>

</html>
```



# JSON

JS中的对象只有JS自己认识, 其他语言都不认识

JSON就是特殊格式的字符串, 这个字符串可以被任意的语言所识别, 并且可以转换为任意语言中的对象

JSON在开发中主要来数据的交互

JSON = JavaScript Object Notation JS对象表示法

JSON和JS对象的格式一样, 只不过JSON字符串中的属性名必须加双引号, 其他的和JS语言一致

JSON分类:

1. 对象{}

    var obj = '{"name": "孙悟空", "age": 18, "gender": "男"}'

2. 数组

    var arr = '[1, 2, 3, "hello", true]';



JSON中允许的值:

1. 字符串
2. 数值
3. 布尔值
4. null
5. 对象
6. 数组

JSON对象在IE7以下的浏览器不支持, 不能调用JSON

JSON.parse()

- 可以将一个JSON字符串转换为JS对象
- 需要做一个JSON字符串作为参数, 会将该字符串转换为JS对象



JSON.stringify()

- 可以将一个JS对象转换为JSON字符串
- 需要一个JS对象作为参数, 会返回一个JSON字符串

```html
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
    <script type="text/javascript">
        var obj = '{"name": "孙悟空", "age": 18, "gender": "男"}';
        var obj1 = '[1, 2, 3, "hello", true]';

        console.log(JSON);
        var a = JSON.parse(obj);
        console.log(a.name);

        var obj2 = {
            name: "猪八戒", 
            age: 18, 
            gender: "男"
        };
        console.log(JSON.stringify(obj2));
    </script>
</head>

<body>

</body>

</html>
```



如果要兼容IE7, 解析JSON

eval()可以用来执行一段字符串形式的JS代码, 并将执行结果返回

如果使用eval()执行的字符串中含有{}, 会将其当成代码块

如果不希望将其当成代码块解析, 则需要在字符串前后各加一个()

但是在开发中尽量不要使用, 然后还具有安全隐患

如果需要兼容IE7及以下的JSON操作, 则可以通过引入一个外部的js文件来处理



