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
		mask: '7(___) ____ ____'
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
		input.selectionStart = input.selectionEnd = input.value.length;
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
	let cursorSelection; // по коду при необходимости получает цифру куда переставить курсор

	// ищет номер позиции последней цифры в def маски
	function findLastNumMask(mask) {
		const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски
		let pos;
		mask.slice(0, def).replace(/\d/g, (a, offset) => {
			pos = offset;
			return a
		})
		return pos;
	}


	let getValueInput = function (mask) {
		let result;
		const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски 
		const lengthNumberDef = mask.slice(0, def).replace(/\D/g, "").length; // длина цифр в def маски
		const posLastNumMask = findLastNumMask(mask);


		let first; // цифры массивом из прежнего inut.value
		let two;  // цифры массивом из текущего inut.value 
		let lengthDifference; // разнция длин прежнего input.value и текущего
		if (maskPhoneInput.starting) {
			first = maskPhoneInput.starting.match(/\d/g);
			two = input.value.match(/\d/g);
			lengthDifference = maskPhoneInput.starting.length - input.value.length
		}

		if (!maskPhoneInput.starting) { //! первый раз ввод в инпут	
			let run = input.value.length - def; // длина введеных знаков
			let cut = input.value.slice((input.selectionStart - run), input.selectionStart); // что было введено
			result = cut.match(/\d/g) || [];  // получаем введные цифры из инпута массивом			
			//result = (input.selectionStart <= posLastNumMask + 1) ? [] : cut.match(/\d/g) || [];//что бы ввод в пределах цифр def ничего не происходило

		} else if (maskPhoneInput.starting.length < input.value.length) { //! в инпуте уже что-то было и новое добавилось
			let befor = maskPhoneInput.starting.slice(def); // прежние данные в ипуте за минусом def (маски);
			let run = input.value.length - maskPhoneInput.starting.length; // длина введеных знаков
			let cut = input.value.slice((input.selectionStart - run), input.selectionStart); // что было введено

			if ((input.selectionStart - run) < def) { // ввод был внутри def (дефолтного начала маски) 
				let cutValue = cut.match(/\d/g) || []; // введенные цифры массивом
				let beforing = befor.match(/\d/g) || []; // прежние цифры массивом (без def !!!!)			

				// если нодо чтобы ввод в пределах цифр def (posLastNumMask) ничего не происходило
				result = ((input.selectionStart - run) <= posLastNumMask) ? beforing : cutValue.concat(beforing); // складываем массивы (cutValue + beforing)
				// result = cutValue.concat(beforing); // складываем массивы (cutValue + beforing) // всегда срабатывает ввод

			} else { // ввод было после def
				let introduced = input.value.slice(def); // всё значение инпута за минусом def
				result = introduced.match(/\d/g) || [];  // получаем цифры из инпута массивом
			}

			//! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! 
			// cursorSelection = (input.selectionStart > maskPhoneInput.starting.length) ? maskPhoneInput.starting.length + 1 :
			// 	maskPhoneInput.starting.length;
			//! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! переделать !!!!!!!!!!! 

		} else if (maskPhoneInput.starting.length > input.value.length) { //! было удаление
			// если длинны этих массивов равны - было удаления символа маски
			console.log(`first ${first}, two ${two}`);

			if (event.inputType == 'deleteContentBackward') { //? удаление клавишей BACKSPACE
				if (input.selectionStart <= def) { // ввод в зоне def (надо сохранить все прежнием цифры)
					cursorSelection = def; // курсор ставим в конец def
					result = input.value.slice(
						(lengthDifference < def && (input.selectionStart + lengthDifference) <= def) ? def - lengthDifference : // начало и конец в зоне def
							input.selectionStart // начало где угодно, а конец после def
					).match(/\d/g) || [];
				} else if (input.selectionStart > def && first.length == two.length) { //ввод за def и было удаления символа маски вместо цифры
					// поэтому ищем первую цифру СЛЕВА от куросора и удаляем её					
					let iBefore; // искомая позция цифры для последующего удаления
					result = maskPhoneInput.starting.replace(/\d/g, (a, i) => {
						if (i < input.selectionStart) {
							iBefore = i; // последня сохранённая позиция и есть искомая цифра
							cursorSelection = i;
							return a
						} else return a
					}).replace(/\d/g, (a, i) => (i == iBefore) ? "" : a) // удаляем найденную цифру
						.slice(def).match(/\d/g) || [];
				} else { //ввод за def и было удаления цифры
					cursorSelection = input.selectionStart; // курсор оставляем в selectionStart
					result = input.value.slice(def).match(/\d/g) || [];
				}

			} else if (event.inputType == 'deleteContentForward') { //? удаление клавишей DELETE
				//! все множественные вырезания кливишей DELETE - срабатывает "deleteContentBackward"  - смотри выше (логика как и при deleteByCut)
				if (input.selectionStart < def) {
					result = input.value.slice(
						(input.selectionStart <= posLastNumMask) ? def - 1 // уменьшаем def и сохраняем все ццифры	
							: def
					).match(/\d/g) || [];
					cursorSelection = def; // курсор ставим в конец def
				} else if (input.selectionStart >= (def) && first.length == two.length) { //ввод за def и было удаления символа маски вместо цифры
					// поэтому ищем первую цифру СПРАВА от куросора и удаляем её
					let del = true; // после удаления одной искомой цифры переводим в false, чтобы не удалить остальные
					result = maskPhoneInput.starting.replace(/\d/g, (a, i) => {
						if (i > input.selectionStart && del) {
							del = false;
							cursorSelection = i;
							return ""
						} else return a
					}).slice(def).match(/\d/g) || []; // из полученной строки получаем результат (цифры массивом за минусом def)
				} else { // ввод за def и + не было удаления символа маски
					cursorSelection = input.selectionStart; // курсор оставляем в selectionStart
					result = input.value.slice(def).match(/\d/g) || [];
				}

			} else if (event.inputType == 'deleteByCut') { //? удаление клавишей ВЫРЕЗАНИЕМ
				if (input.selectionStart < def) {
					cursorSelection = def;
					result = input.value.slice(
						(lengthDifference < def && (input.selectionStart + lengthDifference) <= def) ? def - lengthDifference : // начало и конец в зоне def
							input.selectionStart // начало где угодно, а конец после def
					).match(/\d/g) || [];
				} else {
					cursorSelection = input.selectionStart; // курсор оставляем в selectionStart
					result = input.value.slice(def).match(/\d/g) || [];
				}
			}
		}
		return result // цифры массивом (!!! цифры из маски не учитываются !!!)
	};


	if (maskPhoneInput.starting) {
		console.log(`-${test}-длина тукщая ${test.length} / ранее длина ${maskPhoneInput.starting.length}. Курсор - ${input.selectionStart}`)
	} else {
		console.log(`-${test}-длина ${test.length} / "undif" прежняя длина. Курсор - ${input.selectionStart}`)
	}

	let i = 0;
	let getValue = getValueInput(mask);  // получаем введные цифры из инпута массивом
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue

	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски	
	let newInputValue = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 

	/*
	- условие - ввод (увеличение инпута)
	- если после input.selectionStart идет цифра - курсор ставим на input.selectionStart
	- если после input.selectionStart нет цфры - ищем позцию ближайшей и курсор ставин на ее позицию + 1 (ближайшая цифра это и есть крайняя вставленная цифра)

	- вычисляем количество введнных знаков (например 4)
	- находим позицию их начала ввода (например 3)
	- от 3 отсчитываем четвертую цифру

	*/
	function findPosNumRight(mask, cursor, val, prev, newVal) {
		let result;
		const posLastNumMask = findLastNumMask(mask);
		const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски		



		let count = 0;
		let quantity = val.length - prev.length; // количество введенных знаков			
		let start = (quantity > 0) ? cursor - quantity : 0; // позция начала их ввода

		let looking = true;
		let posFirstNumRight;
		newVal.replace(/\d/g, (a, i) => {
			if (i >= start && looking && i > posLastNumMask) {
				looking = false;
				count = 0;
				posFirstNumRight = i;
			}
		})

		newVal.replace(/\d/g, (a, i) => {
			if (i = posFirstNumRight) {
				count++;
				result = ++i;
			} else if (count <= quantity) {
				count++;
				result = ++i;
			}
		})


		let test = result || null;
		console.log(`test - ${test} / posFirstNumRight - ${posFirstNumRight} \ start - ${start}`);
		return test
	}



	if (maskPhoneInput.starting && (input.value.length - maskPhoneInput.starting.length) > 0) {

		cursorSelection = findPosNumRight(
			mask, input.selectionStart, input.value, maskPhoneInput.starting, newInputValue
		) || input.selectionStart



	}




	maskPhoneInput.starting = newInputValue;//!!!!!!!!!!!!
	input.value = newInputValue;
	if (cursorSelection != undefined) {
		input.selectionStart = input.selectionEnd = cursorSelection;
	}

}

