(function() {
    angular.module('app', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/views/login.html',
                controller: 'mainCtrl',
                resolve: {
                    "isAuthenticated": function($q, $http, $state) {
                        var deferred = $q.defer();
                        if (localStorage.getItem('hash')) {
                            $state.go('dashboard');
                            deferred.resolve(true);
                        } else {
                            deferred.resolve(false);
                        }
                        return deferred.promise;
                    }
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/views/register.html',
                controller: 'registerCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/views/dashboard.html',
                controller: 'dashboardCtrl',
                resolve: {
                    "isAuthenticated": function($q, $http, $state) {
                        var deferred = $q.defer();
                        if (localStorage.getItem('hash')) {
                            deferred.resolve(true);
                        } else {
                            $state.go('login');
                            deferred.reject(false);
                        }
                        return deferred.promise;
                    }
                }
            })
    })
}());