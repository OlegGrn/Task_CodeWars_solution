function zipWith(func, a, b) {
    return Array.from({length: Math.min(a.length, b.length)}, (_, i) => func(a[i], b[i]))
}



