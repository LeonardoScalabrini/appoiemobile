app.controller('MapCtrl', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state) {
  var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};
 


    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var posicaoAtual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
        var mapOptions = {
          center: posicaoAtual,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);   

        $scope.sucesso = function(){
          var alertPopup = $ionicPopup.alert({
            title: 'Confirmação',
            template: 'Salvo com sucesso! :)'
          });

          alertPopup.then(function(res) {
              $state.go("app.postagens");
          });
        }

        var marcador = 0;

        function addMarker(location) {
            var marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            title: "Marcador " + marcador
          });
          map.panTo(marker.getPosition());
          map.setZoom(17);
          marcador++;
        }
    
        google.maps.event.addDomListener(window, 'load', addMarker(posicaoAtual, map));
        
  }, function(error){
    console.log("Could not get location");
  });

});
