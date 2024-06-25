function sumIntervals(intervals) {

    return intervals
        .sort((a, b) => {
            if (a[0] === b[0]) {
                return a[1] - b[1]
            } else return a[0] - b[0]
        })
        .reduce((sum, item, ind, arr) => {
            if (ind === 0) return sum += item[1] - item[0]
            if (item[0] <= arr[ind - 1][1]) {
                console.log(item)
                return sum += item[1] > arr[ind - 1][1]
                    ? item[1] - arr[ind - 1][1]
                    : 0
            } else {
                return sum += item[1] - item[0];
            }


        }, 0)
}


function isOverlapping(interval1, interval2) {
    return interval2[0] < interval1[1]
}


function sumIntervals2(intervals) {
    const sortedIntervals = intervals.sort((a, b) => a[0] - b[0])
    const uniqueIntervals = []

    sortedIntervals.forEach(interval => {
        if (uniqueIntervals.length === 0) uniqueIntervals.push(interval)

        const lastUniqueInterval = uniqueIntervals[uniqueIntervals.length - 1]

        if (isOverlapping(lastUniqueInterval, interval)) {
            if (lastUniqueInterval[1] < interval[1]) {
                ;[, lastUniqueInterval[1]] = interval
            }
        } else {
            uniqueIntervals.push(interval)
        }
    })

    // calculate interval sum
    let sum = 0
    uniqueIntervals.forEach(interval => {
        sum += interval[1] - interval[0]
    })

    return sum
}



