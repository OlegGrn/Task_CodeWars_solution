
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



