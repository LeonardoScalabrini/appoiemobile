app.controller('loginController', function($scope, $ionicPopup, $rootScope, $state, loginService, $cordovaFacebook) {

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
      console.log(JSON.parse(localStorage.getItem("usuario"))); 

      $state.go("app.postagens");
    },
    function (response)
    {
      
    });
  }

  $scope.logarFacebook = function (){
  $cordovaFacebook.login(["public_profile", "email", "user_friends"])
     .then(function(success) {
        $state.go("app.postagens");
        $scope.dadosUsuario();
     }, function (error) {

     });
  }


  $scope.usuarioFacebook ={};
  $scope.dadosUsuario = function(){
    $cordovaFacebook.api('me?fields=id,first_name,last_name,birthday,gender,email,location,picture')
      .then(function(user) {
        $scope.user = user;
           $scope.usuarioFacebook.idFacebook =$scope.user.id;
           $scope.usuarioFacebook.nome = $scope.user.first_name;
           $scope.usuarioFacebook.sobrenome = $scope.user.last_name;
           $scope.usuarioFacebook.dataDeNascimento = $scope.user.birthday;
           if($scope.user.gender === 'male'){
              $scope.usuarioFacebook.sexo ='MASCULINO';
           }else{
              $scope.usuarioFacebook.sexo ='FEMININO';
           }
           $scope.usuarioFacebook.email = $scope.user.email;
           $scope.usuarioFacebook.nomeCidade = $scope.user.location.name;
           $scope.usuarioFacebook.foto =$scope.user.picture.data.url;

           loginService.logarFacebook($scope.usuarioFacebook).then(function (response) {


         }, function (response) {

         });


      });

  }
  
});