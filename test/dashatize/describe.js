describe("dashatize", function () {

    describe(`Для заданного целого числа вернуть строку с дефисами '-'до и после каждой нечетной цифры,
     но не начинать и не заканчивать строку дефисом.`, function () {

        let arrTest = [
            [274, "2-7-4"],
            [5311, "5-3-1-1"],
            [86320, "86-3-20"],
            [974302, "9-7-4-3-02"],
            [-1, "1"]
        ]

        function makeTest(oneTest) {
            const [params, result] = oneTest;
            it(`принимаем ${params}, результат ${result}`, function () {
                assert.strictEqual(dashatize(params), result)
            })
        }

        arrTest.forEach(item => makeTest(item))
    })

})