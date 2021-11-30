# 过程详解

## 导航

- 用户在地址栏输入一个`URL`, 点击一个链接, 提交表单或者是其他行为

1. `DNS`查找

   - 原因: 用户在地址栏输入的是页面的`URL`, 需要去`DNS`服务器那里找到对应的`IP`

     - 如果之前访问过就会存在`DNS`缓存里面(存放一段时间), 这样可以通过在缓存里面检索`IP`地址而不是再通过域名服务器进行查找来加速后续的请求
     - 如果之前没有访问过则需要先用网站的域名去找到对应的`IP`地址

   - 需要用到的情况

     - 如果以前没有访问过该网址
     - 之前的`DNS`缓存失效了

   - 优化考虑的方面

     - 减少`DNS`请求数量
     - 缩短`DNS`请求时间

   - 优化点

     - 浏览器通过服务器名称请求`DNS`进行查找，最终返回一个`IP`地址，第一次初始化请求之后，这个`IP`地址可能会被缓存一段时间

     - 通过主机名加载一个页面通常仅需要`DNS`查找一次.。但是, `DNS`需要对不同的页面指向的主机名进行查找。如果`fonts`, `images`, `scripts`, `ads`, and `metrics` 都不同的主机名，`DNS`会对每一个进行查找 -> 减少`DNS`请求数量 -> 减少并行下载数量导致响应时间变慢

     - `dns-prefetch`

       ```html
       <!-- 推荐放在<meta charset="UTF-8" />里面 -->
       <link rel="dns-prefetch" href="//cdn.com" />
       ```

       放在页面的顶部, 能够尽快在`DNS`服务器上面查询到对应的`IP`地址

       但是使用`DNS prefetch`会导致资源浪费, 因此可以在页面中禁止隐式的`DNS prefetch`

       ```html
       <meta http-equiv="x-dns-prefect-control" content="off" />
       ```

     - 使用`CDN`服务器进行优化
       缩短`IP`到请求方的链路和距离以加快速度

2. `TCP Handshake`

   TCP 三次握手与服务器建立连接

   - 作用: 让两端尝试进行通信

   可以通过上层协议`HTTPS`协商`TCP`的一些参数

   三次握手 - 又称为`SYN - SYN - ACK` , 实际上是`SYN, SYN-ACK, ACK`

   - 为什么需要三次握手?
     `TCP`协议提供可靠的连接服务, 三次握手的目的是同步连接双方的序列号和确认号并交换`TCP`窗口大小信息

   - 改成两次握手不行吗?
     假设如发送了第一个请求报文, 第一个因为网络原因没能按时到达, 这时候发送端就会再发一个请求, 如果是两次握手, 服务端收到立马就建立连接, 传输数据后断开连接。之前的第一个请求最后达到了服务端， 服务端又以为是要发送数据，于是开始建立连接，但是客户端是没有准备好建立连接的，这样就会造成资源浪费。如果是三次握手建立连接，服务端第二次接受到连接的请求，但是没有接受到客户端的确认请求就不会等待建立连接。

   断开`TCP`连接需要四次挥手

   - 为什么需要四次挥手?
     因为服务端和客户端都需要确认对方不再发送数据包
     假设服务端已经发送了数据, 收到了客户端确认收到数据包的回应以后, 客户端此时还在发送数据, 那么客户端只能确认对方不再发送数据, 而不能发送客户端已经将数据发送完毕的信号, 只能等待到客户端自己将数据发送完毕以后发送确认数据包以后, 才能让服务端知道这边已经完成数据传输了

3. `TLS`协商

   在发送真正的请求内容之前还需要三次往返服务器

   这时候还没有发送内容

   总共 8 次往返, 浏览器可以发出请求(`DNS`查找两次 - `TCP`三次握手 - `TLS`协商三次)

   `TLS`或者`SSL`

   对称加密, 非对称加密, 数据摘要

(以上过程还未发送任何用户的请求)

## 响应

一旦建立了到`web`服务器的连接, 浏览器就代表用户发送一个初始的`HTTP GET`请求

初始请求的响应包含所接收数据的第一个字节。`Time to First Byte` (`TTFB`)是用户通过点击链接进行请求与收到第一个 HTML 包之间的时间。第一块内容通常是`14kb`的数据。

4. TCP 慢开始

   在`TCP slow start`中，在收到初始包之后, 服务器会将下一个包的大小加倍到大约`28kb`。 后续的包依次是前一个包大小的二倍直到达到预定的阈值，或者遇到拥塞。

5. 拥塞控制

## 解析

`DOM`是浏览器标记的内部表示

6. 构建`DOM`树

   `DOM`构建是增量的

   `HTML`响应 -> 令牌（`token`）-> 节点 -> `DOM`树

   单个`DOM`节点从`startTag`开始, 到`endTag`结束

   节点数量越多, 关键渲染路径中的后续花费的时间就越多

   \<script />标签会阻塞渲染并停止`HTML`的解析 (特别是没有`defer`和`async`标签的)

   预加载扫描器

   浏览器构建 DOM 树的时候占用了主线程, 预加载扫描器会在后台减速资源, 解析可用的内容并请求高优先级资源, 如`CSS`, `Javascript`, `web`字体

   减少阻塞

   当`JavaScript`解析和执行顺序不重要时，可以添加`async`属性或`defer`属性

   `JS`阻塞`HTML`的解析, 因为在 js 中有可能使用`document.write`这个`API`, 将会把这个`js`文件之后的`DOM`节点全部替换掉

   等待获取`CSS`不会阻塞`HTML`的解析或者下载，但是它阻塞`JavaScript`，因为`JavaScript`经常用于查询元素的`CSS`属性。

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
     - `nomodule`作为降级, 当浏览器不支持 es-modules 的时候的兜底方案

   `Inline` vs `src`

   - `inline scripts`(without `src`)

     - `non-module inline scripts`: `async`和`defer`都会被忽略, 脚本会阻塞`HTML`的解析和`DOM`的构建并且会立即执行
     - `module inline scripts`: 执行`defer`, 支持`async`
     - 不会被浏览器缓存

   - `src`脚本

     - 会被浏览器缓存(需要一个适当的响应`headers`), 因此可以在无网络的情况下复用

7. 构建`CSSOM`树

   与`DOM`类似

   是独立的数据结构。浏览器将`CSS`规则转换为可以理解和使用的样式映射。浏览器遍历`CSS`中的每个规则集，根据`CSS`选择器创建具有父、子和兄弟关系的节点树。

   `CSSOM`树完成构建以后才会被用到构建渲染树中, 因为没有完成`CSSOM`树的解析就应用上去会导致资源的浪费, 前面的样式也会被后面的解析所覆盖

   多层级选择器会影响性能 - 因为当浏览器发现一个新的类名的时候, 就需要沿着`DOM`向上检查, 越是具体的标签浏览器的工作就越多, 但是不一定需要优化

   解析`CSS`耗时很短, 所以更具体的节点和规则带来的消耗很小

   `CSS`优化方式

8. 渲染树

   `DOM`+`CSSOM`结合为渲染树

   浏览器检查每个节点, 从根节点开始, 决定哪些`CSS`规则被添加

9. 布局

   布局取决于屏幕的尺寸。布局这个步骤决定了在哪里和如何在页面上放置元素，决定了每个元素的宽和高，以及他们之间的相关性。

   视窗的元标签定义了布局视窗的宽度，从而影响布局。没有的话，浏览器使用视窗的默认宽度

   如果在移动端的浏览器中浏览页面并且设置了元标签

   ```html
   <meta name="viewport" content="width=device-width" />
   ```

   页面的布局就会随着设备的宽度去变化, 当旋转手机时, 布局就会变化

   任何渲染树改变的时候，像添加节点、改变内容或者在一个节点更新盒模型样式的时候布局就会发生。

   为了减小布局事件的频率和时长，批量更新或者避免改动盒模型属性。

性能优化 - 网络层面

- 多个标签引入不同的`js`文件, `HTTP1.0`需要不断进行`TCP`三次握手建立连接 - 传输数据 - 四次挥手断开连接
- 将所有`js`代码打包到同一个文件里面, 发送请求的时候需要建立连接, 建立连接的代价比较高, 首先考虑缩减发送请求的次数
- 后续出现了`HTTP 1.1`(在发送请求的时候, 参数里面带上`keep-alive`, 这样发送完请求以后就不会立即断开连接, 但是这个方案的缺点是如果有很多资源, 大量的资源将会走同一条通道)和`HTTP 2.0`(多路复用, 不同的资源可以走不同的路径)

## 渲染

10. `style`

    `DOM`和`CSSOM`组合成一个`Render`树，计算样式树或渲染树从`DOM`树的根开始构建，遍历每个可见节点。

    样式为`display: none`的节点不会出现在`render tree`上面

    样式为`visibility: hidden`的节点会, 因为会占用空间

11. `layout`

    渲染树上运行布局以计算每个节点的几何体。

    布局是确定呈现树中所有节点的宽度、高度和位置，以及确定页面上每个对象的大小和位置的过程。

    回流(reflow)是对页面的任何部分或整个文档的任何后续大小和位置的确定。

    第一次确定节点的大小和位置称为布局。随后对节点大小和位置的重新计算称为回流。

    会导致回流的操作：

    - 添加或删除可见的 DOM 元素
    - 元素的位置发生变化
    - 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
    - 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
    - 页面一开始渲染的时候（这肯定避免不了）
    - 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

    因为浏览器对重排和重绘进行优化，维护一个`flush`队列，当积累到一定量重绘和重排的操作或者到了一定的时间间隔时，就会进行批处理，避免多次进行重排和重绘导致性能问题。但是这些`style`属性可能会因为重绘和重排而发生变化, 所以当你请求向浏览器请求这些`style`信息的时候，就会让浏览器`flush`队列，比如：

    - `offsetTop`, `offsetLeft`, `offsetWidth`, `offsetHeight`

    - `scrollTop`/`Left`/`Width`/`Height`

    - `clientTop`/`Left`/`Width`/`Height`

    - `width`,`height`

    - 请求了`getComputedStyle`(), 或者 `IE`的 `currentStyle`

12. `Paint`

    在绘制或光栅化阶段，浏览器将在布局阶段计算的每个框转换为屏幕上的实际像素

# 问题

1. 为什么`JS`的解析会阻塞`DOM Tree`的解析

   因为`JS`的解析运行被默认为有可能使用`document.write`方法, `document.write`方法会向文档流里面写入字节, 这样的话, 会强制刷新剩下的文档

   所以为了避免重复操作, 就将剩下的`dom`解析给阻塞了

   而且在这时的`js`脚本能够操作前面已经解析完成的`dom`元素, 而不能操作后面还未解析的`dom`元素, 因为还未解析出来, `dom`元素还不存在

   `document.write`使用流程:

   1. `document.open`
   2. `document.write`
   3. `document.close`

   从另外一个角度理解, 当浏览器在解析 `DOM` 树的时候, 已经调用了`document.open`了, 那么在这种情况下, 使用`document.write`可以直接在文档中间的位置写入内容, 当文档解析完了触发`documentloaded`的时候, 浏览器会调用`document.close`。这个时候相当于写入文件完成并且管道关闭了，如果还要再进行`document.write`这个操作的时候, 需要重新调用`document.open`。因为是系统自动调用的， 系统不知道哪个`document`，所以就会重新生成一个空白的`document` , 并且把`document.write`里面要写入的内容写进去, 并且覆盖掉原来的`document`, 这样就会造成`documentloaded`之后调用`document.write`会将整个页面都覆盖掉。

2. `JS script` 不同标签的行为(`async`, `defer`)

   `async` - 异步加载, 同步执行

   `defer` - 异步加载, `onload` 之后执行

3. `CSSOM` 解析会阻塞 `DOM Tree` 的解析或者 `JS` 的运行吗

   这里共有两种情况：

   1. 如果 `CSS` 外链标签在文件的最上方, 异步下载解析, 但是文件中间有一个`script`标签, 当整个文件解析到了 `script` 标签的时候, 假定 `CSS` 标签还未下载完成, 如果 `script` 标签里面有 `getComptuedStyle` 的操作, `CSS` 的解析就会阻塞 `JS` 的执行, 直到 `CSS` 解析完成了以后, 获取了正确的样式, 这样计算出来的结果才是正确的。

   ```html
   <html>
     <head>
       <link src="./index.css" />
       <title>test app</title>
     </head>
     <body>
       <script src="./test.js"></script>
     </body>
   </html>
   ```

   2. 前面的情况同上, 唯一不同的点就是, `script` 标签里面没有做 `getComputedStyle` 的操作。这时，就和一般的操作是一样的。

4. 浏览器并行下载的最大数量

   各个浏览器的并行下载数量不同, 之前的最大是 6 个

   ```markdown
   Firefox 2: 2
   Firefox 3+: 6
   Opera 9.26: 4
   Opera 12: 6
   Safari 3: 4
   Safari 5: 6
   IE 7: 2
   IE 8: 6
   IE 10: 8
   Edge: 6
   Chrome: 6
   ```

5. 为什么需要 `document.write` 方法
   以下内容摘自 Stack Overflow
   When document.write() is executed after page load, it replaces the entire header and body tag with the given parameter value in string.

   - document.write (henceforth DW) does not work in XHTML
   - DW does not directly modify the DOM, preventing further manipulation~~ _(trying to find evidence of this, but it's at best situational)_
   - DW executed after the page has finished loading will overwrite the page, or write a new page, or not work
   - DW executes where encountered: it cannot inject at a given node point
   - DW is effectively writing serialised text which is not the way the DOM works conceptually, and is an easy way to create bugs (.innerHTML has the same problem)

   The only seem appropriate usage for document.write() is when working third parties like Google Analytics and such for including their scripts. This is because document.write() is mostly available in any browser. Since third party companies have no control over the user’s browser dependencies (ex. jQuery), document.write() can be used as a fallback or a default method.(兼容性问题, 当需要加入 google analytics 等的脚本, 这是最容易加入依赖的方法)

6. `render tree` 的行为, 如果 `CSS` 发生了改变以后

   `repaint`(重绘)和 `reflow`(重排)

   `reflow`(重排)(实际上是根据渲染树中每个渲染对象的信息，计算出各自渲染对象的几何信息（DOM 对象的位置和尺寸大小），并将其安置在界面中的正确位置)
   当布局发生变化的时候, 会出现重排:

   - 页面首次渲染
   - 浏览器窗口大小发生改变
   - 元素尺寸或位置发生改变
   - 元素内容变化（文字数量或图片大小等等）
   - 元素字体大小变化
   - 添加或者删除可见的 `DOM` 元素
   - 激活 `CSS` 伪类（例如 `::hover`）
   - 设置 `style` 属性
   - 查询某些属性或调用某些方法

   常见引起重排属性和方法:

   - `width`
   - `height`
   - `margin`
   - `padding`
   - `display`
   - `border`
   - `position`
   - `overflow`
   - `clientWidth`
   - `clientHeight`
   - `clientTop`
   - `clientLeft`
   - `offsetWidth`
   - `offsetHeight`
   - `offsetTop`
   - `offsetLeft`
   - `scrollWidth`
   - `scrollHeight`
   - `scrollTop`
   - `scrollLeft`
   - `scrollIntoView`()
   - `scrollTo`()
   - `getComputedStyle`()
   - `getBoundingClientRect`()
   - `scrollIntoViewIfNeeded`()

   `repaint`(重绘)就是当页面中元素样式的改变并不影响它在文档流中的位置时，例如更改了字体颜色,浏览器会将新样式赋予给元素并重新绘制的过程

   - `color`
   - `border-style`
   - `visibility`
   - `background`
   - `text-decoration`
   - `background-image`
   - `background-position`
   - `background-repeat`
   - `outline-color`
   - `outline`
   - `outline-style`
   - `border-radius`
   - `outline-width`
   - `box-shadow`
   - `background-size`

   优化

   - 减少 `DOM` 操作

     - 最小化 `DOM` 访问次数，尽量缓存访问 `DOM` 的样式信息，避免过度触发回流。

     - 如果在一个局部方法中需要多次访问同一个 `dom`，则先暂存它的引用。

   - 采用更优的 `API` 替代消费高的 `api`，转换优化消费高的集合

     - 用 `querySelectorAll`()替代 `getElementByXX`()。

     - 开启动画的 `GPU` 加速，把渲染计算交给 `GPU`。

     - 少用 `HTML` 集合（类数组）来遍历，因为集合遍历比真数组遍历耗费更高。

     - 用事件委托来减少事件处理器的数量。

   - 减少重排

     - 避免设置大量的 `style` 属性，因为通过设置 `style` 属性改变结点样式的话，每一次设置都会触发一次 `reflow`，所以最好是使用 `class` 属性

     - 实现元素的动画，它的 `position` 属性，最好是设为 `absoulte` 或 `fixed`，这样不会影响其他元素的布局

     - 动画实现的速度的选择。比如实现一个动画，以 1 个像素为单位移动这样最平滑，但是 `reflow` 就会过于频繁，大量消耗 `CPU` 资源，如果以 3 个像素为单位移动则会好很多。

     - 不要使用 `table` 布局，因为 `table` 中某个元素旦触发了 `reflow`，那么整个 `table` 的元素都会触发 `reflow`。那么在不得已使用 `table` 的场合，可以设置 `table-layout:auto;`或者是 `table-layout:fixed` 这样可以让 `table` 一行一行的渲染，这种做法也是为了限制 `reflow` 的影响范围

   - `css` 及动画处理

     - 少用 `css` 表达式

     - 减少通过 `JavaScript` 代码修改元素样式，尽量使用修改 `class` 名方式操作样式或动画；

     - 动画尽量使用在绝对定位或固定定位的元素上；

     - 隐藏在屏幕外，或在页面滚动时，尽量停止动画；

7. 阻塞渲染和阻塞解析

   阻塞渲染: `CSS` 的解析会阻塞渲染 -> 基于不要让用户看到没有 `CSS`, 即没有样式的页面, 但是也会有例外的情况, 有可能很久没有返回 `CSS`, 这时, `CSS` 一直无法解析, 那就有可能出现没有样式的页面, 但是最后接收到了页面 `CSS` 就会让重新刷新

   阻塞解析: `JS` 的运行会阻塞 `DOM` 树解析和渲染, `CSS` 的运行不会阻塞 `DOM` 树的解析, 因为 `CSS` 的解析顺序与结果无关

   并行下载: 最大数量下载量 -> 下载的时间和时机看代码的位置和配置

8. 事件循环和浏览器渲染机制

   ```html
   <html>
     <body>
       <h2>Hello</h2>
       <script>
         function printH2() {
           console.log('first script', document.querySelectorAll('h2'));
         }
         printH2();
         setTimeout(printH2);
       </script>
       <link
         rel="stylesheet"
         href="http://cdn.bootcss.com/bootstrap/4.0.0-alpha.4/css/bootstrap.css"
       />
       <h2>World</h2>
       <script>
         console.log('second script');
       </script>
     </body>
   </html>
   ```

   上面代码的运行结果是:

   ```javascript
   // 先打打印出printH2();
   // setTimeout(printH2);
   // 完全显示之后才执行console.log('second script');
   ```

9. `JS`异步任务与`UI`线程之间的调度
   - CSS（外链或内联）会阻塞整个 DOM 的渲染（Rendering），然而 DOM 解析（Parsing）会正常进行
   - 很多浏览器中，CSS 会延迟脚本执行和 DOMContentLoaded 事件
   - JS（外链或内联）会阻塞后续 DOM 的解析（Parsing），后续 DOM 的渲染（Rendering）也将被阻塞
   - JS 前的 DOM 可以正常解析（Parsing）和渲染（Rendering）
