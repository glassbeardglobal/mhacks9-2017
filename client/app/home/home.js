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
    // TESTING ONLY
    persist.phone = '1111111111';

    if (!persist.phone || persist.phone.length < 10)
      $location.path('/');

    $scope.phone = persist.phone;
    $scope.name = "";
    $scope.purchases = [];

    $scope.formCompany = "";
    $scope.formAmount = 0;
    $scope.formDate = "";

    $scope.handleAddPurchase = function() {
      $('#purchaseModal').modal('show');
    }

    $scope.processPurchase = function() {
      $http({
        method: 'POST',
        url: '/api/users/purchase',
        data: {
          phoneNumber: $scope.phone,
          amount: $scope.formAmount,
          company: $scope.formCompany,
          date: $scope.formDate
        }
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $http({
          method: 'GET',
          url: '/api/users/purchases?phoneNumber=' + $scope.phone
        }).then(function successCallback(response) {
          // Make a copy
          response.data.purchases.forEach(function(d) {
            d.description = JSON.parse(d.description);
          });
          $scope.purchases = response.data.purchases;
        }, function errorCallback(response) {
          console.log("Error!");
        });
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("ERROR");
        console.log(response);
      });

      $scope.formAmount = 0;
      $scope.formCompany = "";
      $scope.formDate = "";
      $('#purchaseModal').modal('hide');
    }

    $http({
      method: 'GET',
      url: '/api/users/auth?phoneNumber=' + $scope.phone
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.name = response.data.user.firstName + " " + response.data.user.lastName;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $location.path('/');
      });

    $http({
      method: 'GET',
      url: '/api/users/purchases?phoneNumber=' + $scope.phone
    }).then(function successCallback(response) {
      // Make a copy
      response.data.purchases.forEach(function(d) {
        d.description = JSON.parse(d.description);
        $scope.purchases.push(d);
      });
      $scope.purchases = response.data.purchases;
    }, function errorCallback(response) {
      console.log("Error!");
    });
}]);