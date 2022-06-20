"use strict";

function getSum(a, b) {

	return (a === b) ? a : getSum(Math.min(a, b), Math.max(a, b) - 1) + Math.max(a, b)

	// if (a === b) return a;
	// return getSum(Math.min(a, b), Math.max(a, b) - 1) + Math.max(a, b)


}








console.log(getSum(0, -1));


