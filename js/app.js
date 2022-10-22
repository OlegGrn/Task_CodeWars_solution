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
		mask: '+7(___) ___ __ __'
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
		});

		input.addEventListener('contextmenu', () => {
			cursorStart = input.selectionStart;
			cursorEnd = input.selectionEnd;
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

	console.log(options);
	console.log(`CursorStart - ${cursorStart} \ cursorEnd - ${cursorEnd} \\\ cursorInpt - ${input.selectionStart}`);
	console.log(`-${input.value}- тукщий инпут. `)

	// получаем введные цифры из инпута массивом + положение курсора (или undifinded)	
	let { getValue, cursorPos } = getValueInput({ input, mask, event, cursorStart, cursorEnd });
	let newInputValue = madeNewValue(mask, getValue); // новое значение инпута 

	input.value = newInputValue;
	// схлопываем курсор и выставляем его по cursorPos
	if (cursorPos != undefined) {
		input.selectionStart = input.selectionEnd = cursorPos;
	}
}

//*** получаем введные цифры из инпута массивом в правильном порядке + положение курсора (или undifinded)

function getValueInput(options) {

	let { input, mask, event, cursorStart, cursorEnd } = options;
	let result;
	let cursorPos; // по коду при необходимости получает цифру куда переставить курсор	
	let cursorInpt = input.selectionStart; // положение курсора при событии
	const def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски 

	// cursorStart - начало ввода (если ранее было выделение - начало выделения), cursorInpt - окончание ввода
	// строка между ними  - это то что ввёл юзер newNumber  
	let newNumber = input.value.slice(cursorStart, cursorInpt).replace(/\D/g, "");

	let add = 0; //добавочная цифра для корректировки nextValOne и nextValTwo чтобы можно было удалить цирфу за/перед пробелами
	// условие cursorStart == cursorEnd - был введен всего один символ (выделения не было)
	// условие newNumber.length == 0 - не было введено никаких новых цифр
	if (newNumber.length == 0 && cursorStart == cursorEnd) {
		add = (cursorInpt < cursorEnd) ? shiftLeft(options, cursorInpt) : shiftRight(options);
	}

	let nextValOne = input.value.slice(0, (cursorStart > cursorInpt) ? cursorInpt - add : cursorStart);
	let nextValTwo = input.value.slice((cursorEnd < def) ? cursorInpt + (def - cursorEnd) : (cursorInpt + add));
	let nextVal = nextValOne + newNumber + nextValTwo;

	console.log(`${newNumber} - новые цифры /newNumber/ ${nextValOne} nextValOne / ${nextValTwo} nextValTwo `);
	console.log(`${nextVal} - новое значение инпута`);

	// отрезаем из полученной строки nextVal значение def и получем из неё цирфы массимов в правильном порядке
	let start = (cursorStart < cursorInpt) ? cursorStart : cursorInpt;
	result = nextVal.slice(
		(start < def) ? start : def
	).match(/\d/g) || [];

	let obj = {};
	obj.getValue = result; // цифры массивом (!!! цифры из маски не учитываются !!!)
	obj.cursorPos = cursorPos;
	return obj
};
//===========================================================
//**** находим добавочный add для смещения влево */
function shiftLeft(options, cursorInpt) {

	let { mask, cursorEnd } = options;

	let unLock = (mask.substring(cursorInpt, cursorEnd)) !== "_"; // если true - было удаление пустоты 
	let pos = (unLock) ? mask.lastIndexOf("_", cursorInpt) : -1;
	return (pos == -1) ? 0 : cursorInpt - pos;
}

//**** находим добавочный add для смещения вправо *****
function shiftRight(options) {

	let { mask, cursorEnd } = options;

	let oneNumMask = mask.indexOf("_");
	let unLock = (mask.substring(cursorEnd, cursorEnd + 1)) !== "_"; // если true - было удаление пустоты 
	let pos = (unLock) ? mask.indexOf("_", cursorEnd) : -1;
	return (pos <= oneNumMask) ? 0 : pos - cursorEnd;
}

//***** формирует новое значение инпута (заменяет "_" из маски на цифры из getValue и отрезает незаполненные "_") ****
function madeNewValue(mask, getValue) {
	let i = 0;
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue
	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски
	return (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 
}
//+++++++++++++++++++++++++++++++++++++++++++
/*
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
*/
//===============================================================





/*
	let nextValOne = input.value.slice(0, (cursorStart > cursorInpt) ? cursorInpt : cursorStart);
	let nextValTwo = (cursorInpt > cursorEnd) ?
		input.value.slice(
			//(cursorEnd < def) ? (cursorInpt - cursorStart) + (def - (cursorEnd - cursorStart)) : cursorInpt
			(cursorEnd < def) ? cursorInpt + (def - cursorEnd) : cursorInpt
		) :
		(cursorInpt < cursorEnd) ?
			input.value.slice(
				(cursorEnd < def) ? cursorInpt + (def - cursorEnd) : cursorInpt
			) :
			(cursorInpt == cursorEnd) ?
				input.value.slice(
					(cursorEnd < def) ? cursorInpt + (def - cursorEnd) : cursorInpt
				) :
				0;
	*/


/*

window.addEventListener("DOMContentLoaded", function () {
[].forEach.call(document.querySelectorAll('.tel'), function (input) {
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
		var reg = matrix.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}"
			}).replace(/[+()]/g, "\\$&");
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