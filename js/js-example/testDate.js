var d = new Date();

console.log(d);

var b = new Boolean(false);

if(b){
    console.log("run");
}

var s = 123;
s = s.toString();
console.log(typeof s);

var reg = /a/i;
console.log(reg.test("abc"));

var str = "1a2b3c4d5e6f7g8";
var result = str.split(/[A-z]/);
console.log(result);