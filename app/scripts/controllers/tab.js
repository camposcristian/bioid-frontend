'use strict';

/**
 * @ngdoc function
 * @name bioidApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bioidApp
 */
angular.module('bioidApp')
	.controller('TabCtrl', function($scope,$location) {
		$scope.tabs = ["Verificar","Enrolar"];
		$scope.switchTab = function(index) {
    switch(index) {
        case 0: $location.path('/verify');break;
        case 1: $location.path('/');break;
    }
}
	});