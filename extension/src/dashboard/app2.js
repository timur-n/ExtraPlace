angular.module('ExtraPlaceApp', ['BBStorage', 'BBUtils', 'BBProcessors'])
    .controller('MainCtrl', ['$scope', '$log', '$interval', 'bbStorage', 'bbUtils', 'bbProcessors', '$http',
        function($scope, $log, $interval, bbStorage, bbUtils, bbProcessors, $http) {
            $scope.data = 0;
            $scope.event = {};
        }]);
