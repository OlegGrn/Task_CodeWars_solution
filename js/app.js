"use strict";


function getLengthOfMissingArray(arrayOfArrays) {

	if (arrayOfArrays === null
		|| arrayOfArrays.length == 0
		|| arrayOfArrays.includes(null)
		|| arrayOfArrays.find(item => item.length === 0)
	) return 0

	return arrayOfArrays
		.map(item => item.length)
		.sort((a, b) => a - b)
		.find((item, ind, arr) => (arr[ind + 1] - item) > 1) + 1
}

console.log(getLengthOfMissingArray(null));


