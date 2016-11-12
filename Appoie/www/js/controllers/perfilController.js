app.controller('perfilController', function($scope, $ionicPopup, $rootScope, $location, $cordovaCamera, $state, perfilService) {
			

	var usuario = JSON.parse(localStorage.getItem("usuario"));

	document.getElementById('nome').value= usuario.nome;
	document.getElementById('sobrenome').value= usuario.sobrenome; 
	document.getElementById('sexo').value= usuario.sexo; 
	document.getElementById('dataNascimento').value= usuario.dataDeNascimento ; 
	
	$scope.changeView = function(view){
		var location = 'app.' + view;
    
            $state.go(location);
        }


     $scope.salvar= function (usuario)
  	{

      
	    loginService.alterarPerfil(usuario).then(function (response)
	    {
	      
	      //Pega os dados do
	      usuario = response.data;
	      //grava no STORAGE
	      localStorage.setItem("usuario", JSON.stringify(usuario));

	      $state.go("app.postagens");
	    },
	    function (response)
	    {
	      
	    });
 	 }
    
    

});
