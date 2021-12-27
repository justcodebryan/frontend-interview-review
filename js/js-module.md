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

node加载ES6模块的方式
1. ES6模块采用`.mjs`后缀文件名
2. 项目的`package.json`文件中, 指定`type`字段为`module`, 如果没有`type`字段会默认使用`commonjs`

`.mjs`文件总是以ES6模块加载, `.cjs`文件总是以`commonjs`模块加载, `.js`文件的加载取决于`package.json`里面的`type`字段的设置

浏览器加载ES6模块的方式
利用`<script type="module"/>`

浏览器加载Commonjs模块会直接报错, 因为浏览器不存在`module`, `exports`, `require`等环境变量
如果需要在浏览器里面加载Commonjs模块, 则需要用browserify对模块进行转换