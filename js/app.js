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
		mask: '+77(___)   ____ ____'
	},
	class_remove: new Set() // коллекция классов для последующей очистки формы
}
document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll('[data-mask-phone]').forEach(input => {

		// устанавливаем значение placeholder (из знчения placeholder, если нет - из атрибута 'data-mask-phone, если нет - из setInputCheek)
		input.placeholder = (input.getAttribute('placeholder')) ? input.getAttribute('placeholder') :
			(input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
				(input.name && setInputCheek) ? setInputCheek[input.name].mask : "";
		// получаем маску		
		const mask = getMaskPhone(input);

		let cursorStart;
		let cursorEnd;

		input.addEventListener('keydown', () => {
			cursorStart = input.selectionStart;
			cursorEnd = input.selectionEnd;
			//console.log(`keydown  -  cursorStart - ${cursorStart} \ cursorEnd - ${cursorEnd}`);
		});

		input.addEventListener('contextmenu', () => {
			cursorStart = input.selectionStart;
			cursorEnd = input.selectionEnd;
			//console.log(`contextmenu  -  cursorStart - ${cursorStart} \ cursorEnd - ${cursorEnd}`);
		});


		input.addEventListener('input', (event) => maskPhoneInput({ input, mask, event, cursorStart, cursorEnd }));
		input.addEventListener('focus', () => maskPhoneFocus({ input, mask }));
		//input.addEventListener('blur', () => maskPhoneBlur(input, mask));
	})

});
//* ======= фокус на инпуте =====================
function maskPhoneFocus(options) {
	let { input, mask } = options;
	const begining = mask.slice(0, mask.indexOf("_"));
	input.value = (input.value < begining.length) ? begining : input.value;


	setTimeout(() => {
		input.selectionStart = input.selectionEnd = input.value.length;
	}, 0)
}
//* ======= потеря фокуса =======================
function maskPhoneBlur(input, mask) {
	const clearPhoneBlur = input.classList.contains('required');
	input.value = (input.value.length == mask.length) ? input.value :
		(clearPhoneBlur) ? "" : input.value;
}
//* ======= получаем маску для инпута 
// либо из атрибута data-mask-phone или из setInputCheek или  defolt
function getMaskPhone(input) {

	let defolt = "+7(___) ___ ____"

	return (input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
		(input.name && setInputCheek) ? setInputCheek[input.name].mask : defolt;
}
//* =======  устанавливает маску ввода телефона =========================

function maskPhoneInput(options) {

	let { input, mask, event, cursorStart, cursorEnd } = options;

	console.log(event);
	console.log(`CursorStart - ${cursorStart} \ cursorEnd - ${cursorEnd} \\\ input.selectionStart - ${input.selectionStart}`);

	if (maskPhoneInput.starting) {
		console.log(`-${input.value}- тукщий инпут. `)
	} else {
		console.log(`-${input.value}- тукщий инпут . `)
	}

	// получаем введные цифры из инпута массивом + положение курсора (или undifinded)	
	let { getValue, cursorPos } = getValueInput({ input, mask, event, cursorStart, cursorEnd }, maskPhoneInput.starting);
	let newInputValue = madeNewValue(mask, getValue); // новое значение инпута 

	// получаем попожение курсора если не получен из getValueInput)
	/*	
	if (maskPhoneInput.starting && cursorPos == undefined) {
		cursorPos = findPosNumRight(
			mask,
			input.selectionStart,
			input.value,
			maskPhoneInput.starting,
			newInputValue
		) || input.selectionStart
	}
	*/
	//! сохраняем прежнее знечение в самой фукции как свойство объекта
	maskPhoneInput.starting = newInputValue;
	input.value = newInputValue;
	// схлопываем курсор и выставляем его по cursorPos
	if (cursorPos != undefined) {
		input.selectionStart = input.selectionEnd = cursorPos;
	}
}

//*** получаем введные цифры из инпута массивом в правильном порядке + положение курсора (или undifinded)

function getValueInput(options, prev) {

	let { input, mask, event, cursorStart, cursorEnd } = options;
	let result;
	let cursorPos; // по коду при необходимости получает цифру куда переставить курсор	
	let cursorInpt = input.selectionStart; // положение курсора при событии

	const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски 
	const lengthNumberDef = mask.slice(0, def).replace(/\D/g, "").length; // длина цифр в def маски
	const posLastNumMask = findLastNumMask(mask);

	// cursorStart - начало ввода (если ранее было выделение - начало выделения), cursorInpt - окончание ввода
	// строка между ними  - это то что ввёл юзер   
	let newNumber = input.value.slice(cursorStart, cursorInpt).replace(/\D/g, "");
	// убираем что ввёл юэер и получаем исходый инпут (!! за минусом удаления, если оно было, т.е замена веделенного текста новыми данными)
	let prevVal = input.value.slice(0, cursorStart) + input.value.slice(cursorInpt);


	let nextValOne = input.value.slice(0, cursorStart);

	let nextValTwo = (cursorInpt > cursorEnd) ?
		input.value.slice(
			(cursorEnd < def) ? (cursorInpt - cursorStart) + (def - (cursorEnd - cursorStart)) : cursorInpt
		) :
		(cursorInpt < cursorEnd) ?
			input.value.slice(

			) :
			(cursorInpt == cursorEnd) ?
				input.value.slice(
					(cursorEnd < def) ? (cursorInpt - cursorStart) + (def - (cursorEnd - cursorStart)) : cursorInpt
				) :
				0;



	let nextVal = nextValOne + newNumber + nextValTwo;

	//prevVal.slice(0, (cursorStart < def) ? def : cursorStart) +	
	// input.value.slice((cursorEnd < def) ? (cursorInpt - cursorStart) + (def - cursorStart) : cursorInpt) :
	// input.value.slice((cursorEnd < def) ? def - (cursorEnd - cursorStart) : cursorEnd);
	// prevVal.slice((cursorStart < def) ? def : cursorStart);

	console.log(`${prevVal} - прежнее значение инпута /prevVal/ `);
	console.log(`${newNumber} - новые цифры /newNumber/ ${nextValOne} nextValOne / ${nextValTwo} nextValTwo `);
	console.log(`${nextVal} - новое значение инпута`);


	result = nextVal.slice(

		(cursorStart < def) ? cursorStart : def

	).match(/\d/g) || [];


	/*
	let first; // цифры массивом из прежнего inut.value
	let two;  // цифры массивом из текущего inut.value 
	let lengthDifference; // разнция длин прежнего input.value и текущего
	if (prev) {
		first = prev.match(/\d/g);
		two = input.value.match(/\d/g);
		lengthDifference = prev.length - input.value.length
	}



	if (!prev) { //! первый раз ввод в инпут	
		let run = input.value.length - def; // длина введеных знаков
		let cut = input.value.slice((cursorInpt - run), cursorInpt); // что было введено
		result = cut.match(/\d/g) || [];  // получаем введные цифры из инпута массивом			
		//result = (cursorInpt <= posLastNumMask + 1) ? [] : cut.match(/\d/g) || [];//что бы ввод в пределах цифр def ничего не происходило

	} else if (prev.length < input.value.length) { //! в инпуте уже что-то было и новое добавилось
		let befor = prev.slice(def); // прежние данные в ипуте за минусом def (маски);
		let run = input.value.length - prev.length; // длина введеных знаков
		let cut = input.value.slice((cursorInpt - run), cursorInpt); // что было введено

		if ((cursorInpt - run) < def) { // ввод был внутри def (дефолтного начала маски) 
			let cutValue = cut.match(/\d/g) || []; // введенные цифры массивом
			let beforing = befor.match(/\d/g) || []; // прежние цифры массивом (без def !!!!)
			// если нодо чтобы ввод в пределах цифр def (posLastNumMask) игнорировался
			result = ((cursorInpt - run) <= posLastNumMask) ? beforing : cutValue.concat(beforing); // складываем массивы (cutValue + beforing)
			//result = cutValue.concat(beforing); // складываем массивы (cutValue + beforing) // всегда срабатывает ввод (даже в зоне цифр def)

		} else { // ввод было после def
			let introduced = input.value.slice(def); // всё значение инпута за минусом def
			result = introduced.match(/\d/g) || [];  // получаем цифры из инпута массивом
		}

	} else if (prev.length > input.value.length) { //! было удаление
		// если длинны этих массивов равны - было удаления символа маски (`first ${first}, two ${two}`);		

		if (event.inputType == 'deleteContentBackward') { //? удаление клавишей BACKSPACE
			if (cursorInpt <= def) { // ввод в зоне def (надо сохранить все прежнием цифры)
				cursorPos = def; // курсор ставим в конец def
				result = input.value.slice(
					(lengthDifference < def && (cursorInpt + lengthDifference) <= def) ?
						def - lengthDifference : // начало и конец в зоне def
						cursorInpt // начало где угодно, а конец после def
				).match(/\d/g) || [];
			} else if (cursorInpt > def && first.length == two.length) { //ввод за def и было удаления символа маски вместо цифры
				// поэтому ищем первую цифру СЛЕВА от куросора и удаляем её					
				let iBefore; // искомая позция цифры для последующего удаления
				result = prev.replace(/\d/g, (a, i) => {
					if (i < cursorInpt) {
						iBefore = i; // последня сохранённая позиция и есть искомая цифра
						cursorPos = i;
						return a
					} else return a
				}).replace(/\d/g, (a, i) => (i == iBefore) ? "" : a) // удаляем найденную цифру
					.slice(def).match(/\d/g) || [];
			} else { //ввод за def и было удаления цифры
				cursorPos = cursorInpt; // курсор оставляем в selectionStart
				result = input.value.slice(def).match(/\d/g) || [];
			}

		} else if (event.inputType == 'deleteContentForward') { //? удаление клавишей DELETE
			//! все множественные вырезания кливишей DELETE - срабатывает "deleteContentBackward"  - смотри выше (логика как и при deleteByCut)
			if (cursorInpt < def) {
				result = input.value.slice(
					(cursorInpt <= posLastNumMask) ? def - 1 // уменьшаем def и сохраняем все ццифры	
						: def
				).match(/\d/g) || [];
				cursorPos = def; // курсор ставим в конец def
			} else if (cursorInpt >= (def) && first.length == two.length) { //ввод за def и было удаления символа маски вместо цифры
				// поэтому ищем первую цифру СПРАВА от куросора и удаляем её
				let del = true; // после удаления одной искомой цифры переводим в false, чтобы не удалить остальные
				result = prev.replace(/\d/g, (a, i) => {
					if (i > cursorInpt && del) {
						del = false;
						cursorPos = i;
						return ""
					} else return a
				}).slice(def).match(/\d/g) || []; // из полученной строки получаем результат (цифры массивом за минусом def)
			} else { // ввод за def и + не было удаления символа маски
				cursorPos = cursorInpt; // курсор оставляем в selectionStart
				result = input.value.slice(def).match(/\d/g) || [];
			}

		} else if (event.inputType == 'deleteByCut') { //? удаление клавишей ВЫРЕЗАНИЕМ
			if (cursorInpt < def) {
				cursorPos = def;
				result = input.value.slice(
					(lengthDifference < def && (cursorInpt + lengthDifference) <= def) ? def - lengthDifference : // начало и конец в зоне def
						cursorInpt // начало где угодно, а конец после def
				).match(/\d/g) || [];
			} else {
				cursorPos = cursorInpt; // курсор оставляем в selectionStart
				result = input.value.slice(def).match(/\d/g) || [];
			}
		} else if (event.inputType == 'insertText') {
			result = input.value.slice(def).match(/\d/g) || [];
			cursorPos = cursorInpt
		} else if (event.inputType == 'insertFromPaste') {
			result = input.value.slice(def).match(/\d/g) || [];
			cursorPos = cursorInpt
		}
	}
	*/

	let obj = {};
	obj.getValue = result; // цифры массивом (!!! цифры из маски не учитываются !!!)
	obj.cursorPos = cursorPos;
	return obj
};
//===========================================================

//***** формирует новое значение инпута (заменяет "_" из маски на цифры из getValue и отрезает незаполненные "_") ****
function madeNewValue(mask, getValue) {
	let i = 0;
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue
	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски
	return (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 
}
//+++++++++++++++++++++++++++++++++++++++++++

//**** ищет позицю для курсора при вводе в инпут ********************
function findPosNumRight(mask, cursor, val, prev, newVal) {
	const posLastNumMask = findLastNumMask(mask);// позциция последней цифры в def маски
	const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски		
	let quantity = val.length - prev.length; // количество введенных знаков			
	let start = (quantity > 0) ? cursor - quantity : 0; // позция начала их ввода

	let result;
	let count;// вспомогательная
	let looking = true; // вспомогательная
	newVal.replace(/\d/g, (a, i) => {
		if (i >= start && looking && i > posLastNumMask) {
			looking = false;
			count = 1;
			result = ++i;
		} else if (!looking && count < quantity) {
			count++;
			result = ++i
		}
	})
	if (prev.length == newVal.length) {
		//result = start; //!подумать как исправить ошибку при вводе цифр с пробелами
		//! наверное quantity надо переделать (учитывать только введённые цифры, а не знаки)
	}
	return (start <= posLastNumMask) ? def : result;// при условии что ввод цифр в зоне def игнорируется
	// при условии что ввод цифра срабатывает всегда (даже в зоне цифр def) //return result;
}
//===============================================================

// ****  ищет номер позиции последней цифры в def маски ******
function findLastNumMask(mask) {
	const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски
	let pos;
	mask.slice(0, def).replace(/\d/g, (a, offset) => {
		pos = offset;
		return a
	})
	return pos;
}
//==============================================================




