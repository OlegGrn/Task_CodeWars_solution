
//Напишите функцию checkSpam(str), возвращающую true,
// если str содержит 'viagra' или 'XXX', а иначе false

describe("checkSpam", function () {

	it("buy ViAgRA now возвращает true", function () {
		assert.equal(checkSpam('buy ViAgRA now'), true)
	});
	it("free xxxxx возвращает true", function () {
		assert.equal(checkSpam('free xxxxx'), true)
	});
	it("innocent rabbit возвращает false", function () {
		assert.equal(checkSpam('innocent rabbit'), false)
	});
});