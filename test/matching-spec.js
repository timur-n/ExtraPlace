describe('Matching service', function() {

    describe('Matching', function() {

        var testEvent = {
            name: 'Test event',
            time: '10:00',
            bookies: [
                {
                    name: 'Sky',
                    ew: {fraction: 4, places: 5},
                    markets: [
                        {
                            name: 'Win',
                            runners: [
                                {name: 'Runner 1', price: '10'}
                            ]
                        }
                    ]
                }
            ]
        };

        it('should create new BetEvent if it doesn\'t exist', function() {
            var m = new Matching();
            expect(m.events.length).toBe(0);
            m.updateEventData(1, testEvent);
            expect(m.events.length).toBe(1);
        });

        it('should update existing event', function() {
            var m = new Matching();
            expect(m.events.length).toBe(0);
            m.updateEventData(1, testEvent);
            expect(m.events.length).toBe(1);
            m.updateEventData(1, testEvent);
            expect(m.events.length).toBe(1);
        });
    });

});
