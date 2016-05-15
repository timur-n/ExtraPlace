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

angular.module('ExtraPlaceApp', ['BBStorage', 'BBUtils', 'BBProcessors'])
    .controller('MainCtrl', ['$scope', '$log', '$interval', 'bbStorage', 'bbUtils', 'bbProcessors', '$http',
        function($scope, $log, $interval, bbStorage, bbUtils, bbProcessors, $http) {
            $scope.data = 0;
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
            $scope.event = new ExtraPlaceEvent();
        }]);
