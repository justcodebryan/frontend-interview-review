- 判断奇偶性
```javascript
// 偶数 & 1 = 0
// 奇数 & 1 = 1
console.log(2 & 1); // 0
console.log(3 & 1); // 1
```

- 取整操作
使用`~`, `>>`, `<<`, `>>>`, `|`等操作符来取整数
```javascript
console.log(~~6.83);
console.log(6.83 >> 0);
console.log(6.83 << 0);
console.log(6.83 | 0);

// >>> 不可对负数取整
console.log(6.83 >>> 0);
```

- 使用`&`, `>>`, `|`来完成rgb值和16进制颜色值之间的转换
```javascript
function hex2RGB(hex) {
  var hexx = hex.replace('#', '0x');
  var r = hexx >> 16;
  var g = hexx >> 8 & 0xff;
  var b = hexx & 0xff;
  return `rgb(${r}, ${g}, ${b})`;
}

function RGB2hex(rgb) {
  var rgbArr = rgb.split(/[^\d]+/);
  var color = rgbArr[1] << 16 | rgbArr[2] << 8 | rgbArr[3];
  return '#' + color.toString(16);
}
```