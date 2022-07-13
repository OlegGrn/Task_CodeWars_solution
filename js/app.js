"use strict";


function humanReadable(seconds) {
	let data = new Date((seconds * 1000));
	let objData = {
		"hours": `${(data.getUTCDate() - 1) * 24 + (data.getUTCHours())}`.padStart(2, 0),
		"min": `${data.getMinutes()}`.padStart(2, 0),
		"sec": `${data.getSeconds()}`.padStart(2, 0),
	}
	return `${objData.hours}:${objData.min}:${objData.sec}`
}


console.log(humanReadable(359999));
// '00:01:30' часы мин сек

// Wed Jul 13 2022 22:25:34 GMT+0200 (Восточная Европа, стандартное время)
// str.padStart(targetLength [, padString])

//let arrData = [((data.getUTCDate() - 1) * 24 + (data.getUTCHours())), (data.getMinutes()), (data.getSeconds())];
	//console.log(arrData);








