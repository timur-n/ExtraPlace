// This service connects to the background.js page and links provided callback to it
angular.module('BBBackend', [])
    .factory('bbBackend', ['$log', function($log) {
        return {
            connect: function(callback) {
                $log.debug('Connecting to backend');
                chrome.extension.getBackgroundPage().registerCallback(callback);
            }
        }
    }]);
