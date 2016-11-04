(function(){
'use strict'

angular.module('keyMS.index-controller',[])
	.controller('indexController',function($scope, keyMSService){
		var vm = this;
		vm.keyMSService = keyMSService;
		vm.openPopup = function(param) {
			// if(param === 'secondarykey') {
			// 	vm.keyMSService.isSecondary = true;
			// }else {
			// 	vm.keyMSService.isSecondary = false;
			// }
			vm.keyMSService.setPopupData();
		}
	})
})()