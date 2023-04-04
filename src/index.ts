


let str1: string = "01:32:54:67:89:AB"
let str2: string = "0132546789AB"
let str3: string = "01:32:54:67:89"
let str4: string = "01:32:54:67:89:ZZ"

let str5: string = "color: #3f3; background-color: #AA00ef; and: #abcd"

let str6: string = "-1.5 0 2 -123.4.";

function checkMac(str: string) {
   return  /^([0-9a-f]{2}:){5}([0-9a-f]{2})$/i.test(str)
}
function checkColor(str: string) {
  return str.match(/\s#([0-9a-f]{3}){1,2}\b/gi)
}
function findNum(str: string) {
    return str.match(/-?\d+(\.\d+)?/gi)
}

console.log(findNum(str6))

