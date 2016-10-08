app.controller('telaInicialController',function($scope,$state) {

	 $scope.chamarCadastro =function(){
	 	$state.go('cadastrar-usuario');
	 }
	 $scope.chamarLogin =function(){
	 	$state.go('login');
	 }
	
})