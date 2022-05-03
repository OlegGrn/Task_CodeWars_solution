"use strict";

function add(a, b) {

	let arrA = [...a].reverse();
	let arrB = [...b].reverse();

	let arrBiger = (arrA.length > arrB.length) ? arrA : arrB;
	let arrLitl = (arrA.length > arrB.length) ? arrB : arrA;

	let one = 0;

	return arrBiger.reduce((sumStr, item, index) => {

		let litl = (arrLitl[index] === undefined) ? 0 : arrLitl[index];

		let sum = +item + +litl + one;

		if (one > 0) one--;

		if (sum < 10) {
			return sumStr + sum;

		} else {
			one++;
			return sumStr + sum.toString().split('')[1]
		}

	}, "").split('').reverse().join('');
}


console.log(add('63829983432984289347293874', '90938498237058927340892374089'));
//  , "91002328220491911630239667963");



//return (BigInt(a) + BigInt(b)).toString(); // Fix me!
// 638
// 909





