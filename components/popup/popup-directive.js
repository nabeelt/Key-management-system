// app.component('popup', {
//     bindings: {
//     	obj: "=",
// 		title : "@",
// 		close : "&",
// 		// isOpen: "="
//     },
//    	templateUrl:'app/views/popup.html',
//     controller: 'indexController',
//     controllerAs: 'vm',
//     bindToController: true
// });

(function () {

'use strict'

angular.module('popup-module-directive',[])
  .component('popup', {
    bindings: {
        title: "@",
    },
    controller: 'popupController',
    controllerAs: 'popupCtrl',
    templateUrl: "components/popup/popup.html",

  })
})()