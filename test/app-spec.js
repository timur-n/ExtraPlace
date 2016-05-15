angular.module('mocks', [])
    .factory('bbStorage', function() {
        return {
            set: function() {},
            get: function() {}
        };
    });

describe('Main app', function() {

    describe('Controller', function() {
        var $scope, ctrl;

        beforeEach(module('BBApp'));
        beforeEach(module('mocks'));
        beforeEach(inject(function($controller, $rootScope, _$log_, _$interval_, _bbStorage_, _bbUtils_) { // inject mocked service
            $scope = $rootScope.$new();
            ctrl = $controller('MainCtrl', {
                $scope: $scope,
                $log: _$log_,
                $interval: _$interval_,
                bbStorage: _bbStorage_,
                bbUtils: _bbUtils_
            });
        }));

        function simpleData(time) {
            return {
                event: {
                    name: 'Test Event',
                    time: time || '10:00'
                },
                bookies: [
                    {
                        name: 'Sky Bet', // name must be in the knownBookies list, otherwise it'll be filtered out
                        ew: {
                            fraction: 5,
                            places: 3
                        },
                        markets: [
                            {
                                name: 'market 1',
                                runners: [
                                    {name: 'runner 1', price: '10'},
                                    {name: 'runner 2', price: '20'}
                                ]
                            }
                        ]
                    }
                ]
            }
        }

        xit('should create simple test data', function() {
            var data = simpleData();
            expect(data.bookies).toBeDefined();
            expect(data.bookies.length).toBe(1);
            var bookie = data.bookies[0];
            expect(bookie.markets.length).toBe(1);
            expect(bookie.markets[0].runners.length).toBe(2);
            expect(bookie.ew).toBeDefined();
            expect(bookie.ew.fraction).toBe(5);
            expect(bookie.ew.places).toBe(3);
        });

        xit('should update Bookie data in existing event', function() {
            // Initial state
            $scope.knownBookies = [{name: 'B1'}, {name: 'Sky Bet'}, {name: 'B3'}];
            $scope.updateData({
                id: 1,
                data: simpleData(),
                bookies: [{name: 'B1'}, {name: 'Sky Bet'}, {name: 'B3'}],
                url: 'http://skybet.com/event/1'
            });

            // Updated state - same data with updated prices
            var tabData = {
                id: 1,
                data: simpleData(),
                url: 'http://skybet.com/event/1'
            };
            tabData.data.bookies[0].markets[0].runners[0].price = '11';
            tabData.data.bookies[0].markets[0].runners[1].price = '21';

            $scope.updateData(tabData);
            expect($scope.events.length).toBe(1);
            expect($scope.events[0].bookies.length).toBe(3); // same as known bookies
            var b = $scope.events[0].bookies[1];
            expect(b.name).toBe('Sky Bet');
            expect(b.markets.length).toBe(1);
            expect(b.markets[0].runners.length).toBe(2);
            var r = b.markets[0].runners[0];
            expect(r.price).toBe('11');
            expect(r.backOdds).toBe(11);
            r = b.markets[0].runners[1];
            expect(r.price).toBe('21');
            //expect(JSON.stringify(b)).toBe(false);
            // todo-timur: normalize runner names (' etc.)
        });
    });
});