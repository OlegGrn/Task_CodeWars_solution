function digitwiseAddition(N, K) {

    let NStr = N.toString();
    let NArr = NStr.split('');

    const digitsCounter = Array(10).fill(0)

    for (let digit of NArr) {
        digitsCounter[parseInt(digit)]++
    }
    return helper(digitsCounter, K)
}

function helper(arrCounter, K) {

    let rest = K;
    const MOD = 1_000_000_007;

    while (rest >= 9) {
        let arrNum = Array(10).fill(0);

        arrCounter.map((item, index) => {
            if (item !== 0) {
                if (index === 0) {
                    arrNum[9] = item % MOD
                } else {
                    arrNum[index - 1] += item % MOD;
                    arrNum[index] += item % MOD
                }
            }
        })
        arrCounter = arrNum;
        rest -= 9;
    }

    return arrCounter.reduce((sum, item, index) => {
        let num = (index + rest) > 9 ? item * 2 : item;
        return ((sum += num) % MOD)
    }, 0)
}




