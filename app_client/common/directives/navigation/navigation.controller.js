angular.module('wifilocApp').controller('navigationCtrl', ['$location', 'auth', function($location, auth) {
    var vmnav = this;

    vmnav.currentPath = $location.path();

    vmnav.isLoggedIn = auth.isLoggedIn();
    vmnav.currentUser = auth.currentUser();

    vmnav.logout = function() {
        auth.logout();
        vmnav.isLoggedIn = false;
        vmnav.currentUser = null;
        $location.path('/');
    };

}]);