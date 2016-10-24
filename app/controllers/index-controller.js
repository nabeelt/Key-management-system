app.controller('indexController',function($scope,NgTableParams){
	var vm = this;
	vm.data = [{key: "Aey554", description: "Encription", activeOn :"16/11/16", expiresOn : "16/11/2017"},
	{key: "ceed124", description: "Encription", activeOn :"18/11/16", expiresOn : "18/11/2017"},
	{key: "bred124", description: "Encription", activeOn :"17/11/16", expiresOn : "17/11/2017"}];
	vm.tableParams = new NgTableParams({}, { dataset: vm.data});

	vm.isOpen = false;

	vm.openPopup = function(){
		vm.isOpen = true;
	}

	vm.closeModal = function(){
		vm.isOpen = false;
	}
})