# npm2 和 npm3 的不同点

`npm3`处理依赖的方式和`npm2`不相同

`npm2`是直接进行嵌套下载, 这样的话会导致`node_modules`的嵌套结构比较深, 而且多个依赖重复下载

`npm3`为了改进嵌套过深的情况, 将所有依赖放在第二层依赖中, 所有依赖都是平铺
在`top level`层级的文件夹中, 安装依赖其他库的依赖, 如果有的库使用不同版本此时需要在该库的`node_modules`中安装对应版本的依赖

所有库依赖的版本都升级到同一个版本的时候, 可以通过`npm dedupe`去除重复的依赖

npm3 将会:

- 移除 Module E v1.0
- 安装 Module E v2.0
- 移除 Module B v1.0, 因为没有任何库需要这个依赖
- 在 top level 层级的文件夹中安装新的 Module B v2.0, 因为其他的依赖都需要这个版本的库

![npm3deps12](https://npm.github.io/how-npm-works-docs/gitbook/images/npm3deps12.png)
