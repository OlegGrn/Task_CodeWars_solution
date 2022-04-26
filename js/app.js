"use strict";

//*
/*Создайте функцию, принимающую положительное целое число в качестве параметра и
возвращающую строку, содержащую римское числовое представление этого целого числа.*/

// function solution(number) {

// 	let strnumber = String(number).split('');

// 	let numberRim = [
// 		['I', 'V', 'X'],
// 		['X', 'L', 'C'],
// 		['C', 'D', 'M'],
// 		['M']
// 	];

// 	let rimnumberer = [];

// 	strnumber.forEach((item, index, arstr) => {
// 		addResult(item, numberRim[arstr.length - ++index], rimnumberer);
// 	});

// 	function addResult(number, arr, result) {
// 		let first = 1;
// 		if (number == 0) {
// 			return
// 		} else if (number > 5 && number < 9) {
// 			result.push(arr[1]);
// 			while ((number - 4) - first++) result.push(arr[0]);
// 		} else if (number >= 1 && number < 4) {
// 			while ((+number + 1) - first++) result.push(arr[0]);
// 		} else if (number == 4) {
// 			result.push(arr[0]);
// 			result.push(arr[1]);
// 		} else if (number == 9) {
// 			result.push(arr[0]);
// 			result.push(arr[2]);
// 		} else result.push(arr[1]);

// 	}
// 	return rimnumberer.join('');
// }

function solution(number) {
	// convert the number to a roman numeral
	let roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
	let ans = '';

	for (let key in roman) {
		while (number >= roman[key]) {
			ans = ans + key;
			number = number - roman[key];
		}
	}
	return ans;
}

let x = solution(111);
console.log(x);


//console.log(String('10').split(''));










// let right = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];










