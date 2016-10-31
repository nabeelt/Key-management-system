(function () {

'use strict'

angular.module('keyMS.popup-controller', ['ngTable'])
	.controller('popupController', function ($scope, keyMSService, NgTableParams) {
		var vm = this;
		vm.newUserData = {};
		vm.color = "";

		vm.submitForm = function(){
			keyMSService.setUserData(vm.newUserData);
			vm.checkKeyStatus(vm.newUserData);
			vm.closeModal();
		}

		vm.tableData = keyMSService.getUserData();
		vm.tableParams = new NgTableParams({}, { dataset: vm.tableData});

		vm.closeModal = function() {
			keyMSService.isPopUpVisible = false
		}

		vm.checkKeyStatus = function (data) {
			var activeDate = data.activeon,
					expiryDate = data.expiry; 
			vm.color = vm.compareDates(expiryDate,activeDate);
		}

		vm.compareDates = function(expiry,active){
			var today = new Date();
			var ddCurr = today.getDate();
			var mmCurr = today.getMonth()+1; //January is 0!

			var yyyyCurr = today.getFullYear();
			if(ddCurr<10){
			    ddCurr='0'+ddCurr
			} 
			if(mmCurr<10){
			    mmCurr='0'+mmCurr
			} 
			var currDate = yyyyCurr+'/'+mmCurr+'/'+ddCurr;
			var today = new Date(currDate).getTime()/1000;
			var expiryDate = new Date(expiry).getTime()/1000;
			var activeDate = new Date(active).getTime()/1000;
			var keyText = angular.element( document.querySelector( '.key-text' ) );
			if (today > activeDate && today < expiryDate) {
				
				keyText.addClass('green');
				return 'green';
			}

			if (today < activeDate && today < expiryDate){
				return 'yellow';
			}

			if (today > expiryDate && today > activeDate) {
				return 'red';
			}
		}

	})
})()