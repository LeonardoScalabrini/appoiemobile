app.controller('postarController', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state) {
		
	$scope.adicionarMarker = function(){
        $state.go("app.mapa");
    }

    
       

});
