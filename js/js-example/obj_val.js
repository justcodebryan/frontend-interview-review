var obj = {
    name: "a",
    age: 18,
    address: "b",
    gender: "男"
};

for (var n in obj) {
    console.log(n); // 属性名
    console.log(obj[n]); // 属性值
}

function createPerson(name, age, gender){
    var obj = new Object();
    
    obj.name = name;
    obj.age = age;
    obj.gender = gender;
    obj.sayName = function(){
        console.log(this.name);
    }
    
    return obj;
}

var obj1 = createPerson("孙悟空", 18, "男");

console.log(obj1);
obj1.sayName();