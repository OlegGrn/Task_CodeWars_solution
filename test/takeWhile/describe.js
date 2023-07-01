describe("takeWhile", () => {

    function isEven(num) {
        return num % 2 === 0;
    }

    const isEvenTests = [
        [[2, 6, 4, 10, 1, 5, 4, 3], [2, 6, 4, 10]],
        [[2, 100, 1000, 10000, 5, 3, 4, 6], [2, 100, 1000, 10000]],
        [[998, 996, 12, -1000, 200, 0, 1, 1, 1], [998, 996, 12, -1000, 200, 0]],
        [[1, 4, 2, 3, 5, 4, 5, 6, 7], []],
        [[2, 4, 10, 100, 64, 78, 92], [2, 4, 10, 100, 64, 78, 92]]];

    function makeTest(x) {
        let [val, res] = x
        it(`val [${val}] and result [${res}]`, () => {
            assert.deepEqual(takeWhile(val, isEven), res)
        })
    }

    isEvenTests.forEach(x => makeTest(x))
})