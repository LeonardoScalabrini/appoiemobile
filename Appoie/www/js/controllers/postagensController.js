app.controller('postagensController', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $state) {

	var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};
 


    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var posicaoAtual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
        var mapOptions = {
          center: posicaoAtual,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var mapPostagens = new google.maps.Map(document.getElementById("mapPostagens"), mapOptions);  


        var bluedot = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#6495ED',
          fillOpacity: 5,
          scale: 8,
          strokeColor: '#fff',
          strokeWeight: 1.5
        }
  
        var myloc = new google.maps.Marker({
          clickable: false,
          icon: bluedot,
          shadow: null,
          zIndex: 999,
          map: mapPostagens
        });

        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
          var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          myloc.setPosition(latLng);
        }, function(error) {
          // ...
        });




         
    });

});