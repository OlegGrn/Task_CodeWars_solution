let str1: string = "01:32:54:67:89:AB"
let str2: string = "0132546789AB"
let str3: string = "01:32:54:67:89"
let str4: string = "01:32:54:67:89:ZZ"

function checkMac(str: string) {
    return /^([0-9a-f]{2}:){5}([0-9a-f]{2})$/i.test(str)
}


let str5: string = "color: #3f3; background-color: #AA00ef; and: #abcd"

function checkColor(str: string) {
    return str.match(/\s#([0-9a-f]{3}){1,2}\b/gi)
}


let str6: string = "-1.5 0 2 -123.4.";

function findNum(str: string) {
    return str.match(/-?\d+(\.\d+)?/gi)
}


let str7: string = " -2.0 + -3.4";

function parse(str: string) {
    let result: string[] | [] = str.match(/(?:\s?)(-?\d+(?:\.\d+)?)(?:\s?)([*/+-])(?:\s?)(-?\d+\.?\d*)/)
        || [" ", "неверное число", "неверное число", "неверное число"]
    let [, ...res] = result
    return res
}

let str8: string = "Java JavaScript PHP C++ C";

function findLang(str: string) {
    return str.match(/(Java(Script)?|PHP|C\+\+|C)/g)
}

let str9: string = `
[quote]
  [b]текст[/b]
[/quote]`
function findCodeBB(str: string) {
    return str.match(/\[(quote|b|url)].*?\[\/\1]/gis)

}

let str10: string = ' .. "test me" .. "Скажи \\"Привет\\"!" .. "\\\\ \\"" .. ';
function findQuotes(str:string) {
    return str.match(/"(\\.|[^"\\])*"/gs)
}

let str11: string = "<style> <styler> <style test=\"...\">"
function findTeg(str: string) {
    return str.match(/<style(\s.+?>|>)/g)
}

let str12: string = "0 12 -5 -123 -18"
function findNegNum(str: string) {
    return str.match(/(?<!-)(?<!\d)\d+/g)
}

let str14: string = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>`
function changeBody(srt: string) {
   return srt.replace(/(?<=<body.*>)/si, `<h1>Hello</h1>`)
}




console.log(changeBody(str14))












