app.controller('indexController',function($scope){
	var vm = this;
	vm.isOpen = false;
	vm.openPopup = function(){
		vm.isOpen = true;
	}

	vm.closeModal = function(){
		vm.isOpen = false;
	}
})