(function () {

'use strict'

angular.module('popup-module-directive',[])
  .component('popup', {
    bindings: {
        title: "@"
    },
    controller: 'popupController',
    controllerAs: 'popupCtrl',
    templateUrl: "components/popup/popup.html",

  })
})()