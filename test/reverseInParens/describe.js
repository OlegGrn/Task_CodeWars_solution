describe("reverseInParens", function () {

    describe(`В этом ката вам будет дана строка текста и допустимые скобки, 
    например "h(el)lo". Вы должны вернуть строку, только с текстом внутри скобок,
     перевернутым, так что "h(el)lo"становится "h(le)lo". Однако, 
     если указанный текст в скобках содержит сам текст в скобках, то его тоже 
     нужно перевернуть, чтобы он смотрел в исходном направлении. 
     Когда скобки переворачиваются, они должны менять направление, 
     чтобы они оставались синтаксически правильными (т. е. "h((el)l)o"становятся "h(l(el))o"). 
     Этот шаблон должен повторяться для любого количества слоев скобок. 
     На любом уровне может быть несколько групп скобок (т. е. "(1) (2 (3) (4))"),
      поэтому обязательно учитывайте это.
      Входные скобки всегда будут действительны (т.е. вы никогда не получите "(()").
      Пустая строка также будет считаться действительной и должна возвращать пустую строку.
    `, function () {

        let arrTest = [
            ["h((el)l)o", "h(l(el))o"],
            ["h(el)lo", "h(le)lo"],
            //["a ((d e) c b)", "a (b c (d e))"],
           // ["one (two (three) four)", "one (ruof (three) owt)"],
            //["one (ruof ((rht)ee) owt)", "one (two ((thr)ee) four)"],
           //["many (parens) on (top)", "many (snerap) on (pot)"]
        ]

        function makeTest(oneTest) {
            let [str, result] = oneTest
            it(`принимаем строку ${str}, результат ${result}`, function () {
                assert.strictEqual(reverseInParens(str), result)
            })
        }

        arrTest.forEach(test => makeTest(test))
    })

})