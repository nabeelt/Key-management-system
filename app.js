// angular.module('keyManagementApp',["ngTable","ngStorage","UserValidation","ui.bootstrap"]);
// var app = angular.module('keyManagementApp');

// angular.module('UserValidation', []).directive('validPasswordC', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, elm, attrs, ctrl) {
//             ctrl.$parsers.unshift(function (viewValue, $scope) {
//                 var noMatch = viewValue != scope.keyForm.password.$viewValue
//                 ctrl.$setValidity('noMatch', !noMatch)
//             })
//         }
//     }
// })
(function(){

'use strict'

angular.module('keyMS',[
	'keys-module',
	'popup-module',
	'keyMS.index-controller',
	'keyMS.common-service'
	]);

})()