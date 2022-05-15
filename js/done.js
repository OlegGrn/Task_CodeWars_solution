
//*
//? Вариант 1 МОЙ



//? переработнанный мой с учетом инфы ниже


//? Вариант 2  НЕ мой

//*

//? Вариант 1 МОЙ



//? переработнанный мой с учетом инфы ниже


//? Вариант 2  НЕ мой

//*
//? Вариант 1 МОЙ



//? переработнанный мой с учетом инфы ниже


//? Вариант 2  НЕ мой

//*Завершите функцию/метод (в зависимости от языка), чтобы вернуть true/ True, когда ее аргумент 
//*является массивом, который имеет те же структуры вложенности и ту же соответствующую длину
//* вложенных массивов, что и первый массив.
//? Вариант 1 МОЙ



//? переработнанный мой с учетом инфы ниже


//? Вариант 2  НЕ мой

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
//? переработнанный мой с учетом инфы ниже


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


//? переработнанный мой с учетом инфы ниже


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

//? переработнанный мой с учетом инфы ниже

//? Вариант 2  НЕ мой

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
//? переработнанный мой с учетом инфы ниже
//? Вариант 2  НЕ мой

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



//? переработнанный мой с учетом инфы ниже


//? Вариант 2  НЕ мой

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



//? переработнанный мой с учетом инфы ниже


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
// не моё решение
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







