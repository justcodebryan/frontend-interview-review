
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

Person.prototype.toString = function(){
    return "name = " + this.name + ", age = " + this.age;
}

var person = new Person("孙悟空", 18);
var person1 = new Person("红孩儿", 8);
var person2 = new Person("猪八戒", 28);
var person3 = new Person("沙和尚", 38);
var person4 = new Person("牛魔王", 20);
var person5 = new Person("二郎神", 15);

var personArr = [person, person1, person2, person3, person4, person5];
function getAdult(arr){
    var ans = [];
    for (let index = 0; index < arr.length; index++) {
        if (arr[index].age >= 18){
            ans.push(arr[index]);
        }
    }
    return ans;
}

var newArr = getAdult(personArr);
console.log(newArr);