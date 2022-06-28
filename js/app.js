"use strict";


function isPrime(num) {

	if (num <= 1) {
		return false
	} else if (num == 2 || num == 3) {
		return true
	} else {
		if (num % 2 == 0) return false;
		for (let i = 3; i < num; i++) {
			if (num % i == 0) return false;
			i++
		}
		return true
	}
}

console.log(isPrime(7));




