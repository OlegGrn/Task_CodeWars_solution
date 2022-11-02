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
		mask: "+7(___) ___ - __ - __"
	},
	class_remove: new Set() // коллекция классов для последующей очистки формы
}
document.addEventListener("DOMContentLoaded", () => {

	maskPhoneInput = wrapController(maskPhoneInput);

	document.querySelectorAll('[data-mask-phone]').forEach(input => {

		// устанавливаем значение placeholder (из знчения placeholder, если нет - из атрибута 'data-mask-phone, если нет - из setInputCheek)
		let placeholderVal = (input.getAttribute('placeholder')) ? input.getAttribute('placeholder') :
			(input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
				(input.name && setInputCheek) ? setInputCheek[input.name].mask : "";

		input.placeholder = removeSpice(placeholderVal); // убираем лишние пробелы при их наличии

		// получаем маску		
		let mask = getMaskPhone(input);
		let def = mask.slice(0, mask.indexOf("_")).length; // длина дефолтного начала маски		

		// нужна или нет тень маски
		let shadow = input.hasAttribute('data-mask-phone-shadow');
		let cloneInput = (shadow) ? makeShadow({ input, mask, def }) : false; // делаем клон инпута и подрезаем на величину def

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

		input.addEventListener('input', () => maskPhoneInput({ input, mask, cursorStart, cursorEnd, def, cloneInput }));
		input.addEventListener('focus', () => maskPhoneFocus({ input, mask, cursorStart, cursorEnd, def, cloneInput }));
		input.addEventListener('blur', () => maskPhoneBlur({ input, mask, cursorStart, cursorEnd, def, cloneInput }));
	})
});

//* ======= получаем маску для инпута 
// либо из атрибута data-mask-phone или из setInputCheek или  defolt
function getMaskPhone(input) {

	let defolt = "+7(___) ___ ____";

	let mask = (input.getAttribute('data-mask-phone')) ? input.getAttribute('data-mask-phone') :
		(input.name && setInputCheek) ? setInputCheek[input.name].mask : defolt;

	return removeSpice(mask)
}
//* удаляет лишние пробелы в маске *********
function removeSpice(mask) {
	return mask
		.trim()
		.replace(/[^]/g, (a, ind, str) => ((a == " ") && (str.charAt(++ind) == " ")) ? "" : a)
}

//* ======= фокус на инпуте =====================
function maskPhoneFocus(options) {

	let { input, mask, def, cloneInput } = options;

	if (cloneInput) {
		input.style.backgroundColor = "transparent";
	}
	input.value = (input.value < def) ? mask.slice(0, def) : input.value;

	setTimeout(() => {
		input.selectionStart = input.selectionEnd = input.value.length;
	}, 0)
}

//* ======= потеря фокуса =======================
function maskPhoneBlur(options) {

	let { input, mask, def, cloneInput } = options;

	const clearPhoneBlur = input.classList.contains('required');

	input.value = (input.value.length == mask.length) ? input.value :
		(input.value.length == def) ? "" :
			(clearPhoneBlur) ? "" : input.value;
	if (input.value == '' && cloneInput) {
		input.style.backgroundColor = ""
	}
}

//* обёртка для maskPhoneInput - алгоритм блокировки ввода значений при переполенении инпута

function wrapController(func) {
	let owldValue;
	return function (options) {

		let { input, cursorStart, cursorEnd, mask } = options;

		let cursorInpt = input.selectionStart; // положение курсора при событии	
		if ((input.value.length > mask.length) && (cursorInpt - cursorEnd == 1)) {
			input.value = owldValue;
			input.selectionStart = input.selectionEnd = cursorStart;
		} else {
			owldValue = func(options);
		}
	}
}

//* =======  устанавливает маску ввода телефона =========================

function maskPhoneInput(options) {

	let { input, cursorStart } = options;

	let newNumber = input.value.slice(cursorStart, input.selectionStart).replace(/\D/g, "");
	let getValue = getValueInput(options, newNumber); // получаем цифры из инпута массивом в правильном порядке
	let newInputValue = madeNewValue(options, getValue); // вычисляем новое значение инпута 
	let cursorPos = setCursor(options, newNumber); // получаем положение курсора

	input.value = newInputValue; // устанавливаем новое значение инпута 

	if (cursorPos != undefined) {
		input.selectionStart = input.selectionEnd = cursorPos;
	}
	return newInputValue
}

//*** получаем введные цифры из инпута массивом в правильном порядке \

function getValueInput(options, newNumber) {

	let { input, cursorStart, cursorEnd, def } = options;
	let cursorInpt = input.selectionStart; // положение курсора при событии	

	let add = (newNumber.length == 0 && cursorStart == cursorEnd) ? setShift(options, cursorInpt) : 0;

	let nextValOne = input.value.slice(0, (cursorStart > cursorInpt) ? cursorInpt - add : cursorStart);
	let nextValTwo = input.value.slice((cursorEnd < def) ? cursorInpt + (def - cursorEnd) :
		(cursorInpt + ((cursorInpt < cursorEnd && add != 0) ? 0 : add)));
	let nextVal = nextValOne + newNumber + nextValTwo;

	// отрезаем из полученной строки nextVal значение def и получем из неё цирфы массимов в правильном порядке
	let start = (cursorStart < cursorInpt) ? cursorStart : cursorInpt;
	let result = nextVal.slice(
		(start < def) ? start : def
	).match(/\d/g) || [];

	return result
};

//* устанавливает курсор ======================

function setCursor(options, newNumber) {
	let { input, mask, cursorStart, cursorEnd, def } = options;
	let cursorInpt = input.selectionStart;
	let result;

	if (newNumber.length > 0) { // был ввод новых цифр без разницы как		
		let count = 0; // отсчитывает найденные "_" в маске с позции cursorStart или cursorInpt
		let num; // результат это когда count будет == newNumber.length		
		mask.replace(/[^]/g, (a, ind) => {
			if ((ind >= ((cursorStart < cursorInpt) ? cursorStart : cursorInpt)) &&
				(a == "_") && (count++ < newNumber.length)) {
				num = ++ind;
			}
		})
		result = num;

	} else if (newNumber.length == 0) { //удаление или ввод НЕ цифры
		if ((cursorEnd - cursorInpt) == 1) { // удаление клавишей BackSpace одного знака
			result = (cursorInpt < def) ? def : mask.lastIndexOf("_", cursorInpt);
		} else { // все остальные удаления с выделением или нет
			result = mask.indexOf("_", cursorEnd)
		}
	}
	return result;
}

//* находим смещение left or right ************/
function setShift(options, cursorInpt) {
	let { mask, cursorEnd } = options;
	let oneNumMask = mask.indexOf("_");

	if (cursorInpt < cursorEnd) { // сдвиг влево
		let pos = mask.lastIndexOf("_", cursorInpt);
		return (pos == -1) ? 0 : cursorInpt - pos;

	} else if (cursorInpt >= cursorEnd) { // сдвиг вправо
		let pos = mask.indexOf("_", cursorEnd);
		return (pos <= oneNumMask) ? 0 : pos - cursorEnd;
	}
}

//***** формирует новое значение инпута (заменяет "_" из маски на цифры из getValue и отрезает незаполненные "_") ****
function madeNewValue(options, getValue) {
	let { mask, cloneInput } = options;
	let i = 0;
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue
	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски

	let val = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 

	if (cloneInput) {
		madeShadowInput(options, val)
	}
	return val
}

//** подрезает тень в зависимости от заполнения инпута */

function madeShadowInput(options, val) {
	let { mask, cloneInput } = options;
	// все спаны в клоне
	let allSpan = cloneInput.querySelectorAll('span');
	// заменяем на значения из нового инпута или маски по мере заполнения
	let i = 0;
	allSpan.forEach(item => {
		if (i < val.length) {
			item.innerHTML = val.charAt(i++);
			item.classList.add("mask-shadow__span_hiden")
		} else {
			item.innerHTML = mask.charAt(i++);
			item.classList.remove("mask-shadow__span_hiden")
		}
	})
}

//*** делает клон инпута, стили для него + "подрезаем" клон за счет присвоения класса 
//**  спанам в def (в CSS для них опасити 0)
function makeShadow(options) {
	let { input, mask, def } = options;
	let parent = input.parentElement; // label родитель инпуту
	parent.style.position = "relative";

	let styleInput = input.className; // стили из клонируемого
	let cloneInput = document.createElement('div');// clone
	cloneInput.classList = styleInput; // присваеваем стили клону из клонируемого
	// добавляем стили и классы клону
	cloneInput.classList.add("mask-shadow");
	cloneInput.style.lineHeight = "normal" // чтобы не прыгал шрифт
	cloneInput.style.display = "inline-block";
	cloneInput.style.position = "absolute";
	cloneInput.style.top = "0";
	cloneInput.style.left = "0";
	cloneInput.style.width = "100%";
	cloneInput.style.height = "100%";
	cloneInput.style.zIndex = "-50";
	cloneInput.style.pointerEvents = "none";
	// оборачиваем каждый знак маски в span + span для def присваем класс для прозрачности
	cloneInput.innerHTML = mask.replace(/[^]/g, (a, ind) => {
		if (ind < def) {
			return `<span class ="mask-shadow__span mask-shadow__span_hiden">${a}</span>`
		} else {
			return `<span class ="mask-shadow__span">${a}</span>`
		}
	})
	input.after(cloneInput); // вставляем на страницу клон
	return cloneInput;
}


