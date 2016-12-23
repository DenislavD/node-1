angular.module('wifilocApp').service('auth', ['$window', '$http', function($window, $http) {
    var auth = {
        saveToken: function(token) {
            $window.localStorage['wifiloc-token'] = token;
        },

        getToken: function() {
            return $window.localStorage['wifiloc-token'];
        },

        register: function(user) {
            return $http.post('/api/register', user).success(function(data) {
                auth.saveToken(data.token);
            });
        },

        login: function(user) {
            return $http.post('/api/login', user).success(function(data) {
                auth.saveToken(data.token);
            });
        },

        logout: function() {
            $window.localStorage.removeItem('wifiloc-token');
        },

        isLoggedIn: function() {
            var token = auth.getToken();

            if(token) {
                var payloadB64 = token.split('.')[1];
                var payload = JSON.parse($window.atob(payloadB64));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        },

        currentUser: function() {
            if(auth.isLoggedIn()) {
                var token = auth.getToken();
                var payloadB64 = token.split('.')[1];
                var payload = JSON.parse($window.atob(payloadB64));

                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        }
    };

    return auth;
}]);