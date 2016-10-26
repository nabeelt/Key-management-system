(function () {

'use strict'

angular.module('keys-module-directive',[])
	.component('keys', {
		bindings :{},
		controller: 'keysController',
		controllerAs: 'keysCtrl',
		templateUrl: 'components/keys/keys.html'
	})
})()