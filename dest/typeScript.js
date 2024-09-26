"use strict";


function solution(str) {
    return (str.match(/\w{1,2}/g)?.map(i => i.length === 2? i: i+"_") || [])
}
/*function solution(str) {
    var _a;
    return (((_a = str.match(/\w{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map(i => i.length === 2 ? i : i + "_")) || []);
}*/
console.log(solution(""));
