'use strict';

/**
 * @ngdoc function
 * @name bioidApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bioidApp
 */
angular.module('bioidApp')
	.controller('SearchCtrl', function ($scope, $mdDialog, mySocket) {
		$scope.todos = [
			{
				face: "https://material.angularjs.org/latest/img/list/60.jpeg",
				what: 'Juan Carlos Vallejos',
				dni: "35550990",
				who: 'Entró a las 10AM',
				when: 'Hora estimada de salida: 12PM',
				notes: "Motivo: Personal Trainer"
			},
			{
				face: "https://en.gravatar.com/userimage/64217526/6649c70a54ba475dda143218b65c19fd.jpeg",
				what: 'José Brugada',
				dni: "35367687",
				who: 'Entró a las 9AM, Destino: Depto 8 Piso 10',
				when: 'Hora estimada de salida: 10AM',
				notes: "Motivo: Plomero"
			},
			{
				face: "https://material.angularjs.org/latest/img/list/60.jpeg",
				what: 'Sebastián Matrtínez',
				dni: "353660112",
				who: 'Entró a las 9AM, Destino: Depto 8 Piso 10',
				when: 'Hora estimada de salida: 10AM',
				notes: "Motivo: Gasista"
			},
		];

		$scope.visitors = [
			{
				face: "https://material.angularjs.org/latest/img/list/60.jpeg",
				what: 'Juan Carlos Vallejos',
				dni: "35550990",
				who: 'Entró a las 10AM',
				when: 'Hora estimada de salida: 12PM',
				notes: "Motivo: Personal Trainer"
			},
			{
				face: "https://en.gravatar.com/userimage/64217526/6649c70a54ba475dda143218b65c19fd.jpeg",
				what: 'José Brugada',
				dni: "35367687",
				who: 'Entró a las 9AM, Destino: Depto 8 Piso 10',
				when: 'Hora estimada de salida: 10AM',
				notes: "Motivo: Plomero"
			},
			{
				face: "https://material.angularjs.org/latest/img/list/60.jpeg",
				what: 'Sebastián Zorrilla',
				dni: "353660112",
				who: 'Entró a las 9AM, Destino: Depto 8 Piso 10',
				when: 'Hora estimada de salida: 10AM',
				notes: "Motivo: Gasista"
			},
		];

		$scope.sacar = function (item) {
			$scope.todos.pop(item);
		}


		var self = this;
		// list of `state` value/display objects
		self.selectedItem = null;
		self.searchText = null;
		self.querySearch = querySearch;
		// ******************************
		// Internal methods
		// ******************************
		/**
		 * Search for states... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch(query) {
			var results = query ? $scope.visitors.filter(createFilterFor(query)) : [];
			return results;
		}

		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.dni.indexOf(lowercaseQuery) === 0);
			};
		}

		mySocket.on('connect_error', function () {
			mySocket.removeAllListeners('connect_error');
			$mdDialog.show({
				controller: ErrorController,
				templateUrl: '/views/verify.dialog.html',
				clickOutsideToClose: false
			});
		});

		$scope.verify = function (markId, ev) {
			// ev.preventDefault()
			mySocket.on('connect_error', function () {
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

		function ErrorController($scope, $mdDialog) {
			$scope.content = 'Inicie el programa bioid para continuar';
			$scope.isOk = false;
			$scope.image = '/images/thumb43.svg';
			$scope.thumbClass = 'md-warn';

			$scope.hide = function () {
				mySocket.emit('cancel');
				$mdDialog.hide();
			};
		}

		function VerificationController($scope, $mdDialog, mySocket) {
			$scope.content = 'Ingrese su huella';
			$scope.progress = 30;
			$scope.image = '/images/thumb45.svg';
			$scope.thumbClass = 'md-accent';

			mySocket.on('data', function (data) {
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

			$scope.hide = function () {
				mySocket.emit('cancel');
				$mdDialog.hide();
			};

		}

	});