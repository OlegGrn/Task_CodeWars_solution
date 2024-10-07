function digitwiseAddition(N, K) {

   /* let strN = N.toString();
    while (K > 0) {
        // console.log(strN)
        strN = plusOne2(strN)
        K--
    }

    return strN.length*/

    let num =  testing(N,K);
    console.log(num)
    return num

}


function plusOne(str) {
    return str
        .split("")
        .reduce((str, i) => str + (+i + 1), "")
}

function plusOne2(str) {
    let result = ""
    for (let char of str) {
        result += +char + 1
    }
    return result
}

function testing(N, K) {

    let rest = K % 10;
    console.log(rest)

    let lengthStr = plusOne3(N.toString(), rest).length
    console.log(lengthStr)

    let num = K / 10;

    let powNum = num < 1? 1: Math.ceil(num);
    console.log(powNum)

    return Math.pow(lengthStr, powNum)
}

function plusOne3(str, rest) {
    return str
        .split("")
        .reduce((str, i) => str + (+i + rest), "")
}




