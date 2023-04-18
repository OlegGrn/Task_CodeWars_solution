"use strict";

function initials(n) {
	let reg = /\b(\w(?=.*\s)|(\w)(\w+)(?=\w*$))/g


	console.log(n.match(reg))
	return n.replace(reg, (_, p1, p2, p3) => {
		console.log(_);
		console.log(p1);
		console.log(p2);

		console.log(p3);


		let test = !p2 ? p1.toUpperCase() : p2.toUpperCase() + p3;

		return test

	})

}

console.log(initials("barack hussain obama"));













