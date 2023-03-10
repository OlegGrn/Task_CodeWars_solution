function toCamelCase(str: string): string {
    let count: number;
    return str.replace(/./g,
        (char: string, ind: number) => {
            if (char === "-" || char === "_") {
                count = ind + 1;
                return ""
            } else if (ind === count) {
                return char.toUpperCase()
            } else {
                return char
            }
        })
}


console.log(
    toCamelCase("the_stealth-warrior")
)


