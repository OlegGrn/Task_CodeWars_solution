"use strict";


function f(a, b) {
	alert(a + b);
}

Function.prototype.defer = function (ms) {

	let func = this;

	return function () {

		setTimeout(() => func.apply(null, arguments), ms)

	}
};

f.defer(2000)(1, 2); // выведет 3 через 1 секунду.




























