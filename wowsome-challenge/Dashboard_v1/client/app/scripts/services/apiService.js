(function() {
    angular.module('app').factory('APIService', function APIService($http, $q) {
        function authentication(data, type) {
            var deferred = $q.defer();
            var baseUrl = "http://localhost:8085/api/v1/auth/";
            var url = ((type === "LOGIN") ? (baseUrl + "login") : (baseUrl + "register"))
            $http({
                method: 'POST',
                url: url,
                data: data
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(error) {
                deferred.reject(error);
            })
            return deferred.promise;
        }

        function isAuthenticated() {
            var deferred = $q.defer();
            if (localStorage.getItem('hash')) {
                deferred.resolve(true);
            } else {
                deferred.resolve(true);
            }
            return deferred.promise;
        }

        return {
            authentication: authentication,
            isAuthenticated: isAuthenticated
        }
    })
}());