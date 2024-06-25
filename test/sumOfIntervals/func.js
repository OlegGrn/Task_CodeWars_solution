function sumIntervals(intervals) {

    let upLevel = -Infinity

    return intervals
        .sort((a, b) => a[0] - b[0])
        .reduce((sum, item, ind) => {
            if (ind !== 0 && item[0] <= upLevel) {
                sum += item[1] > upLevel ? item[1] - upLevel : 0;
            } else {
                sum += item[1] - item[0];
            }
            upLevel = item[1] > upLevel ? item[1] : upLevel;
            return sum
        }, 0)
}







