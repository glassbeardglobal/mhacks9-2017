'use strict';

angular.module('myApp.landing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'landing/landing.html',
    controller: 'LandingCtrl'
  });
}])

.controller('LandingCtrl', ['$scope', '$location', 'persist', function($scope, $location, persist) {
  $scope.phone = "";

  $scope.handleClick = function() {
    if ($scope.phone.length == 10) {
      persist.phone = $scope.phone;
      $location.path('home');
    }
  }
}]);
