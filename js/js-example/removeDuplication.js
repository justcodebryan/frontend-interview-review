var arr = [1, 2, 3, 2, 2, 3, 4, 2, 5];

function removeDuplication(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length - 1; j++){
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                // 因为需要重新比较往前的元素, 所以就需要进行自减
                j--;
            }
        }
    }
    return arr;
}

console.log(removeDuplication(arr));