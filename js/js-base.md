**JavaScript基础**

# ES5

### 基本概念
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

#### 语法

C语言家族, 大量借鉴C及其他类C语言(如`Java`和`Perl`)的语法

`script`下有8个属性:

- `async`: 可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效
- `crossorigin`: 可选, 配置相关请求的`CORS`(跨源资源共享)设置, 默认不使用

#### 区分大小写

#### 标识符

定义: 指变量, 函数, 属性的名字, 或者函数的参数

规则: 

- 第一个字符必须是一个字母, 下划线(_)或一个美元符号($)
- 其他字符可以是字母, 下划线, 美元符号或数字

惯例: 驼峰大小写格式

#### 注释

使用C风格注释, 包括单行注释和块级注释

#### 严格模式

ES5引入

作用: 

- 为`JavaScript`定义了一种不同的解析和执行模型
- 对ES3中一些不确定的行为将得到处理, 而且对某些不安全的操作也会抛出错误

```javascript
"use strict";
// 脚本开启严格模式
```

本质: 是一个编译指示, 告诉`JavaScript`引擎切换到严格模式

可以在函数体内部声明, 指定该函数在严格模式下执行

#### 语句



### 关键字和保留字

`ECMA-262`描述了一组具有特定用途的关键字



### 变量

变量是松散类型 -> 可以保存任何值



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



