function dashatize(num) {
    return num.toString()
        .replace(/./g, match => match % 2 ? "-" + match + "-" : match)
        .replace(/(^--|^-)|(--)|(-$)/g, (_, _1, _2) => _2 ? "-" : "")
}