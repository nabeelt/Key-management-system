app.component('popup', {
    bindings: {
		title : "@",
		item : "="
    },
   	templateUrl:'app/views/popup.html',
    controller: 'indexController',
    controllerAs: 'indexController'
});