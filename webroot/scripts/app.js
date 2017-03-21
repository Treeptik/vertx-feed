var vertxFeedsApp = angular.module('vertxFeeds', ['ngResource', 'ui.router', 'ngMaterial', 'mdColorPicker']);

vertxFeedsApp.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
})
.config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('home', {
          url: '/',
          template: '<home-page></home-page>',
        })
        .state('login', {
          url: '/login',
          template: '<login-page></login-page>',
        })
        .state('register', {
          url: '/register',
          template: '<register-page></register-page>',
        })
        .state('subscription', {
          url: '/subscription',
          template: '<subscription-page></subscription-page>',
          resolve: { authenticate: authenticate }
        })
        .state('feed', {
          url: '/feed',
          template: '<feed-page></feed-page>',
          resolve: { authenticate: authenticate }
        });

    function authenticate(UserService, $timeout, $state) {
        if (!UserService.getToken()) {
            $timeout(function() {
                // This code runs after the authentication promise has been rejected.
                $state.go('login')
            })
            return $q.reject()
        }
    }
    $urlRouterProvider.otherwise('/');
})
.constant('CONFIG', {
    BASE_URL: 'http://localhost:9000',
});