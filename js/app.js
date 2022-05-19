"use strict";

let worker = {
	someMethod() {
		return 1;
	},

	slow(x) {
		// здесь может быть страшно тяжёлая задача для процессора
		alert("Called with " + x);
		return x * this.someMethod(); // (*)
	}
};

// тот же код, что и выше
function cachingDecorator(func) {
	let cache = new Map();
	return function (x) {
		if (cache.has(x)) {
			return cache.get(x);
		}
		let result = func(x); // (**)
		cache.set(x, result);
		return result;
	};
}

alert(worker.slow(1)); // оригинальный метод работает

worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим

alert(worker.slow(2)); // Ой! Ошибка: не удаётся прочитать свойство 'someMethod' из 'undefined'
