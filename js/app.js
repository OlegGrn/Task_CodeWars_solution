"use strict";

Array.prototype.sameStructureAs = function (other) {

	return this.length == other.length


};


// should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] ); 

console.log([1, [1, 1]].sameStructureAs([2, [2, 2]]));


// should return false 
//  [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
//  [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] ); 


console.log([1, [1, 1]].sameStructureAs([[2], 2]));