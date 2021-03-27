 // var timer;
 /**
  * 参数:
  *     obj: 执行动画的对象
  *     attr: 执行动画的样式, 比如: left top width height
  *     target: 执行动画的目标位置
  *     speed: 移动的速度
  *     callback: 回调函数, 这个函数会在动画执行完毕后执行
  */

 function move(obj, attr, target, speed, callback) {
     clearInterval(obj.timer);

     let currentValue = parseInt(getStyle(obj, attr));
     if (currentValue > target) {
         speed = -speed;
     }

     obj.timer = setInterval(function () {
         let oldValue = parseInt(getStyle(obj, attr));

         let newValue = oldValue + speed;

         if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
             newValue = target;
         }

         obj.style[attr] = newValue + "px";

         if (newValue === target) {
             clearInterval(obj.timer);
             callback && callback();
         }
     }, 30);
 }

 function getStyle(obj, name) {
     // 正常浏览器的方式
     // return getComputedStyle(obj, null)[name];
     // IE8的方式
     // return obj.currentStyle[name];
     if (window.getComputedStyle) {
         return getComputedStyle(obj, null)[name];
     } else {
         return obj.currentStyle[name];
     }
 }