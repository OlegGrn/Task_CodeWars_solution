"use strict";
function toCamelCase(str) {
    let count;
    return str.replace(/./g, (char, ind) => {
        if (char === "-" || char === "_") {
            count = ind + 1;
            return "";
        }
        else if (ind === count) {
            return char.toUpperCase();
        }
        else {
            return char;
        }
    });
}
console.log(toCamelCase("the_stealth-warrior"));
