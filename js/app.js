"use strict";

function csvColumns(csv, indices) {
	return csv
		.split('\n')
		.map(item => item
			.split(",")
			.filter((_, index) => indices.includes(index)))
		.join("\n")
		.trim()
}





let csv = "0a,1b,2c,3d,4e\n01,12,23,34,45\n0f,1g,2h,3i,4j";


let indices = [5, 7];

console.log(csvColumns(csv, indices));

