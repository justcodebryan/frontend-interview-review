function pascal(depth) {
    var ansArr = [];
    for (var i = 1; i <= depth; ++i) {
        var row = [];
        for (var j = 0; j < i; ++j) {
            row.push(j === 0 || j === i - 1 ? 1 : ansArr[i - 2][j] + ansArr[i - 2][j - 1]);
        }
        ansArr.push(row);
    }
    return ansArr;
}

console.log(pascal(5));