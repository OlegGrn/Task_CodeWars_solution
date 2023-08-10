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

function makeCountEl(el) {
    return function () {
        if (!el) return
        let allLi = el.querySelectorAll("li");
        for (let oneLi of allLi) {
            let text = oneLi.firstChild.nodeValue.trim();
            let count = oneLi.getElementsByTagName("li").length
            console.log(text + ": " + count)
        }
    }
}

{
    /*let countLi = makeCountEl(document.querySelector("#lists"));
    countLi()*/
}






















