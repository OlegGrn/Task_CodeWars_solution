"use strict";

function selectLeter(leter, arr) { // получаем буквы идущие сразу же за leter 
	return arr
		.filter(row => row.includes(leter))
		.map(item => {         // получаем массив букв сразу же за Leter => _leter
			if (item.indexOf(leter) != 3) {
				return item[item.indexOf(leter) + 1]
			}
		})
		.filter((_l, _i, _a) => _i == _a.indexOf(_l) && _l !== undefined) // убираем повторы		
}

function start(arr) { // получаем первую букву
	return arr
		.map(item => item[0])
		.filter(first => {
			let pos = arr.reduce((index, row) => {
				let _ind = 0
				if (row.includes(first)) {
					_ind = row.indexOf(first);
				}
				return index += _ind;
			}, 0)
			return pos == 0;
		})[0];
}

function recoverSecret(triplets) {
	let word = [];
	let firstLeter = start(triplets);
	word = word.concat(firstLeter);


	let nextLeters = selectLeter(firstLeter, triplets);
	console.log(nextLeters);


	return word;
}








let triplets1 = [
	['w', 'h', 'i'],
	['t', 's', 'u'],
	['a', 't', 's'],
	['w', 'h', 's'],
	['h', 'a', 'p'],
	['t', 'i', 's'],
	['t', 'u', 'p']
]

console.log(recoverSecret(triplets1));




// function recoverSecret(triplets) {

// 	function filt(ltr, res) {
// 		return triplets1
// 			.filter((item) => item.includes(ltr))
// 			.reduce((max, el, index, array) => {

// 				if (array.length == 1) {
// 					return el;
// 				} else if (el.indexOf(ltr) >= max.indexOf(ltr)
// 					&& !res.includes(el[el.indexOf(ltr) - 1])) {
// 					return el
// 				} else return max;
// 			}, [`${ltr}`, 0, 0])
// 			.filter((it, ind, arr) => ind == arr.indexOf(ltr) - 1);
// 	}

// 	let value = [];

// 	triplets.forEach(item => {
// 		item.forEach((e, u, y) => {

// 			let result = [e];
// 			let newLtr = filt(e, value);

// 			while (newLtr.length) {
// 				result.unshift(...newLtr);
// 				newLtr = filt(...newLtr, value)
// 			}
// 			value.push(...result);
// 		})
// 	});
// 	return value
// 		.filter((item, index, arr) => arr.indexOf(item) == index)
// 		.join('')
// }



// const recoverSecret = (triplets) => {
// 	let duplets = [];
// 	let res = '';

// 	/*
// 	  convert triplets to duplets
// 	 */


// 	triplets.forEach(trip => {
// 		let str = trip.join('');
// 		let d1 = str.substr(0, 2);
// 		let d2 = str.substr(1, 3);
// 		if (duplets.indexOf(d1) === -1) { duplets.push(d1); }
// 		if (duplets.indexOf(d2) === -1) { duplets.push(d2); }
// 	});

// 	let nxt = findNext(duplets);
// 	while (nxt) {
// 		res += nxt;
// 		duplets = duplets.filter(d => d.indexOf(nxt) === -1);
// 		nxt = findNext(duplets);
// 	}

// 	return res;
// }

// /**
//  * Return the first letter of the secret word.
//  */
// function findNext(duplets) {
// 	// 1st char is not the 2nd char in any duplet
// 	let nxt = duplets.find(d => duplets.every(_d => d[0] !== _d[1]));
// 	return duplets.length > 1 ? nxt[0] : duplets[0];
// }