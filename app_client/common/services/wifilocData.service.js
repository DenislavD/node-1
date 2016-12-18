angular.module('wifilocApp').service('wifilocData', ['$http', function($http) {
    return {
        locationByCoords: function(lng, lat) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&dis=20');
        }
    };
}]);