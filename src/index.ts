var solution = function(firstArray:number[], secondArray:number[]) {

    let res:number = firstArray.reduce((sum: number, it: number, ind: number) => {
        return sum + (it - secondArray[ind])**2
    }, 0)/firstArray.length

    console.log(res)

}

solution([1,2,3],[4,5,6])