function wordsToObject(input) {


    let result = input.replace(/(.+?) (.+?)((\s)|($))/g, (...match) => {
        return `{name : '${match[1]}', id : '${match[2]}'}${match[4] ? ', ' : ""}`
    })

    return `[${result}]`

}