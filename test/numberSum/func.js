function numberSum(arr) {
    return arr.reduce((sum, a, i, ar) => {
        for (let it = ++i; it < ar.length; it++) {
            sum += +(a + ar[it])
        }
        return sum
    }, 0)
}

