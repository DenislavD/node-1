angular.module('wifilocApp').controller('locationDetailCtrl', ['$location', '$routeParams', 'wifilocData', '$uibModal', 'auth', function($location, $routeParams, wifilocData, $uibModal, auth) {
    var vm = this;

    vm.locationid = $routeParams.locationid;
    wifilocData.locationById(vm.locationid)
        .success(function(data) {
            vm.data = { location: data };
            vm.pageHeader = {
                title: vm.data.location.name
            };
        })
        .error(function(e) {
            console.log(e);
        });

    vm.pageHeader = {
        title: 'Location detail page'
    };

    vm.isLoggedIn = auth.isLoggedIn();
    vm.currentPath = $location.path();

    vm.popupReviewForm = function() {
        var uibModalInstance = $uibModal.open({
            templateUrl: 'reviewModal/reviewModal.view.html',
            controller: 'reviewModalCtrl',
            controllerAs: 'vm',
            resolve: {
                locationData: function() {
                    return {
                        locationid: vm.locationid,
                        locationName: vm.data.location.name
                    };
                }
            }
        });

        uibModalInstance.result.then(function(data) {
            vm.data.location.reviews.push(data);
        });
    };
}]);