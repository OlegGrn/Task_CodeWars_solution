"use strict";

let form = document.querySelector('form.form-my');

function maskPhone(form, event) {

	const input = form.querySelector('.input-my');
	const inputLength = input.value.length;
	const mask = '+7 (___) - ___ - __ - __';
	const startNum = mask.indexOf('_');
	let i = 0;

	// получаем введные цифры из инпута 
	let getValue = (inputLength < (startNum - 1)) ? input.value.match(/\d/g) || [] :
		// (цифру маски отрезаем)
		input.value.slice(startNum).match(/\d/g) || [];

	// заменяем "_" маски на цифры из getValue
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a);

	// получаем позицию не заполненных "_"
	let emptyPos = mask_value.indexOf('_');
	// если есть "не заполенные "_", отрезаем их у будущего нового значения инпута
	let newInputValue = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos);

	// ситуация когда ВОЗМОЖНО было удаления одного занака клвишей BackSpace
	if ((newInputValue.length > inputLength)) {
		// проверка было ли удаление занака. Если да - (event.data == null)
		if (event.data == null) {
			// находим позицию самой ближней "_" до текщего значения длины инпута
			let lastPos = mask.lastIndexOf("_", inputLength);

			// убираем лишнюю длину будущему инпуту через проверку, чтобы это было не начало маски     
			if (inputLength > startNum) {
				input.value = newInputValue.slice(0, -(inputLength - lastPos + 1));
			} else { // было удаление, но это уже начало "маски", поэтому ничего не отрезаем
				input.value = newInputValue
			}
		} else { // удаления не было
			input.value = newInputValue;
		}
	} else { // удаления не было
		input.value = newInputValue;
	}
}

form.addEventListener('input', (event) => maskPhone(form, event));

/*
et form = document.querySelector('form.form-my');

let valArterLength;

function maskPhone(form, event) {

	const input = form.querySelector('.input-my');
	const mask = '+7(___)-___-__-__';
	const startNum = mask.indexOf('_'); // 4
	let i = 0;

	console.log(input.value.length);
	console.log(`input.before-${input.value.match(/\d/g)}`);

	let val = (input.value.length < startNum - 1) ? input.value.match(/\d/g) || [] :
		input.value.slice(startNum).match(/\d/g) || [];

	valArterLength = val.length;

	console.log(`val.after-${val} / valArterLength- ${valArterLength}`);

	let mask_value = mask.replace(/[_]/g, (a) => (i < val.length) ? val[i++] : a);

	console.log(`new_value-${mask_value}`);
	//*console.log(input.value.length);

	let emptyPos = mask_value.indexOf('_');
	let newInputValue = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos);


	//* ситуация когда ВОЗМОЖНО было удаления одного занака клвишей BackSpace
	if ((newInputValue.length > input.value.length)) {

		console.log(event.data);
		//* проверка было ли удаление занака. Если да - (event.data == null)
		if (event.data == null) {
			//* находим самую ближнюю "_" до текщего значения длины инпута
			let lastPos = mask.lastIndexOf("_", input.value.length);
			console.log(`lastPos -${lastPos}`);
			//* разница которую нужна убрать у нового значения инпута
			let back = input.value.length - lastPos;

			//* убираем лишнюю длину через проверку, чтобы это было не начало маски     
			if (input.value.length > startNum) {
				input.value = newInputValue.slice(0, -(back + 1));
			} else {
				input.value = newInputValue
			}


		} else {
			input.value = newInputValue;
		}

	} else {
		input.value = newInputValue;
	}

	//* input.value = newInputValue;



	console.log(`newInputValue.length-${newInputValue.length} :${newInputValue}`);
	console.log(event);




}

form.addEventListener('input', (event) => maskPhone(form, event));
*/


window.addEventListener("DOMContentLoaded", function () {
	[].forEach.call(document.querySelectorAll('.input-test'), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___ ____",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length)
				.replace(/_+/g,
					function (a) {
						return "\\d{1," + a.length + "}"
					})
				.replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 5) this.value = ""
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false)

	});

});