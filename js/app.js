"use strict";

let form = document.querySelector('form');

function maskPhone(form) {
	const input = form.querySelector('input');
	let val = input.value
	console.log(val);

	let mask = '__ __';
	let i = 0;
	let new_value = mask.replace(/[_]/g, (a) => {
		return i < val.length ? val.charAt(i++) : 1;
	})


	console.log(new_value)







}




form.addEventListener('input', () => maskPhone(form));




