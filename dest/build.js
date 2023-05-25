"use strict";
var solution = function (firstArray, secondArray) {
    let res = firstArray.reduce((sum, it, ind) => {
        return sum + (it - secondArray[ind]) ** 2;
    }, 0) / firstArray.length;
    console.log(res);
};
solution([1, 2, 3], [4, 5, 6]);
