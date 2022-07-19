"use strict";


var lastDigit = function (str1, str2) {
	if (str2 == 0) return 1;
	let lastNumBase = +str1.slice(-1);
	if (lastNumBase === 1 || lastNumBase === 5 || lastNumBase === 0) return lastNumBase;
	let restPow = Number(BigInt(str2) % BigInt(4));
	if (restPow !== 0) return +`${Math.pow(lastNumBase, restPow)}`.slice(-1);
	let evenOrOdd = (lastNumBase % 2 === 0) ? true : false;
	if (evenOrOdd) return 6;
	return 1;
}


console.log(lastDigit("9", "7"));








