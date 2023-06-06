/*function saveLinkActive() {
	// получаем путь из адресной строки
	const path = document.location.pathname.replace("/", "")
	// находим соответствующий путь в меню в сылках и добавляем класс найденной ссылке
	const links = document.querySelectorAll(".menu__link");
	if (links) {
		links.forEach(link => {
			if (link.getAttribute("href").localeCompare(path) === 0) {
				link.classList.add("menu__link_active")
			};
		})
	}

}*/

function saveLinkActive() {
	// получаем путь из адресной строки
	const path = document.location.pathname
	// находим соответствующий путь в меню в сылках и добавляем класс найденной ссылке
	const links = document.querySelectorAll(".menu__link");
	if (links) {
		links.forEach(link => {
			if (link.pathname.localeCompare(path) === 0) {
				link.classList.add("menu__link_active")
			}
		})
	}
}


document.addEventListener("DOMContentLoaded", saveLinkActive);