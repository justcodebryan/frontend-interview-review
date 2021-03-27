(function myModule() {
    // 私有数据
    var name = "hhhhh";
    // 操作数据的函数
    function doSomething(){
        console.log("doSomething() " + name.toUpperCase());
    }
    function doOtherthing(){
        console.log("doOtherthing() " + name.toLowerCase());
    }
    window.myModule2 =  {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }
})()