let voc = ["ace", "acd", "abd"]
let spe = "a**? *c*. **e,"

function translate11(speech: string, vocabulary: string[]) {
    let restVoc: string[] = vocabulary;
    /*let arrSp = speech
        .split(" ")
        .map(spe => {
           let test = spe.match(/([?.,!])?([^?.,!]+)([?.,!])?/);
            console.log(test)
            let regTes = new RegExp(test[2].replace(/\*!/g, "\\w"))
            console.log(regTes);
            let pos: number = restVoc.findIndex(item => item.match(regTes))
            console.log(pos)
            restVoc.splice(pos, 1)
        })*/}


function translate(speech: string, vocabulary: string[]) {

    console.log(speech.match(/[\w\*]*\*[\w\*]*/g));

    while (speech.includes('*')) {
        console.log(speech)
        speech = speech.replace(/[\w\*]*\*[\w\*]*/g, s => {
            console.log(s)
            let r = new RegExp(`^${s.replace(/\*/g, '.')}$`);
            console.log(r)
            let l = vocabulary.filter(x => r.test(x));

            if (l.length > 1) return s
            vocabulary = vocabulary.filter(x => x !== l[0]);
            return l[0];
        });
    }

    console.log(speech.match(/[\w\*]*\*[\w\*]*/g))
    return speech
}

console.log(translate(spe, voc))