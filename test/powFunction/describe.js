


describe("pow", function (){

    describe('возводит х в степень 3', function () {
         function makeTest(x){
             let expected = x * x * x;
             it(`${x} в степени 3 будет ${expected}`, function (){
                 assert.equal(pow(x, 3), expected)
             });
         }

         for (let x = 1; x <=10; x++) {
             makeTest(x)
         }
    });

    it("5 возводит в степень 1, будет 5", function (){
        assert.equal(pow(5,1), 5);
    });
    it("7 возводит в степень -1, будет Nan", function (){
        assert.isNaN(pow(7,-1));
    });
    it("7 возводит в степень 1.5, будет Nan", function (){
        assert.isNaN(pow(7,1.5));
    });


});
