'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', [
  '$scope',
  '$location',
  '$http',
  'persist',
  function($scope, $location, $http, persist) {
    if (!persist.phone || persist.phone.length < 10)
      $location.path('/');

    $scope.phone = persist.phone;

    $http({
      method: 'GET',
      url: '/api/users/auth?phoneNumber=' + $scope.phone
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        $scope.name = response.data.user.firstName + " " + response.data.user.lastName;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $location.path('/');
      });
}]);