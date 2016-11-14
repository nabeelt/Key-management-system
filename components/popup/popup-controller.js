(function () {

'use strict'

angular.module('keyMS.popup-controller', ['ngTable','ngStorage'])
	.controller('popupController', function ($scope, keyMSService, NgTableParams,$localStorage,$routeParams) {
		var vm = this;
		vm.newUserData = {};
		vm.keyMSService = keyMSService;
		vm.isSecondary = parseInt($routeParams.ID);
		vm.keyMSService.isSecondary = vm.isSecondary;
		
		vm.heading = ["Key","Description","Active On","Expires On","Actions"];
		if(vm.isSecondary) {
			vm.heading[0] = "Secondary Key"
		}

		console.log(vm.tableHeading) 

		vm.submitForm = function(){
			keyMSService.setUserData(vm.newUserData);
			vm.checkKeyStatus(vm.newUserData);
			vm.closeModal();
		}
		
		vm.tableData = vm.keyMSService.getUserData();
		$scope.tableData = vm.tableData;
		vm.tableParams = new NgTableParams({page: 1,count: 4},{total: 0,dataset: vm.tableData});
		
		$scope.$watch('tableData', function () {
    		vm.tableParams.settings().$scope = $scope;
    		vm.tableParams.reload(); 
		},true);

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

			if(today === activeDate && today < expiryDate){
				return 'rgb(43, 255, 18)';
			}

			if(today === activeDate && today === expiryDate){
				return 'rgb(43, 255, 18)';
			}
			if(today > activeDate && today === expiryDate){
				return 'rgb(43, 255, 18)';
			}


		}

		vm.submitPassForm = function() {
			var index = vm.keyMSService.index;
			var parentIndex = vm.keyMSService.parentIndex;
			
			//primary edit / delete
			if(vm.keyMSService.isEdit === true){
				if(vm.passwordPop === vm.tableData[index].password) {
					vm.title = "Edit Key"
					vm.keyMSService.isPassPopup = false;
					vm.keyMSService.setPopupData();
					vm.newUserData.description = vm.tableData[index].description;
					vm.newUserData.activeon = vm.tableData[index].activeon;
					vm.newUserData.expiry = vm.tableData[index].expiry;
				}else {
					vm.passwordIncorrect = true;
				} 
			} 

			if(vm.keyMSService.isDelete === true){
				if(vm.passwordPop === vm.tableData[index].password) {
					vm.tableData.splice(index,1);
					vm.keyMSService.isPassPopup = false;
					vm.keyMSService.isPopUpVisible = false;
					vm.passwordIncorrect = false;
				}
				else {
					vm.passwordIncorrect = true;
				}
			}

			// secondaryEdit / delete
			if(vm.keyMSService.isSecondaryEdit === true) {
				if(vm.passwordPop === vm.tableData[parentIndex].secondaryKey[index].password) {
					vm.title = "Edit secondary Key"
					vm.keyMSService.isPassPopup = false;
					vm.keyMSService.setPopupData();
					vm.newUserData.key = vm.tableData[parentIndex].secondaryKey[index].key;
					vm.newUserData.description = vm.tableData[parentIndex].secondaryKey[index].description;
					vm.newUserData.activeon = vm.tableData[parentIndex].secondaryKey[index].activeon;
					vm.newUserData.expiry = vm.tableData[parentIndex].secondaryKey[index].expiry;	
					vm.newUserData.primaryKey = vm.tableData[parentIndex].key;
				} else {
					vm.passwordIncorrect = true;
				}
			}
			
			if (vm.keyMSService.isSecondaryDelete === true) {
				if(vm.passwordPop === vm.tableData[parentIndex].secondaryKey[index].password) {
					vm.tableData[parentIndex].secondaryKey.splice(index,1);
					vm.keyMSService.isPassPopup = false;
					vm.keyMSService.isPopUpVisible = false;
					vm.passwordIncorrect = false;
				} else {
					vm.passwordIncorrect = true;
				}
			}

		}

		vm.deleteRow = function(parentIndex,key) {
			vm.keyMSService.setPopupData("passPopup");
			vm.keyMSService.isEdit = false;
			vm.keyMSService.isDelete = true;
			vm.keyMSService.isSecondaryEdit = false;
			vm.keyMSService.isSecondaryDelete = false;
			if(parentIndex >= 0 && parentIndex !== ""){
				vm.keyMSService.parentIndex = parentIndex;
				vm.keyMSService.isSecondaryEdit = false;
				vm.keyMSService.isSecondaryDelete = true;
				vm.keyMSService.isEdit = false;
				vm.keyMSService.isDelete = false;
				angular.forEach(vm.tableData[parentIndex].secondaryKey,function(value, index){
					if(key === value.key) {
						vm.keyMSService.index = index;
					}
				})
			} else {
				angular.forEach(vm.tableData,function(value, index){
					if(key === value.key) {
						vm.keyMSService.index = index;
					}
				})
			}
		}

		vm.editKey = function(parentIndex,key) {
			vm.keyMSService.setPopupData("passPopup");
			vm.keyMSService.isEdit = true;
			vm.keyMSService.isDelete = false;
			vm.keyMSService.isSecondaryEdit = false;
			vm.keyMSService.isSecondaryDelete = false;
			if(parentIndex >= 0 && parentIndex !== "") {
				vm.keyMSService.parentIndex = parentIndex;
				vm.keyMSService.isSecondaryEdit = true;
				vm.keyMSService.isEdit = false;
				vm.keyMSService.isDelete = false;
				vm.keyMSService.isSecondaryDelete = false;
				angular.forEach(vm.tableData[parentIndex].secondaryKey,function(value, index){
					if(key === value.key) {
						vm.keyMSService.index = index;
					}
				})
			} else {
				angular.forEach(vm.tableData,function(value, index){
					if(key === value.key) {
						vm.keyMSService.index = index;
					}
				})
			}
		}

		vm.poulateData = function(key) {
			angular.forEach(keyMSService.userData, function(value, index) {
				if(key === value.key){
					vm.newUserData.description = value.description;
					vm.newUserData.activeon = value.activeon;
					vm.newUserData.expiry = value.expiry;
				}
			});
		}	

	})
})()