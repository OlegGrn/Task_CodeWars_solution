"use strict";
function loopArr(arr, direction, steps) {
    if (direction === "left") {
        let arr2 = arr.splice(0, steps);
        return [...arr, ...arr2];
    }
    else if (direction === "right") {
        let arr2 = arr.splice(-steps);
        return [...arr2, ...arr];
    }
}
console.log(loopArr([1, 5, 87, 45, 8, 8], 'right', 2));
