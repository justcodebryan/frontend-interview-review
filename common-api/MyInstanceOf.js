// MyInstanceOf
// TODO
function MyInstanceOf(L, R) {
  const proto = L.__proto__;
  while (R) {
    if (proto === R.prototype) return true;
    R = R.prototype;
  }
  return false;
}

function Creator(age) {
  this.age = age;
}

const obj = [];
const obj1 = new Creator(10);
console.log("obj -> Array", obj instanceof Array);
console.log("obj -> Creator", MyInstanceOf(obj, Creator));
console.log("obj1 -> Creator", MyInstanceOf(obj1, Creator));
console.log("obj1 -> Creator", obj1 instanceof Creator);
