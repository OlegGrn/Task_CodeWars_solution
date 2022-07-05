"use strict";

//let weirdReverse = a => a.reverse()
//weirdReverse=a=>a.map((_,i,b)=>b[b.length-++i])

let weirdReverse = a => [...a].map(a.pop, a);

console.log(weirdReverse([1, 2, 3, 4, 5]));








