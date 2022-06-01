"use strict";

function towerBuilder(nFloors) {

	let result = [];
	let max = nFloors * 2 - 1;

	let n = 1;
	do {
		let center = 2 * n - 1;
		let aside = (max - center) / 2;
		result.push(' '.repeat(aside) + "*".repeat(center) + ' '.repeat(aside));
		n++
	} while (n <= nFloors)

	return result



}

console.log(towerBuilder(4));





/*
let result = [];
	let n = 1;

	do {
		result.push("*".repeat(2 * n - 1))
		n++
	} while (n <= nFloors)

	return result
	*/

