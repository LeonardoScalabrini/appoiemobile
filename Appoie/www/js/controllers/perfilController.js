app.controller('perfilController', function($scope, $ionicPopup, $rootScope, $location, $cordovaCamera, $state) {
		


	$scope.changeView = function(view){
		var location = 'app.' + view;
    
            $state.go(location);
        }

    
    

});
