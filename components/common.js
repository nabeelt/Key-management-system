(function () {

'use strict'

angular.module('keyMS.common-service',[])
  .service('keyMSService', function(){
  	
    var keyService = {};
  	keyService.userData = [];
  	keyService.isPopUpVisible = false;
    keyService.isPassPopup = false;
    keyService.index = "";
    keyService.isEdit ="";

  	keyService.getUserData = function(){
      return keyService.userData;
    }
    
    keyService.setUserData = function(data){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 9; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      
      data.key = text;
      if(keyService.isEdit){
         keyService.userData[keyService.index].key = data.key;
         keyService.userData[keyService.index].description = data.description;
         keyService.userData[keyService.index].activeon = data.activeon;
         keyService.userData[keyService.index].color = data.color;
         keyService.userData[keyService.index].expiry = data.expiry;
         keyService.userData[keyService.index].password = data.password;
         keyService.userData[keyService.index].cnfrmpassword = data.cnfrmpassword;
      }
      else {
        keyService.userData.push(data);
      }
  	}
  	
    keyService.getPopupData = function(){
  		return keyService.isPopUpVisible;
  	}
    
    keyService.setPopupData = function(value){
      if(value==="passPopup"){
        keyService.isPassPopup = true;
      }
      keyService.isPopUpVisible = true;
    }
  	
    return keyService;
  
  });
})()