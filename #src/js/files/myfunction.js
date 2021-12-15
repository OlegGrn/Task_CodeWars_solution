
"use strict";

//? Проверка устройства и добавление классов к html  ======================
// _touch  мобильные устройтсва
// _pc   компьютер


let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};


if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
} else {
	document.querySelector('html').classList.add('_pc');
}

//*=====================================================================================
//? активируем бургер

document.addEventListener("DOMContentLoaded", () => {
	let burgerIcon = document.querySelector(".burger__icon");
	let bodyLock = document.querySelector("body");
	let burgerBody = document.querySelector(".burger__body");
	let wrapper = document.querySelector(".wrapper");



	if (burgerIcon && burgerBody) {
		wrapper.addEventListener("click", (e) => {

			//? Открываем бургер при клике
			if (e.target.closest(".burger__icon")) {
				burgerIcon.classList.toggle("_active");
				bodyLock.classList.toggle("_lock");
				burgerBody.classList.toggle("_active");
				wrapper.classList.toggle("_active");

				//? Закрываем бургер при клике в любом месте
			} else if (!e.target.closest(".burger__body") && !e.target.closest(".burger__icon")) {
				burgerIcon.classList.remove("_active");
				bodyLock.classList.remove("_lock");
				burgerBody.classList.remove("_active");
				wrapper.classList.remove("_active");
			}
		});
	};
});

//* старый бургер */ Меню бургер добавляем класс ============================================

function addClas() {
	let menuIcon = document.querySelector(".menu__icon");
	let bodyLock = document.querySelector("body");
	let menuBody = document.querySelector(".menu__body");

	if (menuIcon != null) {
		menuIcon.classList.toggle("_active");
		bodyLock.classList.toggle("_lock");
		menuBody.classList.toggle("_active");
	}
}

document.querySelector(".menu__icon").addEventListener("click", addClas);

//? навигация к верху страницы ============================================

if (document.querySelector("._icon-arrow_up") != null) {
	document.querySelector("._icon-arrow_up").addEventListener("click", upPage);
}

function upPage(e) {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
	e.preventDefault();

}

//?==== SlideToggle  =======================================================================================

//SlideToggle  if () {
//  _slideToggle(elem) 
// } 
//========================================================================

let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}

//? навигация к заголовкам ============================================
//* атрибут в элементе <a> data-goto=".class"

if (document.querySelectorAll("a[data-goto]") != null) {
	document.querySelectorAll("a[data-goto]").forEach(item => {
		item.addEventListener("click", onMenuLinkClick);
	});
}

function onMenuLinkClick(e) {
	let menuLink = e.target;
	if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
		let nameClass = menuLink.dataset.goto;
		let MoveBlock = document.querySelector(nameClass);
		let boxMoveBlock = MoveBlock.getBoundingClientRect();
		let upMoveBlock = boxMoveBlock.top + window.pageYOffset - document.querySelector(".header").offsetHeight;
		e.preventDefault();

		if (document.querySelector(".menu__icon").classList.contains("_active")) {
			let menuIcon = document.querySelector(".menu__icon");
			let bodyLock = document.querySelector("body");
			let menuBody = document.querySelector(".menu__body");
			menuIcon.classList.remove("_active");
			bodyLock.classList.remove("_lock");
			menuBody.classList.remove("_active");
		}
		window.scrollTo({
			top: upMoveBlock,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}
//? анимация / добабления класса _active при скроле ==============================
//* ==============================================================
// к элементу анимации добавить класс:  _anim-scroll_25
// число 25 это коэфициент анимации, значения от 0 до 100 (100 - пока элемент весь не покажется на экране)do

document.addEventListener("DOMContentLoaded", () => {

	let animItem = document.querySelectorAll('[class*="_anim-scroll"]');

	if (animItem.length > 0) {

		// запуск события
		window.addEventListener("scroll", animOnScroll);

		//== вызов уже видимых блоков + задержка анимации ===
		setTimeout(() => { animOnScroll() }, 700);
	}

	function animOnScroll() {

		let animItem = document.querySelectorAll('[class*="_anim-scroll"]');
		const namClas = "_anim-scroll_";

		animItem.forEach(item => {

			// значение задержки из названия класса
			let value = getStartAnim(item, namClas)

			// коэфициэнт регулировки старта анимации по высоте от величины блока. Максимум - это 100 ед ====
			const partItemOffStartAnim = value * 0.01;

			// высота блока
			const heightItem = item.offsetHeight;

			// текущее положение блока на странице
			const heightItemOffTopPage = item.getBoundingClientRect().top + window.pageYOffset;

			// текущая высота окна
			const heightWindow = windowHeight();
			function windowHeight() {
				let height = document.documentElement.clientHeight || document.body.clientHeight;
				return height;
			}

			let pointAnim = heightWindow - heightItem * partItemOffStartAnim;
			if (heightItem > heightWindow) {
				pointAnim = heightWindow - heightWindow * partItemOffStartAnim;
			}

			let startAnim = heightItemOffTopPage - pointAnim;
			let endAnim = heightItemOffTopPage + heightItem;

			// запрет анимации при скролле сверху вниз
			//   && (item.getBoundingClientRect().top > heightWindow)
			if (window.pageYOffset > startAnim && window.pageYOffset < endAnim) {
				item.classList.add("_active");
			} else if (!item.classList.contains("_active_one")) {
				item.classList.remove("_active");
			}

			// получение цифры из названия класса
			function getStartAnim(el, name) {
				//длина названия класса без цифр
				let length = name.length;
				// позиция начала названия класса
				let posName = el.className.indexOf(name);
				// позиция начала искомого числа в названии класса 
				let posNumb = posName + length;
				//получаем число из названия класса (условие - число из 2-х цифр, иначе - изменить цифру ниже)
				let risult = el.className.substr(posNumb, 2);
				return risult;
			}
		});
	}
});

//* ==============================================================
//? Меню BODY скрываем верхний скрол под полупрозрачное меню (без плашки)

if (document.querySelector(".menu__body_opacity") != 0) {
	let elem = document.querySelector(".menu__body_opacity");
	elem.addEventListener("scroll", hideMenuList);

}

function hideMenuList() {
	const arrLinkMenu = document.querySelectorAll(".menu__link");
	const header = document.querySelector(".header");
	let hightHeader = header.offsetHeight - 5;

	arrLinkMenu.forEach(item => {
		let hightOffTop = item.getBoundingClientRect().top;
		let hightOffBottom = item.getBoundingClientRect().top + item.clientHeight;

		let pointStart = hightOffTop + item.clientHeight / 4;
		let pointEnd = hightOffBottom - 12;
		let pointMidl = pointStart + (pointEnd - pointStart) / 2;

		hidenStart(item, pointStart);
		hedenMidl(item, pointMidl);
		hiddenEnd(item, pointEnd);

		function hidenStart(item, pointStart) {
			if (pointStart < hightHeader) {
				item.classList.add("_hiden_start");
			} else if (pointStart > hightHeader) {
				item.classList.remove("_hiden_start");
			}
		}

		function hedenMidl(item, pointMidl) {

			if (pointMidl < hightHeader) {
				item.classList.add("_hiden_midl");
			} else if (pointMidl > hightHeader) {
				item.classList.remove("_hiden_midl");
			}
		}


		function hiddenEnd(item) {
			if (pointEnd < hightHeader) {
				item.classList.add("_hiden_end");
			} else if (pointEnd > hightHeader) {
				item.classList.remove("_hiden_end");
			}
		}


	});
}

//======================================================================================================
//?=========== NEW TABS =============================
/*
1. Внешнему блоку управления табами (родителю) - data-tab-tabs="tabs" (содержимое атрибута "..." не имеет значения)
2. Кнопкам управления data-tab-btn="tab_01" (содержимое это путь к блоку)
3. Блокам data-tab-block="tab_01"
4. Блоку который нужно открыть первым по умолчанию класс "_active_first"
*/

document.addEventListener("DOMContentLoaded", () => {

	const tabs = document.querySelector("[data-tab-tabs]");
	if (tabs) {
		tabs.addEventListener("click", function (e) {

			// элемент btn клика
			let tabBtn = e.target.closest("[data-tab-btn]");
			// родитель li элемента btn клика
			let parentTabBtn = e.target.closest("li");
			// все  li в блоке навигации по табам
			let allLi = tabs.querySelectorAll("li");

			let allTabBtn = document.querySelectorAll("[data-tab-btn]");
			let allTabBlock = document.querySelectorAll("[data-tab-block]")

			if (!tabBtn) return;
			removeActive(allTabBtn, allTabBlock, allLi);
			addActive(tabBtn, parentTabBtn);

			// добавить класс левому соседу LI (если нужно для стилизации)
			addPrevClas(parentTabBtn, allLi);
		});


		// первый клик автоматически на выбранной ссылке на экране выше 767.98px
		if (window.innerWidth > 767.98) document.querySelector("._active_first").click();


		function removeActive(btns, blocks, allli) {
			btns.forEach((item) => {
				item.classList.remove("_active");
			});

			blocks.forEach((item) => {
				item.classList.remove("_active");
			});

			allli.forEach((item) => {
				item.classList.remove("_active");
			});
		}


		function addActive(btn, li) {
			let path = btn.dataset.tabBtn;
			let block = document.querySelector(`[data-tab-block="${path}"]`);

			btn.classList.add("_active");
			block.classList.add("_active");
			li.classList.add("_active");

		}

		function addPrevClas(li, allLi) {
			let prev = li.previousElementSibling;

			// удаляем прежние активированыые _prev_active
			allLi.forEach((item) => {
				item.classList.remove("_prev_active");
			});

			//добавляем класс _prev_active
			if (prev) {
				prev.classList.add("_prev_active");
			}
		}
	}
});

//?============================================================================================
//*Треугольник возле ссылки при тач-экране сlass="touch-arrow"


if (document.querySelectorAll(".touch-arrow").length > 0) {

	document.querySelectorAll(".touch-arrow").forEach(item => {
		item.addEventListener("click", function (e) {

			item.classList.toggle("_click_arrow");



			// присваиваем класс слудующему соседу дедушки клика
			//item.parentElement.nextElementSibling.classList.toggle("_click_text");
			_slideToggle(item.parentElement.nextElementSibling);


		});
	})
}

//========================================================================================================
//?============ затемняем меню======================
document.addEventListener("DOMContentLoaded", () => {
	let menuList = document.querySelector(".menu__list");
	let header = document.querySelector(".header");
	if (menuList && header) {
		window.addEventListener("scroll", function () {
			let topOffHeight = window.pageYOffset;

			if (topOffHeight > 110) {
				menuList.classList.add("_color");
				header.classList.add("_mini");
			} else {
				menuList.classList.remove("_color");
				header.classList.remove("_mini");
			}

		});
	}
});
//===============================================================================================
//*==============================================================================
//? Кастомный селект (рабочий варинат)
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
	selElmnt = x[i].getElementsByTagName("select")[0];
	ll = selElmnt.length;
	/* For each element, create a new DIV that will act as the selected item: */
	a = document.createElement("DIV");
	a.setAttribute("class", "select-selected");
	a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	x[i].appendChild(a);
	/* For each element, create a new DIV that will contain the option list: */
	b = document.createElement("DIV");
	b.setAttribute("class", "select-items select-hide");
	for (j = 1; j < ll; j++) {
		/* For each option in the original select element,
		create a new DIV that will act as an option item: */
		c = document.createElement("DIV");
		c.innerHTML = selElmnt.options[j].innerHTML;
		c.addEventListener("click", function (e) {
			/* When an item is clicked, update the original select box,
			and the selected item: */
			var y, i, k, s, h, sl, yl;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			sl = s.length;
			h = this.parentNode.previousSibling;
			for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
						y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
			}
			h.click();
		});
		b.appendChild(c);
	}
	x[i].appendChild(b);
	a.addEventListener("click", function (e) {
		/* When the select box is clicked, close any other select boxes,
		and open/close the current select box: */
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
		this.classList.toggle("select-arrow-active");
	});
}

function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
	except the current select box: */
	var x, y, i, xl, yl, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	xl = x.length;
	yl = y.length;
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove("select-arrow-active");
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);