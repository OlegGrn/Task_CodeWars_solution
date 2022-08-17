"use strict";

let user = {
	firstName: "Вася",
	sayHi() {
		console.log(`Привет, ${this.firstName}!`);
	}
};
let sayHiUser = user.sayHi.bind(user);
user = {};



setTimeout(sayHiUser, 1000)









console.log(

);














