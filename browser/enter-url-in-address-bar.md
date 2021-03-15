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
       <link rel="dns-prefetch" href="//cdn.com" /> // 推荐放在<meta
         charset="UTF-8"
       />
       ```

       放在页面的顶部, 能够尽快在`DNS`服务器上面查询到对应的`IP`地址

       但是使用`DNS prefetch`会导致资源浪费, 因此可以在页面中禁止隐式的`DNS prefetch`

       ```html
       <meta http-equiv="x-dns-prefect-control" content="off" />
       ```

   - 使用`CDN`服务器进行优化

2. `TCP Handshake`

   TCP 三次握手与服务器建立连接

   - 作用: 让两端尝试进行通信

   可以通过上层协议`HTTPS`协商`TCP`的一些参数

   三次握手 - 又称为`SYN - SYN - ACK` , 实际上是`SYN, SYN-ACK, ACK`

   - 为什么需要三次握手? 
     `TCP`协议提供可靠的连接服务, 三次握手的目的是同步连接双方的序列号和确认号并交换`TCP`窗口大小信息

   - 改成两次握手不行吗? 
     假设如发送了第一个请求报文, 第一个因为网络原因没能按时到达, 这时候发送端就会再发一个请求, 如果是两次握手, 服务端收到立马就建立连接, 传输数据后断开连接。之前的第一个请求最后达到了服务端， 服务端又以为是要发送数据，于是开始建立连接，但是客户端是没有准备好建立连接的，这样就会造成资源浪费。如果是三次握手建立连接，服务端第二次接受到连接的请求，但是没有接受到客户端的确认请求就不会等待建立连接。

   

3. `TLS`协商

   在发送真正的请求内容之前还需要三次往返服务器

   这时候还没有发送内容

   总共 8 次往返, 浏览器可以发出请求(`DNS`查找两次 - `TCP`三次握手 - `TLS`协商三次)
   
   `TLS`

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

   从另外一个角度理解, 当浏览器在解析 DOM 树的时候, 已经调用了`document.open`了, 那么在这种情况下, 使用`document.write`可以直接在文档中间的位置写入内容, 当文档解析完了触发`documentloaded`的时候, 浏览器会调用`document.close`。这个时候相当于写入文件完成并且管道关闭了，如果还要再进行`document.write`这个操作的时候, 需要重新调用`document.open`。因为是系统自动调用的， 系统不知道哪个`document`，所以就会重新生成一个空白的`document` , 并且把`document.write`里面要写入的内容写进去, 并且覆盖掉原来的`document`, 这样就会造成`documentloaded`之后调用`document.write`会将整个页面都覆盖掉。

2. JS script 不同标签的行为(async, defer)

   async - 异步加载, 同步执行

   defer - 异步加载, onload 之后执行

3. CSSOM 解析会阻塞 DOM Tree 的解析或者 JS 的运行吗

这里共有两种情况：

1. 如果 CSS 外链标签在文件的最上方, 异步下载解析, 但是文件中间有一个`script`标签, 当整个文件解析到了 script 标签的时候, 假定 CSS 标签还未下载完成, 如果 script 标签里面有 get ComptuedStyle 的操作, CSS 的解析就会阻塞 JS 的执行, 直到 CSS 解析完成了以后, 获取了正确的样式, 这样计算出来的结果才是正确的。

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

2. 前面的情况同上, 唯一不同的点就是, script 标签里面没有做 get computed style 的操作。这时，就和一般的操作是一样的。

3. 浏览器并行下载的最大数量

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

4. 为什么需要 document.write 方法
   以下内容摘自 Stack Overflow
   When document.write() is executed after page load, it replaces the entire header and body tag with the given parameter value in string.

   - document.write (henceforth DW) does not work in XHTML
   - ~~DW does not directly modify the DOM, preventing further manipulation~~ _(trying to find evidence of this, but it's at best situational)_
   - DW executed after the page has finished loading will overwrite the page, or write a new page, or not work
   - DW executes where encountered: it cannot inject at a given node point
   - DW is effectively writing serialised text which is not the way the DOM works conceptually, and is an easy way to create bugs (.innerHTML has the same problem)

   The only seem appropriate usage for document.write() is when working third parties like Google Analytics and such for including their scripts. This is because document.write() is mostly available in any browser. Since third party companies have no control over the user’s browser dependencies (ex. jQuery), document.write() can be used as a fallback or a default method.(兼容性问题, 当需要加入 google analytics 等的脚本, 这是最容易加入依赖的方法)

5. render tree 的行为, 如果 CSS 发生了改变以后

   repaint(重绘)和 reflow(重排)

6. 阻塞渲染和阻塞解析

   阻塞渲染: CSS 的解析会阻塞渲染 -> 基于不要让用户看到没有 CSS, 即没有样式的页面, 但是也会有例外的情况, 有可能很久没有返回 CSS, 这时, CSS 一直无法解析, 那就有可能出现没有样式的页面, 但是最后接收到了页面 CSS 就会让重新刷新

   阻塞解析: JS 的运行会阻塞 DOM 树解析

   并行下载: 最大数量下载量 -> 下载的时间和时机看代码的位置和配置
