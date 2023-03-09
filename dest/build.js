"use strict";
let getMilitaryTime = function (str) {
    return str
        .slice(0, -2)
        .split(":")
        .map((item, ind) => {
        if (ind === 0) {
            if (str.includes("AM")) {
                return item === "12" ? "00" : item;
            }
            else {
                return item === "12" ? item : String(+item + 12);
            }
        }
        else
            return item;
    })
        .join(":");
};
console.log(getMilitaryTime("02:00:25PM"));
