"use strict";

function towerBuilder(nFloors) {

	let str = '*';



	if (nFloors == 1) {
		return [str.repeat(nFloors)]

	} else {
		return [towerBuilder(nFloors - 1) + "**"]
	}

	// let n = (nFloors == 1) ? nFloors : towerBuilder(nFloors - 1) + 2;




}





console.log(towerBuilder(3));








