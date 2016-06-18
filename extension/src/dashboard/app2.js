function ExtraPlaceRunner() {
    this.bookies = {};
    this.layOdds = '?';
    this.place = {layOdds: '?'};
}

ExtraPlaceRunner.prototype.updateData = function() {
};


function ExtraPlaceEvent() {
    this.runners = [];
    this.runnersHas = {};
    this.name = 'Test event';
    this.time = '00:00';
    this.layCommission = 5;
}

angular.module('ExtraPlaceApp', ['BBStorage', 'BBUtils', 'BBProcessors', 'BBBackend'])
    .controller('MainCtrl', ['$scope', '$log', '$interval', 'bbStorage', 'bbUtils', 'bbProcessors', '$http', 'bbBackend',
        function($scope, $log, $interval, bbStorage, bbUtils, bbProcessors, $http, bbBackend) {
            $scope.isLogOn = false;
            $scope.lastUpdated = 'Never updated';
            // All watching events
            $scope.events = [];
            // Best opportunities
            $scope.topRunners = [];
            // Selected event
            $scope.selectedEvent = new ExtraPlaceEvent();

            $scope.knownBookies = [
                {name: 'Bet 365', short: 'B365'},
                {name: 'Sky Bet', short: 'Sky'},
                //{name: 'Ladbrokes', short: 'Lads'},
                {name: 'Betfair Sportsbook', short: 'BFSB'},
                {name: 'Betfred', short: 'Bfr'},
                {name: 'Paddy Power', short: 'Paddy'},
                {name: 'Bet Victor', short: 'BVic'},
                {name: 'Coral', short: 'Coral'},
                //{name: 'Boylesports', short: 'Boyle'},
                {name: 'Winner', short: 'Winner'},
                {name: 'William Hill', short: 'WH'}
            ];

            bbBackend.connect(function(data) {
                $scope.lastUpdated = new Date();
                var key;
                $scope.events = [];
                for (key in data.events) {
                    if (data.events.hasOwnProperty(key)) {
                        $scope.events.push(data.events[key]);
                    }
                }
                $log.debug('Data callback: ', $scope.events.length, data);
                $scope.$apply();
            });

        }]);
