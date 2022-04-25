"use strict";


let uniqueInOrder = function (iterable) {

	let array = iterable.split('');

	return array.filter((item, index, arr) => {
		if (index <= (arr.length - 1)) {
			let bul;
			if (item == arr[index + 1]) {
				bul = false;
			} else bul = true;
			return bul;
		}
	});
}
console.log(uniqueInOrder('F'));











