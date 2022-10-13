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
		//input.addEventListener('blur', () => maskPhoneBlur(input, mask));
	})

});
// ======= фокус на инпуте =====================
function maskPhoneFocus(input, mask) {
	const begining = mask.slice(0, mask.indexOf("_"));
	input.value = (input.value < begining.length) ? begining : input.value;
	setTimeout(() => {
		//input.selectionStart = input.selectionEnd = input.value.length;
	}, 0)
}
// ======= потеря фокуса =======================
function maskPhoneBlur(input, mask) {
	const clearPhoneBlur = input.classList.contains('required');
	input.value = (input.value.length == mask.length) ? input.value :
		(clearPhoneBlur) ? "" : input.value;
}
// ======= получаем маску для инпута 
function getMaskPhone(input) {
	return (input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
		(input.name && setInputCheek) ? setInputCheek[input.name].mask :
			'+7(___) ___ ____';
}
// =======  устанавливает маску ввода телефона =========================

function maskPhoneInput(input, mask, event) {

	//! ситуация когда первый ввод цифра, а курсор в самом начале инпута (цирфа не вводится, а курсор перескакивает)

	const inputLength = input.value.length;
	const startNum = mask.indexOf('_'); // начало ввода цифр в маске			
	let i = 0;

	let getValue = (inputLength < (startNum - 1)) ? input.value.match(/\d/g) || [] :  // получаем введные цифры из инпута массивом		
		input.value.slice(startNum).match(/\d/g) || []; // (цифру из маски (+7) отрезаем)


	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue


	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски	
	let newInputValue = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 

	//? до сюда всё коректно**********************************************************


	if (event.data == null) {  //*удаления было
		let start = input.selectionStart; // положение курсора при событии

		if (newInputValue.length > inputLength) {
			// новый инпут больше страрого (т.е были добавлены или удалены пробелы у нового значения)
			console.log(event);
			console.log(input.value);
			console.log(inputLength);
			console.log(`курсор на позции - ${start}`);
			console.log(`длина нового инпута - ${newInputValue.length}`);

			if (start < inputLength) {  // курсор был внутри инпута при собыити

				console.log(111);

				input.value = newInputValue;
				input.selectionStart = input.selectionEnd = start;



			} else { // курсор был с краю инпута (в конце) при собыити

				console.log(222);

				let lastPos = mask.lastIndexOf("_", inputLength); // находим позицию самой ближней "_" до текщего последнего значения введенного в инпут
				// убираем лишнюю длину будущему инпуту через проверку, чтобы это было не начало маски     
				if (inputLength > startNum) {
					// отрезаем с конца разницу между inputLength - lastPos и +1, чтобы удалить последнню введенную цифру на месте "_" (lastPos)
					input.value = newInputValue.slice(0, -(inputLength - lastPos + 1));
				} else { // было удаление, но это уже начало "маски", поэтому ничего не отрезаем
					input.value = newInputValue
				}

				//! ситуация когда клавиша delete скраю -1 и следующий пробел

			}
		}
	} else { //* удаления не было
		input.value = newInputValue;
	}
}

