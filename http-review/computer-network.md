# 基本概念

通信链路: 不同类型的物理媒体(不同的链路能够以不同的速率传输数据)

- 同轴电缆
- 铜线
- 光纤
- 无线电频谱

传输速率: 不同的链路能够以不同的速率传输数据

分组: 当一台端系统要向另外一台端系统发送数据时, 发送端系统将数据分段, 并为每段加上首部字节

分组交换机
作用: 朝着最终目的地转发

- 路由器(通常用于网络核心中)
- 链路层交换机(通常用于接入网中)

路径: 从发送端系统到接收端系统, 一个分组所经历的一系列通信链路和分组交换机成为通过该网络的路径

因特网服务商(Internet Service Provider, ISP)
每个 ISP 自身就是一个由多台分组交换机和多端通信链路组成的网络

协议: 端系统, 分组交换机和其他因特网部件都要运行一系列协议
作用: 控制因特网中信息的接受和发送

TCP(Transmission Control Protocol, 传输控制协议)

IP(Internet Protocol, 网际协议): 定义了在路由器和端系统之间发送和接受的分组格式

因特网标准(Internet Standard)由因特网工程任务组(Internet Engineering Task Force, IETF)研发

IETF 的标准文档称为请求评论(Request For Comment, RFC)

协议(protocol)定义了在两个或多个通信实体之间交换的报文的格式和顺序, 以及报文发送和/或接收一条报文或其他事件所采取的动作

因特网套接字接口(socket interface)是一套发送程序必须遵循的规则集合, 与因特网相连的端系统提供了一个套接字接口, 该接口规定了运行在一个端系统上的程序请求因特网基础设施向运行在另一个端系统上的特定目的地程序交付数据的方式

端系统, 也称为主机(host)

- 客户端(client)
- 服务器(server)

# 因特网概述

## 什么是因特网

1. 构成因特网的基本硬件和软件组件
2. 根据为分布式引用提供服务的联网基础设施来描述因特网

## 网络边缘

端系统位于因特网边缘, 包括桌面计算机, 服务器和移动计算机

接入网: 将端系统物理连接到其边缘路由器(edge router)的网络

1. 家庭接入:
   - 数字用户线(Digital Subscriber Line, DSL),
     - 通常住户从提供本地电话接入的本地电话公司获得 DSL 因特网接入;
     - 因此, 当使用 DSL 时, 用户的本地电话公司也是它的 ISP;
     - 每个用户的 DSL 调制解调器使用现有的电话线与电话公司的本地中心局(CO)中的数字用户线接入复用器(DSLAM)交换数据;
     - 家庭的 DSL 调制解调器得到数字数据后将其转换为高频音, 以通过电话线传输到本地中心局
     - 来自许多家庭的模拟信号在 DSLAM 处被转换回数字形式
   - 电缆
   - FTTH
   - 拨号和卫星 2.

## 网络核心

### 分组交换

1. 存储转发传输
   - 多数分组交换机在链路的输入端使用该机制
   - 指交换机能够开始向输出链路传输该分组的第一个比特之前, 必须接收到整个分组
2. 排队时延和分组丢失
3. 转发表和路由选择协议

### 电路交换

# 应用层

## 原理

### 网络应用程序体系结构

1. C/S 结构
2. P2P 结构

### 进程通信

进行通信的实际上式进程而不是程序

一个进程可以被认为是运行在端系统中的一个程序

不同的端系统上的进程, 通过跨越计算机网络交换报文

1. 客户和服务器进程

2. 进程与计算机网络之间的接口
   进程通过套接字(socket)软件接口向网络发送报文和从网络接收报文

   开发者可以控制套接字在应用层端的一切, 但是对该套接字的运输层端记户没有控制权

   控制仅限于:

   - 选择运输层协议
   - 设定运输层参数, 如最大缓存和最大报文段长度等

3. 进程寻址
   在一台主机上运行的进程为了向在另一台主机上运行的进程发送分组, 接收进程需要有一个地址, 标识地址的信息:

   - 主机的地址
   - 在目的主机中指定接受进程的标识符

目的地端口用于指定接收主机上的接收进程(更具体地说, 接收套接字)

### 可供应用程序使用的运输服务

从以下方面对应用程序服务要求进行分类:

1. 可靠数据传输
   可靠数据传输: 一个协议能够提供了确保由应用程序的一端发送的数据正确, 完全地交付给该应用程序地另一端的数据交付服务

   容忍丢失的应用: 当一个运输层协议不提供可靠数据传输时, 由发送进程发送的某些数据可能到达不了接收进程, 如交谈式音频/视频

2. 吞吐量

   带宽敏感的应用: 具有吞吐量要求的应用程序
   弹性应用: 根据当时可用带宽或多或少利用可供使用的吞吐量

3. 定时

   定时保证能够以多种形式实现

4. 安全性

   运输协议能够为应用程序提供一种或多种安全性服务

### 运输服务的种类

1. `TCP`服务
   `TCP`服务模型

   - 面向连接服务
     - 三次握手
     - 建立一套全双工的连接, 连接双方的进程可以在此连接上同时进行报文发收
     - 四次挥手
   - 可靠数据传输服务
     通信进程能够依靠 TCP, 无差错, 按适当顺序交付所有发送的数据
     当应用程序的一端将字节流传进套接字时, 它能够依靠 TCP 将相同的字节流交付给接收放的套接字, 而没有字节的丢失和冗余

2. `UDP`服务
   一种不提供不必要服务的轻量级运输协议, 仅提供最小服务

   - UDP 是无连接的, 因此在两个进程通信前没有握手过程
   - 提供不可靠数据传送服务, 当进程将一个报文发送进 UDP 套接字时, UDP 协议不保证该报文将到达接收进程, 并且接收进程的报文也可能是乱序的
   - 没有包括拥塞控制机制, 发送端用它选定的任何速率向他的下层(网络层)注入数据(实际端到端吞吐量可能小于该速率, 可能是中间链路的带宽受限或因为拥塞而造成)

3. 因特网运输协议所不提供的服务

### 应用层协议

应用层协议定义了运行在不同端系统上的应用程序进程如何相互传递报文
定义内容:

- 交换的报文类型, 例如请求报文和响应报文
- 各种报文类型的语法, 即这些字段中的信息的含义
- 字段的语义
- 确定一个进程何时机如何发送报文, 对报文进行响应的规则

## Web 和 HTTP

### HTTP 概况

web 的应用层协议是超文本协议(HyperText Transfer Protocol, HTTP)

HTTP 使用 TCP 作为它的支撑运输协议
客户端首先发起一个与服务器的 TCP 连接
一旦连接建立, 浏览器和服务器进程就可以通过套接字进行通信

### 非持续连接和持续连接

非持续连接: 每个请求/响应对是经一个单独的 TCP 连接发送

- 默认方式下, 大部分浏览器打开 5 ~ 10 个并行的 TCP 连接, 而每条连接处理一个请求响应事务

缺点:

- 必须为每一个请求的对象建立和维护一个全新的连接, 客户端和服务端都需要分配 TCP 的缓冲区和保持 TCP 变量
- 每个对象经受两倍 RTT 的交付时延, 一个 RTT 用于创建 TCP, 一个 RTT 用于请求和接收一个对象

持续连接: 所有的请求及其响应经相同的 TCP 请求发送

关闭条件: 一条连接经过一定时间间隔仍未被使用, HTTP 服务关闭该连接
默认模式: 使用带流水线的持续连接

HTTP/2 在 HTTP/1.1 的基础上构建, 允许在相同连接中多个请求和回答交错, 并且增加了在该连接中优化 HTTP 报文请求和回答的机制

### HTTP 报文格式

1. 请求报文

   - 请求行
     - 方法字段
       - GET
       - POST
       - HEAD
       - PUT
       - DELETE
     - URL 字段
     - HTTP 版本字段
   - 首部行
   - 实体体(entity body)

2. 响应报文

   - 状态行
   - 6 个首部行
     - `Connection: close`首部行告诉客户, 发送完报文后将关闭该 `TCP` 连接
     - `Date: `首部行指示服务器产生并发送该响应报文的日期和时间
     - `Server: `首部行指示该报文是由一台 XXX 服务器产生, 类似于 `HTTP` 请求报文中的`User-agent: `首部行
     - `Last-Modified: `首部行指示了对象创建或者最后修改的日期和时间
     - `Content-Length: `首部行指示了被发送对象中的字节数
     - `Content-Type: `首部行指示了实体体中的对象类型
   - 实体体

### Cookie

1. 在`HTTP`响应报文中的一个`cookie`首部行 `Set-cookie: `
2. 在`HTTP`请求报文中的一个`cookie`首部行 `Cookie: `
3. 在用户端系统中保留有一个`cookie`文件, 并由用户的浏览器进行管理
4. 后端数据

### WEB 缓存

Web 缓存器(Web cache)也叫代理服务器(proxy server): 能够代表初始 Web 服务器来满足 HTTP 请求的网络实体

可以配置用户的浏览器使得用户的所有 HTTP 请求首先指向 Web 缓存器

1. 浏览器创建一个到 Web 缓存器的 TCP 连接, 并向 Web 缓存器中的对象发送一个 HTTP 请求
2. Web 缓存器进行检查, 看本地是否存储了该对象副本, 如果有, Web 缓存器就向客户浏览器用 HTTP 响应报文返回该对象
3. 如果 Web 缓存器重没有该对象, 就打开一个与该对象的初始服务器的 TCP 连接

内容分发网络(Content Distribution Network, CDN)
CDN 公司通过在不同地理位置上安装分散的缓存器, 使得大量流量实现了本地化

### 条件 GET 方法

条件 GET 方法(conditional GET)

1. 请求报文使用 GET 方法
2. 请求报文包含一个`If-Modified-Since: `首部行

`If-Modified-Since: `首部行的值正好等于之前服务器发送的响应报文中的`Last-Modified: `首部行的值

状态行中返回为`304 Not Modified`时, 缓存器可以使用该对象, 能向请求的浏览器转发缓存的该对象副本

## 电子邮件

组成部分:

1. 用户代理(user agent)
2. 邮件服务器(mail server)
3. 简单邮件传输(Simple Mail Transfer Protocol, SMTP)

SMTP 和 HTTP 的区别

1. HTTP 主要是一个拉协议(pull protocol)(TCP 连接主要由想要接收文件的机器发起), SMTP 主要是一个推协议(push protocol)(TCP 连接主要由要发送该文件的机器发起的)
2. SMTP 要求每个报文(包括他们的体)采用 7 比特 ASCII 码格式, HTTP 没有这个限制
3. 如何处理一个既包含文本又包含图形的文档, HTTP 把每个对象封装到他自己的 HTTP 响应报文里面, SMTP 把所有报文对象放在一个报文中

邮件报文格式
首部行:

- 每个首部必须含有一个`From: `首部行和一个`To: `首部行
- 一个首部行也许包含一个`Subject: `首部行以及其他可选的首部行

空白行

报文体

- ASCII 格式

邮件访问协议

- 第三版的邮局协议(Post Office Protocol-Version 3, POP3)
  - 端口 110
  - 三个阶段工作
    - 特许(authorization): 用户代理发送(明文形式)用户名和口令以鉴别用户
    - 事务处理: 用户代理取回报文(用户代理还能做: 1. 对报文做标记删除; 2. 取消报文删除标记; 3. 获取邮件的统计信息)
    - 更新: 出现在客户发出了 quit 命令以后, 目的是结束该 POP3 会话
  - 事务处理阶段可能返回
    - +OK(有时后面还跟有服务器到客户的数据)
    - -ERR(被服务器用来指示前面的命令出现了某些差错)
- 因特网邮件访问协议(Internet Mail Access Protocol, IMAP)
- HTTP

## DNS

DNS - 因特网的目录服务

主机的标识方法是用主机名(hostname)

主机也可以用 IP 地址(IP address)进行标识

### DNS 提供的服务

出现的原因: 人类喜欢便于记忆的主机名标识方式, 路由器则喜欢定长且有层次结构的 IP 地址

域名系统(Domain Name System, DNS): 进行主机名到 IP 地址转换的目录服务

1. 一个由分层的 DNS 服务器(DNS server)实现的分布式数据库
2. 一个使得主机能够查询分布式数据库的应用层协议

DNS 服务器通常运行 BIND(Berkeley Internet Name Domain)软件的 UNIX 机器
DNS 协议运行在 UDP 上, 使用 53 号端口

DNS 协议和 HTTP, FTP 和 SMTP 协议一样都是应用层协议

原因:

1. 使用客户 - 服务器模式运行在通信的端系统之间
2. 在通信的端系统之间通过下面的端到端运输协议来传输 DNS 报文

运行过程:

1. 同一台用户主机上运行着 DNS 应用的客户端
2. 浏览器从上述 URL 中抽取出主机名, 并将这台主机名传给 DNS 应用的客户端
3. DNS 客户向 DNS 服务发送一个包含主机名的请求
4. DNS 客户最终会收到一份回答报文, 其中含有对应于该主机名的 IP 地址

重要服务:

- 主机别名(host aliasing), 比主机规范名(canonical hostname)更容易记忆
- 邮件服务器别名(mail server aliasing)
- 负载分配(load distribution), DNS 也用于冗余的服务器之间进行负载分配

### 工作机理概述

DNS 的一种简单设计是在因特网上只使用一个 DNS 服务器, 该服务器包含所有的映射

集中式设计的问题:

- 单点故障(a single point of failure), 如果该 DNS 服务器崩溃, 整个因特网随之瘫痪
- 通信容量(traffic volume), 单个 DNS 服务器不得不处理所有的 DNS 查询
- 远距离的集中式数据库(distant centralized database)
- 维护(maintenance)

分布式设计:

1. 分布式, 层次数据库
   三种类型

   - 根 DNS 服务器 -> 400 多个根名字服务器遍及全球, 由 13 个不同组织管理, 提供 TLD 服务器的 IP 地址
   - 顶级域(Top-Level Domain, TLD)DNS 服务器 -> 对于每个顶级域(如 com, org, net, edu 和 gov)和所有国家的顶级域(如 uk, fr, ca 和 jp)
   - 权威 DNS 服务器

   eg: 查找www.amazon.com

   - 客户首先与根服务器之一联系, 它将返回顶级域名 com 的 TLD 服务器的 IP 地址
   - 该客户与这些 TLD 服务器之一联系, 它将为 amazon.com 返回权威服务器的 IP 地址
   - 最后, 客户与 amazon.com 权威服务器之一联系, 它为主机名www.amazon.com返回其IP地址

   本地 DNS 服务器(local DNS server) 不属于该服务器的层次结构, 但是对于 DNS 层次结构是至关重要
   每个 ISP 都有一台本地 DNS 服务器(也叫做默认名字服务器)

   当主机与某个 ISP 连接时, 该 ISP 提供一台主机的 IP 地址, 该主机剧有一台或多台其本地 DNS 服务器的 IP 地址(通常通过 DHCP)

   当主机发送 DNS 请求时, 该请求被发送至本地 DNS 服务器, 起着代理的作用, 并将请求发送到 DNS 服务器层次结构中

   查询 DNS 服务器

   1. 递归查询
      - 本地 DNS 服务器一对一
   2. 迭代查询
      - 本地 DNS 服务器一对多
      - 可以理解为已知根服务器, TLD DNS 服务器, 权威服务器等 IP, 不需要根服务器去找 TLD DNS 服务器

2. DNS 缓存
   在一个请求链中, 当某 DNS 服务器接收一个 DNS 回答时, 将映射缓存在本地存储器
   主机和主机名与 IP 地址间的映射并不是永久的, DNS 服务器在一段时间后(通常设置为两天)将丢弃缓存的信息

   本地 DNS 服务器能够缓存 TLD 服务器的 IP 地址, 因而允许本地 DNS 绕过查询链中的根 DNS 服务器

### DNS 记录和报文

资源记录(Resource Record, RR), RR 提供了主机名到 IP 地址的映射
每个 DNS 回答报文包含了一条或多条资源记录, 资源记录是一个 4 元组: (Name, Value, Type, TTL)
TTL 是该记录的生存时间, 决定了资源记录应当从缓存中删除的时间,

- Type = A -> Name 是主机名, Value 是该主机名对应的 IP 地址
- Type = NS -> Name 是个域, Value 是个知道如何获得该域中主机 IP 地址的权威 DNS 服务器的主机名
- Type = CNAME -> Value 是别名为 Name 的主机对应的规范主机名
- Type = MX -> Value 是个别名为 Name 的邮件服务器的规范主机名

1. DNS 报文
   DNS 查询和回答报文

   - 前 12 个字节是首部区域
     - 标识符 -> 16 比特的数, 用于标识该查询
     - 1 比特的查询/回答标志位 -> 指出是查询报文(0)还是回答报文(1)
     - 1 比特的权威的标志位
     - 1 比特的希望递归标志位
     - 1 比特的递归可用标志位
     - 1 比特的递归可用标志位
     - 4 个有关数量的字段
   - 问题区域包含着正在进行的查询信息
     - 名字字段, 包含正在被查询的主机名字
     - 类型字段, 指出有关该名字的正被询问的问题类型
   - 在来自 DNS 服务器的回答中, 回答区域包含了对最初请求的名字的资源记录
   - 权威区域包含其他权威服务器的记录
   - 附加区域包含了其他有帮助的记录

2. 在 DNS 数据库中插入记录
   注册登记机构(registrar)是一个商业实体, 验证该域名的唯一性

DNS 脆弱性

分布式拒绝服务(DDoS)带宽洪泛攻击
中间人攻击

## P2P 文件分发

## 视频流和内容分发网

# 运输层

运输层位于应用层和网络层之间

主要关注的是 TCP 和 UDP 运输层协议

## 概述

运输层协议为运行在不同的主机上的应用进程之间提供了逻辑通信(logic communication)

运输层协议是在端系统而不是在路由器中实现的

在发送端, 运输层将从发送应用程序进程接收到的报文转换成运输层分组(运输层报文段(segment))

### 运输层和网络层的关系

运输层位于网络层之上, 运输层为运行在不同主机上的进程提供逻辑通信
网络层提供了主机之间的逻辑通信

### 运输层概述

UDP(用户数据报协议) 提供不可靠, 无连接的服务
TCP(传输控制协议) 提供可靠的, 面向连接的服务

TCP 的运输层分组成为报文段
UDP 的分组成为数据报

网络层: 网际协议(IP), IP 的服务模型是尽力而为交付服务

IP 被称为不可靠服务

## 多路复用和多路分解

将运输层报文段中的数据交付到正确的套接字的工作称为多路分解(demultiplexing)

在源主机从不同套接字中收集数据块, 并为每个数据块分装上首部信息(这将在以后用于分解)从而生成报文段, 然后将报文段传递到网络层, 所有这些工作成为多路复用(multiplexing)

- 套接字有唯一标识符
- 每个报文段有特殊字段来指示改报文段所要交付到的套接字

Web 服务器与 TCP
高性能 Web 服务器通常只使用一个进程, 但是每个新的客户连接创建一个具有新连接套接字的新线程
一台服务器, 在任意给定时间内都可能有(具有不同标识的)许多连接套接字连接到相同的进程

## UDP 无连接运输

UDP 只是做了运输协议能够做的最少工作

除了复用/分解功能及少量的差错检测外, 它几乎没有对 IP 增加别的东西

使用 UDP 时, 在发送报文段之前, 发送方和接收方的运输层实体之间没有握手 -> UDP 被称为无连接的

DNS 是一个通常使用 UDP 的应用层协议的例子
当一台主机中的 DNS 应用程序想要进行一次查询时

- 构造一个 DNS 查询报文并将其交给 UDP
- 无须执行任何与运行在目的端系统中的 UDP 实体之间的握手
- 主机端的 UDP 为此报文添加首部字段, 然后将形成地报文段交给网络层
- 网络层将此 UDP 报文段封装进一个 IP 数据报中, 然后将其发送给一个名字服务器
- 在查询主机中的 DNS 应用程序则等待对该查询的响应; 如果它没有收到响应, 则要么试图向另一个名字服务器发送该查询, 要么通知调用的应用程序它不能获得响应

更适合用 UDP 的场景

- 发送什么数据以及何时发送的应用层控制更为精确
  - 采用 UDP 时, 只要应用进程将数据传递给 UDP, UDP 就会将此数据打包进 UDP 报文段并立即将其传递给网络层
  - TCP 有拥塞控制机制, 以便当源和目的主机间的一条或多条链路变得极度拥塞时来遏制运输层 TCP 发送方
- 无须连接建立
- 无连接状态
- 分组首部开销小, 每个 TCP 报文段都有 20 字节的首部开销, 而 UDP 仅有 8 字节的开销

UDP 报文段结构
应用层数据占用 UDP 报文段的数据字段

UDP 首部只有 4 个字段, 每个字段由两个字节组成

- 源端口号 -> 通过该端口使目的主机将应用数据交给
- 目的端口号 -> 运行在目的端系统中的相应进程
- 长度 -> 指示了在 UDP 报文段中的字节数(首部加数据)
- 检验和 -> 接收方使用检验和来检查在该报文段中是否出现了差错

实际上, 计算检验和时, 除了 UDP 报文段以外还包括了 IP 首部的一些字段

### UDP 检验和

UDP 检验和提供了差错检测功能 -> 检验和用于确定当 UDP 报文段从源到目的地移动时, 其中的比特是否发生改变

获取检验和: 发送方的 UDP 对报文端中的所有 16 比特字的和进行反码运算, 求和时遇到任何溢出都被回卷(将多出来的 1 (最左边的 1) 加到最右边一位上面)

端到端原则: 因为某种功能必须基于基于端到端实现: 与在较高级别提供这些功能的代价相比, 在较低级别上设置的功能可能时冗余的活几乎没有价值的

UDP 提供差错检测, 但是对差错恢复无能为力

## 可靠数据传输原理

可靠数据传输协议的下层协议也许是不可靠的

TCP 是在不可靠的 IP(端到端网络层)上实现的可靠数据传输协议
更一般的情况是, 两个可靠同行断电的下层可能是由一条物理链路(如在链路级数据传输协议的场合下)组成或是由一个全球互联网络(如在运输级协议的场合下)组成, 可将较低层直接视为不可靠的点对点信道

单向数据传输(unidirectional data transfer): 数据传输时从发送端到接收端的
可靠的双向数据传输(bidirectional data transfer): 全双工数据传输

### 构造可靠数据传输协议

1. 经完全可靠信道的可靠数据传输: rdt1.0
   有限状态机(Finite-State Machine, FSM)

接收方和发送方有各自的 FSM

- 所有分组是从发送方流向接收方
- 有了完全可靠的信道, 接收端就不需要提供任何反馈信息给发送方, 因为不必担心出现差错
- 接收方没有必要请求发送方慢一点

2. 经具有比特差错信道的可靠数据传输: rdt2.0
   自动重传请求(Automatic Repeat reQuest, ARQ)协议
   肯定确认(positive acknowledgement) 和 否定确认(negative acknowledgement)(请重复一遍)
   这些控制报文使得接收方可以让发送方知道哪些内容被正确接收, 哪些内容接收有误并因此需要重复

   ARQ 协议中还需要另外三种协议功能来处理存在比特差错的情况:

   - 差错检测
   - 接收方反馈, 发送方要了解接收放情况 -> 让接收方提供明确的反馈信息给发送方(ACK=1, NAK=0)
   - 重传, 接收方收到有差错的分组时,. 发送方将重传该分组

   缺陷: 没有考虑到 ACK 或 NAK 分组受损的可能性
   考虑处理受损 ACK 和 NAK 时的 3 种可能性:

   - 无法区分是要求重复上次回答的请求还是接收者不明白受损内容
   - 增加足够的检验和比特, 使发送方不仅可以检测差错, 还可以恢复差错
   - 当发送方收到含糊不清的 ACK 或者 NAK 分组时, 只需重传当前数据分组即可 -> 引入冗余分组(duplicate packet) -> 根本困难: 接收方不知道上次发送的 ACK 或 NAK 是否被正确接收, 因此它无法事先知道接收到的分组是新的还是一次重传

   解决方案: 在数据分组种添加一新字段, 让发送方对其数据分组编号, 即将发送数据分组的序号(sequence number)放在该字段

3. 经具有比特差错的丢包信道的可靠数据传输: rdt3.0

### 流水线可靠数据传输协议

不以停等方式运行, 允许发送方发送多个分组而无须等待确认, 许多从发送方向接收方输送的分组可以被看成是填充到一条流水线中, 故这种技术被称为流水线(pipelining)

流水线技术对可靠数据传输协议可带来如下影响:

- 必须增加序号范围, 因为每个传输中的分组(不计算重传的)必须有一个唯一的序号, 而且也许有多个在传输中的未确认报文
- 协议的发送方和接收方两端也许不得不缓存多个分组, 发送方最低限度应当能缓冲那些已发送但没有确认的分组
- 所需序号范围和对缓冲的要求取决于数据传输协议如何处理丢失, 损失及延时过大的分组
  - 回退 N 步(Go-Back-N, GBN), 也被称为滑动窗口协议(sliding-window protocol)
    - 允许发送方发送多个分组(当有多个分组可用时)而不需等待确认
    - 受限于在流水线中未确认的分组数不能超过某个最大允许数 N
    - 基序号(base)定义为最早未确认分组的序号
    - 下一个序号(nextseqnum)定义为最小的未使用序号(即下一个待发分组的序号)
    - 那些已被发送但还未被确认的分组的许可序号范围可以被看成是一个在序号范围为长度为 N 的窗口(窗口长度, window size)
    - 为什么限制 N 的原因之一是流量控制
    - 如果一个序号为 n 的分组被正确接收到, 并且按序, 则接收方为分组 n 发送一个 ACK, 并将该分组中的数据部分交付给上层
    - 如果分组 k 已接收并交付, 则所有序号比 k 小的分组也已经交付
    - 接收方丢弃所有失序分组
    - 假定现在期望接收分组 n, 而分组 n + 1 到了, 因为数据按序交付, 所以接收方可能缓存(保存)分组 n + 1, 则该分组及分组 n + 1 最终将在发送方根据 GBN 重传规则而被重传

## 选择重传(Selective Repeat, SR)

TCP 是在不可靠的(IP)端到端网络层之上实现的可靠数据传输协议
两个可靠通信端点的下层可能是由一条物理链路(如在链路级数据传输协议的场合下)组成或是由一个全球互联网络(如在运输级协议的场合下), 可以将较低层直接视为不可靠的点对点通信
选择重传(SR)协议通过让发送方仅重传那些它怀疑在接收方出错的分组而避免不必要的重传

# `TCP`协议的作用

- 以太网规定了电子信号如何组成数据包(packet), 解决了子网内部的点对点通信
- `IP`协议解决以太网协议不能解决多个局域网如何互通
- `IP`只是一个地址协议, 不保证数据包的完整(IP 协议不是可靠协议), 如果路由器丢包(比如缓存满了, 新进来的数据包就会丢失, 就需要发现丢了哪个包)
- `TCP`协议解决上述的问题, 发现哪个包丢失, 如何重传丢失的包

## `TCP`报文段结构

- 首部字段
  - 源端口号和目的端口号(32 比特)
  - 序号(32 比特) - 发送方和接受方用来实现可靠数据传输服务
  - 确认号字段(32 比特) - 和序号相同
  - 接收窗口字段(16 比特) - 流量控制, 用于指示接收方愿意接受的字节数量
  - 首部长度字段(4 比特) - 由于 TCP 选项字段的原因, TCP 首部长度是可变的
  - 可选与变长的选项字段 - 该字段用于发送方和接收方协商最大报文长度或者高速网络环境下用作窗口调节因子时使用
  - 标志字段(6 比特)
    - ACK 比特用于指示确认字段的值是有效的,
    - RST, SYN 和 FIN 比特用于连接建立和拆除,
    - 在明确拥塞通告中使用了 CWR 和 ECE 比特,
    - 当 PSH 比特被置位时, 就指示接收方应将数据交给上层,
    - URG 比特用来指示报文段里存在被发送端的上层实体设置为"紧急"的数据, 紧急数据的最后一个字节由 16 比特的紧急数据指针字段指出, 当紧急数据存在并给出指向紧急数据尾指针的时候, TCP 必须通知接收端的上层实体(在实践中, PSH, URG 和紧急数据指针并没有使用)

## `TCP`建立连接和拆除连接

建立连接(三次握手)

1. 客户端的 TCP 首先向服务端的 TCP 发送一个特殊的 TCP 报文段, 不包含应用层数据, 但是 SYN 标志位被置为 1, 客户会随机选择一个初始序号(client_isn)
2. 包含 TCP SYN 报文段的 IP 数据报到达服务器主机, 服务器就会从该数据报中提取出 TCP SYN 报文段, 为该 TCP 连接分配 TCP 缓存和变量, 并向该客户 TCP 发送允许连接的报文段(该允许连接的报文段被称为 SYNACK 报文段(SYNACK segment))


    - 也不包含应用层数据
    - SYN比特被置为1
    - TCP报文段首部确认号字段被置为client_isn + 1
    - 服务器选择自己的初始序号server_isn

3. 收到 SYNACK 报文段以后, 客户也要给该连接分配缓存和变量, 客户主机向服务发送另外一个报文段, 该客户通过将值 server_isn + 1 放置到 TCP 报文段首部的确认字段中来完成此项工作, 因为连接已经建立, 所以该 SYN 比特被置为 0

拆除连接(四次挥手)
目的: 连接结束后需要将主机中的资源(缓存和变量)释放

1. 客户应用进程发出一个关闭连接命令
2. 将 FIN 比特设置为 1
3. 该客户对这个服务器的终止报文段进行确认
4. 该来连接的所有资源都被释放了

## 拥塞控制原理

分组重传是网络拥塞的征兆(某个特定的运输层报文段的丢失)

## `TCP`数据包的大小

以太网数据包的大小是固定的, 最初是 1518 字节, 后面扩充到 1522 字节, 其中 1500 字节是负载(payload), 22 字节是头信息(head)
IP 数据包在以太网数据包的负载里面, 也有自己的头信息, 最少需要 20 字节, 所以 IP 数据包的负载最大为 1480 字节
TCP 数据包在 IP 数据包的负载里面, 头信息最少要 20 字节, 因此 TCP 数据包的最大负载是 1480-20=1460 字节, 由于 IP 和 TCP 协议往往有额外的头信息, 所以 TCP 负载实际为 1400 字节左右

因此一条 1500 字节的信息需要两个 TCP 数据包, HTTP/2 协议的一大改进就是压缩 HTTP 协议的头信息, 使得一个 HTTP 请求能够放在一个 TCP 数据包里面

## `TCP`数据包的编号(SEQ)

# HTTP 概述

HTTP 是一种能够获取如 HTML 这样的网络资源的通讯协议(protocol)

在 Web 上进行数据交换的基础, 是一种 client-server 协议, 请求通常是由像浏览器这样的接收方发起的

一个完整的 Web 文档通常是由不同的子文档拼接而成, 像是文本, 布局描述, 图片, 视频, 脚本等

每个发送到服务器的请求, 都会被服务器处理并返回一个消息
在这个请求与响应之间, 还有许许多多的被称为 proxies 的实体, 他们的作用与表现各不相同, 比如有些是网关, 还有些是 caches 等

客户端: user-agent
user-agent 就是任何能够为用户发起行为的工具, 这个角色通常都是由浏览器来扮演
浏览器总是作为一个发起一个请求的实体, 他永远不是服务器

要展现一个网页, 浏览器首先发送一个请求来获取页面的 HTML 文档, 再解析文档中的资源信息发送其他请求

Web 服务端
由 Web Server 来服务并提供客户端所请求的文档
Server 只是虚拟意义上代表的一个机器: 可以是共享负载(负载均衡)的一组服务器组成的计算机集群, 也可以是一种复杂的软件, 通过向其他计算机(如 缓存, 数据服务器, 电子商务服务器) 发起请求来获取部分或全部资源

Server 不一定是一台机器, 的那一个机器上可以装载的众多 Servers

在 HTTP/1.1 和 Host 头部中, 他们甚至可以共享同一个 IP 地址

代理(proxies)
在浏览器和服务器之间, 有许多计算机和其他设备转发了 HTTP 消息
主要由以下几种作用:

- 缓存(可以是公开的也可以是私有的, 像浏览器的缓存)
- 过滤(反病毒扫描, 家长控制)
- 负载均衡(让多个服务器服务不同请求)
- 认证(对不同资源进行权限管理)
- 日志记录(允许存储历史信息)

## HTTP 的基本性质

- HTTP 是简单的

虽然 HTTP/2 协议将 HTTP 消息封装到帧(frames)中, HTTP 大体上还是被设计的简单易读

- HTTP 是无状态, 有会话的

无状态: 同一个连接中, 两个执行成功的请求之间是没有关系的
使用 HTTP 的头部扩展, HTTP Cookies 添加到头部中, 创建一个会话让每个请求都能共享相同的上下文, 达成相同的状态
有会话的: 使用 Cookies 可以创建有状态的会话

- HTTP 和连接

HTTP 依赖于面向连接的 TCP 进行消息传递, 但连接并不是必须的

HTTP/1.0 默认为每一对 HTTP 请求/响应都打开一个单独的 TCP 连接

HTTP/1.1 引入了流水线(被证明难以实现)和持久连接(底层的 TCP 连接可以通过 Connection 头部来被部分控制)

HTTP/2 则发展得更远, 通过一个连接复用消息的方式让这个连接始终保持为暖连接

## HTTP 能控制什么

- 缓存
  - 服务端能告诉代理和客户端哪些文档需要被缓存, 缓存多久
  - 客户端能够通过命令中间的缓存代理来忽略存储的文档
- 开放同源限制
  - 只有来自于相同来源的网页才能获取网站的全部信息
  - 通过修改 HTTP 头部
- 认证
- 代理和隧道
- 会话

## `HTTP`流

客户端和服务器进行交互的过程

1. 打开一个`TCP`连接: `TCP`连接被用来发送一条或多条请求, 以及接收响应消息
   客户端可能打开一条新的连接, 或重用一个已经存在的连接, 或者也可能开几个新的 TCP 连接连向服务端
2. 发送一个`HTTP`报文
   在`HTTP/2`之前报文是语义可读的
   之后这些简单的消息被封装在帧中, 使得报文不能被直接读取, 但是原理仍是相同的
3. 读取服务端返回的报文信息
4. 关闭连接或者为后续请求重用连接

`HTTP`流水线启动时, 后续请求都可以不用等待第一个请求的成功响应就被发送(被证实难以实现)
`HTTP`流水线已经被在有多请求下表现更稳健的`HTTP/2`的帧取代

`HTTP/2`报文被嵌入到一个新的二进制结构 -> 帧
帧允许实现很多优化, 报文头部的压缩和复用

### 请求

由以下元素组成

- `HTTP`的`method`
- 要获取的资源的路径
- `HTTP`协议版本号
- 为服务端表达其他信息的可选头部`headers`
- `POST`等方法, 报文的`body`包含了发送的资源, 与响应报文的`body`类似

### 响应

包含以下元素

- `HTTP`协议版本号
- 一个状态码(status code)
- 一个状态信息, 由服务端自行设定
- `HTTP headers`, 与请求头部相同
- 可选项, 包含`body`

## 基于 HTTP 的 API

### 用于 user agent 和服务器之间交换数据

`XMLHttpRequest`

现代`fetch API`

### 服务器发送事件

一种单向服务, 允许服务器使用 HTTP 作为传输机制向客户端发送事件
`EventSource`

1. 客户端打开连接并建立事件句柄
2. 客户端浏览器自动将达到 HTTP 流的消息转换为适当的`Event`对象, 并将它们传递给专门处理这类`type`事件的句柄
3. 如果没有相应的事件处理句柄, 交给`onmessage`事件处理程序处理
