(function () {

'use strict'

angular.module('keyMS.keys-controller',[])
	.controller('keysController',function($scope, keyMSService){

		var vm = this;
		vm.userData = keyMSService.getUserData();
	});

})()