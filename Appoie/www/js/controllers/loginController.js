app.controller('loginController', function($scope, $ionicPopup, $rootScope, $state, loginService) {

  // $scope.senhaPerdida = false;
  // $scope.modalTitle = "Entre com sua conta";

  // $scope.recuperarSenha = function ()
  // {
  //   $scope.senhaPerdida = !$scope.senhaPerdida;
  //   $scope.modalTitle = (!$scope.senhaPerdida) ? "Entre com sua conta" : "Redefina sua senha";
  // };

  // $scope.enviar = function (email)
  // {
  //   // Retorno da requisição de recuperação de senha.

  //   $scope.recuperarSenha();
  // };
  $scope.checkUser = function(){

      var usuario = localStorage.getItem("usuario");

      if(usuario != "null") {
        $state.go("app.postagens");
      } 

  }


  $scope.logar = function (usuario)
  {

    loginService.logar(usuario).then(function (response)
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