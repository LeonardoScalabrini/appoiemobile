app.controller('postarController', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state) {
		
	$rootScope.publicacao = {};

	$scope.adicionarMarker = function (post){
		debugger;
		$rootScope.publicacao.titulo = post.titulo;
		$rootScope.publicacao.descricao = post.descricao;
		$rootScope.publicacao.categoria = "ARBORIZACAO"; //post.categoria;

        $state.go("app.mapa");
    }

    
    

});
