"use strict";


var lastDigit = function (str1, str2) {

	console.log(BigInt(str1) ** BigInt(str2));


	return +`${BigInt(str1) ** BigInt(str2)}`.slice(-1)
}


console.log(lastDigit("345678901234567890123456789012345", "23456789012345678"));









