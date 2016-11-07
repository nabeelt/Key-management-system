(function(){
'use strict'

angular.module('keyMS.index-controller',[])
	.controller('indexController',function($scope, keyMSService){
		var vm = this;
		vm.keyMSService = keyMSService;
		vm.openPopup = function(param) {
			vm.keyMSService.setPopupData();
			vm.keyMSService.isSecondaryEdit = false;
		}
	})
})()