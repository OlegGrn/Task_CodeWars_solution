"use strict";
let str1 = "01:32:54:67:89:AB";
let str2 = "0132546789AB";
let str3 = "01:32:54:67:89";
let str4 = "01:32:54:67:89:ZZ";
let str5 = "color: #3f3; background-color: #AA00ef; and: #abcd";
let str6 = "-1.5 0 2 -123.4.";
function checkMac(str) {
    return /^([0-9a-f]{2}:){5}([0-9a-f]{2})$/i.test(str);
}
function checkColor(str) {
    return str.match(/\s#([0-9a-f]{3}){1,2}\b/gi);
}
function findNum(str) {
    return str.match(/-?\d+(\.\d+)?/gi);
}
console.log(findNum(str6));
