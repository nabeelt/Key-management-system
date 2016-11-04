(function () {

'use strict'

angular.module('keyMS.popup-controller', ['ngTable','ngStorage'])
	.controller('popupController', function ($scope, keyMSService, NgTableParams,$localStorage,$routeParams) {
		var vm = this;
		vm.newUserData = {};
		vm.keyMSService = keyMSService;
		vm.isSecondary = parseInt($routeParams.ID);

		vm.submitForm = function(){
			keyMSService.setUserData(vm.newUserData);
			vm.checkKeyStatus(vm.newUserData);
			vm.closeModal();
		}

		vm.tableData = keyMSService.getUserData();
		vm.tableParams = new NgTableParams({sorting: { activeon: "desc" } }, { dataset: vm.tableData});

		vm.closeModal = function() {
			keyMSService.isPopUpVisible = false;
			keyMSService.isPassPopup = false;
		}

		vm.checkKeyStatus = function (data) {
			var activeDate = data.activeon,
					expiryDate = data.expiry; 
			vm.newUserData.color = vm.compareDates(expiryDate,activeDate);
			if(vm.keyMSService.isEdit) {
				vm.tableData[vm.keyMSService.index].color = vm.newUserData.color;
				vm.keyMSService.isEdit = false;
			}
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
			if (today > activeDate && today < expiryDate) {
				return 'rgb(43, 255, 18)';
			}

			if (today < activeDate && today < expiryDate){
				return 'rgb(234, 249, 0)';
			}

			if (today > expiryDate && today > activeDate) {
				return 'rgb(255, 66, 66)';
			}
		}

		vm.submitPassForm = function() {
			var index = vm.keyMSService.index;
			if(vm.passwordPop === vm.tableData[index].password) {
				
				if(vm.keyMSService.isEdit === true){
					vm.title = "Edit Key"
					vm.keyMSService.isPassPopup = false;
					vm.keyMSService.setPopupData();
					vm.newUserData.description = vm.tableData[index].description;
					vm.newUserData.activeon = vm.tableData[index].activeon;
					vm.newUserData.expiry = vm.tableData[index].expiry;
				} else {
					vm.tableData.splice(index,1);
				vm.keyMSService.isPassPopup = false;
				vm.keyMSService.isPopUpVisible = false;
				vm.passwordIncorrect = false;
				}	
			} else {
				vm.passwordIncorrect = true;
			}
		}

		vm.deleteRow = function(index) {
			vm.keyMSService.setPopupData("passPopup");
			vm.keyMSService.index = index;
			vm.keyMSService.isEdit = false;
		}

		vm.editKey = function(index) {
			vm.keyMSService.setPopupData("passPopup");
			vm.keyMSService.index = index;
			vm.keyMSService.isEdit = true;
		}

	})
})()