'use strict';

/**
 * @ngdoc function
 * @name bioidApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bioidApp
 */
angular.module('bioidApp')
	.controller('VerifyCtrl', function($scope, $mdDialog, mySocket) {
		$scope.tiles = [{
			markId: '1',
			color: 'green',
			size: 'icon',
			row: 2,
			col: 2,
			img: 'enter.svg',
			title: 'Entrada'
		}, {
			markId: '3',
			color: 'blue',
			size: 'icon-sm',
			row: 1,
			col: 2,
			img: 'knife.svg',
			title: 'Almuerzo'
		}, {
			markId: '2',
			color: 'red',
			size: 'icon',
			row: 2,
			col: 2,
			img: 'door.svg',
			title: 'Salida'
		}, {
			markId: '4',
			color: 'red',
			size: 'icon-sm',
			row: 1,
			col: 2,
			img: 'door.svg',
			title: 'Salida Almuerzo'
		}];


		mySocket.on('connect_error', function() {
			mySocket.removeAllListeners('connect_error');
			$mdDialog.show({
				controller: ErrorController,
				templateUrl: '/views/verify.dialog.html',
				clickOutsideToClose: false
			});
		});

		$scope.verify = function(markId, ev) {
			mySocket.on('connect_error', function() {
				mySocket.removeAllListeners('connect_error');
				$mdDialog.show({
					controller: ErrorController,
					templateUrl: '/views/verify.dialog.html',
					clickOutsideToClose: false
				});
			});

			$mdDialog.show({
				controller: VerificationController,
				templateUrl: '/views/verify.dialog.html',
				targetEvent: ev,
				clickOutsideToClose: false
			});
			mySocket.emit('verify', parseInt(markId));
		};

		function ErrorController($scope,$mdDialog) {
			$scope.content = 'Inicie el programa bioid para continuar';
			$scope.isOk = false;
			$scope.image = '/images/thumb43.svg';
			$scope.thumbClass = 'md-warn';

			$scope.hide = function() {
				mySocket.emit('cancel');
				$mdDialog.hide();
			};
		}

		function VerificationController($scope, $mdDialog, mySocket) {
			$scope.content = 'Ingrese su huella';
			$scope.progress = 30;
			$scope.image = '/images/thumb45.svg';
			$scope.thumbClass = 'md-accent';

			mySocket.on('data', function(data) {
				$scope.content = data.content;
				$scope.progress = data.progress;
				if (data.progress === 100) {
					mySocket.removeAllListeners();
					$scope.isOk = true;
					$scope.thumbClass = 'md-primary';
					$scope.image = 'http://www.gravatar.com/avatar/' + data.email;
				} else if (data.progress === -1) {
					$scope.image = '/images/thumb43.svg';
					$scope.thumbClass = 'md-warn';
				}
			});

			$scope.hide = function() {
				mySocket.emit('cancel');
				$mdDialog.hide();
			};

		}
	});