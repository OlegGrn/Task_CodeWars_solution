describe("zipWith", function () {


    describe("Max Test", function () {
        const maxVal = [
            [[1, 4, 7, 1, 4, 7], [4, 7, 1, 4, 7, 1], [4, 7, 7, 4, 7, 7]]
        ]

        function makeMaxTest(x) {
            let [a, b, r] = x;
            it(`a = [${a}], b = [${b}], result = [${r}]`, function () {
                assert.deepEqual(zipWith(Math.max, a, b), r)
            })
        }


        maxVal.forEach(x => makeMaxTest(x));

    })

    describe("Pow Test", function () {
        const powVal = [
            [[10, 10, 10, 10], [0, 1, 2, 3], [1, 10, 100, 1000]]
        ]

        function makePowTest(x) {
            let [a, b, r] = x;
            it(`a = [${a}], b = [${b}], result = [${r}]`, function () {
                assert.deepEqual(zipWith(Math.pow, a, b), r)
            })
        }

        powVal.forEach(x => makePowTest(x));
    })

    describe("Plus Test", function () {
        const plus = (a, b) => a + b;
        const plusVal = [
            [[0, 1, 2, 3, 4, 5], [6, 5, 4, 3, 2, 1], [6, 6, 6, 6, 6, 6]],
            [[0, 1, 2, 3, 4], [6, 5, 4, 3, 2, 1], [6, 6, 6, 6, 6]],
            [[0, 1, 2, 3, 4, 5], [6, 5, 4, 3, 2], [6, 6, 6, 6, 6]]
        ]

        function makePlusTest(x) {
            let [a, b, r] = x;
            it(`a = [${a}], b = [${b}], result = [${r}]`, function () {
                assert.deepEqual(zipWith(plus, a, b), r)
            })
        }

        plusVal.forEach(x => makePlusTest(x));
    })
})