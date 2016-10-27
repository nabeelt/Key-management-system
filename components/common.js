(function () {

'use strict'

angular.module('keyMS.common-service',[])
  .service('keyMSService', function(){
  	
    var keyService = {};
  	keyService.userData = [];
  	keyService.isPopUpVisible = false;

  	keyService.getUserData = function(){
      return keyService.userData;
    }
    
    keyService.setUserData = function(data){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      
      data.key = text;
      keyService.userData.push(data);
  	}
  	
    keyService.getPopupData = function(){
  		return keyService.isPopUpVisible;
  	}
    
    keyService.setPopupData = function(){
      keyService.isPopUpVisible = true;
    }
  	
    return keyService;
  
  });
})()