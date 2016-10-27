(function () {

'use strict'

angular.module('keyMS.popup-controller', ['ngTable'])
	.controller('popupController', function ($scope, keyMSService, NgTableParams) {
		var vm = this;
		vm.newUserData = {};

		vm.submitForm = function(){
			keyMSService.setUserData(vm.newUserData);
			vm.closeModal();
		}

		vm.tableData = keyMSService.getUserData();
		vm.tableParams = new NgTableParams({}, { dataset: vm.tableData});

		vm.closeModal = function() {
			keyMSService.isPopUpVisible = false
		}
	})
})()