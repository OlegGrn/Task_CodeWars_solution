describe("сумма двух цифр", function () {

    const testVal = [
        //   [[6, 7, 11], [156]],
        //   [[9, 13, 17, 14, 6, 10, 7, 14, 11, 15], [81596]],
        //   [[11, 8, 5, 13, 10, 7], [3852]],
        //   [[5, 9, 7, 4, 5, 11, 8, 6, 3, 4, 10, 10, 7, 8, 14, 5, 6, 12, 3, 9, 10], [3264128]],
        //   [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18], [999999]]
        [[1, 2, 3, 4], 30],
        [[6, 7, 11], 48]
    ]

    function makeTest(x) {
        let [v, r] = x;
        it(`[${v}] result ${r}`, function () {
            assert.deepEqual(numberSum(v), r)
        })
    }

    testVal.forEach(x => makeTest(x))

})