angular.module('wifilocApp').service('wifilocData', ['$http', function($http) {
    return {
        locationByCoords: function(lng, lat) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&dis=20');
        },
        locationById: function(locationid) {
            return $http.get('/api/locations/' + locationid);
        },
        addReviewToLocId: function(locationid, data) {
            return $http.post('/api/locations/' + locationid + '/reviews', data);
        }
    };
}]);