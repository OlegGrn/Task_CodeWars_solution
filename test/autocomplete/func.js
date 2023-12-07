function autocomplete(input, dictionary) {
    const inpt = input.replace(/[^A-Za-z]/g, "");
    const regexp = new RegExp(`^${inpt}`)
    return dictionary.filter((item) => {
        if (regexp.test(item) && inpt !== "") return item
    }).filter((item, ind) => ind < 5)
}