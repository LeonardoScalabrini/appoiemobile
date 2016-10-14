app.controller('postarController', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state) {
		
	$rootScope.publicacao = {};

	$scope.adicionarMarker = function (post){

		$rootScope.publicacao.titulo = post.titulo;
		$rootScope.publicacao.descricao = post.descricao;
		$rootScope.publicacao.categoria = "Arborização"; //post.categoria;

        $state.go("app.mapa");
    }

    
    

});
