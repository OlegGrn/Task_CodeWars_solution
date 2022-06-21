"use strict";


function solution(str, ending) {


	return (ending === "") ? true : str.split(ending).includes("", -1)
}








console.log(solution('abc', 'b'));


