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

  $scope.logar = function (usuario)
  {
    if (!usuario) usuario = {};

    loginService.logar(usuario).then(function (response)
    {
      // Capturar token do backend
      $state.go("app.postagens");
      // window.location.href = "#/home";
    },
    function (response)
    {
      
    });
  }
  
});