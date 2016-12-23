angular.module('wifilocApp').controller('registerCtrl', ['$location', 'auth', function($location, auth) {
    var vm = this;

    vm.pageHeader = {
        title: "Create a new WifiLoc account"
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
        vm.formError = '';
        if(vm.registerForm.$valid && vm.credentials.password === vm.credentials.password2) {
            vm.doRegister();
        } else {
            return false;
        }
    };

    vm.doRegister = function() {
        auth.register(vm.credentials)
            .error(function(err) {
                vm.formError = err;
            })
            .success(function() {
                //clear query string and redirect
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
    };
}]);