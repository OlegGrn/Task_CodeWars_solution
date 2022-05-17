"use strict";

Array.prototype.sameStructureAs = function (other) {

	if (
		Array.isArray(this) &&
		Array.isArray(other) &&
		this.every(item => Array.isArray(item) == false) &&
		other.every(item => Array.isArray(item) == false)
	) return this.length == other.length

	outer:
	for (let i = 0; i < Math.max(other.length, this.length); i++) {
		if (
			!Array.isArray(this[i]) &&
			!Array.isArray(other[i])
		) { continue }
		else if (
			(Array.isArray(this[i]) && !Array.isArray(other[i])) ||
			(!Array.isArray(this[i]) && Array.isArray(other[i])) ||
			other[i] === undefined ||
			this[i] === undefined

		) { break outer }

		else return this[i].sameStructureAs(other[i]);
	}
	return false;
};


// should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] ); 

console.log([2, [1, 1], [1, 2]].sameStructureAs([3, [2, 1], [2, 2], 2]));


// should return false 
//  [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
//  [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] ); 


console.log([1, [1, 1]].sameStructureAs([[2], 2]));