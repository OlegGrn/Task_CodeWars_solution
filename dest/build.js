"use strict";
let str1 = "01:32:54:67:89:AB";
let str2 = "0132546789AB";
let str3 = "01:32:54:67:89";
let str4 = "01:32:54:67:89:ZZ";
function checkMac(str) {
    return /^([0-9a-f]{2}:){5}([0-9a-f]{2})$/i.test(str);
}
let str5 = "color: #3f3; background-color: #AA00ef; and: #abcd";
function checkColor(str) {
    return str.match(/\s#([0-9a-f]{3}){1,2}\b/gi);
}
let str6 = "-1.5 0 2 -123.4.";
function findNum(str) {
    return str.match(/-?\d+(\.\d+)?/gi);
}
let str7 = " -2.0 + -3.4";
function parse(str) {
    let result = str.match(/(?:\s?)(-?\d+(?:\.\d+)?)(?:\s?)([*/+-])(?:\s?)(-?\d+\.?\d*)/)
        || [" ", "неверное число", "неверное число", "неверное число"];
    let [, ...res] = result;
    return res;
}
let str8 = "Java JavaScript PHP C++ C";
function findLang(str) {
    return str.match(/(Java(Script)?|PHP|C\+\+|C)/g);
}
let str9 = `
[quote]
  [b]текст[/b]
[/quote]`;
function findCodeBB(str) {
    return str.match(/\[(quote|b|url)].*?\[\/\1]/gis);
}
let str10 = ' .. "test me" .. "Скажи \\"Привет\\"!" .. "\\\\ \\"" .. ';
function findQuotes(str) {
    return str.match(/"(\\.|[^"\\])*"/gs);
}
let str11 = "<style> <styler> <style test=\"...\">";
function findTeg(str) {
    return str.match(/<style(\s.+?>|>)/g);
}
let str12 = "0 12 -5 -123 -18";
function findNegNum(str) {
    return str.match(/(?<!-)(?<!\d)\d+/g);
}
let str14 = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>`;
function changeBody(srt) {
    return srt.replace(/(?<=<body.*>)/si, `<h1>Hello</h1>`);
}
console.log(changeBody(str14));
