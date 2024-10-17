describe("digitwiseAddition", function () {

    describe(`Сложение по цифрам — это особый вид сложения, при котором вместо обычного сложения с числом, 
оно складывается 1 с каждой цифрой этого числа. Если цифра — это a 9, мы заменяем ее на 10 без переноса 
на следующую цифру.
Задача
Запрограммируйте функцию, которая принимает два числа n и k и выводит количество цифр nпосле применения
Digitwise сложения k раз. Поскольку ответ может быть очень большим, верните ответ по модулю 1_000_000_007.
Примеры (9812, 2) -> 6
# Explanation:
# 9812 -> 10923 -> 211034 -> 6 digits

(9899, 3) -> 8
# Explanation:
# 9899 -> 1091010 -> 21102121 -> 32213232 -> 8 digits 
    `, function () {

        let arrTest = [
            //[12, 32, 16], //степень 4 // или длина 2 * на 2 *2 *2
            // [12, 22, 8], //степень 3 // или длина 2 * на * 2 * 2
            //  [12, 12, 4], ////степень 2 // или длина 2 * на 2
            //  [12, 2, 2],
            // [9812, 2, 6],
            //  [9899, 3, 8],
            [503801645, 13, 21],
            [92728636, 31, 85],
            [732766414, 37699, 975561744]

        ]

        function makeTest(oneTest) {
            let [n, k, result] = oneTest
            it(`принимаем число ${n} и коэф. ${k} ,  результат ${result}`, function () {
                assert.strictEqual(digitwiseAddition(n, k), result)
            })
        }

        arrTest.forEach(test => makeTest(test))
    })

})