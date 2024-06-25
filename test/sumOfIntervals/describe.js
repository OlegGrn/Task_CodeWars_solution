describe("sumIntervals", function () {

    describe(`принимает массив интервалов и возвращает сумму длин всех интервалов. 
    Перекрывающиеся интервалы следует учитывать только один раз.`, function () {

        let arrTest = [
            [
                [[1, 5]], 4
            ],
            [
                [[1, 5], [6, 10]], 8
            ],
            [
                [[-1e9, 1e9]], 2e9
            ],
            [
                [[0, 20], [-1e8, 10], [30, 40]], 1e8 + 30
            ],
            [
                [[1, 4], [7, 10], [3, 5]], 7
            ],
            [
                [[1, 5], [1, 5]], 4
            ],
            [
                [[-10, -5], [-7, 1], [2, 5]], 14
            ],
            [
                [[1, 5], [10, 20], [1, 6], [16, 19], [5, 11]], 19
            ],
        ]

        function makeTest(data) {

            const [test, result] = data;

            //afterEach(() => console.log(sumIntervals(test)))

            it(`принимаем массив [ ${makeStr(test)} ], результат ${result}`, function () {
                assert.strictEqual(sumIntervals(test), result)
            })


            function makeStr(test) {
                return test.reduce((str, item, ind, arr) => {
                    return (str + `[${item}]${ind === arr.length - 1 ? "" : ", "}`)
                }, "")
            }
        }

        for (let i = 0; i < arrTest.length; i++) {
            makeTest(arrTest[i])
        }

    })

})