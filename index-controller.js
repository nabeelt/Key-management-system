(function(){
'use strict'

angular.module('keyMS.index-controller',[])
	.controller('indexController',function($scope, keyMSService){
		var vm = this;
		vm.keyMSService = keyMSService;
	})
})()