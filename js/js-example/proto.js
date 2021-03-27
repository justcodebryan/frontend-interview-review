function MyClass(){

}

MyClass.prototype.a = 123;
MyClass.prototype.sayHello = function(){
    console.log("Hello");
};

var mc1 = new MyClass();
var mc2 = new MyClass();

mc1.a = "456";

console.log(MyClass.prototype);
console.log(mc2.__proto__ == MyClass.prototype);

console.log(mc1.a);
console.log(mc1.sayHello());