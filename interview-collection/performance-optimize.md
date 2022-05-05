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
