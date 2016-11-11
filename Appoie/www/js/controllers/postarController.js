app.controller('postarController', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state) {
		
	$rootScope.publicacao = {};


	$scope.adicionarMarker = function (post){


		switch (post.criticidade){
			case "1": post.criticidade="BAIXA"; break;
			case "2": post.criticidade="MEDIA"; break;
			case "3": post.criticidade="ALTA"; break;
			default: post.criticidade ="MEDIA"; break; 
		}


		$rootScope.publicacao.titulo = post.titulo;
		$rootScope.publicacao.descricao = post.descricao;
		$rootScope.publicacao.categoria = post.categoria;
		$rootScope.publicacao.criticidade = post.criticidade;

		console.log(post.criticidade);

        $state.go("app.mapa");
    }

    $scope.voltar = function(){
            $state.go('app.postagens');
        }



});
