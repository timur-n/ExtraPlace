describe('Matching service', function() {

    describe('Runner', function() {

        it('should update price and place price', function() {
            var runner = new Runner('R1');
            expect(runner.name).toBe('R1');
            expect(runner.place).toBeDefined();
            runner.updateData({price: 21}, {fraction: 4, places: 5});
            expect(runner.price).toBe(21);
            expect(runner.place.price).toBe(6);
        });
    });

    describe('Bookie', function() {

        it('should add new runner if needed', function() {
            var bookie = new Bookie('Sky');
            expect(bookie.runners['Runner1']).not.toBeDefined();
            bookie.updateData({
                runners: {
                    'Runner1': {
                        price: 10
                    }
                }
            });
            expect(bookie.runners['Runner1']).toBeDefined();
        });

        it('should update EW terms', function() {
            var bookie = new Bookie('Sky');
            expect(bookie.ew).toBeDefined();
            bookie.ew.fraction = 4;
            bookie.ew.places = 4;
            bookie.updateData({
                ew: {
                    fraction: 5,
                    places: 6
                }
            });
            expect(bookie.ew.fraction).toBe(5);
            expect(bookie.ew.places).toBe(6);
        });
    });

    describe('Matching', function() {

        var testEvent = {
            event: {
                name: 'Test event',
                time: '10:00'
            },
            bookies: {
                'Sky': {
                    ew: {fraction: 4, places: 5},
                    runners: {
                        'Runner 1': {price: '10'},
                        'Runner 2': {price: '20'}
                    }
                }
            }
        };

        it('should create new BetEvent if it doesn\'t exist', function() {
            var m = new Matching();
            expect(m.events['test-00']).not.toBeDefined();
            m.updateEventData('test-00', testEvent);
            expect(m.events['test-00']).toBeDefined();
        });

        it('should update existing event', function() {
            var m = new Matching();
            expect(m.events['test-1']).not.toBeDefined();
            m.updateEventData('test-1', testEvent);
            expect(m.events['test-1']).toBeDefined();
            expect(m.events['test-1'].bookies).toBeDefined();
            expect(m.events['test-1'].bookies['Sky']).toBeDefined();
            expect(m.events['test-1'].bookies['Fly']).not.toBeDefined();
            var event = testEvent;
            event.bookies['Fly'] = {};
            m.updateEventData('test-1', event);
            expect(m.events['test-1'].bookies['Fly']).toBeDefined();
        });
    });

});
