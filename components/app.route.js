(function(){

'use strict'

angular.module('keyMS.router',['ngRoute'])
	.config(function($routeProvider) {
	    $routeProvider
	    .when("/", {
	        template : '<div class="key-title"><div class="logo-key">P</div><p>Primary key</p></div> <keys class="table-container"></keys>'
	    })
	    .when("/primarykey/:ID", {
	        template : '<div class="key-title"><div class="logo-key">P</div><p>Primary key</p></div> <keys isSecondary="false" class="table-container"></keys>',
	        controller : "popupController",
	        controllerAs : "popupCtrl"
	    })
	    .when("/secondarykey/:ID", {
	         template : '<div class="key-title"><div class="logo-key">S</div><p>Secondary key</p></div> <keys class="table-container"></keys>',
	         controller : "popupController",
	       	controllerAs : "popupCtrl"
	    })
	});

})()