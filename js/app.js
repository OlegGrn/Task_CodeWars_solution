"use strict";

function work(a, b) {

	console.log(a + b);
}



function spy(func) {

	let calls = [];


	return function () {

		let one = [].join.call(arguments).split(',');
		calls.push(one);

		console.log(calls);

		return func(...arguments)
	}
}

work = spy(work);

work(2, 3);
work(1, 2);
work(1, 2);

console.log(work.calls);


// for (let args of work.calls) {
// 	alert('call:' + args.join()); // "call:1,2", "call:4,5"
// }


