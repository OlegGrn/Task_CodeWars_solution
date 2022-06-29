"use strict";


function isPrime(num) {

	if (num <= 1) return false;
	if (num === 2 || num === 3) return true;
	if (num % 2 === 0) return false;

	for (let i = 3; i <= (num ** (1 / 2)); i++) {
		if ((num % i) === 0) return false;
		i++;
	}
	return true;
}

console.log(isPrime(71));




