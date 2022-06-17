"use strict";

function longestConsec(strarr, k) {

	return strarr
		.reduce((sum, item, index, arr) => {

			if (index < (arr.length - k - 1)) {

				let curentSum = 0;
				for (let i = 0; i <= k; i++) {
					curentSum += arr[index + i].length;
				}
				console.log(curentSum);
			}

			return sum
		}, { result: 'упс', length: 0 })
		.result
}






let strarr = ["reew", "foling", "trashy", "blue", "abcdef", "uvwxyz"];
let k = 2;

console.log(longestConsec(strarr, k));

