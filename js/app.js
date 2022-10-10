"use strict";

let form = document.querySelector('form');

function maskPhone(form) {

	const input = form.querySelector('input');
	const mask = '+7 (___) ___ __ __';
	const startNum = mask.indexOf('_');
	console.log(startNum);

	// let val = (input.value.length < 3) ? input.value.replace(/\D/g) :
	// 	input.value.slice(3).replace(/\D/g, "");

	let val = (input.value.length < 4) ? input.value.match(/\d/g) || [] :
		input.value.slice(3).match(/\d/g) || [];

	//console.log(val.length);

	let i = 0;


	let new_value = mask.replace(/[_]/g, (a) => {
		//return (i < val.length) ? val.charAt(i++) : a;
		return (i < val.length) ? val[i++] : a;
	});

	let emptyPos = new_value.indexOf('_');
	let newValue = (emptyPos == -1) ? new_value
		: new_value.slice(0, emptyPos);

	input.value = newValue;












}




form.addEventListener('input', () => maskPhone(form));




