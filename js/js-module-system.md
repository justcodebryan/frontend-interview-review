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
`commonjs`导出的是拷贝，多次引用的对象不是同一个

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

`Es Module`

- `Es Module`是静态的，不可以动态加载语句，只能声明在该文件的最顶部，代码发生在编译时
- `Es Module`混合导出，单个导出，默认导出，完全互不影响
- `Es Module`导出是引用值之前都存在映射关系，并且值都是可读的，不能修改

`async`, `defer`和`module`

- 标准, `non-module`, 不是引入的模块

  - 阻塞`HTML`解析
  - 立马`fetch`, `parse`和`executed`
  - 能保证执行顺序
  - 阻塞`DOMContentLoaded`事件
  - 不适合关键代码, 会导致单点故障渲染瓶颈和延迟启动

- `defer`脚本:

  - 对于(`non-module`)的行内脚本会忽略`defer`并且无效
  - 对于`module`的行内脚本, `defer`是自动(也就是暗含的)
  - 下载不会阻塞`HTML`的解析
  - 多个`defer`的相对位置能在执行的时候保证
  - 在`DOM`被解析完后执行(但是在`DOMContentLoaded`前面)
  - 阻塞`DOMContentLoaded`事件(除非这个脚本是`async defer`)

- `async`脚本:

  - 对于`non-module`的行内脚本, `async`会被忽略并且无效
  - 对于`module`的行内脚本, `async`是支持的, 并且允许不按顺序, 尽快执行
  - 下载不会阻塞`HTML`的解析
  - 不按顺序执行, 尽可能快地执行
  - `async`脚本的执行顺序不能保证其相对顺序
  - 不会等待`HTML`的解析完成, 可能会打断`DOM`的构建(特别是当其能够从浏览器缓存中获取到数据时)
  - 阻塞`load`事件(但是不会阻塞`DOMContentLoaded`事件)
  - 不支持`IE9-`

- `async defer`脚本
  - 解释为`async`, 如果远古浏览器不支持的话就会解释为`defer`

`type=module` vs non-module (`type=text/javascript`) vs `<script nomodule>`

- `type=module`脚本
  - 能执行`defer`
  - 对于标签内脚本, 同样执行`defer`
  - 因此, 能够保证不带有`async`的标签执行的相对顺序(标签内代码和`src`)
  - 只执行一次, 尽管相同`src`路径的脚本加载了多次
  - 可能会用到`import`去声明另外一个模块的脚本作为依赖(这就是其中一个`modules`被延迟的原因)
  - 会受到`CROS`的限制(跨域的模块需要`Access-Control-Allow-Origin: *`)
  - 当浏览器不支持的时候不会执行
    - 但是在`IE 11`, `Firefox 52 ESR`等仍然会拉取代码
- `<script module >`
  - 不会通过支持`<script type="module">`的浏览器去拉取和执行
    - 然而还是有一些现代浏览器会有`bug`, 并且拉取

`Inline` vs `src`

- `inline scripts`(without `src`)
  - `non-module inline scripts`: `async`和`defer`都会被忽略, 脚本会阻塞`HTML`的解析和`DOM`的构建并且会立即执行
  - `module inline scripts`: 执行`defer`, 支持`async`
  - 不会被浏览器缓存
- `src`脚本
  - 会被浏览器缓存(需要一个适当的响应`headers`), 因此可以在无网络的情况下复用
