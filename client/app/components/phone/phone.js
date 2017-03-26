'use strict';

angular.module('myApp.phone', [
  'myApp.phone.phone-filter',
  'myApp.phone.phone-directive'
])

.factory('persist', function() {
  var res = {};
  return res;
});
