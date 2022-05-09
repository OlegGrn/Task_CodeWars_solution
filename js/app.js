"use strict";

function recoverSecret(triplets) {

	function sorting(a) {








	}

	let risult = [];

	function filt(a) {
		let log = triplets1.filter((item) => item.includes(a));

		console.log(log);

		let index = log
			.map(item => item.indexOf(a))
			.sort()
			.reverse()
			.slice(0, 1);

		console.log(index);

		risult.unshift(a);
		triplets1.filter((item) => item.includes(a[index]));


	}


	console.log(filt('t'));
	console.log(filt('a'));
	console.log(filt('h'));
	console.log(filt('w'));




	console.log(risult);
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
console.log(recoverSecret(triplets1));