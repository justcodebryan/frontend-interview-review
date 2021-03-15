# `Webkit`是什么

> **WebKit**是一种用来让[网页浏览器](https://zh.wikipedia.org/wiki/网页浏览器)[绘制](https://zh.wikipedia.org/wiki/渲染)[网页](https://zh.wikipedia.org/wiki/網頁)的[排版引擎](https://zh.wikipedia.org/wiki/排版引擎)。它被用于[Apple](https://zh.wikipedia.org/wiki/蘋果公司) [Safari](https://zh.wikipedia.org/wiki/Safari)。其分支[Blink](https://zh.wikipedia.org/wiki/Blink)被用于基于[Chromium](https://zh.wikipedia.org/wiki/Chromium)的网页浏览器，如[Opera](https://zh.wikipedia.org/wiki/Opera)与[Google Chrome](https://zh.wikipedia.org/wiki/Google_Chrome)。 - 摘自维基百科

当前市场上只有 3 个主要的浏览器引擎：Mozilla 的 Gecko、Google 的 Blink、还有苹果的 WebKit（Blink 的近亲）

Blink 是怎么回事？Blink 是 Google Chrome 浏览器的渲染引擎，V8 是 Blink 内置的 JavaScript 引擎。

所以 v8 是 Blink 的子集

标准浏览器组件

- Parsing (HTML, XML, CSS, JavaScript)(解析器)
- Layout(布局)
- Text and graphics rendering(文字和图形渲染)
- Image decoding(图像解码)
- GPU interaction(GPU 交互)
- Network access(网络访问)
- Hardware acceleration(硬件加速)

# 不同的浏览器的异同点

这些浏览器的渲染引擎的共同点

1. DOM, window, document
2. CSSOM
3. CSS 解析, 属性值的处理
4. HTML 解析和 DOM 构建
5. 布局和位置
6. 开发者工具
7. 其他的一些特性, 例如: contenteditable, pushState, File API, most SVG, CSS Transform math, Web Audio API, localStorage

浏览器渲染引擎的不同点

1. GPU 相关技术
   - 3D 转换
   - WebGL
   - 视频解码
2. 将 2D 图像绘制到屏幕

   - 解析方式
   - SVG 和 CSS 渐变绘制

3. 文字绘制和断字
4. 网络层（SPDY、预渲染、WebSocket 传输）
5. JavaScript 引擎
   - JavaScriptCore 在 WebKit repo 中。V8 和 JavaScriptCore 被绑定在 WebKit 中。
6. 表单控制器的渲染
7. \<video> 和 \<audio> 的元素表现和解码实现
8. 图像解码
9. 页面导航 前进 / 后退
   - pushState() 的导航部分
10. SSL 功能，比如 Strict Transport Security 和 Public Key Pins

2D 图像部分, 不同的引擎用的是不同的库来渲染图像

![img](https://static001.infoq.cn/resource/image/6a/b9/6a0d1710b795907e1a1c6fe0aaee84b9.png)

![WebKit Diagram](https://www.paulirish.com/assets/webkit-diagram.png)

|            | Chrome (OS X)          | Safari (OS X)  | QtWebKit                         | Android Browser                  | Chrome for iOS                      |
| :--------- | :--------------------- | :------------- | :------------------------------- | :------------------------------- | ----------------------------------- |
| Rendering  | Skia                   | CoreGraphics   | QtGui                            | Android stack/Skia               | CoreGraphics                        |
| Networking | Chromium network stack | CFNetwork      | QtNetwork                        | Fork of Chromium’s network stack | Chromium stack                      |
| Fonts      | CoreText via Skia      | CoreText       | Qt internals                     | Android stack                    | CoreText                            |
| JavaScript | V8                     | JavaScriptCore | JSC (V8 is used elsewhere in Qt) | V8                               | JavaScriptCore (without JITting) \* |

# `WebKit`的网页渲染过程

## 加载和渲染

浏览器的主要作用: URL -> 可视化的图像

两个过程:

1. 网页加载过程, URL -> 构建 DOM tree
2. 网页渲染过程, DOM tree -> 可视化图像

两个过程交叉, 难以明确的区分

特征: 网页通常比我们的屏幕可视面积要大

整个过程中包含两块: 数据和模块

模块: HTML 解释器, CSS 解释器, JS 引擎, 布局和绘图模块

数据: 网页内容, DOM, 内部表示和图像

数据的流向:

- 从网页的 URL 到构建完 DOM 树
- 从 DOM 树到构建完 WebKit 的绘图上下文

- 从绘图上下文到生成最终的图像

![image-20201201101121828](D:\Users\80296847\AppData\Roaming\Typora\typora-user-images\image-20201201101121828.png)

    1. 用户输入网页URL, WebKit调用资源加载器加载该URL对应的网页

2. 加载器依赖网络模块建立链接, 发送请求并接受答复
3. WebKit 接受到各种网页或者资源的数据, 其中某些资源可能是同步或者异步获取的
4. 网页被交给 HTML 解释器转变成一系列的词语(Token)
5. 解释器根据词语构建节点(Node), 形成 DOM 树
6. 如果节点是 JavaScript 代码, 调用 JavaScript 引擎解释并执行
7. JavaScript 代码可能会修改 DOM 树的结构
8. 如果节点需要依赖其他资源, 例如图片, CSS, 视频等, 调用资源加载器来加载它们, 不会阻碍当前 DOM 树的继续创建, 如果是 JavaScript 资源 URL(没有标记异步方式), 需要停止当前 DOM 树的创建, 知道 JavaScript 的资源加载并被 JavaScript 引擎执行后才继续 DOM 树的创建

DOM 树构建完成之后 -> DOMContent 事件

DOM 树建完并且网页所依赖的资源都加载完之后 -> onload 事件

CSS+DOM tree -> RenderObject tree

1. CSS 文件被 CSS 解释器解释成内部表示结构
2. CSS 解释器工作完成之后, 在 DOM 树上附加解释后的样式信息, 形成 RenderObject tree
3. RenderObject 节点在创建的同时, WebKit 会根据网页的层次结构创建 RenderLayer 树, 同时构建一个虚拟的绘图上下文

![image-20201201104300611](D:\Users\80296847\AppData\Roaming\Typora\typora-user-images\image-20201201104300611.png)

RenderObject Tree 的创建并不是表示 DOM 树被销毁, 四种内部表示结构会一直存在

根据绘图上下文来生成最终的图像, 这一过程主要依赖 2D 和 3D 图形库

![image-20201201104329896](D:\Users\80296847\AppData\Roaming\Typora\typora-user-images\image-20201201104329896.png)

具体过程:

1. 绘图上下文是一个与平台无关的抽象类, 它将每个绘图操作桥接到不同的具体实现类, 也就是绘图具体实现类
2. 绘图实现类也可以有简单的实现, 也可能有复杂的实现
3. 绘图实现类将 2D 图形库或者 3D 图形库绘制的结果保存下载,交给浏览器来同浏览器界面一起显示

# WebKit 架构

![image-20201201110920422](D:\Users\80296847\AppData\Roaming\Typora\typora-user-images\image-20201201110920422.png)

虚线框表示该部分模块在不同浏览器使用的 WebKit 内核中的实现是不一样的

chromium 的多进程架构

优势:

1. 避免的单个页面的不响应或者崩溃而影响整个浏览器的稳定性, 特别是对用户界面的影响
2. 当第三方插件崩溃时不会影响页面或者浏览器的稳定性, 因为第三方插件也用单独的进程来运行
3. 方便了安全模型的实施, 沙箱模型是基于多进程架构的

主要包含以下进程类型:

1. Browser 进程: 浏览器的主进程, 负责浏览器界面的显示, 各个页面的管理是所有其他类型进程的祖先, 负责他们的创建和销毁等工作, 他有且仅有一个

   方框代表进程, 连线代表 IPC 进程间通信

   ![image-20201201113623062](D:\Users\80296847\AppData\Roaming\Typora\typora-user-images\image-20201201113623062.png)

2. Render 进程, 负责页面的渲染工作, 可能有多个

3. NPAPI 插件进程, 该进程是为 NPAPI 类型的插件而创建, 其创建的基本原则是每种类型的插件是只会创建一次, 而且仅当时才被创建

4. GPU 进程, 最多只有一个, 当且仅当 GPU 硬件加速打开的时候才会被创建, 主要用于对 3D 图像加速调用的实现

5. Pepper 插件进程: 同 NPAPI 插件进程, 为 Pepper 插件创建的进程

6. 其他类型的进程

特征:

1. Browser 进程和页面的渲染是分开的, 这保证了页面的渲染导致的崩溃不会导致浏览器主界面的崩溃
2. 每个网页是独立的进程, 这保证了页面之间相互不影响
3. 插件进程也是独立的, 插件本身的问题不会影响浏览器主界面和网页
4. GPU 硬件加速进程也是独立的

Chromium 允许用户配置 Render 进程被创建的方式

- Process-per-site-instance: 每个页面都创建一个独立的 Render 进程(好处是互不影响, 坏处是资源的巨大浪费)
- Process-per-site: 属于同一个域的页面共享同一个进程, 而不同属一个域的页面则分属不同的进程(好处内存消耗小, 坏处可能出现特别大的 render 进程)
- Process-per-tab: 每个 tab 都创建一个独立的进程, 不管是否是不同域不同实例
- Single Process: 不为页面创建任何独立的进程, 所有渲染工作都是在 Browser 进程中进行. 他们是 Browser 进程中的多个线程. 在 Android WebView 中被采用





浏览器架构

1. 单进程里多线程
2. 多进程里面多线程并且通过 `IPC` 通信

各个进程的作用

1. Browser - 浏览器进程， 包括地址栏， 书签， 返回向前的按钮， 并且处理可见性， 网络请求和文件请求
2. Renderer - 渲染进程，控制在 tab 里面网站显示的地方
3. Plugin - 控制所有的插件，例如， flash
4. GPU - 单独处理来自其他进程的 GPU 任务，因为 GPU 需要来自不同的 app 的需求和并且渲染在同一个界面上，所以分成不同的进程

浏览器处理地址栏输入的步骤：

1. 处理输入

   - 当用户输入文字的时候，会先识别是查询的参数或者`url`，
   - 在`Chrome`中会将查询的参数直接发送给的搜索引擎,
   - 如果是`url`则将发送请求

2. 导航

   - 当用户按下 enter 以后，`UI`线程将会启动一个网络请求去获得网站内容
   - 网络线程通过一些协议像`DNS`查询和建立`TLS`连接去进行请求
   - 网络线程可能会收到`301`这种`HTTP Header`需要重定向, 另外一个`URL`请求将会开始

3. 阅读响应的内容

   - 当读到返回体, 网络线程会先看看是否会有些`btye`能够先行阅读
   - 响应体中的`Content-Type`会告诉浏览器数据的类型, 如果丢失了这个字段或者错误就会进行 MIME 类型推断
   - 如果返回的是`HTML`文件, 下一步是将会把数据传递给渲染进程
   - 如果是一个`zip`文件或者其他文件类型, 开启一个下载请求把数据传给`download manager`
   - 这个过程也会进行安全检查, 如果域名和响应数据是一些恶意网站, 浏览器展示警告页面
   - 进行`CORB`(`Cross Origin Read Blocking`)检查, 可以避免敏感的跨域数据传输到渲染进程中

4. 找到一个渲染进程

   - 如果检查完成, 将会导航到请求的网站
     网络线程会告诉`UI`线程数据准备就绪
     `UI`线程会找一个渲染进程去进行渲染

   - 因为网络请求可能需要几百毫秒的时间, 因此这里会进行一些优化, 当开始发送网络请求的时候, `UI`线程就会启动一个并行的渲染进程
   - 如果确实要导航到这个网站在数据准备就绪的时候就会有一个已经准备就绪的渲染进程
   - 这个准备就绪的渲染进程不能再重定向到跨站的时候创建

5. 开始导航

   - 当数据和渲染进程准备就绪时, 通过一个`IPC`从浏览器进程中将数据传输到渲染进程
   - 当浏览器进程确认了渲染进程开始拿到数据了, 这时候一次导航就结束了, 页面开始加载
   - 会话历史会保存到本地硬盘

6. `Load Complete`

   当页面加载完成时(`onload`事件), 会发送一个`IPC back`给浏览器进程
   这时候, 服务端`JS`还能继续加载资源并且渲染新的视图

下一次导航到其他的页面 - 后续的操作和一开始一样

1. 需要检查`beforeunload`事件
   - 通过`beforeunload`事件能够创建一个`alert` -> `Leave this site?`
   - 因为当前的所有操作都是渲染进程处理的, 所以需要浏览器进程先问渲染进程需不需要处理`beforeunload`事件
2. 一个浏览器进程会开多一个`IPC`
   - 旧渲染进程正在进行`unload`
   - 新渲染进程在进行渲染