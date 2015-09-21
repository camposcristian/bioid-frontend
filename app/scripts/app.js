'use strict';

/**
 * @ngdoc overview
 * @name bioidApp
 * @description
 * # bioidApp
 *
 * Main module of the application.
 */

// #1b75bb
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
    $mdThemingProvider.definePalette('amazingPaletteName', { '50': 'd1e3f1', '100': 'bad5ea', '200': 'a3c7e3', '300': '8dbadd', '400': '76acd6', '500': '5f9ecf', '600': '4890c8', '700': '3182c1', '800': '1b75bb', '900': '1869a8', 'A100': '155d95', 'A200': '125182', 'A400': '104670', 'A700': '0d3a5d', 'contrastDefaultColor': 'light', // whether, by default, text (contrast) // on this palette should be dark or light

'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
'200', '300', '400', 'A100'],
'contrastLightColors': undefined    // could also specify this if default was 'dark'
});
    $mdThemingProvider.theme('default')
      .primaryPalette('amazingPaletteName')
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