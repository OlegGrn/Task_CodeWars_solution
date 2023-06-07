
describe("ucFirst", function () {
	it("первый символ заглавный", function () {
		assert.equal(ucFirst("вася"), "Вася")
	})
	it("первый символ заглавный", function () {
		assert.equal(ucFirst("таня"), "Таня")
	})
});