`Common.js`, `AMD`和`CMD`

解决的问题：

- `js`文件作用域都是顶层，这会造成变量污染
- `js`文件多，变得不好维护
- `js`文件依赖问题，稍微不注意顺序引入错，代码全报错

解决的目标:

- 解决变量污染问题，每个文件都是独立的作用域，所以不存在变量污染
- 解决代码维护问题，一个文件里代码非常清晰
- 解决文件依赖问题，一个文件里可以清楚的看到依赖了那些其它文件

区别

`es module`导出的是引用，多次引用的对象是同一个
`commonjs`导出的是拷贝, 多次引用的对象是浅拷贝

`CommonJS`

1. 对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
2. 对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
3. 当使用`require`命令加载某个模块时，就会运行整个模块的代码。
4. 当使用`require`命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，`CommonJS`模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
5. 循环加载时，属于加载时执行。即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

`ES6`模块

1. `ES6`模块中的值属于【动态只读引用】。
2. 对于只读来说，即不允许修改引入变量的值，`import`的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到`import`命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
3. 对于动态来说，原始值发生变化，`import`加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。
4. 循环加载时，`ES6`模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。

`CommonJs`

做法:

```javascript
let module = { exports: {} }; // 一个对象, 里面有exports属性

let exports = module.exports; // 另外的一个变量存储着module.exports的内存地址

// your code

return module.exports;
```

- `CommonJs`可以动态加载语句，代码发生在运行时
- `CommonJs`混合导出，还是一种语法，只不过不用声明前面对象而已，当我导出引用对象时之前的导出就被覆盖了
- `CommonJs`导出值是拷贝，可以修改导出的值，这在代码出错时，不好排查引起变量污染

`Commonjs`里面存在两种写法把函数或者对象暴露到外面
`exports`和`module.exports`
当 node 执行一个文件的时候, 会给这个文件内生成一个`exports`和`module`对象, 而`module`对象有`exports`属性
这两个属性都指向同一块内存, 但是最后`require`导出的内容是`module.exports`, `exports`仅仅是初始化的时候指向`module.exports`的一个引用, 如果重新赋值, 则指向别的引用了, 后续的修改就不会对`module.exports`造成影响

```javascript
let a = 100;

console.log(module.exports);  // {}
console.log(exports);         // {}

exports.a = 200;

exports = other;

// test.js
var = require('./utils');
console.log(a)
```

`Es Module`

- `Es Module`是静态的，不可以动态加载语句，只能声明在该文件的最顶部，代码发生在编译时
- `Es Module`混合导出，单个导出，默认导出，完全互不影响
- `Es Module`导出是引用值之前都存在映射关系，并且值都是可读的，不能修改

# JS 模块加载

`CommonJS` 与 `ES6`的差异

- CommonJS 模块由 JS 运行时实现，ES6 模块借助 JS 引擎实现；ES6 模块是语言层面的底层的实现，CommonJS 模块是之前缺失底层模块机制时在上层做的弥补。从报错信息可以察觉这个差异。
- CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件。CommonJS 模块在执行阶段分析模块依赖，采用深度优先遍历（depth-first traversal），执行顺序是父 -> 子 -> 父；ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。
- CommonJS 模块循环引用使用不当一般不会导致 JS 错误；ES6 模块循环引用使用不当一般会导致 JS 错误。
- CommonJS 模块的导入导出语句的位置会影响模块代码执行结果；ES6 模块的导入导出语句位置不影响模块代码语句执行结果。

ECMAScript6 入门教程中提出

- CommonJS 模块输出的一个值的拷贝, ES6 模块输出的值的引用 (×)
- CommonJS 模块是运行时加载 (√), ES6 模块是编译时输出接口 (×)
- CommonJS 模块的 require()是同步加载模块 (√), ES6 模块的 import 命令是异步加载, 有一个独立的模块依赖解析过程(×)

CommonJS 和 ES6 模块输出的都是变量, 变量都是值的引用

## `CommonJS`模块加载

`NodeJS`中的模块加载由`cjs/loader.js`实现加载逻辑,

CommonJS 模块是顺序执行的，遇到 require 时，加载并执行对应模块的代码，然后再回来执行当前模块的代码。

模块循环引用

在模块执行前创建好对应的模块对象, 并进行缓存

模块执行的过程实际是在给该模块对象计算需要导出的变量属性, 因此 Commonjs 模块在启动执行时, 就已经处于可以被获取的状态, 这个特点可以很好的解决模块循环引用的问题

由于`require`语句直接分割了执行的代码块, `Commonjs`模块的导入导出语句的位置会影响模块代码语句的执行结果

## `ES6`模块

`ES6`模块借助`JS`引擎实现

`JS`引擎实现了`ES6`模块的底层核心逻辑, `JS`运行时需要在上层做适配

`ES6`模块有 5 种状态, 分别为`unlinked`, `linking`, `linked`, `evaluating`, `evaluated`, 用循环模块记录的`Status`字段表示
`ES6`模块的处理包括连接`link`和评估`evaluate`两步

node 加载 ES6 模块的方式

1. ES6 模块采用`.mjs`后缀文件名
2. 项目的`package.json`文件中, 指定`type`字段为`module`, 如果没有`type`字段会默认使用`commonjs`

`.mjs`文件总是以 ES6 模块加载, `.cjs`文件总是以`commonjs`模块加载, `.js`文件的加载取决于`package.json`里面的`type`字段的设置

浏览器加载 ES6 模块的方式
利用`<script type="module"/>`

浏览器加载 Commonjs 模块会直接报错, 因为浏览器不存在`module`, `exports`, `require`等环境变量
如果需要在浏览器里面加载 Commonjs 模块, 则需要用 browserify 对模块进行转换
