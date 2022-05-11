"use strict";

function recoverSecret(triplets) {

	function filt(ltr) {
		return triplets1
			.filter((item) => item.includes(ltr))
			.reduce((max, el) => {
				return (el.indexOf(ltr) >= max.indexOf(ltr)) ? el : max;
			}, [`${ltr}`, 0, 0])
			.filter((it, ind, arr) => ind == arr.indexOf(ltr) - 1);
	}

	//let newLtr = filt('h');
	// while (newLtr.length) console.log('ff');

	// console.log(newLtr);
	// console.log(...newLtr);

	let value = [];

	triplets.forEach(item => {
		item.forEach((e, u, y) => {

			let result = [e];
			let newLtr = filt(e);

			while (newLtr.length) {
				result.unshift(...newLtr);
				newLtr = filt(...newLtr)
			}

			value.push(...result);

		})

	});

	console.log(value);
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

// let index = log
// 			.map(item => item.indexOf(a))
// 			.sort()
// 			.reverse()
// 			.slice(0, 1);

// .filter((e, i, ar) => {
		// 	if (ar.length > 1 && ar[i + 1]) {
		// 		console.log(Math.max(e.indexOf(ltr), ar[i + 1].indexOf(ltr)));
		// if (e.indexOf(ltr) > ar[i - 1].indexOf(ltr)) {
		// 	return true
		// }
		// if (ar[i - 1] !== undefined) {
		// 	return e.indexOf(ltr) > ar[i - 1].indexOf(ltr)
		// }

		// 	} else return true
		// })
		//.map(it => it[it.indexOf(ltr) - 1])

		//   ['w', 'h', 'i'],
		//   ['t', 'i', 's']



		// .find((array) => {
		// 	if (array.length > 0) {

		// 	}
		// })