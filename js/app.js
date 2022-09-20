"use strict";


function work(a, b) {
	console.log(a + b);
	//work.calls.push([...arguments])

}
//work.calls = [];

function spy(func) {

	function wrapper() {
		wrapper.calls.push([...arguments]);
		func.apply(this, arguments)
	}

	wrapper.calls = []
	return wrapper;

}










work = spy(work);
work(1, 2); // 3
work(4, 5); // 9
console.log(work.calls);
console.log(work);

// for (let args of work.calls) {
// 	console.log('call:' + args.join()); // "call:1,2", "call:4,5"
// }