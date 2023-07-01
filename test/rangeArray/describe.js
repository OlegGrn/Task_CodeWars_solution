describe("Array.prototype.range", () => {
    it("создает массив из 3-х элементов начиная с 0 = 0,1,2", () => {
        assert.deepEqual(Array.range(0, 3), [0, 1, 2])
    });
    it("создает массив из 3-х элементов начиная с -2 = -2, -1, 0", () => {
        assert.deepEqual(Array.range(-2, 3), [-2, -1, 0])
    });
    it("создает массив из 1 элемента начиная с -1 = -1", () => {
        assert.deepEqual(Array.range(-1, 1), [-1])
    });

})