`yarn.lock`作用

锁定依赖唯一版本

- `package.json`里面定义的是版本区间, 如`^1.0.0`
- `yarn.lock`里面的`version`字段定义的是唯一版本, 如`1.0.0`

`yarn.lock`字段解释

```json
"@babel/code-frame@^7.0.0", "@babel/code-frame@^7.12.13":
  version "7.12.13"
  resolved "https://registry.npm.taobao.org/@babel/code-frame/download/@babel/code-frame-7.12.13.tgz?cache=0&sync_timestamp=1612314620252&other_urls=https%3A%2F%2Fregistry.npm.taobao.org%2F%40babel%2Fcode-frame%2Fdownload%2F%40babel%2Fcode-frame-7.12.13.tgz#dcfc826beef65e75c50e21d3837d7d95798dd658"
  integrity sha1-3PyCa+72XnXFDiHTg319lXmN1lg=
  dependencies:
    "@babel/highlight" "^7.12.13"
```

- `Identifier(s)`
  第一行的`Identifier`用`依赖名@版本区间`表示, 多个`Identifier`最终可能会指向同一个版本

- `version`
  第二行的版本号是实际上安装的版本, 通常是满足版本区间里的一个版本

- `resolved`
  第三行的`resolved`是一个链接, 是下载这个包的链接地址, 这个`url`里的域名部分和项目里面配置的`.npmrc`或本地的`npm`配置的`registry`有关

- `integrity`
  第四行的`integrity`用于校验下载下来的文件, 如果`diff`后发现有不同的内容, 说明同一个下载链接对应的文件被修改过

- `dependencies`
  第五行的`dependencies`是这个包自己的依赖

`yarn.lock`的生成
`yarn.lock`是自动生成, 不应该手动更改

`yarn.lock`会更新的情况

常规操作都会自动更新`package.json`和`yarn.lock`

- 新增依赖: `yarn add`
- 升级依赖: `yarn upgrade`

如果项目依赖了`foo`, `foo`依赖了`bar@^1.0.0`, 假设`bar`现在有两个版本`1.0.0`和`1.1.0`

`bar`在发布`1.1.0`的时候没有做好向后兼容。导致`foo`和`bar@1.1.0`不能搭配使用。如果你可以等：

- 要么等`foo`把依赖`bar`锁成`1.0.0`并重新发版
- 要么等`bar`修复兼容问题后重新发版

已知`foo`和`bar@1.0.0`可以正常工作。

`resolutions`可以解决你的问题，只要在你自己项目的 `package.json` 里定义：

```json
"resolutions": {
  "foo/bar": "1.0.0"
}
```

`yarn.lock`与`package.json`对应不上

场景: 只改动`package.json`, 忘记提交`yarn.lock`

问题: 执行`yarn install`后, `yarn.lock`有变更

解决方案:

- 确认`diff`并提交变更后的`yarn.lock`
  - 确定是那些依赖产生的`diff`, 并回归相关功能
  - 锁定最后一次的版本

预防:
- 阻塞构建
