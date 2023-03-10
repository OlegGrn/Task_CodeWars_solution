function findMatchedByPattern(pattern: string) {

    return function (word: string): boolean {

        let count: number = 0;

        let test = word.replace(/\w/g,
            char => {
                if (pattern.slice(count).includes(char)) {
                    count++;
                    return char
                } else {
                    return ""
                }
            })

        return test === pattern
    }
}


let predicate = findMatchedByPattern("bmb")

console.log(
    predicate("bomb")
)

/*
kkk     kiln      false

bmb       bomb      true
          babyboom  false

*/

