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
		let numMask = countNumMask(mask, def);// количество цифр маске

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

		input.addEventListener('input', () => maskPhoneInput({ input, mask, cursorStart, cursorEnd, def, numMask, cloneInput }));
		input.addEventListener('focus', () => maskPhoneFocus({ input, mask, cursorStart, cursorEnd, def, numMask, cloneInput }));
		input.addEventListener('blur', () => maskPhoneBlur({ input, mask, cursorStart, cursorEnd, def, numMask, cloneInput }));
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

	let { input, mask, def } = options;

	const clearPhoneBlur = input.classList.contains('required');

	input.value = (input.value.length == mask.length) ? input.value :
		(input.value.length == def) ? "" :
			(clearPhoneBlur) ? "" : input.value;
}


//* количество цифр в маске 

function countNumMask(mask, def) {
	let enterNumMask = mask.replace(/[^_]/g, "").length; // количество цифр ввода в маску
	let maskNumDef = mask.slice(0, def).replace(/\D/g, '').length // количество цифр в маскe
	return enterNumMask + maskNumDef;
}

//* обёртка для maskPhoneInput - алгоритм блокировки ввода значений при переполенении инпута

function wrapController(func) {

	let owldValue;
	let unfull;

	return function (options) {

		let { input, cursorStart, cursorEnd, numMask, mask, def } = options;
		// cursorStart - начало ввода (если ранее было выделение - начало выделения), input.selectionStart - окончание ввода
		// строка между ними  - это то что ввёл юзер newNumber  
		// введённое текущее значение в инпут (учитываются только цифры)
		let cursorInpt = input.selectionStart; // положение курсора при событии		
		let newNumber = input.value.slice(cursorStart, input.selectionStart).replace(/\D/g, "");
		let numInput = input.value.replace(/\D/g, "").length; // всего количество цифр в инпуте
		let wasDel = (cursorInpt <= cursorStart) ? true : false; // было удаление
		let wasEnterNum = (newNumber.length > 0) ? true : false; // была введена цифра

		//console.log(`${input.value} ${input.value.replace(/\D/g, "")}  numInput.length ${numInput} / numMask - ${numMask} / newNumber - ${newNumber} / CursorStart - ${cursorStart} \ cursorEnd - ${cursorEnd} \\\ cursorInpt - ${cursorInpt}`);

		if (wasEnterNum || wasDel) { // было удаление или введена цифра
			unfull = (numInput > numMask) ? false : true;
		} else { // введена НЕ цифра
			unfull = (numInput >= numMask) ? false : true;
		}
		console.log(` unfull ${unfull} `);

		if (cursorStart == cursorEnd) { //ввод одним знком или вставкой НО без прежнего выделения
			if (unfull) { // в инпуте цифр меньше допустимого маской

				owldValue = func(options, newNumber);

				// if (!wasEnterNum && !wasDel) { // не было цифр и не было удаления
				// 	input.selectionStart = input.selectionEnd = cursorStart;
				// }


			} else if (!unfull) { // в инпуте введённых цифр больше допустимого маской 
				// вводилось вставкой сразу несколько цифр
				if ((cursorInpt - cursorStart > 1)) {
					// инпут уже ранее был ВЕСЬ заполнен: (owldValue), Func - не срабатывает
					// эту опцию можно убрать, чтобы при вставке нескольких цифр всегда срабатывала Func
					if (((owldValue) ? owldValue.length : def) == mask.length) {
						input.value = owldValue;
						input.selectionStart = input.selectionEnd = cursorStart;
					} else { // инпут еще НЕ был переполнен ранее
						owldValue = func(options, newNumber);
					}
				} else { // (owldValue),  Func - не срабатывает					
					// вводилось одним знаком, но инпут уже был заполнен (иначе сработала бы ветка с условием unfull==true )
					input.value = owldValue;
					input.selectionStart = input.selectionEnd = cursorStart;
				}
			}
		} else if (cursorStart != cursorEnd) { // предварительно было веделение 
			owldValue = func(options, newNumber);
		}


	}
}

//* =======  устанавливает маску ввода телефона =========================

function maskPhoneInput(options, newNumber) {

	let { input, cursorStart, cursorEnd, numMask, mask, def } = options;

	//console.log(options);
	console.log(`CursorStart - ${cursorStart} \ cursorEnd - ${cursorEnd} \\\ cursorInpt - ${input.selectionStart}`);
	console.log(`-${input.value}- тукщий инпут. \  `);

	// получаем введные цифры из инпута массивом в правильном порядке + положение курсора

	let getValue = getValueInput(options, newNumber);
	let newInputValue = madeNewValue(options, getValue); // вычисляем новое значение инпута 
	let cursorPos = setCursor(options, newNumber);

	input.value = newInputValue; // устанавливаем новое значение инпута 


	if (cursorPos != undefined) {
		input.selectionStart = input.selectionEnd = cursorPos;
	}
	return newInputValue
}

//*** получаем введные цифры из инпута массивом в правильном порядке + положение курсора (или undifinded)\

function getValueInput(options, newNumber) {

	let { input, cursorStart, cursorEnd, def } = options;
	let cursorInpt = input.selectionStart; // положение курсора при событии		

	//добавочная цифра для корректировки nextValOne и nextValTwo чтобы можно было удалить цирфу за/перед пробелами
	// условие cursorStart == cursorEnd - был введен всего один символ (выделения не было)
	// условие newNumber.length == 0 - не было введено никаких новых цифр
	let add = (newNumber.length == 0 && cursorStart == cursorEnd) ? setShift(options) : 0;

	let nextValOne = input.value.slice(0, (cursorStart > cursorInpt) ? cursorInpt - add : cursorStart);
	let nextValTwo = input.value.slice((cursorEnd < def) ? cursorInpt + (def - cursorEnd) :
		(cursorInpt + ((cursorInpt < cursorEnd && add != 0) ? 0 : add)));
	let nextVal = nextValOne + newNumber + nextValTwo;

	console.log(`nextValOne-${nextValOne}, nextValTwo-${nextValTwo}, nextVal-${nextVal}, add-${add}`);


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

	if (newNumber.length > 0) {
		// был ввод новых цифр (без разницы с предварительным удалением через выделение или нет)
		let count = 0; // отсчитывает найденные "_" в маске с позции cursorStart или cursorInpt
		let num; // результат это когда count будет == newNumber.length		
		mask.replace(/[^]/g, (a, ind) => {
			if ((ind >= ((cursorStart < cursorInpt) ? cursorStart : cursorInpt)) &&
				(a == "_") && (count++ < newNumber.length)) {
				num = ++ind;
			}
		})
		result = num;

	} else if (newNumber.length == 0) { // было удаление и ввода новых не было
		//удаление одного знака клавишей BackSpace
		if (cursorStart == cursorEnd && cursorInpt < cursorEnd) {
			result = (cursorInpt < def) ? def : mask.lastIndexOf("_", cursorInpt);
		} else { // все остальные удаления с выделением или нет
			//result = mask.indexOf("_", cursorInpt)
			result = mask.indexOf("_", cursorEnd)
		}
	}
	console.log(`cursor ${result} / newNumber.length - ${newNumber.length}`);

	return result;
}

//* находим смещение left or right ************/
function setShift(options) {
	let { input, mask, cursorEnd } = options;
	let oneNumMask = mask.indexOf("_");
	let cursorInpt = input.selectionStart; // положение курсора при событии

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
	let { input, mask, cursorStart, cursorEnd, def, cloneInput } = options;
	let i = 0;
	let mask_value = mask.replace(/[_]/g, (a) => (i < getValue.length) ? getValue[i++] : a); // заменяем "_" из маски на цифры из getValue
	let emptyPos = mask_value.indexOf('_');  // получаем позицию не заполненных "_" из маски

	let val = (emptyPos == -1) ? mask_value : mask_value.slice(0, emptyPos); // отрезаем пустые "_" 

	if (cloneInput) {
		madeShadowInput(options, emptyPos, val)
	}
	return val
}

//** подрезает тень в зависимости от заполнения инпута */

function madeShadowInput(options, emptyPos, val) {
	let { input, mask, cursorStart, cursorEnd, def, cloneInput } = options;
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


//**** находим добавочный add для смещения влево */
/*
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
*/
//===========================================================
//**** находим добавочный add для смещения влево */
/*
function shiftLeft(options) {

	let { input, mask, event, cursorStart, cursorEnd } = options;
	let cursorInpt = input.selectionStart; // положение курсора при событии

	let unLock = (mask.substring(cursorInpt, cursorEnd)) !== "_"; // если true - было удаление пустоты
	 let pos = (unLock) ? mask.lastIndexOf("_", cursorInpt) : -1;
	 return (pos == -1) ? 0 : cursorInpt - pos;

	let pos = mask.lastIndexOf("_", cursorInpt);

	return (pos == -1) ? 0 : cursorInpt - pos;

}

//**** находим добавочный add для смещения вправо *****
function shiftRight(options) {

	let { input, mask, event, cursorStart, cursorEnd } = options;
	let oneNumMask = mask.indexOf("_");

	 let unLock = (mask.substring(cursorEnd, cursorEnd + 1)) !== "_"; // если true - было удаление пустоты
	 let pos = (unLock) ? mask.indexOf("_", cursorEnd) : -1;

	let pos = mask.indexOf("_", cursorEnd);
	return (pos <= oneNumMask) ? 0 : pos - cursorEnd;
}

*/


//+++++++++++++++++++++++++++++++++++++++++++

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


function getNextVal(options) {

	let { input, cursorStart, cursorEnd, def } = options;
	let cursorInpt = input.selectionStart;

	// cursorStart - начало ввода (если ранее было выделение - начало выделения), cursorInpt - окончание ввода
	// строка между ними  - это то что ввёл юзер newNumber
	let newNumber = input.value.slice(cursorStart, cursorInpt).replace(/\D/g, "");

	//добавочная цифра для корректировки nextValOne и nextValTwo чтобы можно было удалить цирфу за/перед пробелами
	// условие cursorStart == cursorEnd - был введен всего один символ (выделения не было)
	// условие newNumber.length == 0 - не было введено никаких новых цифр


	let add = (newNumber.length == 0 && cursorStart == cursorEnd) ? setShift(options) : 0;


	let nextValOne = input.value.slice(0, (cursorStart > cursorInpt) ? cursorInpt - add : cursorStart);
	let nextValTwo = input.value.slice((cursorEnd < def) ? cursorInpt + (def - cursorEnd) :
		(cursorInpt + ((cursorInpt < cursorEnd && add != 0) ? 0 : add)));
	let nextVal = nextValOne + newNumber + nextValTwo;

	// console.log(`${newNumber} - новые цифры/ ${add} = add / ${nextValOne} nextValOne / ${nextValTwo} nextValTwo `);
	// console.log(`${nextVal} - новое значение инпута`);

	return { nextVal, newNumber }
}
*/

// if (cursorEnd - cursorStart == 1) {
		// 	let hold = mask
		// 		.substring(cursorStart, cursorEnd)
		// 		.includes("_");
		// 	result = (hold) ? mask.indexOf("_", cursorInpt) : (mask.indexOf("_", cursorInpt) + 1)

		// } else if (cursorEnd - cursorStart > 1) {
		// 	result = ((cursorStart < def) ? def : cursorStart) + newNumber.length;
		// }