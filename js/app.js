"use strict";



function validParentheses(parens) {

	return parens.split('').every((el, index, arr) => {
		return (el !== arr[arr.length - 1 - index]);
	})
}







let x = validParentheses("(()()()())(())") // false
// let e = validParentheses("()") // true

console.log(x);
// console.log(e);



//return '\u{0028}' + '\u{0029}';



















