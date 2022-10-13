"use strict";

const setInputCheek = {
	name: { // регулярка провекри имени
		set: /^[a-zа-я -]{2,16}$/i,
		help: "Кирилица и латинские буквы, пробелы и знак \" - \"(тире)"
	},
	email: { // регулярка провекри почты  
		set: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
		help: "something text"
	},
	phoneRuMobile: { // на российские мобильные + городские с кодом из 3 цифр  
		set: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
		help: "Российские мобильные",
		mask: '+7(___) ___ ____'
	},
	class_remove: new Set() // коллекция классов для последующей очистки формы
}

document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll('[data-mask-phone]').forEach(input => {

		// устанавливаем значение placeholder
		input.placeholder = (input.getAttribute('placeholder')) ? input.getAttribute('placeholder') :
			(input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
				(input.name && setInputCheek) ? setInputCheek[input.name].mask : "";
		// получаем маску		
		const mask = getMaskPhone(input);

		input.addEventListener('input', (event) => maskPhoneInput(input, mask, event));
		input.addEventListener('focus', () => maskPhoneFocus(input, mask));
		input.addEventListener('blur', () => maskPhoneBlur(input, mask));
	})

});

// ======= фокус на инпуте =====================

function maskPhoneFocus(input, mask) {
	const begining = mask.slice(0, mask.indexOf("_"));
	input.value = (input.value < begining.length) ? begining : input.value;
	setTimeout(() => {
		input.selectionStart = input.selectionEnd = input.value.length;
	}, 0)
}

// ======= потеря фокуса =======================

function maskPhoneBlur(input, mask) {
	const clearPhoneBlur = input.classList.contains('required');
	input.value = (input.value.length == mask.length) ? input.value :
		(!clearPhoneBlur) ? "" : input.value;
}
// ======= получаем маску для инпута 

function getMaskPhone(input) {
	return (input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
		(input.name && setInputCheek) ? setInputCheek[input.name].mask :
			'+7(___) ___ ____';
}

// =======  устанавливает маску ввода телефона =========================

function maskPhoneInput(input, mask, event) {

	//const startNum = mask.indexOf('_');
	//const input = form.querySelector('.input-my');
	//const mask = setInputCheek.phoneRuMobile.mask; //'+7 (___) ___ ____';
	//const startNum = setInputCheek.phoneRuMobile.mask.indexOf('_'); // начало ввода цифр в маске			

	const inputLength = input.value.length;
	const startNum = mask.indexOf('_'); // начало ввода цифр в маске			
	let i = 0;

	// получаем введные цифры из инпута массивом
	let getValue = (inputLength < (startNum - 1)) ? input.value.match(/\d/g) || [] :
		// (цифру из маски (+7) отрезаем)
		input.value.slice(startNum).match(/\d/g) || [];

	// заменяем "_" из маски на цифры из getValue
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a);

	// получаем позицию не заполненных "_" из маски
	let emptyPos = mask_value.indexOf('_');
	// если есть "не заполенные "_", отрезаем их у будущего нового значения инпута

	let newInputValue = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos);

	// ситуация когда ВОЗМОЖНО функция была вазвана удалением занаков (например клвишей BackSpace)
	if ((newInputValue.length > inputLength)) {
		// проверка было ли удаление занака. Если да - (event.data == null)
		if (event.data == null) {
			// находим позицию самой ближней "_" до текщего последнего значения введенного в инпут
			let lastPos = mask.lastIndexOf("_", inputLength);

			// убираем лишнюю длину будущему инпуту через проверку, чтобы это было не начало маски     
			if (inputLength > startNum) {
				// отрезаем с конца разницу между inputLength - lastPos и +1, чтобы удалить последнню введенную цифру на месте "_" (lastPos)
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

/*
//! чужщй https://github.com/alexey-goloburdin/phoneinput/blob/main/phoneinput.js

document.addEventListener("DOMContentLoaded", function () {
	var phoneInputs = document.querySelectorAll('input[data-tel-input]');

	var getInputNumbersValue = function (input) {
		// Return stripped input value — just numbers
		return input.value.replace(/\D/g, '');
	}

	var onPhonePaste = function (e) {
		var input = e.target,
			inputNumbersValue = getInputNumbersValue(input);
		var pasted = e.clipboardData || window.clipboardData;
		if (pasted) {
			var pastedText = pasted.getData('Text');
			if (/\D/g.test(pastedText)) {
				// Attempt to paste non-numeric symbol — remove all non-numeric symbols,
				// formatting will be in onPhoneInput handler
				input.value = inputNumbersValue;
				return;
			}
		}
	}

	var onPhoneInput = function (e) {
		var input = e.target,
			inputNumbersValue = getInputNumbersValue(input),
			selectionStart = input.selectionStart,
			formattedInputValue = "";

		if (!inputNumbersValue) {
			return input.value = "";
		}

		if (input.value.length != selectionStart) {
			// Editing in the middle of input, not last symbol
			if (e.data && /\D/g.test(e.data)) {
				// Attempt to input non-numeric symbol
				input.value = inputNumbersValue;
			}
			return;
		}

		if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
			if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
			var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
			formattedInputValue = input.value = firstSymbols + " ";
			if (inputNumbersValue.length > 1) {
				formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
			}
		} else {
			formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
		}
		input.value = formattedInputValue;
	}
	var onPhoneKeyDown = function (e) {
		// Clear input after remove last symbol
		var inputValue = e.target.value.replace(/\D/g, '');
		if (e.keyCode == 8 && inputValue.length == 1) {
			e.target.value = "";
		}
	}
	for (var phoneInput of phoneInputs) {
		phoneInput.addEventListener('keydown', onPhoneKeyDown);
		phoneInput.addEventListener('input', onPhoneInput, false);
		phoneInput.addEventListener('paste', onPhonePaste, false);
	}
})





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

/*
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
*/