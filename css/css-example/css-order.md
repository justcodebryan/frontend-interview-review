CSS书写顺序

```css

<!-- position 放在最前面 -->
position: relative;
<!-- 然后是参照 position 进行定位的属性 -->
top: 100px;
left: 10px;
<!-- 然后是宽高 -->
width: 100px;
height: 100px;
line-height: 20px;
<!-- 然后是 margin padding -->
margin: 10px;
padding: 20px 30px;
<!-- font -->
font-size: 20px;
font-weight: 700;
<!-- border -->
border: 1px solid red;
border-radius: 4px;
<!-- background -->
background-color: pink;
<!-- z-index -->
z-index: 10;

```
