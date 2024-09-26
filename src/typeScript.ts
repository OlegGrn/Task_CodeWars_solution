
function solution(str: string) {

    return (str.match(/\w{1,2}/g)?.map(i => i.length === 2? i: i+"_") || [])

}

console.log(solution(""))