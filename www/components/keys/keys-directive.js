(function () {

  'use strict'

  angular.module('keys-module-directive', [])
    .component('keys', {
      bindings: {
        tableHeading: "="
      },
      controller: 'popupController',
      controllerAs: 'keysCtrl',
      templateUrl: 'components/keys/keys.html'
    })
})()