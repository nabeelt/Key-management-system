(function () {

'use strict'

angular.module('keyMS.popup-controller', [])
	.controller('popupController', function ($scope, keyMSService) {
		var vm = this;
		vm.newUserData = {};
		vm.submitForm = function(){
			keyMSService.setUserData(vm.newUserData);
			keyMSService.isPopUpVisible = false;
		}
	})
})()