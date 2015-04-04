'use strict';

/**
 * @ngdoc function
 * @name bioidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bioidApp
 */
angular.module('bioidApp')
  .controller('EnrolCtrl', ['$scope', '$http', '$location', '$mdDialog', 'mySocket', function($scope, $http, $location, $mdDialog, mySocket) {
    this.data = {};
    this.data.emails = [''];

    $scope.newUser = function(form, ev) {
      mySocket.on('connect_error', function() {
        mySocket.removeAllListeners('connect_error');
        $mdDialog.show({
          controller: ErrorController,
          templateUrl: '/views/verify.dialog.html',
          clickOutsideToClose: false
        });
      });

      $mdDialog.show({
        controller: EnrolController,
        templateUrl: '/views/enrol.dialog.html',
        targetEvent: ev,
        clickOutsideToClose: false
      });
      mySocket.emit('enrol', form);
    };

    mySocket.on('connect_error', function() {
      mySocket.removeAllListeners('connect_error');
      $mdDialog.show({
        controller: ErrorController,
        templateUrl: '/views/verify.dialog.html',
        clickOutsideToClose: false
      });
    });

    function ErrorController($scope, $mdDialog) {
      $scope.content = 'Inicie el programa bioid para continuar';
      $scope.isOk = false;
      $scope.image = '/images/thumb43.svg';
      $scope.thumbClass = 'md-warn';

      $scope.hide = function() {
        mySocket.emit('cancel');
        $mdDialog.hide();
      };
    }

    function EnrolController($scope, $mdDialog, mySocket) {
      $scope.content = 'Ingrese su huella';
      $scope.progress = 30;
      $scope.image = '/images/thumb45.svg';
      $scope.thumbClass = 'md-accent';

      mySocket.on('data', function(data) {
        $scope.content = data.content;
        $scope.progress = data.progress;
        if (data.progress === 100) {
          mySocket.removeAllListeners();
          $scope.thumbClass = 'md-primary';
          $scope.image = '/images/like52.svg';
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
    var self = this;
    this.submit = function() {
      // if (!valid) return;

      self.submitting = true;

      //we don't if it's valid yet, but the reject will handle this
      $http.post('/api/register', self.data).then(function() {
        self.data = [];
        $location.path('/completed');
      }, function() {
        // alert(response);
        self.submitting = false;
      });
    };
  }]);