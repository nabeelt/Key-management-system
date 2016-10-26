(function () {

'use strict'

angular.module('keyMS.keys-controller',['keyMS.index-controller'])
	.controller('keysController',function($scope, keyMSService){

		$scope.keyMSService = keyMSService;

  		$scope.$watchCollection('keyMSService.userData', function (newVal, oldVal) { 
  			$scope.keyMSService.userData = newVal;
  		});
	});

})()