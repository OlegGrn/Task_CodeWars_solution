describe("автокомплит", function () {

    it("ai ответ ['airplane','airport']", function () {
        assert.equal(JSON.stringify(
            autocomplete(
                'ai', ['airplane', 'airport', 'apple', 'ball']
            )
        ), JSON.stringify(
            ['airplane', 'airport']
        ))
    });

    it("i ответ ['irplane','irport']", function () {
        assert.equal(JSON.stringify(
            autocomplete(
                'i', ['irplane', 'irport', 'apple', 'ball'])
        ), JSON.stringify(
            ['irplane', 'irport']
        ))
    });

    it("1258 ответ []", function () {
        assert.equal(JSON.stringify(
            autocomplete(
                '1258', ['airplane', 'airport', 'apple', 'ball'])
        ), JSON.stringify([]))
    });

    it("%a123i ответ ['airplane','airport']", function () {
        assert.equal(JSON.stringify(
                autocomplete(
                    '%a123i', ['airplane', 'airport', 'apple', 'ball'])
            ), JSON.stringify(
                ['airplane', 'airport'])
        )
    });

    it("5-ть ответов в массиве", function () {
        assert.equal(JSON.stringify(
                autocomplete(
                    'ai', [
                        'airplane1',
                        'airport2',
                        'apple',
                        'ball',
                        'aifvfv3',
                        'aifffff4',
                        'ailkj5',
                        'aijgjfldd',
                        'aiqwert'
                    ])
            ), JSON.stringify(
                [
                    'airplane1',
                    'airport2',
                    'aifvfv3',
                    'aifffff4',
                    'ailkj5'
                ])
        )
    });
})


