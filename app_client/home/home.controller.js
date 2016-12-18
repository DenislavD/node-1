angular.module('wifilocApp').controller('homeCtrl', ['$scope', 'wifilocData', 'geolocation', function($scope, wifilocData, geolocation) {
    var vm = this;

    vm.pageHeader = {
        title: 'WifiLoc',
        strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
        content: 'Looking for wifi and a seat? WifiLoc helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let WifiLoc help you find the place you\'re looking for.'
    };

    vm.message = 'Checking your location..';

    vm.getData = function(position) {
        vm.message = 'Searching for nearby places..';
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;

        wifilocData.locationByCoords(lng, lat).success(function(data) {
            vm.message = data.length > 0 ? '' : 'No locations found';
            vm.data = { locations: data };
        }).error(function(e) {
            vm.message = 'Sorry, something\'s gone wrong';
        });
    };

    vm.showError = function(error) {
        $scope.$apply(function() {
            vm.message = error.message;
        });
    };

    vm.noGeo = function() {
        $scope.$apply(function() {
            vm.message = 'Geolocation is not supported by this browser.';
        });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
}]);