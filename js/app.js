"use strict";

let user = {
	name: "Oleg",
	lastName: "Grudin",
	hello(phrase) {
		console.log(`${phrase} ${this.name} ${this.lastName}`)
	}
}

// function hello(phrase) {
// 	console.log(`${phrase} ${this.name} ${this.lastName}`)
// }


//user.hello("Hello");

let myHello = user.hello.bind(user);
myHello("Hay");

setTimeout(() => {
	myHello("else Hay")
}, 1000)























