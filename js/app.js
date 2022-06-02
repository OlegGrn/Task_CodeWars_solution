"use strict";


let x = new Date(0);

console.log(x);

let b = new Date(70 / 130 * 3600 * 1000);
console.log(b);
console.log(b.getTimezoneOffset() / 60 + b.getHours());
console.log(b.getMinutes());
console.log(b.getSeconds());


console.log(b - x);

let d = x.setHours((70 / 130 * 3600 * 1000));
console.log(b.getTimezoneOffset() / 60);






/*
let result = [];
	let n = 1;

	do {
		result.push("*".repeat(2 * n - 1))
		n++
	} while (n <= nFloors)

	return result
	*/

