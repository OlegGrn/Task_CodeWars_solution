"use strict";

var countDeafRats = function (town) {

	let result = 0;
	let start = town.indexOf('P');
	let arrTown = town.split("");

	let right = arrTown.slice(start + 1).reduce((sum, item) => {
		(item == "O") ? sum++ : sum--;
		if (sum < 0) result++;
		return sum
	}, 0)

	let left = arrTown.slice(0, start).reduceRight((sum, item) => {
		(item == "O") ? sum++ : sum--;
		if (sum < 0) result++;
		return sum
	}, 0)

	return result

}





console.log(countDeafRats("O~~OPO~O~~O~O"));
































