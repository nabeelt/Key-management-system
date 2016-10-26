(function () {

'use strict'

angular.module('keyMS.common-service',[])
  .service('keyMSService', function(){
  	var keyService = {};
  	keyService.userData = [];
  	keyService.isPopUpVisible = true;
  	keyService.getUserData = function(){
  		return keyService.userData;
  	}
  	keyService.setUserData = function(data){
  		keyService.userData.push(data)
  	}
  	keyService.getPopupData = function(){
  		return keyService.isPopUpVisible;
  	}
  	return keyService;
  });
})()