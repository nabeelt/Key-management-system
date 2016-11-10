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

		vm.openMenu = function (){
			vm.keyMSService.isMenuOpen = true;
		}

		vm.closeMenu = function(){
			vm.keyMSService.isMenuOpen = false;
		}
	})
})()