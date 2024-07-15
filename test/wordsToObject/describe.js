describe("wordsToObject", function () {

    describe(`Вам дана строка, содержащая последовательность слов, разделенных пробелами. 
Допустим, это последовательность шаблонов: имя и соответствующий номер — вот так:\n
"red 1 yellow 2 black 3 white 4"\n 
Вы хотите превратить его в другую цепочку объектов, с которой 
вы планируете работать позже, например, так:\n 
"[{name : 'red', id : '1'}, {name : 'yellow', id : '2'}, {name : 'black', id : '3'}, {name : 'white', id : '4'}]"\n 
Помните, что шаблон — это не обязательно слово и число,
не забывайте что результат:  у вас будет строка,`, function () {

        let artTest = [
            [
                "red 1 yellow 2 black 3 white 4",
                "[{name : 'red', id : '1'}, {name : 'yellow', id : '2'}, {name : 'black', id : '3'}, {name : 'white', id : '4'}]"
            ]
        ]

        function makeTest(oneTest) {
            const [params, result] = oneTest;
            it(`принимаем ${params}, результат ${result}`, function () {
                assert.equal(wordsToObject(params), result)
            })
        }

        artTest.forEach(item => makeTest(item))
    })

})