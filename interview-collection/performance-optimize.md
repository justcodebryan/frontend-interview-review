# webpack

## 代码包体积

- 代码分割
  - splitChunks 配置
  - lazyLoad
- 按需加载
- tree shaking
- DllPlugin 提前打包依赖(新版本已经淘汰, 自动带有优化, 也不建议使用, 实际上和 splitChunks 配置是差别的意思)

## 打包速度

- 开启多个线程进行打包(happyPack)
- 优化打包范围(loader 操作的文件限定范围)

# 图片体积

- 雪碧图
- iconfont/base64
- 用小体积的图片代替

# 网络

- 合理安排请求
- 合理缓存对应的资源
  - 强缓存和协商缓存
- DNS 优化
- CDN 优化

# 代码层面

- 页面最开始加载只请求必要的数据
- 按需加载

# 如何判断资源的重要性

- 在 chrome devtools 中打开 Network -> 打开 Priority 的选项, 可以看到当前页面的某些资源的重要性
- 查看 element 里面的资源排序以及 script 标签的属性
- 根据资源的重要性去做对应的优化

​

# 前端性能优化

1. 加载性能优化
2. 渲染性能优化

## 加载性能优化

1. 减少请求次数；

   为什么减少请求次数？
   浏览器能够并行发出请求，但是每次并行发出请求的个数是有限制的，以 chrome 为例：

   同一域名下，同一 GET 请求的并发数是 1，也就是说上一个请求结束，才会执行下一个请求，否则置入队列等待发送；
   同一域名下，不同 GET/POST 请求的并发数量是 6。当发送的请求数量达到 6 个，并且都没有得到响应时，后面的请求会置入队列等待发送。
   所以资源请求数过多肯定比请求数少更耗时，直接影响网页的加载速度；

   减少请求次数方式
   1）图片资源
   CSS 雪碧图技术
   把一些常用、重复使用的小图合并成一张大图，使用的时候通过背景图片定位（background-position），定位到具体的某一张小图上；
   1、UI 给图；
   2、webpack 插件：webpack-spritesmith
   图片懒加载
   视区外图片先不加载，当进入视区或者进入视区之前的某个位置加载；
   1、css 的 loading 属性；
   2、getBoundingClientRect 方法，获取 dom 元素的 top、left、bottom、right、height、width 信息，对比视区大小，进行图片加载（需要结合节流）；
   3、IntersectionOberser 方法，能够监听元素是否到达当前视口的事件；
   字体图标
   一个图标字体比一系列图像要小，一旦图标字体加载了，图标就会马上渲染出来，不需要下载一个图像，可以减少 HTTP 请求。
   base64 编码
   图片的 base64 编码就是可以将一张图片数据编码成一串字符串，使用该字符串代替图像地址 url；
   （均衡 css 体积增大和 http 请求减少之间的收益）
   2）合理利用缓存
   避免一行代码修改导致整个 bundle 的缓存失效
   浏览器缓存（资源）
   强缓存
   协商缓存
   DNS 缓存（DNS 查找时间）
   分包加载 (Bundle Spliting)
   3）合并 CSS 和 JS 文件
   将 CSS 和 JavaScript 文件合并为单独的文件。合并 CSS 和 JavaScript 文件是减少 HTTP 请求数量和提高网站加载速度的有效方法；
   2、减少资源大小
   相同网络环境下，更小体积意味着传输速度更快；

2. 减少请求资源的大小；
   1）资源压缩
   图片压缩工具：tinyPng 等
   图片格式：，webp 普遍比 jpeg/png 更小，而 avif 又比 webp 小一个级别
   如何鉴别浏览器是否支持 webp？
   通过 canvas 来判断（这个比较常用），创建一个 canvas 元素，然后把它转成 image/webp 格式的 data_url,如果这个 data_url 里面包含 webp,则代表当前浏览器支持 webp 格式， 反之则不支持：document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')
   在服务端根据请求 header 信息判断浏览器是否支持 webp：在图片请求发出的时候，Request Headers 里有 Accept，服务端可以根据 Accept 里面是否有 image/webp 进行判断。
   通过加载一张 webp 图片进行判断：先加载一个 WebP 图片，如果能获取到图片的宽度和高度，就说明是支持 WebP 的；
   gzip 压缩：nginx 配置中可以开启，资源传输体积压缩变小，相应会增加服务器压缩和浏览器资源解压的压力；对于图片资源压缩效率不明显；
   Terser 等工具是 Javascript 资源压缩混淆的神器。对代码层进行处理，比如：
   1、长变量名替换短变量；
   2、删除空格换行符；
   3、预计算能力；
   4、移除无法被执行的代码；
   5、移除无用的变量及函数
   js、css、html 资源压缩
   2）Tree Shaking 技术
   Tree Shaking: 无用导出将在生产环境进行删除，到达减少资源体积的效果；
3. 网络优化；
   1）CND：就近原则
   2）Http2.0
   多路复用，在浏览器可并行发送 N 条请求。
   首部压缩，更小的负载体积。
   请求优先级，更快的关键请求
   其他
   路由懒加载
   第三方组件按需加载
   ···

## 渲染性能优化

浏览器渲染过程
解析 HTML 生成 DOM 树。
解析 CSS 生成 CSSOM 规则树。
解析 JS，操作 DOM 树和 CSSOM 规则树。
将 DOM 树与 CSSOM 规则树合并在一起生成渲染树。
遍历渲染树开始布局，计算每个节点的位置大小信息。
浏览器将所有图层的数据发送给 GPU，GPU 将图层合成并显示在屏幕上。

重排
当改变 DOM 元素位置或大小时，会导致浏览器重新生成渲染树，这个过程叫重排。

重绘
当重新生成渲染树后，就要将渲染树每个节点绘制到屏幕，这个过程叫重绘。

不是所有的动作都会导致重排，例如改变字体颜色，只会导致重绘。

重排和重绘这两个操作代价非常大，因为 JavaScript 引擎线程与 GUI 渲染线程是互斥，它们同时只能一个在工作，因此重排和重绘会阻塞主线程。

渲染性能优化方式
1）资源加载优先级控制
css 引入放在 head 标签尾部，script 脚本防砸 body 标签尾部；
脚本与 DOM/其它脚本的依赖关系很强：对<script>设置 defer
脚本与 DOM/其它脚本的依赖关系不强：对<script>设置 async
preload 加载当前路由必需资源，优先级高，一般对于 Bundle 资源使用 preload；
refetch 优先级低，在浏览器 idle 状态时加载资源，一般用以加载非首页资源；
preload/prefetch
preload/prefetch 可控制 HTTP 请求优先级，从而达到关键请求更快响应的目的；
dns-prefetch，可对主机地址的 DNS 进行预解析。
js 和 css 的引入位置/script 类型设置
2）减少重排重绘
减少页面 DOM 操作；
对 DOM 元素执行一系列操作，可以将 DOM 元素脱离文档流，修改完成后，再将它带回文档。例如：隐藏元素（display:none）、文档碎片（DocumentFragement）等（虚拟 dom）；
用 JavaScript 修改样式时，最好不要直接修改单个样式属性，而是替换 class 来改变样式；
合理使用防抖和节流；
3）利用缓存
页面缓存（keep-alive），接口缓存（减少数据更新导致的页面刷新）
4）Web Worker
用于那些处理纯数据，或者与浏览器 UI 无关的长时间运行脚本；

三、页面加载指标
API 指标
window.performence.timing

fetchStart: 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前。
domainLookupStart/domainLookupEnd: DNS 域名查询开始/结束的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等;
connectStart: HTTP（TCP）开始/重新 建立连接的时间，如果是持久连接，则与 fetchStart 值相等。
requestStart: HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存。
responseStart: HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存。
responseEnd: HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存。
domLoading: 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件。
domInteractive: 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件，注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源。
domContentLoadedEventStart: DOM 解析完成后，网页内资源加载开始的时间，在 DOMContentLoaded 事件抛出前发生。
domContentLoadedEventEnd: DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）。
domComplete: DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件。
loadEventStart: load 事件发送给文档，也即 load 回调函数开始执行的时间。
loadEventEnd: load 事件的回调函数执行完毕的时间。

页面指标
白屏时间

指浏览器发起请求到开始显示第一个页面元素的时间。现代浏览器不会等待 CSS 树（所有 CSS 文件下载和解析完成）和 DOM 树（整个 body 标签解析完成）构建完成才开始绘制，而是马上开始显示中间结果。所以经常在低网速的环境中，观察到页面由上至下缓慢显示完，或者先显示文本内容后再重绘成带有格式的页面内容。

window.performence.timing.domLoading - window.performence.timing.fetchStart

首屏时间

首屏时间（FirstScreen Time），是指用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间。常用的方法有，页面标签标记法、图像相似度比较法和首屏高度内图片加载法。

可交互时间

用户可以进行正常的点击、输入等操作，默认可以统计 DOMContentLoaded 事件发生的时间。

window.performence.timing.domContentLoadedEventEnd - window.performence.timing.fetchStart

整页时间

整页时间（Page Load Time），页面所有资源都加载完成并呈现出来所花的时间，这个就是 load 事件发生的时间。

window.performence.timing.loadEventEnd - window.performence.timing.connectStart

DevTools 指标
在使用 Google Chrome 开发者工具的时候，使用 Network 测试网络性能时候，下面有三个时间。

Finish: 1.31s -表示整个页面加载时间为 640ms，包括 load 事件发生后还有一些异步资源也加载完成。
DOMContentLoaded: 329ms -发生在页面 DOMContentLoaded 事件的启动时间点，对应上图蓝色竖线。
Load: 1.25s -表示页面 load 事件的启动时间点，对应上图红色竖线
