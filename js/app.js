"use strict";

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



console.log(luckCheck('6363'));








