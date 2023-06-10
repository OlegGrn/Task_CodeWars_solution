// На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].
// Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.
// Функция getMaxSubSum(arr) должна возвращать эту сумму.

function getMaxSubSum(arr) {
    let test = [];
    while (arr.length > 0) {
        arr.reduceRight((sum, it) => {
            sum = sum + it;
            test.push(sum);
            return sum;
        }, 0);
        arr.pop();
    }
    let result = Math.max(...test);
    return result > 0 ? result : 0;

}





