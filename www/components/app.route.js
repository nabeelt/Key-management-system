(function () {

  'use strict'

  angular.module('keyMS.router', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when("/", {
          template: '<div class="key-title"><div class="logo-key">P</div><p>Primary Key</p><div class="add-btn" ng-if="!indexCtrl.keyMSService.isSecondary" ng-click="indexCtrl.openPopup()">Add+</div></div> <keys class="table-container"></keys>'
        })
        .when("/primarykey/:ID", {
          template: '<div class="key-title"><div class="logo-key">P</div><p>Primary Key</p><div class="add-btn" ng-click="indexCtrl.openPopup()">Add+</div><p class="count">No. of Primary keys added - {{indexCtrl.keyMSService.count}}</p></div> <keys table-heading="popupCtrl.heading" isSecondary="false" class="table-container"></keys>',
          controller: "popupController",
          controllerAs: "popupCtrl"
        })
        .when("/secondarykey/:ID", {
          template: '<div class="key-title"><div class="logo-key">S</div><p>Secondary Key</p><div class="add-btn" ng-click="indexCtrl.openPopup()">Add+</div></div> <keys table-heading="popupCtrl.heading" class="table-container"></keys>',
          controller: "popupController",
          controllerAs: "popupCtrl"
        })
    });

})()