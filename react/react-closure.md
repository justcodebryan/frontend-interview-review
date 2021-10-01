# 闭包问题出现场景

```jsx
// App.js
import React, { useState, useEffect } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log('count in Timeout -> ', count);
    }, 5000);
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>click {count}</button>
    </div>
  );
}
```

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
```

# 解决方案

```jsx
import React, { useEffect } from 'react';
import './styles.css';

let count = 0;

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      console.log('count in Timeout -> ', count);
    }, 5000);
  }, []);

  const handleClick = () => {
    count++;
    console.log(count);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>click {count}</button>
    </div>
  );
}
```

原因: 在之前的`setTimeout`中会形成一个闭包, 而`count`是一个基本数据类型的值, 当函数开始运行的时候, 将`count`传入`setTimeout` 中, 在这个地方形成了一个闭包, 这个闭包里面的`count`的值是`count`的初始值, 所以就算之后不断的`setState`也拿不到最新的值

解决方案: 因为在同一个作用域会形成闭包, 所以只能在函数的外面声明一个变量去装这些值, 这样就能拿到最新的值

`react`中的`fiber`在处理`function`和`class Component`是不一样的,

在处理`function component`的时候, 每次需要渲染`function component`的时候, 就会跑多一遍`function component`的函数, `fiber`中会储存所有信息, 当`function component`运行的时候, 返回这些信息. 如果存储的信息是一个对象的话, `set`是不会将组件重新渲染的, 如果要重新渲染的话, 需要通过浅拷贝的形式`set`一个新的对象

`class Component`是会生成实例的, 与`function Component`的运行方式不太一样
