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

	console.log(event);
	let test = input.value;
	let cursorSelection;


	let getValueInput = function () {
		let result;
		const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски   


		if (!maskPhoneInput.starting) { // первый раз ввод в инпут	
			let run = input.value.length - def; // длина введеных знаков
			let cut = input.value.slice((input.selectionStart - run), input.selectionStart); // что было введено
			result = cut.match(/\d/g) || [];  // получаем введные цифры из инпута массивом

		} else if (maskPhoneInput.starting.length < input.value.length) { // в инпуте уже что-то было и новое добавилос
			let befor = maskPhoneInput.starting.slice(def); // прежние данные в ипуте за минусом def (маски);
			let run = input.value.length - maskPhoneInput.starting.length; // длина введеных знаков
			let cut = input.value.slice((input.selectionStart - run), input.selectionStart); // что было введено

			if ((input.selectionStart - run) < def) { // ввод был внутри def (дефолтного начала маски) 
				let cutValue = cut.match(/\d/g) || []; // введенные цифры массивом
				let beforing = befor.match(/\d/g) || []; // прежние цифры массивом (без def !!!!)
				result = cutValue.concat(beforing); // складываем массивы (cutValue + beforing)

			} else { // ввод было после def
				let introduced = input.value.slice(def); // всё значение инпута за минусом def
				result = introduced.match(/\d/g) || [];  // получаем цифры из инпута массивом
			}
		} else if (maskPhoneInput.starting.length > input.value.length) { // было удаление

			let first = maskPhoneInput.starting.match(/\d/g);
			let two = input.value.match(/\d/g);

			console.log(`first ${first}, two ${two}, def.length ${def}`);

			console.log(first.length == two.length);

			if (event.inputType == 'deleteContentBackward') {


			} else if (event.inputType == 'deleteContentForward') {

				if (input.selectionStart < def) { // ввод в зоне def
					cursorSelection = def;
					result = input.value.slice(def).match(/\d/g) || [];
				} else {

				}



			} else if (event.inputType == 'deleteByCut') {

				console.log('deleteByCut')
			}

			result = input.value.slice(def).match(/\d/g) || [];
		}

		return result
	};

	if (maskPhoneInput.starting) {
		console.log(`-${test}-длина тукщая ${test.length} / ранее длина ${maskPhoneInput.starting.length}. Курсор - ${input.selectionStart}`)
	} else {
		console.log(`-${test}-длина ${test.length} / "undif" прежняя длина. Курсор - ${input.selectionStart}`)
	}

	let i = 0;
	let getValue = getValueInput();  // получаем введные цифры из инпута массивом
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue


	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски	
	let newInputValue = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 




	console.log(newInputValue);
	console.log(newInputValue.length);

	maskPhoneInput.starting = newInputValue;//!!!!!!!!!!!!
	input.value = newInputValue;
	if (cursorSelection) {
		console.log(cursorSelection);
		input.selectionStart = input.selectionEnd = cursorSelection;
	}



	//? до сюда всё коректно**********************************************************



	/*

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
	*/


}

