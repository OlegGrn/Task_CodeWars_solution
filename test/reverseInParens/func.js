function reverseInParens(text) {

    return text.replace(/\((.*)\)/, (match, p1) => {
        console.log(match)
        console.log(p1)


    })


}