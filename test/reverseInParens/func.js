// 1.


function reverseInParens(text) {



    let arrStr = splitStr(text)
    console.log(arrStr)

    return arrStr
        .map(item => replaceStr(item))
        .join("")



    /*return text.replace(/\((.*)\)/, (match, p1) => {
        console.log(match)

        let revP1 = reverseStr(p1)
        if (!/[()]/.test(p1)) {
            return "(" + revP1 + ")"
        } else {
            return "(" + reverseInParens(revP1) + ")"
        }
    })*/


}

function replaceStr(text){
    console.log(text)
    return text.replace(/\((.*)\)/, (match, p1) => {

        let revP1 = reverseStr(p1)
        if (!/[()]/.test(p1)) {
            return "(" + revP1 + ")"
        } else {
            return "(" + replaceStr(revP1) + ")"
        }
    })
}


function reverseStr(str) {
    let result = "";
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i] === "("
            ? ")"
            : str[i] === ")"
                ? "("
                : str[i]
    }
    return result
}

function splitStr(str){
    let flag = false
    let result = []
    let count = 0;
    let start = 0;

    for (let i = 0; i < str.length; i++){
        if(str[i] === "("){
            flag = true
            count++
            start = i - 1

        } else if(str[i] === ")" && flag){
            count--
            if(count === 0){
                result.push( str.slice(start, i +1))
                start = i + 1
                flag = false
            }
        } else if (!flag && count === 0){
            result.push(str[i])
        }
    }
    return result
}