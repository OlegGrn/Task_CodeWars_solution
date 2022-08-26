"use strict";

function sumPairs(ints, s) {

	var seen = {}
	for (var i = 0; i < ints.length; ++i) {
		if (seen[s - ints[i]]) return [s - ints[i], ints[i]];
		seen[ints[i]] = true
	}
}








console.log(
	sumPairs([0, 2, 5, 2, 5], 7)
);














