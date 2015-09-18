'use strict';

/**
 * @ngdoc overview
 * @name bioidApp
 * @description
 * # bioidApp
 *
 * Main module of the application.
 */
angular
  .module('bioidApp', [
    'ngAnimate',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'btford.socket-io'
  ])
  .config(function($routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('light-blue');
    $routeProvider
      .when('/', {
        templateUrl: 'views/enrol.html',
        controller: 'EnrolCtrl'
      })
      .when('/verify', {
        templateUrl: 'views/verify.html',
        controller: 'VerifyCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

.factory('mySocket', function(socketFactory) {
    return socketFactory({
      ioSocket: io.connect('localhost:4000')
    });
});