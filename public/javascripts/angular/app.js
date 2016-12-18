var app = angular.module('wifilocApp', []);

app.controller('locationsListCtrl', function($scope, wifilocData, geolocation) {
    $scope.message = 'Checking your location..';

    $scope.getData = function(position) {
        $scope.message = 'Searching for nearby places..';
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;

        wifilocData.locationByCoords(lng, lat).success(function(data) {
            $scope.message = data.length > 0 ? '' : 'No locations found';
            $scope.data = { locations: data };
        }).error(function(e) {
            $scope.message = 'Sorry, something\'s gone wrong';
        });
    };

    $scope.showError = function(error) {
        $scope.$apply(function() {
            $scope.message = error.message;
        });
    };

    $scope.noGeo = function() {
        $scope.$apply(function() {
            $scope.message = 'Geolocation is not supported by this browser.';
        });
    };

    geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
});

app.filter('formatDistance', function() {
    //angular filter needs to return a function, not the result
    return function(distance) {
        distance = parseFloat(distance) || 0;
        var numDistance, unit;
        if(distance > 1000) {
            numDistance = parseFloat(distance / 1000).toFixed(1);
            unit = 'km';
        } else {
            numDistance = parseInt(distance);
            unit = 'm';
        }
        return numDistance + unit;
    };
});

app.directive('ratingStars', function() {
    return {
        scope: {
            thisRating: '=rating'
        },
        //template: '{{ thisRating }}'
        templateUrl: '/javascripts/angular/rating-stars.html'
    };
});

app.service('wifilocData', function($http) {
    return {
        locationByCoords: function(lng, lat) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&dis=20');
        }
    };
});

app.service('geolocation', function() {
    return {
        getPosition: function(cbSuccess, cbError, cbNoGeo) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
            } else {
                cbNoGeo();
            }
        }
    };
})