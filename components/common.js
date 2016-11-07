(function () {

'use strict'

angular.module('keyMS.common-service',['ngStorage'])
  .service('keyMSService', function($localStorage){
  	
    var keyService = {};
  	keyService.userData = [];
  	keyService.isPopUpVisible = false;
    keyService.isPassPopup = false;
    keyService.index = "";
    keyService.isEdit =  false;
    keyService.count = 0;
    keyService.isSecondary = false;
    keyService.isSecondaryEdit = false;
    keyService.parentIndex = "";
    keyService.isSecondaryDelete = false;

  	keyService.getUserData = function(){
      return keyService.userData;
    }
    
    keyService.setUserData = function(data){

      data.key = keyService.createRandomKey();

      if(keyService.isEdit){
         // keyService.userData[keyService.index].key = data.key;
         keyService.userData[keyService.index].description = data.description;
         keyService.userData[keyService.index].activeon = data.activeon;
         keyService.userData[keyService.index].color = data.color;
         keyService.userData[keyService.index].expiry = data.expiry;
         keyService.userData[keyService.index].password = data.password;
         keyService.userData[keyService.index].cnfrmpassword = data.cnfrmpassword;
      }
      else {
        if(!data.primaryKey)
          keyService.userData.push(data);
      }

      keyService.count = keyService.userData.length;

      if(data.primaryKey && !keyService.isSecondaryEdit){
        angular.forEach(keyService.userData, function(value, index) {
          if(value.key === data.primaryKey){
            var secondaryKey = {
              key : data.key,
              description : data.description,
              activeon : data.activeon,
              color: data.color,
              expiry : data.expiry,
              password : data.password
            }
            if(!keyService.userData[index].secondaryKey)
              keyService.userData[index].secondaryKey = [];
            keyService.userData[index].secondaryKey.push(secondaryKey);
          }
        });   
      }

      if(keyService.isSecondaryEdit) {
         // keyService.userData[keyService.index].secondaryKey[keyService.parentIndex].key = data.key;
         keyService.userData[keyService.parentIndex].secondaryKey[keyService.index].description = data.description;
         keyService.userData[keyService.parentIndex].secondaryKey[keyService.index].password = data.password;
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

    keyService.createRandomKey = function(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 9; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  	
    return keyService;
  
  });
})()