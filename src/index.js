"use strict";
function decipherThis(str) {
    return str
        .split(" ")
        .map(word => {
        return word
            .replace(/\d+/, digit => String.fromCodePoint(+digit))
            .split("")
            .map((char, ind, arr) => {
            if (ind === 1) {
                return arr[arr.length - 1];
            }
            else if (ind === arr.length - 1 && arr.length > 1) {
                return arr[1];
            }
            else {
                return char;
            }
        })
            .join("");
    })
        .join(" ");
}
let results = "<h1> <h2>".matchAll(/<(.*?)>/gi);
console.log(decipherThis("Hello word"));
