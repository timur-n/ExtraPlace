describe('Matching service', function() {

    describe('Matching', function() {

        it('should create new BetEvent if it doesn\'t exist', function() {
            var m = new Matching();
            expect(m.events.length).toBe(0);
            m.updateEventData(1, {bookies: []})
        });
    });
});
