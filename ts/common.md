# Typescript 中的 interface 和 type 到底有什么区别？

> 官方文档描述如下:
>
> - An interface can be named in an extends or implements clause, but a type alias for an object type literal cannot.
> - An interface can have multiple merged declarations, but a type alias for an object type literal cannot.

interface 是一种关系结构的描述，里面可以包含属性和方法，可派生
type 是一种表达式，所以也可以说是一种 alias，可以使用一些表达式的操作符，并且通过这些操作符实现和 interface 近似等价的关系描述

- 共同点

  - 都可以描述一个对象或者函数

    ```typescript
    // interface
    interface User {
      name: string
      age: number
    }

    interface SetUser {
      (name: string, age: number): void
    }
    ```

    ```typescript
    // type
    type User = {
      name: string
      age: number
    }

    type SetUser = (name: string, age: number) => void
    ```

  - 都允许拓展
    interface 可以 extends, 但 type 是不允许 extends 和 implement
    但是 type 可以通过交叉类型 实现 interface 的 extend 行为，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 与 interface 类型 交叉 。

    虽然效果差不多，但是两者语法不同。

- 不同点
  - type 可以而 interface 不可以
    type 可以 声明基本类型别名, 联合类型, 元组等类型
    还可以通过 typeof 获取实例的类型进行赋值
  - interface 可以而 type 不可以
    interface 可以进行声明合并
