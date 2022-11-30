//* 
//? Вариант 1 МОЙ

//? переработнанный МОЙ с учетом инфы ниже

//? Вариант 2  НЕ мой

//* 
//? Вариант 1 МОЙ

//? переработнанный МОЙ с учетом инфы ниже

//? Вариант 2  НЕ мой

//*
//? Вариант 1 МОЙ

//? переработнанный МОЙ с учетом инфы ниже

//? Вариант 2  НЕ мой

//* Создайте асинхронную функцию getUsers(names), которая получает на вход массив логинов пользователей GitHub,
//* запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей
//* Если какой-то запрос завершается ошибкой функция должна возвращать null
//? Вариант 1 МОЙ
async function getUsers(names) {
	return await Promise.all(
		names.map(async user => {
			const respon = await fetch(`https://api.github.com/users/${user}`);
			return (!respon.ok) ? null : await respon.json();
		})
	)
}
/*
let usersName = ["iliakan"
	, "ilik"
	, "-f-f-f-f-f-f-f-f-++++ff"
]
getUsers(usersName).then(console.log)
*/

//* Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.
/*function Clock({ template }) {
  
	let timer;
 
	function render() {
	  let date = new Date();
 
	  let hours = date.getHours();
	  if (hours < 10) hours = '0' + hours;
 
	  let mins = date.getMinutes();
	  if (mins < 10) mins = '0' + mins;
 
	  let secs = date.getSeconds();
	  if (secs < 10) secs = '0' + secs;
 
	  let output = template
		 .replace('h', hours)
		 .replace('m', mins)
		 .replace('s', secs);
 
	  console.log(output);
	}
 
	this.stop = function() {
	  clearInterval(timer);
	};
 
	this.start = function() {
	  render();
	  timer = setInterval(render, 1000);
	};
 
 }*/
//? Вариант 1 МОЙ
class Clock {

	constructor({ template }) {
		this.template = template;

	}

	render() {
		let date = new Date();

		let hours = date.getHours();
		if (hours < 10) hours = '0' + hours;

		let mins = date.getMinutes();
		if (mins < 10) mins = '0' + mins;

		let secs = date.getSeconds();
		if (secs < 10) secs = '0' + secs;

		let output = this.template
			.replace('h', hours)
			.replace('m', mins)
			.replace('s', secs);

		console.log(output);
	}

	stop() {
		clearInterval(this.timer);
	};

	start() {
		this.render();
		this.timer = setInterval(this.render, 1000);
	};

}

// let clock = new Clock({ template: 'h:m:s' });

//* Учитывая список целых чисел и одно значение суммы, верните первые два значения (анализируйте слева) 
//*в порядке появления, которые в сумме образуют сумму.
//* Если имеется две или более пар с требуемой суммой, то решением является пара, 
//* второй элемент которой имеет наименьший индекс.
//? Вариант 1 МОЙ

function sumPairs(ints, s) {

	let result = {};
	let arrKeys = []

	outer:
	for (let [ind, item] of ints.entries()) {

		if (arrKeys.includes(item)) continue outer;
		arrKeys.push(item);

		for (let i = ++ind; i < ints.length; i++) {
			let sum = item + ints[i];
			if (sum == s) {
				result[i] = [item, ints[i]];
				arrKeys.push(ints[i])
				continue outer;
			}
		}
	}
	return Object.values(result)[0]
}

//? Вариант 2  НЕ мой

function sum_pairs(ints, s) {
	let seen = new Set();
	for (let i of ints) {
		if (seen.has(s - i)) return [s - i, i];
		seen.add(i);
	}
}

//* Напишите функцию sum, которая бы работала следующим образом:
//* sum(1)(2)(3) == 6; // 1 + 2 + 3
//* sum(0)(1)(2)(3)(4)(5) == 15
//? Вариант 1 МОЙ
function sum(a) {
	let result = a;

	function wrapper(b) {
		result += b;
		return wrapper;
	}

	wrapper.toString = function () {
		return result;
	}
	return wrapper;
}



//* Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая 
//*вызов в f не более одного раза в ms миллисекунд. Те вызовы, которые попадают в период «торможения»,
//* игнорируются.
//* Отличие от debounce – если проигнорированный вызов является последним во время «задержки»,
//* то он выполняется в конце.
//? Вариант 1 МОЙ
function f(x) {
	console.log(x);
}

function throttle(f, ms) {
	let call = true;
	function wrapper() {
		wrapper.calls.push(...arguments);
		if (!call) return;

		f.call(this, wrapper.calls.pop());
		call = false;

		setTimeout(() => {
			call = true;
			if (wrapper.calls.length > 0) {
				wrapper();
				wrapper.calls = []
			}
		}, ms)
	}
	wrapper.calls = [];
	return wrapper;
}

// let f1500 = throttle(f, 1500);

// f1500(1);
// f1500(2);
// f1500(3);
// f1500(4);
// f1500(5);
// setTimeout(() => f1500(8), 2000)
// setTimeout(() => f1500(9), 2200)

//* Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более 
//* одного раза в ms миллисекунд. Другими словами, когда мы вызываем debounce, это гарантирует, 
//* что все остальные вызовы будут игнорироваться в течение ms.
//? Вариант 1 МОЙ
function f(x) {
	console.log(x);
}

function debounce(f, ms) {
	let call = true;
	return function () {
		if (call) {
			call = false;
			setTimeout(() => call = true, ms);
			f.apply(this, arguments);
		}
	}
}
// f = debounce(f, 1000);
// f(2);// сработает
// setTimeout(() => f(3), 800);// не сработает
// setTimeout(() => f(5), 1500);// сработает

//*Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
//? Вариант 1 МОЙ
function f(x) {
	console.log(x);
}

function delay(func, ms) {
	return function () {
		return setTimeout(() => { func.apply(this, arguments) }, ms)
	}
}
// let f2000 = delay(f, 2000);
// f2000("test");

//* Создайте декоратор spy(func), который должен возвращать обёртку, 
//* которая сохраняет все вызовы функции в своём свойстве calls.
//* Каждый вызов должен сохраняться как массив аргументов.
//? Вариант 1 МОЙ
function work(a, b) {
	console.log(a + b); // произвольная функция или метод
}

function spy(func) {
	function spyFunc() {
		spyFunc.calls.push([...arguments]);
		return func.apply(this, arguments);
	}
	spyFunc.calls = [];
	return spyFunc;
}
// work = spy(work);
// work(2, 5);



//* Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.
//*Если объект salaries пустой, то нужно вернуть null.
//*Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
//? Вариант 1 МОЙ
let salaries = {
	"John": 100,
	"Pete": 300,
	"Mary": 250

};

function topSalary(obj) {
	let entries = Object.entries(obj);
	return (entries.length == 0) ? null :
		entries
			.sort(([nam1, val1], [nam2, val2]) => val1 - val2)
			.pop()
			.shift();
}

//* Если строка уже заканчивается числом, число должно быть увеличено на 1.
//* Если строка не заканчивается цифрой. число 1 должно быть добавлено к новой строке.
//* учитывать "000" перед числом при наличии
//? Вариант 1 МОЙ
function incrementString(strng) {
	let num = strng.replace(/\D/g, "");
	if (num === "") {
		return strng + 1;
	} else {
		let text = strng.replace(/\d/g, "");
		let end = `${+num + 1}`;
		return text + end.padStart(num.length, "0")
	}
}

//* Определите функцию, которая принимает два неотрицательных целых числа (a b) 
//*  ввиде строки и возвращает последнюю десятичную цифру a**b
//* Обратите внимание, чтоаааа такжебббможет быть очень большим! 
//? Вариант 1 МОЙ
var lastDigit = function (str1, str2) {
	if (str2 == 0) return 1;
	let lastNumBase = +str1.slice(-1);
	if (lastNumBase === 1 || lastNumBase === 5 || lastNumBase === 0) return lastNumBase;
	let restPow = Number(BigInt(str2) % BigInt(4));
	if (restPow !== 0) return +`${Math.pow(lastNumBase, restPow)}`.slice(-1);
	let evenOrOdd = (lastNumBase % 2 === 0) ? true : false;
	if (evenOrOdd) return 6;
	return 1;
}
//? Вариант 2  НЕ мой
var lastDigit = function (str1, str2) {
	return +str2 === 0 ? 1 : Math.pow(+str1.slice(-1), +str2.slice(-2) % 4 + 4) % 10
}

//* Напишите функцию, которая принимает неотрицательное целое число (секунды) 
//* в качестве входных данных и возвращает время в удобочитаемом формате ( HH:MM:SS)
//? Вариант 1 МОЙ
function humanReadable(seconds) {
	let data = new Date((seconds * 1000));
	let objData = {
		"hours": `${(data.getUTCDate() - 1) * 24 + (data.getUTCHours())}`.padStart(2, 0),
		"min": `${data.getMinutes()}`.padStart(2, 0),
		"sec": `${data.getSeconds()}`.padStart(2, 0),
		toString() {
			return `${this.hours}:${this.min}:${this.sec}`
		}
	};
	return objData.toString()
}


//? Вариант 2  НЕ мой
const humanReadable = sec => {
	let hours = Math.floor(sec / 3600);
	let minutes = Math.floor(sec % 3600 / 60);
	let seconds = Math.floor(sec % 3600 % 60);
	let result = `${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(seconds)}`
	return result;
}

const timeFormat = s => {
	if (s === 0) { return '00' }
	else if (s < 10) { return '0' + s }
	else { return s }
}

//* Создайте функцию, которая принимает строку и возвращает строку, зашифрованную с помощью Rot13. 
//* Если в строку включены числа или специальные символы, они должны быть возвращены как есть. 
//* Сдвинуты должны быть только буквы латинского/английского алфавита, как в оригинальной "реализации" Rot13.
//? Вариант 1 МОЙ
function rot13(message) {
	return message
		.split("")
		.map(item => {
			let code = item.charCodeAt(0);
			if (code >= 65 && code <= 90) {
				let codeNewUp = (code < 78) ? code + 13 : code - 13;
				return String.fromCharCode(codeNewUp);
			}
			if (code >= 97 && code <= 122) {
				let codeNewLower = (code < 110) ? code + 13 : code - 13;
				return String.fromCharCode(codeNewLower);
			}
			return item;
		})
		.join("")
}

//* написать функцию, которая возвращает, true/Trueесли аргумент является строковым десятичным 
//*представлением номера счастливого билета или false/Falseвсех остальных чисел.
//* Он должен выдавать ошибки для пустых строк или строк, которые не представляют десятичное число
//? Вариант 1 МОЙ
function luckCheck(ticket) {
	let arrTicket = ticket.split("");
	let midl = Math.floor(arrTicket.length / 2);
	let result = arrTicket.reduce((sum, item, ind) => {
		if (ind < midl) {
			sum.left += +item;
		} else if (ind < (arrTicket.length - ind)) {
			return sum
		} else {
			sum.right += +item;
		}
		return sum
	}, { "left": 0, "right": 0 });
	return result.left == result.right;
}

//* Напишите алгоритм, который берет массив и перемещает все нули в 
//*конец, сохраняя порядок остальных элементов.
//? Вариант 1 МОЙ
function moveZeros(arr) {
	return arr.sort(
		(a, b) => {
			if (a !== 0 && b !== 0) return 0;
			if (a === 0 && b !== 0) return 1;
			if (a !== 0 && b === 0) return -1;
		}
	)
}
//? Вариант 2  НЕ мой
function moveZeros(arr) {
	return arr.sort((a, b) => b === 0 ? -1 : 0);
}

//* развернуть массив не используя reverse() и код должен быть как можно короче, не более 28 символов.
//? Вариант 1 МОЙ
let weirdReverse = a => a.sort(n => 1);
// ещё вариант на 30 символов
let weirdRevers = a => [...a].map(a.pop, a);

//* Вам будет дано число, и вам нужно будет вернуть его в виде строки в расширенной форме .
//? Вариант 1 МОЙ
function expandedForm(num) {
	let numStr = String(num);
	let result = '';
	for (let i = 0; i < numStr.length; i++) {
		let curentNum = numStr[i];
		if (curentNum == '0') continue;

		for (let n = i; n < numStr.length - 1; n++) {
			curentNum += "0";
		}
		result = `${result} + ${curentNum}`
	}
	return result.slice(2).trim()
}

//* максимальная сумма диапазона
//? Вариант 1 МОЙ
function maxSum(arr, range) {
	return Math.max(...
		range.map(item => {
			let sum = 0;
			for (let i = item[0]; i <= item[1]; i++) {
				sum += arr[i]
			}
			return sum;
		})
	)
}

// console.log(maxSum(
// 	[1, -2, 3, 4, -5, -4, 3, 2, 1],
// 	[[1, 3],
// 	[0, 4],
// 	[6, 8]]
// ));


//* является ли число простым (с небольшой оптимизацией под большие числа) 
//? Вариант 1 МОЙ
function isPrime(num) {

	if (num <= 1) return false;
	if (num === 2 || num === 3) return true;
	if (num % 2 === 0) return false;

	for (let i = 3; i <= (num ** (1 / 2)); i++) {
		if ((num % i) === 0) return false;
		i++;
	}
	return true;
}


//* Панаграмма строка или нет?
//? Вариант 1 МОЙ
function isPangram(string) {
	return string
		.toLowerCase()
		.split('')
		.reduce((sum, item) => {
			if (item.charCodeAt(0) > 96 && item.charCodeAt(0) < 123 && sum.includes(item) == false) {
				sum.push(item)
			}
			return sum
		}, []).length == 26
}



//* Вам дан массив (список) strarrстрок и целое число k. Ваша задача — вернуть первую самую длинную строку, 
//* состоящую из k последовательных строк, взятых в массиве.
//? Вариант 1 МОЙ
function longestConsec(strarr, k) {
	return strarr
		.reduce((sum, _, index, arr) => {
			if (index <= (arr.length - k)) {
				let curentlength = 0;
				let curentResult = "";
				for (let i = 0; i < k; i++) {
					curentlength += arr[index + i].length;
					curentResult += arr[index + i];
				}
				if (curentlength > sum.length) {
					sum.length = curentlength;
					sum.result = curentResult;
				}
			}
			return sum
		}, { result: '', length: 0 })
		.result
}
let strarr = ["reew", "foling", "trashy"];
let k = 1;



//* Пример формата переданного в CSV:"1,2,3\n4,5,6\n7,8,9\n10,11,12"
//*  csvColumns("1,2,3\n4,5,6", [0, 1]) => "1,2\n4,5"
//? Вариант 1 МОЙ
function csvColumns(csv, indices) {
	return csv
		.replace(/\n/g, ',\n,')
		.split(',')
		.reduce((sum, item) => {
			if (item == '\n') {
				sum.index = -1;
				if (sum.result.length > 0) sum.result += '\n';
				return sum
			} else {
				sum.index += 1
			}
			if (indices.includes(sum.index)) {
				if (sum.result.indexOf('\n', sum.result.length - 1) == -1 && sum.result.length > 0) {
					sum.result += ","
				}
				sum.result = sum.result + item
			}
			return sum;
		}, { result: "", index: -1 })
		.result
}

//? переработнанный МОЙ с учетом инфы ниже
function csvColumns(csv, indices) {
	return csv
		.split('\n')
		.map(item => item
			.split(",")
			.filter((_, index) => indices.includes(index)))
		.join("\n")
		.trim()
}

//? Вариант 2  НЕ мой
function csvColumns(csv, indices) {
	return csv.split('\n')
		.map(row => row.split(',').filter((_, i) => indices.includes(i)).join(','))
		.join('\n')
		.trim();
}

//* Посчитать рукопожатия
//? Вариант 1 МОЙ
function getParticipants(handshakes) {

	let countHandshakes = (men) => (men <= 1) ? 0 : (men - 1) + countHandshakes(men - 1);

	let count = 0;
	let men = 0;

	do {
		men++;
		count = countHandshakes(men);
	} while (count < handshakes)

	return (handshakes == 0) ? handshakes : men;
}

//? Вариант 2  НЕ мой
function getParticipants(handshakes) {
	let farmers = 0
	while (handshakes > farmers * (farmers - 1) / 2) {
		farmers++
	}
	return farmers
}

//*Крысолов Легенда  Пример  ~O~O~O~OP~O~OO~имеет 2 глухих крысы
/*P= Крысолов
O~= Крыса идет налево
~O= Крыса идет вправо
*/
//? Вариант 1 МОЙ
var countDeafRats = function (town) {

	let result = 0;
	let start = town.indexOf('P');
	let arrTown = town.split("");

	arrTown
		.slice(start + 1)
		.reduce((sum, item) => {
			if (item == "O") {
				sum++
			} else if (item == "~") {
				sum--
			}
			if (sum < 0) result++;
			return sum
		}, 0);

	arrTown
		.slice(0, start)
		.reduceRight((sum, item) => {
			if (item == "O") {
				sum++
			} else if (item == "~") {
				sum--
			}
			if (sum < 0) result++;
			return sum
		}, 0);

	return result

}


//* написать функцию, printer_errorкоторая по заданной строке будет возвращать частоту ошибок 
//* принтера в виде строки Test.assertEquals(printerError(s), "3/56") 
//? Вариант 1 МОЙ
function printerError(s) {
	let erors = s.split('').reduce((sum, item) => {
		if (item > 'm') sum += item;
		return sum;
	}, '');
	return `${erors.length}/${s.length}`
}


//* Последовательность Трибоначчи
//? Вариант 1 МОЙ
function tribonacci(signature, n) {
	if (n < 4) return signature.filter((el, ind) => ind < n);

	let result = signature;

	for (let i = 4; i <= n; i++) {
		result.push(result[i - 4] + result[i - 3] + result[i - 2]);
	}
	return result;
}
//? переработнанный мой с учетом инфы ниже
function tribonacci(signature, n) {
	let result = signature;

	for (let i = 4; i <= n; i++) {
		result.push(result[i - 4] + result[i - 3] + result[i - 2]);
	}
	return result.splice(0, n);
}



//*Напишите функцию, которая составляет список строк, представляющих все способы 
//*балансировки nпар скобок
//balancedParens(2) => ["()()","(())"]
//? Вариант 1 МОЙ
//! не решил!!!!
//* 1. получаю все возможные комбинации 2. фильтрую верные и убираю дубликаты


//? Вариант 2  НЕ мой
function balancedParens(n, match = 0, str = '', res = []) {
	if (n) balancedParens(n - 1, match + 1, str + '(', res);
	if (match) balancedParens(n, match - 1, str + ')', res);
	if (!n && !match) res.push(str);
	return res;
}


//*Завершите функцию/метод (в зависимости от языка), чтобы вернуть true/ True, когда ее аргумент 
//*является массивом, который имеет те же структуры вложенности и ту же соответствующую длину
//* вложенных массивов, что и первый массив.

//? Вариант 1 МОЙ

Array.prototype.sameStructureAs = function (other) {
	if (other.length != this.length) return false;

	for (let i = 0; i < this.length; i++) {

		if (Array.isArray(this[i]) == false && Array.isArray(other[i]) == false) {
			continue;
		} else if (Array.isArray(this[i]) == Array.isArray(other[i])) {
			return this[i].sameStructureAs(other[i])
		} else return false;
	}
	return true
};

//? Вариант 2  НЕ мой
Array.prototype.sameStructureAs = function (other) {
	return (this.length === other.length) ? this.every(function (el, i) {
		return Array.isArray(el) ? el.sameStructureAs(other[i]) : true;
	}) : false;
};

//*Завершите решение так, чтобы оно принимало список целых чисел в порядке возрастания
//* и возвращало правильно отформатированную строку в формате диапазона.
//* [-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])
//*  "-6,-3-1,3-5,7-11,14,15,17-20")
//? Вариант 1 МОЙ
function solution(list) {

	return list
		.reduce((sum, item, index, arr) => {
			if (item - arr[index - 1] == 1) {
				sum[sum.length - 1].push(item)
			} else sum.push([item]);
			return sum
		}, [])
		.map(row => {
			if (row.length > 2) {
				return `${row[0]}-${row[row.length - 1]}`
			} else return row
		})
		.join(',')
}
//? Вариант 2  НЕ мой 
solution = (list) => list.reduce((acc, curr, i) => {
	if (i == 0) return curr.toString();
	if (list[i - 1] == curr - 1 && list[i + 1] == curr + 1) return acc;
	if (list[i - 2] == curr - 2 && list[i - 1] == curr - 1) return acc + "-" + curr;
	return acc + "," + curr;
});

//*Есть секретная строка, которая вам неизвестна. Учитывая набор 
//*случайных троек из строки, восстановить исходную строку.
//? Вариант 1 МОЙ
function firstLetter(arr) { // получаем первую букву
	return arr
		.map(item => item[0])
		.filter(first => {
			let pos = arr.reduce((index, row) => {
				let _ind = 0
				if (row.includes(first)) {
					_ind = row.indexOf(first);
				}
				return index += _ind;
			}, 0)
			return pos == 0;
		})[0];
}

function nextLetters(Letter, arr, word) {
	let selectLetter = arr      //* получаем буквы идущие сразу же за Letter 
		.filter(row => row.includes(Letter))
		.map(item => {
			if (item.indexOf(Letter) != 3) {
				return item[item.indexOf(Letter) + 1]
			}
		})
		.filter((_l, _i, _a) => _i == _a.indexOf(_l) && _l !== undefined)

	if (selectLetter.length == 1) {
		return selectLetter
	} else {
		return selectLetter.filter(item => {
			return 0 == checkLetter(item, arr, word)
		})
	}

	function checkLetter(char, arr, word) { //* 0 -ок, если > 0, буква не подходит (есть буквы перед ней, которых нет в массиве результатов word)
		return arr
			.filter(row => row.includes(char) && row.indexOf(char) > 0)
			.map(item => item.slice(0, item.indexOf(char)))
			.map(item => {
				let num = item.reduce((sum, item) => {
					if (!word.includes(item)) sum++;
					return sum;
				}, 0);
				return num;
			})
			.reduce((sum, item) => sum += item) //*на выходе число 0 или >
	}
}

function recoverSecret(triplets) {
	let word = [];
	let first = firstLetter(triplets);
	word = word.concat(first);

	let next = nextLetters(first, triplets, word);

	while (next.length) {
		word = word.concat(next);
		next = nextLetters(...next, triplets, word);
	}
	return word.join('');
}

let triplets1 = [
	['w', 'h', 'i'],
	['t', 's', 'u'],
	['a', 't', 's'],
	['w', 'h', 's'],
	['h', 'a', 'p'],
	['t', 'i', 's'],
	['t', 'u', 'p']
]


//? Вариант 2  НЕ мой
var recoverSecret = function (triplets) {
	for (var [first] of triplets) {
		if (triplets.every(tuple => tuple.indexOf(first) <= 0)) {
			triplets.filter(([item]) => item == first).forEach(tuple => tuple.shift());
			return first + recoverSecret(triplets.filter(tuple => tuple.length > 0));
		}
	}
	return '';
}


//* создать все перестановки непустой входной строки и удалить дубликаты, если они есть.
//*  'ab' = return ['ab', 'ba']
//? Вариант 1 МОЙ
function permutations(list) {

	let lst = Array.from(list);
	let result = [];

	if (lst.length === 1) return lst;

	lst.forEach((item, ind) => {

		let temp = permutations(lst.filter((subItem, z) => {
			if (z != ind) return subItem;
		}));
		temp = temp.map(_set => [item, ..._set]);
		result = [...result, ...temp]
	});
	return result
		.map(item => item.join(''))
		.filter((item, ind, arr) => arr.indexOf(item) == ind)
}


//? Вариант 2  НЕ мой
//!принимает массив
function permutations(arr) {
	let perms = arr.reduce((acc, element) => {
		let updatedPerms = new Set();
		acc.forEach((word) => {
			for (let i = 0; i <= word.length; i++) {
				updatedPerms.add(word.substring(0, i) + element + word.substring(i));
			}
		});
		return updatedPerms;
	}, new Set(['']));
	return [...perms];
}



//* Общие знаменатели для массива чисел
//? Вариант 1 МОЙ

function nod(a, b) {
	if (a == b) {
		return a;
	} else {
		return nod((Math.max(a, b) - Math.min(a, b)), Math.min(a, b))
	}
}

function nok(a, b) {
	return (a * b) / nod(a, b);
}

function multiNok(...arg) {
	let n = nok(arg[0], arg[1]);
	for (let i = 1; i <= arg.length - 2; i++) {
		n = nok(n, arg[i + 1]);
	}
	return n;
}

function convertFrac(lst) {

	let arr = lst.map((item) => {
		if (item[0] == 1) {
			return item;
		} else {
			let x = nod(item[0], item[1]);
			return [item[0] / x, item[1] / x];
		}
	})

	let nokList = multiNok(...arr.reduce((list, item) => {
		list.push(item[1]);
		return list
	}, []))

	return arr
		.map(item => [nokList / item[1] * item[0], nokList])
		.reduce((str, item) => str += `(${item[0]},${item[1]})`, '')
}

//? переработнанный мой с учетом инфы ниже
function nod(a, b) {
	if (a == b) {
		return a;
	} else {
		return nod((Math.max(a, b) - Math.min(a, b)), Math.min(a, b))
	}
}

function nok(a, b) {
	return (a * b) / nod(a, b);
}

function convertFrac(lst) {

	let arr = lst.map((item) => {
		if (item[0] == 1) {
			return item;
		} else {
			let x = nod(item[0], item[1]);
			return [item[0] / x, item[1] / x];
		}
	})

	let nokList = arr.reduce((nk, item) => {
		return nok(nk, item[1])
	}, 1)

	return arr
		.map(item => [nokList / item[1] * item[0], nokList])
		.reduce((str, item) => str += `(${item[0]},${item[1]})`, '')
}


//? Вариант 2  НЕ мой
function gcd(a, b) {
	return a < b ? gcd(b, a) : b == 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
	return a * b / gcd(a, b);
}

function convertFrac(lst) {
	var denom = lst.reduce(function (p, c) {
		return lcm(p, c[1]);
	}, 1);
	return lst.map(function (v) {
		return "(" + (v[0] * denom / v[1]) + "," + denom + ")";
	}).join("");
}

//* Меморизированная фибоначи рукурсия
//? Вариант 1 МОЙ
function fibonacci(n) {
	if (n == 0 || n == 1)
		return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

function caching(func) {
	let cach = {};

	return function (arg) {
		if (cach[arg]) {
			return cach[arg]
		} else {
			cach[arg] = func(arg);
			return cach[arg]
		}
	}
}

fibonacci = caching(fibonacci);


//*В этом ката вы напишете функцию, которая возвращает позиции и значения «пиков» 
//*(или локальных максимумов) числового массива.
//? Вариант 1 МОЙ
function pickPeaks(arr) {

	return arr.reduce((sum, num, i, arr) => {

		if (arr[i - 1] < num && num > arr[i + 1]) {
			sum.pos.push(i);
			sum.peaks.push(num);

		} else if (arr[i - 1] < num && num == arr[i + 1]) {
			let pos = i + 1;
			while (num == arr[pos]) pos++;
			if (num > arr[pos]) {
				sum.pos.push(i);
				sum.peaks.push(num);
			}
		}
		return sum;
	}, { pos: [], peaks: [] })
}

//* Калькулятор чисел для больших и малых
//? Вариант 1 МОЙ
function add(a, b) {

	let arrA = [...a].reverse();
	let arrB = [...b].reverse();

	let arrBiger = (arrA.length > arrB.length) ? arrA : arrB;
	let arrLitl = (arrA.length > arrB.length) ? arrB : arrA;

	let one = 0;

	return arrBiger.reduce((sumStr, item, index, arr) => {

		let litl = (arrLitl[index] === undefined) ? 0 : arrLitl[index];

		let sum = +item + +litl + one;

		if (one > 0) one--;

		if (sum < 10) {
			return sumStr + sum;

		} else if (sum >= 10 && index == arr.length - 1) {
			return sumStr + sum.toString().split('').reverse().join('')

		} else {
			one++;
			return sumStr + sum.toString().split('')[1]
		}

	}, "").split('').reverse().join('');
}


//*Завершите функцию scramble(str1, str2), которая возвращает, true если часть str1 символов  
//* можно переставить, чтобы они соответствовали str2, иначе возвращает false.
//? Вариант 1 МОЙ
function scramble(str1, str2) {

	function obgStr(str) {
		let obj = {};
		for (const leter of str) {
			if (obj[leter] === undefined) {
				let reg = new RegExp(`${leter}`, 'g');
				obj[leter] = str.match(reg).length;
			}
		}
		return obj;
	}

	let list = obgStr(str1);
	let word = obgStr(str2);
	let risult = false;

	outer:
	while (!risult) {
		for (let key in word) {
			if (list[key] == undefined || word[key] > list[key]) break outer;
		}
		risult = true;
	}
	return risult;
}

//? Вариант 2  НЕ мой
function scramble(str1, str2) {
	let occurences = str1.split("").reduce((arr, cur) => { arr[cur] ? arr[cur]++ : arr[cur] = 1; return arr; }, {});
	return str2.split("").every((character) => --occurences[character] >= 0);
}

//*Улитка Учитывая n x nмассив, вернуть элементы массива, расположенные от самых внешних 
//*элементов до среднего элемента, перемещаясь по часовой стрелке.
//? Вариант 1 МОЙ
let snaill = function (array) {

	let result = [];
	let rest = array;

	function top(rest) {
		result = result.concat(
			...rest.splice(0, 1)
		)
	}
	function right(rest) {
		rest.forEach(
			i => result = result.concat(
				i.splice(-1, 1)
			)
		)
	}
	function down(rest) {
		result = result.concat(
			...rest
				.splice(-1, 1)
				.map(i => i.reverse())
		)
	}
	function left(rest) {
		rest
			.reverse()
			.forEach(
				i => result = result.concat(
					i.splice(0, 1)
				)
			)
		rest.reverse();
	}
	while (rest.length > 0) {
		if (rest.length > 0) top(rest);
		if (rest.length > 0) right(rest);
		if (rest.length > 0) down(rest);
		if (rest.length > 0) left(rest);
	}
	return result;
}



//? переработнанный мой с учетом инфы ниже
const ssnail = function (array) {

	let result = [];
	let rest = array;

	while (array.length) {

		result = result.concat(
			...rest.shift(),
			...rest.map(i => i.pop())
		)

		rest
			.reverse()
			.map(i => i.reverse());
	}
	return result;
}


//? Вариант 2  НЕ мой
const snail = function (array) {
	const list = [];

	while (array.length) {
		list.push(...array.shift(), ...array.map(row => row.pop()));

		array.reverse().map(row => row.reverse());
	}

	return list;
}

//*Завершите решение так, чтобы оно удаляло весь текст, следующий за любым из переданных маркеров 
//*комментариев. Все пробелы в конце строки также должны быть удалены.
//? Вариант 1 МОЙ
function solution(input, markers) {
	let arrStr = input.split('\n');
	let risult = [];

	outer:
	for (let str of arrStr) {
		for (let m of markers) {
			if (str.includes(m)) {
				let back = str.split(m);
				risult.push(back[0].trim());
				continue outer;
			}
		}
		risult.push(str.trim())
	}
	return risult.join('\n')

};

//? переработнанный мой с учетом инфы ниже

function solution(input, markers) {
	let arrStr = input.split('\n');
	let risult = [];

	outer:
	for (let str of arrStr) {
		for (let m of markers) {
			if (str.includes(m)) {

				risult.push(str.split(m)[0].trim());
				continue outer;
			}
		}
		risult.push(str.trim())
	}
	return risult.join('\n')

};


//? Вариант 2  НЕ мой
function solution(input, markers) {
	return input.split('\n').map(
		line => markers.reduce(
			(line, marker) => line.split(marker)[0].trim(), line
		)
	).join('\n')
}


//*Дан массив целых чисел, найдите то, которое встречается нечетное количество раз.
//*Всегда будет только одно целое число, которое встречается нечетное количество раз.
// [1,1,2]должен вернуть 2, потому что это происходит 1 раз (что нечетно).
// [0,1,0,1,0]должен вернуть 0, потому что он встречается 3 раза (что нечетно).
//? Вариант 1 МОЙ
function findOdd(A) {

	return Number(
		A.map((item, index, arr) => {
			if (arr.filter((el) => el == item).length % 2 !== 0) {
				return item
			}
		})
			.filter((el, ind, ar) => el !== undefined
				&& ind == ar.indexOf(el))
	)
}

//? переработнанный мой с учетом инфы ниже
function findOdd(A) {

	return A
		.find((item, index, arr) => {
			if (arr.filter((el) => el == item).length % 2 !== 0) return item
		})
}


//? Вариант 2  НЕ мой

function findOdd(arr) {
	return arr.find((item, index) => arr.filter(el => el == item).length % 2)
}


//*
/*преобразовать строку в новую строку, где каждый символ в новой строке соответствует тому, 
"("если этот символ появляется только один раз в исходной строке или ")"если этот символ появляется
 в исходной строке более одного раза. Игнорировать заглавные буквы при определении, 
 является ли символ дубликатом.*/
//? Вариант 1 МОЙ
function duplicateEncode(word) {
	word = word.toLowerCase();
	let result = "";
	for (let i = 0; i < word.length; i++) {
		let pos = 0;
		let count = 0;
		while (true) {
			let foundPos = word.indexOf(word[i], pos);
			if (foundPos == -1) {
				(count > 1) ? result += ')' : result += '(';
				break;
			}
			pos = foundPos + 1;
			count += 1;
		}
	}
	return result;
}
//? Вариант 2  НЕ МОЁ

function duplicateEncode(word) {
	return word
		.toLowerCase()
		.split('')
		.map(function (a, i, w) {
			return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')'
		})
		.join('');
}




//*Напишите функцию проверяющая скобки
//? Вариант 1 МОЙ
function validParentheses(parens) {
	let arrParens = parens.split('');
	outer:
	while (true) {
		if (arrParens[0] == ')' || arrParens[arrParens.length - 1] == '(') break;
		if (arrParens.length == 0) return true;

		for (let i = 1; i < arrParens.length; i++) {
			if (i !== arrParens.indexOf(arrParens[i])) continue;
			arrParens.splice(--i, 2);
			continue outer;
		}
		break;
	}
	return false
}

//? Вариант 2 МОЙ НЕ МОЁ
function validParentheses(parens) {
	var n = 0;
	for (var i = 0; i < parens.length; i++) {
		if (parens[i] == '(') n++;
		if (parens[i] == ')') n--;
		if (n < 0) return false;
	}
	return n == 0;
}

//? Вариант 3 НЕ МОЁ
function validParentheses(parens) {
	var indent = 0;
	for (var i = 0; i < parens.length && indent >= 0; i++) {
		indent += (parens[i] == '(') ? 1 : -1;
	}
	return (indent == 0);
}

//*
/*Напишите функцию, которая найдет все анаграммы слова из списка. Вам будет дано два входа слово и 
массив со словами. Вы должны вернуть массив всех анаграмм или пустой массив, если их нет.*/
//? Вариант 2  МОЙ

function anagrams(word, words) {
	let result = [];
	words.forEach(item => {
		if (word.length != item.length) return;
		if (word.split('').sort().join('') == item.split('').sort().join('')) result.push(item);
	});
	return result;
}


//? Вариант 1  МОЙ
function anagrams(word, words) {

	let result = [];
	let length = word.length;

	outer:
	for (let i = 0; i < words.length; i++) {

		if (word.length != words[i].length) continue;

		let maybe = Array.from(words[i]);
		let mask = Array.from(word);

		for (let n = 0; n < length; n++) {

			let index = maybe.indexOf(mask[0]);
			if (index === -1) continue outer;
			mask.splice(0, 1);
			maybe.splice(index, 1);

		}
		result.push(words[i])
	}
	return result;
}

//*
/*Создайте функцию, принимающую положительное целое число в качестве параметра и
возвращающую строку, содержащую римское числовое представление этого целого числа.*/

function solution(number) {

	let strnumber = String(number).split('');

	let numberRim = [
		['I', 'V', 'X'],
		['X', 'L', 'C'],
		['C', 'D', 'M'],
		['M']
	];

	let rimnumberer = [];

	strnumber.forEach((item, index, arstr) => {
		addResult(item, numberRim[arstr.length - ++index], rimnumberer);
	});

	function addResult(number, arr, result) {
		let first = 1;
		if (number == 0) {
			return
		} else if (number > 5 && number < 9) {
			result.push(arr[1]);
			while ((number - 4) - first++) result.push(arr[0]);
		} else if (number >= 1 && number < 4) {
			while ((+number + 1) - first++) result.push(arr[0]);
		} else if (number == 4) {
			result.push(arr[0]);
			result.push(arr[1]);
		} else if (number == 9) {
			result.push(arr[0]);
			result.push(arr[2]);
		} else result.push(arr[1]);

	}
	return rimnumberer.join('');
}
//* не моё решение
function solution(number) {
	// convert the number to a roman numeral
	let roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
	let ans = '';

	for (let key in roman) {
		while (number >= roman[key]) {
			ans = ans + key;
			number = number - roman[key];
		}
	}
	return ans;
}





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
result
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

//*перебор вариантов рекурсия РАЗНЫХ ЗАНЧЕНИЙ
//*входящее значение МАССИВ

function pern(lst) {
	//let lst = Array.from(lsttt);//* либо деламем массив

	let result = [];
	if (lst.length === 1) return lst;

	lst.forEach(item => {

		let temp = pern(lst.filter(subItem => subItem != item));
		temp = temp.map(_set => {
			return [item, ..._set]
		});
		result = [...result, ...temp]
	});

	return result
}
//*перебор вариантов рекурсия ЗАНЧЕНИЯ могут быть ОДИНАКОВЫМИ
//*входящее значение МАССИВ
function pern(lst) {
	let result = []

	if (lst.length === 1) return [lst];

	lst.forEach((item, ind) => {

		let temp = pern(lst.filter((subItem, z) => {
			if (z != ind) return subItem;
		}));
		temp = temp.map(_set => [item, ..._set]);
		result = [...result, ...temp]
	});

	return result
}

//*Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
// *После этого должен работать такой код:

// function f() {
//   alert("Hello!");
// }

// f.defer(1000); // выведет "Hello!" через 1 секунду*/


Function.prototype.defer = function (ms) {

	setTimeout(this, ms);
}

//* Напишите функцию sum, которая бы работала следующим образом:
// *   sum(1)(2)(3) == 6; // 1 + 2 + 3

function sum(a) {

	let allSum = a;

	function func(b) {
		allSum += b;
		return func;
	}

	func.toString = function () {
		return allSum;
	}

	return func;

}
//alert(sum(1)(2)(3));

//* мы вызываем debounce, это гарантирует, что все остальные вызовы будут
//*  игнорироваться в течение ms.

function log(x) {
	console.log(x)
}

function debounce(func, ms) {

	let timer = true;

	return function () {

		if (!timer) return;
		func.apply(this, arguments);
		timer = false;
		setTimeout(() => timer = true, ms);
	}
}
let func = debounce(log, 2000);

// func(3);
// func(4);
// setTimeout(() => func(5), 2500) 


//* Тормозящий (throttling) декоратор 
//*Отличие от debounce – если проигнорированный вызов является последним во 
//*время «задержки», то он выполняется в конце.

function throttle(func, ms) {

	let value = 0;
	let timer = true;

	function wrapper() {

		value = arguments;

		if (!timer) return;

		func.apply(this, arguments);
		timer = false;


		setTimeout(() => {
			timer = true;
			if (value) {
				wrapper.apply(this, value);
				value = null;
			}
		}, ms);
	}

	return wrapper;
}
let f2000 = throttle(log, 2000);

// f2000(2);
// f2000(3);
// f2000(4);
// f2000(5);
// f2000(6);







