app.controller('postarController', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state) {
		
	$rootScope.publicacao = {};

	$scope.adicionarMarker = function (post){
		debugger;
		$rootScope.publicacao.titulo = post.titulo;
		$rootScope.publicacao.descricao = post.descricao;
		$rootScope.publicacao.categoria = post.categoria;

        $state.go("app.mapa");
    }

    $scope.voltar = function(){
            $state.go('app.postagens');
        }

    
    

});
