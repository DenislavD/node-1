angular.module('wifilocApp').controller('loginCtrl', ['$location', 'auth', function($location, auth) {
    var vm = this;

    vm.pageHeader = {
        title: "Sign in to WifiLoc"
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
        vm.formError = '';
        if(vm.loginForm.$valid) {
            vm.doLogin();
        } else {
            return false;
        }
    };

    vm.doLogin = function() {
        auth.login(vm.credentials)
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