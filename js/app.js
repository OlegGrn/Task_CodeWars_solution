"use strict";

function recoverSecret(triplets) {

	function sorting(a) {
		let result = [];

	}

	let risult = [];

	function filt(a, i = 1) {
		let log = triplets1.filter((item) => item.includes(a));
		let index = log
			.map(item => item.indexOf(a))
			.sort()
			.reverse()
			.slice(0, 1);

		risult.unshift(a);

		let leter = triplets1.find(l => l.indexOf(a) == index)[index - 1];

		console.log(leter); //***********

		return [leter, ...index]
	}


	console.log(filt('t'));
	// console.log(filt('a'));
	// console.log(filt('h'));
	// console.log(filt('w'));
}




let triplets1 = [
	['t', 'u', 'p'],
	['w', 'h', 'i'],
	['t', 's', 'u'],
	['a', 't', 's'],
	['h', 'a', 'p'],
	['t', 'i', 's'],
	['w', 'h', 's']
]
//console.log(recoverSecret(triplets1));
recoverSecret(triplets1);