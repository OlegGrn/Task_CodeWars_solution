function reverseInParens(text) {

    return text.replace(/\((.*)\)/, (match, p1) => {
        console.log("match = " + match)

        if (!/[()]/.test(p1)) {
            return reverseStr(match)
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
    console.log("reverseStr result = " + result)
    return result
}