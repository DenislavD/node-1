angular.module('wifilocApp').controller('reviewModalCtrl', ['$uibModalInstance', 'locationData', 'wifilocData', function($uibModalInstance, locationData, wifilocData) {
    var vm = this;

    //pass resolved data to the view
    vm.locationData = locationData;

    vm.modal = {
        cancel: function() {
            $uibModalInstance.dismiss('cancel');
        },
        close: function(result) {
            $uibModalInstance.close(result);
        }
    };

    vm.onSubmit = function() {
        vm.formError = '';
        if(vm.addReview.$valid) {
            vm.doAddReview(vm.locationData.locationid, vm.formData);
        } else {
            return false;
        }
    };

    vm.doAddReview = function(locationid, formData) {
        wifilocData.addReviewToLocId(locationid, {
            rating: formData.rating,
            reviewText: formData.reviewText
        })
            .success(function(data) {
                vm.modal.close(data);
            })
            .error(function(e) {
                vm.formError = 'Your review has not been saved, please try again later.';
            });
    };
}]);