"use strict";

function highAndLow(numbers) {

	let arr = numbers.split(' ')

	if (arr.length == 1) {
		return `${arr[0]} ${arr[0]}`
	} else {
		return arr
			.sort((a, b) => a - b)
			.reverse()
			.filter((a, b, c) => b == 0 || b == c.length - 1)
			.join(' ')
	}

}


console.log(highAndLow("1 3 2 4 5"));























