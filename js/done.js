



//*
/*Завершите findNextSquareметод, который находит следующий целочисленный идеальный квадрат после квадрата, 
переданного в качестве параметра. Напомним, что целочисленный совершенный квадрат — это целое число n, 
такое что sqrt(n) также является целым числом.
Если параметр сам по себе не является идеальным квадратом -1, его следует вернуть. 
Вы можете предположить, что параметр неотрицательный.*/

function findNextSquare(sq) {
	let prev = sq ** (1 / 2);
	return (Math.ceil(prev) - prev > 0) ? -1 : Math.pow(++prev, 2);
}

//*
/*Реализуйте функцию unique_in_order, которая принимает в качестве аргумента 
последовательность и возвращает список элементов без каких-либо элементов с одинаковым 
значением рядом друг с другом и с сохранением исходного порядка элементов.
Test.assertSimilar(uniqueInOrder('AAAABBBCCDAABBB'), ['A','B','C','D','A','B'])*/

let uniqueInOrder = function (iterable) {

	return Array.from(iterable).filter((item, index, arr) => {
		while (index < arr.length) {
			return (item !== arr[++index])
		}
	});
}
console.log(uniqueInOrder('AAAABBBCCDAABBB'));

//*прогулка по городу - каждая буква это сторона света. Одна буква - путь в одну минуту
//* нужно вернуться в исходную точку через 10 минут

let walk = ['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's'];
//let walk = ['w', 'e', 'w', 's'];
let path = 0;


function isValidWalk(walk) {

	if (walk.length == 10) {

		let vertical = [];
		let horizon = [];

		walk.forEach(leter => {
			(leter == 'w') ? vertical.push(-1) :
				(leter == 'e') ? vertical.push(1) :
					(leter == 'n') ? horizon.push(1) :
						horizon.push(-1);
		});
		let pathVertical = vertical.reduce((sum, item) => sum + item, 0);
		let pathHorizon = horizon.reduce((sum, item) => sum + item, 0);

		if (pathVertical == 0 && pathHorizon == 0) {
			return true
		} else return false

	} else return false

}



//* отфильтровать гласные в строке
function disemvowel(str) {
	let vowels = "aeiou";

	let result = str.split('').filter(leter => {
		return !vowels.includes(leter.toLowerCase())
	});
	str = result.join('');

	return str;
}

let str = "This website is for losers LOL!"
console.log(disemvowel(str));
//!------------------UP CODEWARS---------------------------------------------- 
//* Напишите код, который выводит все простые числа из интервала от 2 до n.
let start = 2;
let end = 15;

outer:
for (start; start < end; start++) {

	for (let i = 2; i < start; i++) {

		if (start % i == 0) continue outer;
	}
	console.log(start);
}

//*Напишите функцию pow(x,n), которая возвращает x в степени n.
let pow = (x, n) => (n == 1) ? x : x * pow(x, n - 1);


//* Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
//sumTo(n) = n + sumTo(n-1) for n > 1.

function sumTo(n) {
	// let sum = 0
	// for (let i = 0; i <= n; i++) {
	// 	sum = sum + i;
	// }
	// return sum;

	return (n == 1) ? n : n + sumTo(n - 1);
}
console.log(sumTo(22));

//* Замените код Function Expression стрелочной функцией

let ask = (question, yes, no) => (confirm(question)) ? yes() : no();

ask(
	"Вы согласны?",
	() => alert("Вы согласились."),
	() => alert("Вы отменили выполнение."),
);



//*Вычислить факториал  ============================================================================
//Подсказка: n! можно записать как n * (n-1)! Например: 3! = 3*2! = 3*2*1! = 6
function factorial(n) {
	if (n == 2) {
		return n;
	} else {
		return n * factorial(n - 1);
	}
}
console.log(factorial(5));

//*Числа Фибоначчи ======================================================================================
//Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.
//Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2.
//То есть, следующее число получается как сумма двух предыдущих.
//Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....

function fib(n) {
	if (n == 1 || n == 2) {
		return 1;
	} else {
		let arr = [];
		for (let i = 2; i < n; i++) {
			arr[0] = 0;
			arr[1] = 1
			arr[i] = arr[i - 1] + arr[i - 2];
		}
		return arr[n - 1] + arr[n - 2];
	}
}
// вторая версися
function fib(n) {
	let a = 1;
	let b = 1;
	for (let i = 3; i <= n; i++) {
		let c = a + b;
		a = b;
		b = c;
	}
	return b;

}

console.log(fib(77));

//*Вывод односвязного списка =======================================================================
//Напишите функцию printList(list), которая выводит элементы списка по одному.
let list = {
	value: 1,
	next: {
		value: 2,
		next: {
			value: 3,
			next: {
				value: 4,
				next: null
			}
		}
	}
};


let vr = []
function printList(arr) {
	vr.push(arr.value);
	if (arr.next) {
		printList(arr.next)
	}
}

printList(list);
console.log(vr);

//* Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.
// Да, именно таким образом, используя двойные круглые скобки (не опечатка).
// sum(1)(2) = 3

function sum(x) {

	function summ(b) {
		return b + x;
	}

	return summ;
}

let result = sum(5)(-1);
console.log(result);

//*Сделайте набор «готовых к употреблению» фильтров:
// Они должны использоваться таким образом:
// arr.filter(inBetween(3,6)) – выбирает только значения между 3 и 6 (включительно).
// arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива

let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
	return item => (item >= a && item <= b);
}

function inArray(ar) {
	return item => ar.includes(item);
}

let res = arr.filter(inBetween(3, 6));
let res2 = arr.filter(inArray([1, 2, 10]));

console.log(res);
console.log(res2);

//*Напишите функцию byField, которая может быть использована для этого.
//У нас есть массив объектов, который нужно отсортировать:
//Обычный способ был бы таким:

// по имени (Ann, John, Pete)
//users.sort((a, b) => a.name > b.name ? 1 : -1);

// по возрасту (Pete, Ann, John)
//users.sort((a, b) => a.age > b.age ? 1 : -1);

// Можем ли мы сделать его короче, скажем, вот таким?

// users.sort(byField('name'));
// users.sort(byField('age'));

// То есть, чтобы вместо функции, мы просто писали byField(fieldName).
//Напишите функцию byField, которая может быть использована для этого.

let users = [
	{ name: "John", age: 20, surname: "Johnson" },
	{ name: "Pete", age: 18, surname: "Peterson" },
	{ name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(fieldName) {
	return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;

}

console.log(users.sort(byField('age')));

//* Измените код makeCounter() так, чтобы счётчик мог увеличивать и устанавливать значение:
// counter() должен возвращать следующее значение (как и раньше).
// counter.set(value) должен устанавливать счётчику значение value.
// counter.decrease() должен уменьшать значение счётчика на 1.
// Посмотрите код из песочницы с полным примером использования.

// P.S. Для того, чтобы сохранить текущее значение счётчика, можно воспользоваться как 
//замыканием,
// так и свойством функции. Или сделать два варианта решения: и так, и так.

function makeCounter() {

	function counter() {
		return counter.count++;
	};
	counter.count = 0;

	counter.set = (value) => counter.count = value;
	counter.decrease = () => --counter.count;

	return counter;
}

let counter = makeCounter();

counter.set(10);
alert(counter()); // 1
alert(counter()); // 1
counter.set(5);
alert(counter()); // 1
alert(counter()); // 1
counter.decrease();
alert(counter()); // 1

//*Напишите функцию printNumbers(from, to), 
//*которая выводит число каждую секунду, начиная от from и заканчивая to.
// Сделайте два варианта решения.
// Используя setInterval.
// Используя рекурсивный setTimeout.


function printNumbers(from, to) {

	let timerId = setInterval(show, 2000);

	function show() {
		if (from == to) clearInterval(timerId);
		alert(from);
		return from++;
	}
}

printNumbers(2, 5);

function printNumbers(from, to) {

	setTimeout(show, 2000);
	function show() {
		alert(from);
		if (from < to) setTimeout(show, 2000);
		return from++;
	}
}

function printNumbers(from, to) {

	setTimeout(function show() {
		alert(from);
		if (from < to) setTimeout(show, 2000);
		return from++;
	}, 2000);
}
printNumbers(2, 5);





