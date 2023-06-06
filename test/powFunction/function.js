function pow(a, b) {
    let sum = a;

    if (b < 0) return NaN;
    if (Math.round(b) !== b) return NaN

    while (--b > 0) {
        sum *= a
    }
    return sum
}