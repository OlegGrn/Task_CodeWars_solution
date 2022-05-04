"use strict";

function pickPeaks(arr) {

	return arr.reduce((sum, num, i, arr) => {

	   if (arr[--i] < num) {
			if ( num == arr[ ++i]) {
				let pos = i;
				while (num == arr[pos]) pos++;
				sum.pos.push(i);
				sum.peaks.push(num);			

			}
			
		}		 
			
		return sum;	 	
	}, {pos: [], peaks: []})

	
// 	if (item > arr[index - 1] && item > arr[index + 1]) {
// 		result.pos.push(index);	  
// 		result.peaks.push(item);		     
// } else if (item > arr[index - 1] && item == arr[index + 1]) {
// 	let pos = index + 1;
// 	while(item == arr[pos]) {
// 		pos++;
// 	}
	
	
// }
	






	//return risult;
}


let x = [1,2,3,6,4,1,2,3,2,1]; // {pos:[2], peaks:[3]});
//[1,2,3,6,4,1,2,3,2,1]), {pos:[3,7], peaks:[6,3]});
console.log(pickPeaks(x));


// if (prev < item && item > next) {
// 	risult.pos.push(index);
// 	risult.peaks.push(item);
// } else if (prev < item && item == next) {
	

// 	console.log(folmax);
// 	console.log(folmin);

// }

// outer:
// 	for (let index = 0; index < arr.length - 1; index++) {
// 		const item = arr[index];
// 		let prev = arr[index - 1];
// 		let next = arr[index + 1];
// 	}






