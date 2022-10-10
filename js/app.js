"use strict";

let form = document.querySelector('form');

function maskPhone(form) {

	const input = form.querySelector('input');
	let regexp = /\D/g;
	regexp.lastIndex = 2;

	let val = (input.value.length < 3) ? input.value.replace(/\D/g, "") :
		regexp.exec(input.value);



	let mask = '7 (_) _';
	let i = 0;

	console.log(`val-${val}`);

	let new_value = mask.replace(/[_]/g, (a) => {
		let result = (i < val.length) ? val.charAt(i) : a;
		i++;
		return result;
	})



	let emptyPos = new_value.indexOf('_');
	let newValue = (emptyPos == -1) ? new_value
		: new_value.slice(0, emptyPos);


	input.value = newValue;
	console.log(`input.value-${input.value} ${typeof input.value}`);











}




form.addEventListener('input', () => maskPhone(form));




