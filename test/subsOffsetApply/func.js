function subsOffsetApply(str, offset) {

    let regExp = /\d\d:\d\d:\d\d,\d\d\d/g;
    let newStr = str.replace(regExp, match => {
        return newTime(match, offset)
    })
    return /###/.test(newStr)
        ? "Invalid offset"
        : newStr
}

function newTime(timeStr, offset) {

    let timeArr = timeStr.split(/[:,]/g);
    if (timeArr.length !== 4) return "###";

    let ms = convectorTimeToMs(timeArr);
    return convectorMsToTime(ms + offset);
}

function convectorTimeToMs(timeArr) {
    let [hs, min, sec, ms] = timeArr;
    return (+hs * 60 * 60 * 1000 + +min * 60 * 1000 + +sec * 1000 + +ms)
}

function convectorMsToTime(ms) {
    if (ms < 0 || ms > 359999999) return "###"
    const addZero = (num, qty) => num.toString().padStart(qty, "0");

    let hs = addZero(Math.floor(ms / 3600000), 2)
    let min = addZero(Math.floor(ms / 60000) % 60, 2)
    let sec = addZero(Math.floor(ms / 1000) % 60, 2)
    let msRest = addZero(ms % 1000, 3)

    return `${hs}:${min}:${sec},${msRest}`
}







