"use strict";


function Calculator(x, b) {


	function ssuumm() {
		console.log(x + b);

	}

	function mmuull() {
		console.log(x * b);

	}

	this.sum = function () {
		ssuumm()
	}

	this.mul = function () {
		mmuull()
	}
}

let test = new Calculator(2, 8)

test.sum();
test.mul();

console.log(test);





