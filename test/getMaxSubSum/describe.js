
// На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].
// Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.
// Функция getMaxSubSum(arr) должна возвращать эту сумму.

describe("getMaxSubSum", function () {

	let _1 = [-1, 2, 3, -9];
	let _2 = [2, -1, 2, 3, -9];
	let _3 = [-1, 2, 3, -9, 11];
	let _4 = [-2, -1, 1, 2];
	let _5 = [100, -9, 2, -3, 5];
	let _6 = [1, 2, 3];
	let _7 = [-1, -2, -3];

	it(`${_1} возвращать 5`, function () {
		assert.equal(getMaxSubSum(_1), 5)
	});

	it(`${_2} возвращать 6`, function () {
		assert.equal(getMaxSubSum(_2), 6)
	});

	it(`${_3} возвращать 11`, function () {
		assert.equal(getMaxSubSum(_3), 11)
	});

	it(`${_4} возвращать 3`, function () {
		assert.equal(getMaxSubSum(_4), 3)
	});

	it(`${_5} возвращать 100`, function () {
		assert.equal(getMaxSubSum(_5), 100)
	});

	it(`${_6} возвращать 6`, function () {
		assert.equal(getMaxSubSum(_6), 6)
	});

	it(`${_7} возвращать 0`, function () {
		assert.equal(getMaxSubSum(_7), 0)
	});




});