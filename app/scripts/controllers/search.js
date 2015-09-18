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
				who: 'Entró a las 10AM',
				when: 'Hora estimada de salida: 12PM',
				notes: "Motivo: Personal Trainer"
			},
			{
				face: "https://en.gravatar.com/userimage/64217526/6649c70a54ba475dda143218b65c19fd.jpeg",
				what: 'José Brugada',
				who: 'Entró a las 9AM, Destino: Depto 8 Piso 10',
				when: 'Hora estimada de salida: 10AM',
				notes: "Motivo: Plomero"
			},
			{
				face: "https://material.angularjs.org/latest/img/list/60.jpeg",
				what: 'Sebastián Zorrilla',
				who: 'Entró a las 9AM, Destino: Depto 8 Piso 10',
				when: 'Hora estimada de salida: 10AM',
				notes: "Motivo: Gasista"
			},
		];

		var self = this;
		// list of `state` value/display objects
		self.states = loadAll();
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
			var results = query ? self.states.filter(createFilterFor(query)) : [];
			return results;
		}
		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll() {
			var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
			return allStates.split(/, +/g).map(function (state) {
				return {
					value: state.toLowerCase(),
					display: state
				};
			});
		}
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};
	}
	});