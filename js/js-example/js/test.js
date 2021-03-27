console.log('gb:' + i);
var i = 1;
foo(1);
function foo(i){
    if(i === 4){
        return;
    }
    console.log('fb:' + i);
    foo(i + 1);
    console.log('fe:' + i);
}
console.log('ge:' + i);