"use strict";
function findMatchedByPattern(pattern) {
    return function (word) {
        let count = 0;
        let test = word.replace(/\w/g, char => {
            if (pattern.slice(count).includes(char)) {
                count++;
                return char;
            }
            else {
                return "";
            }
        });
        return test === pattern;
    };
}
let predicate = findMatchedByPattern("bmb");
console.log(predicate("bomb"));
/*
kkk     kiln      false

bmb       bomb      true
          babyboom  false

*/
