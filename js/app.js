"use strict";

function add(a, b) {

	let arrA = [...a].reverse();
	let arrB = [...b].reverse();

	let arrBiger = (arrA.length > arrB.length) ? arrA : arrB;
	let arrLitl = (arrA.length > arrB.length) ? arrB : arrA;

	let one = 0;

	return arrBiger.reduce((sumStr, item, index, arr) => {

		let litl = (arrLitl[index] === undefined) ? 0 : arrLitl[index];

		let sum = +item + +litl + one;

		if (one > 0) one--;

		if (sum < 10) {
			return sumStr + sum;

		} else if (sum >= 10 && index == arr.length - 1) {
			return sumStr + sum.toString().split('').reverse().join('')

		} else {
			one++;
			return sumStr + sum.toString().split('')[1]
		}

	}, "").split('').reverse().join('');
}


console.log(add("888", "222"));
//  , "91002328220491911630239667963");



//return (BigInt(a) + BigInt(b)).toString(); // Fix me!
// 638
// 909





