**JavaScript基础**

# 基本概念
`JavaScript`包含三个部分:
- 核心(`ECMAScript`)
- 文档对象模型(`DOM`)
  - 本质: 是一个应用编程接口(API), 用于在`HTML`中使用扩展的`XML`
  - `DOM`级别
    - `DOM Level0` - 不存在, 是一个历史参照点, 看做`IE4`和`Netscape Navigator 4`最初支持`DHTML`
    - `DOM Level1` 
      - `DOM Core`(提供一种映射`XML`文档)
      - `DOM HTML`(扩展前者并增加了特定于`HTML`的对象和方法)
    - `DOM Level2`
      - `DOM`视图: 描述追踪文档不同视图(如应用`CSS`样式前后的文档)的接口
      - `DOM`事件: 描述事件及事件处理的接口
      - `DOM`样式: 描述处理元素`CSS`样式的接口
      - `DOM`遍历和范围: 描述遍历和操作`DOM`树的接口
    - `DOM Level3`
      - 统一的方式加载和保存文档的方法(包含在一个叫做`DOM Load and Save`的新模块中)
      - 支持所有的`XML 1.0`的特性, 包括`XML Infoset`, `XPath`和`XML Base`
    - 不再用Level来维护`DOM`, 作为`DOM Living Standard`来维护, 最新的快照称为`DOM4`
      - `Mutation Observers`(替换`Mutation Events`)
- 浏览器对象模型(`BOM`)
  - 用于支持访问和操作浏览器的窗口
  - 唯一一个没有相关标准的`JavaScript`实现
  - 主要针对浏览器窗口和子窗口
    - 弹出新浏览器窗口的能力
    - 移动, 缩放和关闭浏览器窗口的能力
    - `navigator`对象, 提供关于浏览器的详尽信息
    - `location`对象, 提供浏览器加载页面的详尽信息
    - `screen`对象, 提供关于用户屏幕分辨率的详尽信息
    - `performance`对象, 提供浏览器内存占用, 导航行为和时间统计的详尽信息
    - 对`cookie`的支持
    - 其他自定义对象, 如`XMLHttpRequest`和`IE`的`ActiveXObject`

## 语法

C语言家族, 大量借鉴C及其他类C语言(如`Java`和`Perl`)的语法

`script`下有8个属性:

- `async`: 可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效
- `charset`: 可选, 使用`src`指定代码字符集
- `crossorigin`: 可选, 配置相关请求的`CORS`(跨源资源共享)设置, 默认不使用`CORS`, `crossorigin="use-credentials"`设置凭据编制, 出站请求会包含凭证
- `defer`: 可选, 表示在文档解析和显示完成后再执行脚本是没有问题的, 只对外部脚本有效
- `integrity`: 可选, 允许比对接收到的资源和指定的加密签名 以验证子资源完整性(SRI，Subresource Intergrity), 如果资源签名和属性指定的不匹配, 页面报错, 脚本不执行. 确保`CDN`不会提供恶意内容
- `language`: 废弃
- `src`
- `type`: 替代`language`, 当为`module`时, 代码会当成`ES6`模块, 这时代码中才能出现`import`和`export`关键字



`script`可以包含来自外部域的`JavaScript`文件, 与`<img>`很像, 且初始的请求不受浏览器同源策略限制, 但返回并被执行的`JavaScript`则受限制

不管包含什么代码, 浏览器都会按照`<script>`在页面中的出现顺序依次解释他们, 前提是他们没有使用`defer`和`async`属性.



`defer`和`async`:

- `defer`: 规范中要求异步下载, 延迟并且在`DOMContentLoaded`顺序执行, 但是实际中不一定`HTML5` 规范要求脚本应该按照它们出现的顺序执行，因此第一个推迟的脚本 会在第二个推迟的脚本之前执行，而且两者都会在 `DOMContentLoaded` 事件之前执行。 不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 `DOMContentLoaded` 事件之前执行，因此最好只包含一个这样的脚本。

- `async`
  与 `defer` 不同的是，标记为 `async` 的脚本并不保证能按照它们出现的次序执行
  因此多个`async`脚本之间不能有依赖, 并且不应该在加载期间修改`DOM` 
  确保在页面的`load`事件前执行, 但可能在`DOMContentLoaded`之前或之后执行
  使用`async`会告诉页面不使用`document.write`





## 区分大小写

### 标识符

定义: 指变量, 函数, 属性的名字, 或者函数的参数

规则: 

- 第一个字符必须是一个字母, 下划线(`_`)或一个美元符号(`$`)
- 其他字符可以是字母, 下划线, 美元符号或数字

惯例: 驼峰大小写格式

### 注释

使用C风格注释, 包括单行注释和块级注释

### 严格模式

`ES5`引入

作用: 

- 为`JavaScript`定义了一种不同的解析和执行模型
- 对ES3中一些不确定的行为将得到处理, 而且对某些不安全的操作也会抛出错误

```javascript
"use strict";
// 脚本开启严格模式
```

本质: 是一个编译指示, 告诉`JavaScript`引擎切换到严格模式

可以在函数体内部声明, 指定该函数在严格模式下执行

### 语句

推荐加分号



## 关键字和保留字

`ECMA-262`描述了一组具有特定用途的关键字



## 变量

变量是松散类型 -> 可以保存任何值

`var` -> `ECMAScript`所有版本
`let` & `const` -> `ECMAScript6`及更晚

### `var`关键字

不初始化则保存特殊值`undefined`

1. `var`声明作用域

   - 在函数内部使用`var`定义一个变量, 在函数退出时, 变量被销毁

   - 在函数内定义变量省略`var`操作符, 创建一个全局变量(严格模式下, 给未声明的变量赋值会抛出`ReferenceError`)

   - 需要定义多个变量, 可以用逗号隔开

     ```javascript
     var message = 'hi',
         found = false,
         age = 29;
     ```

   - 严格模式下, 不能定义名为`eval`和`arguments`的变量, 否则会导致语法错误

2. `var`声明提升
   '提升' -> 把所有变量声明都拉到函数作用域顶部



### `let`关键字

与`var`最明显的区别 -> `let`声明的范围是块作用域, `var`声明的范围是函数作用域

`let`不允许同一个块作用域出现冗余声明 -> 抛出`SyntaxError`

`JS`引擎会记录用于变量声明的标识符及其所在的块作用域 -> 嵌套使用相同标识符不会报错, 因为同一个块中没有重复声明

对声明冗余报错不会因混用 `let` 和 `var` 而受影响, 都是声明同类型变量, **只是指出变量在相关作用域如何存在**

1. 暂时性死区(`TDZ`)

2. 全局声明
   全局作用域下的`let`声明不会将变量挂载在`window`对象上

3. 条件声明
   因为`let`的作用域是块，所以不可能检查前面是否已经使用`let`声明过同名变量，同时也就不可能在没有声明的情况下声明它。

   ```html
   <script>
     var name = 'n';
     let age = 26;
   </script>
   
   <script>
   	
   	var name = 'Matt';
   	
   	let age = 36;
   	// age之前已经声明过了, 会报错
   </script>
   ```

   使用`try`/`catch`语句或`typeof`操作符也不能解决, 因为条件块中`let`声明的作用域仅限于块

   ```html
   <script>
     
     let name = 'Nicholas'; 
     let age = 36; 
     
   </script>
   
   <script>
   
   	// 假设脚本不确定页面中是否已经声明了同名变量 
   	// 那它可以假设还没有声明过 
     if (typeof name === 'undefined') { 
       let name; 
     } 
     // name被限制在if {} 块的作用域内 
     // 因此这个赋值形同全局赋值 name = 'Matt';
   
     try (age) { 
       // 如果age没有声明过，则会报错 
     } catch(error) { 
       let age; 
     } 
     // age被限制在catch {}块的作用域内 
     // 因此这个赋值形同全局赋值 age = 26; 
     
   </script>
   ```

4. `for`循环中的`let`声明
   用`let`声明迭代变量时, `JavaScript`引擎在后台会为每个迭代循环声明一个新的迭代变量, 每个`setTimeout`引用的都是不同的变量实例



### `const`声明

`const`的行为与`let`基本一致, 唯一区别就是用它声明变量时必须初始化, 并且不能修改初始值



### 声明风格和最佳实践

1. 不使用`var`
2. `const`优先,  `let`次之



## 数据类型

`ECMAScript`中有5种简单数据类型(也称为基本数据类型)

- `Undefined`
- `Null`
- `Boolean`
- `Number`
- `String`

一种复杂数据类型: `Object`



### `typeof`操作符

`typeof`操作符可能返回的字符串：

- `undefined` - 如果这个值未定义
- `boolean` - 如果这个值是布尔值
- `string` - 如果这个值是字符串
- `number` - 如果这个值是数值
- `object` - 如果这个值是对象或`null`
- `function` - 如果这个值是函数
- `symbol` - 表示值为符号

特殊情况：

- 调用`typeof null`会返回`object`， 特殊值`null`被认为是一个空的对象引用
- `Safari 5`及之前版本, `Chrome 7`及之前版本在对正则表达式调用`typeof`操作符时会返回`function`，在其他浏览器会返回`object`



### `Undefined`类型

一般而言, 不存在需要显式地把一个变量设置为`undefined`值的情况

字面值`undefined`的主要目的是用于比较
```javascript
var message;

// var age;

alert(message); // 'undefined'
alert(age);     // 产生错误
```
对于尚未声明过的变量, 只能执行一项操作, 即使用`typeof`操作符检测其数据类型(对未经声明的变量调用`delete`不会导致错误, 在严格模式下会报错)

但是, 对未初始化的变量执行`typeof`操作符会返回`undefined`, 而对未声明的变量执行`typeof`操作符同样会返回`undefined`

### `Null`类型

`undefined`值是派生自`null`值的, 因此在`ECMA-262`规定中他们的相等性测试要返回`true`

```javascript
alert(null == undefined); // true
```

在定义将来要保存对象的变量时, 建议使用`null`来初始化



### `Boolean`类型

最频繁使用的类型之一

两个字面值: `true`和`false` -> 不同于数值

| 数据类型  |   转换为 true 的值    | 转换为 false 的值 |
| :-------: | :-------------------: | :---------------: |
|  Boolean  |         true          |       false       |
|  String   |      非空字符串       |  "" （空字符串）  |
|  Number   | 非零数值(包括无穷值） |     0 、 NaN      |
|  Object   |       任意对象        |       null        |
| Undefined |    N/A （不存在）     |     undefined     |







# 变量, 作用域与内存

## 原始值与引用值

原始值: 最简单的数据

- 包括: `Undefined`, `Null`, `Boolean`, `Number`, `String`和`Symbol`

- 按值访问, 操作的就是存储在变量中的实际值

引用值: 多个值构成的对象

- 保存在内存中的对象, 操作的是该对象的引用而非实际的对象本身



## 执行上下文与作用域

变量或函数的上下文决定了他们可以访问那些数据, 以及他们的行为

每个上下文都有一个关联的变量对象(存储上下文定义的所有变量和函数)

全局上下文是最外层的上下文

- 根据宿主环境的不同, 表示全局上下文的对象可能不一样
- 浏览器中的全局上下文就是`window`对象, 所有通过`var`定义的全局变量和函数会成为`window`对象的属性和方法
- `let`和`const`的顶级声明不会



上下文里的代码在执行的时候, 会创建变量对象的一个**作用域链**

作用域链决定了各级上下文中的代码在访问变量和函数时的顺序

代码正在执行的上下文的变量对象始终位于作用域链的最前端

上下文是函数的话, 则其活动对象用作变量对象, 最初只有一个定义变量: `arguments`



## 变量声明

1. 使用`var`的函数作用域声明
   - 在使用`var`声明变量时, 变量会被自动添加到最接近的上下文
   - 如果变量未经声明就被初始化, 就会自动被添加到全局上下文
   - `var`声明会被拿到函数或全局作用域的顶部
2. 用`let`的块级作用域声明
   - 块级作用域 - ES6新概念
   - 同一作用域不能声明两次, 重复的`var`声明会被忽略, 重复的`let`声明会抛出`SyntaxError`
   - `let`的行为非常适合在循环中声明迭代变量
   - `let`在运行时也会提升, 但是因为`TDZ`的缘故, 所以不能在声明之前使用`let`变量

