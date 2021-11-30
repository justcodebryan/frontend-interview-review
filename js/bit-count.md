- 判断奇偶性

```javascript
// 偶数 & 1 = 0
// 奇数 & 1 = 1
console.log(2 & 1); // 0
console.log(3 & 1); // 1
```

- 取整操作
  使用`~`, `>>`, `<<`, `>>>`, `|`等操作符来取整数
  相当于使用`Math.floor()`

```javascript
console.log(~~6.83);
console.log(6.83 >> 0);
console.log(6.83 << 0);
console.log(6.83 | 0);

// >>> 不可对负数取整
console.log(6.83 >>> 0);
```

- `n & (n - 1)`
  如果该式子结果为 0, 说明 n 是 2 的整数幂

- 将数字转换为布尔值

```javascript
console.log(!!7); // true
console.log(!!0); // false
```

- 判断两个数字的符号是否相同

```javascript
(a ^ b) >= 0; // true - 符号相同, false - 符号不相同
```

- 使用`&`, `>>`, `|`来完成 rgb 值和 16 进制颜色值之间的转换

```javascript
function hex2RGB(hex) {
  var hexx = hex.replace('#', '0x');
  var r = hexx >> 16;
  var g = (hexx >> 8) & 0xff;
  var b = hexx & 0xff;
  return `rgb(${r}, ${g}, ${b})`;
}

function RGB2hex(rgb) {
  var rgbArr = rgb.split(/[^\d]+/);
  var color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3];
  return '#' + color.toString(16);
}
```
