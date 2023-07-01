function takeWhile(arr, func) {
    let i = 0;
    return arr.reduce((res, x) => {
        return i = i || +!func(x), i || res.push(x), res
    }, [])
}


