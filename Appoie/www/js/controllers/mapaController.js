app.controller('MapCtrl', function($scope, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);       

        google.maps.event.addListener(map, 'click', function(event) {
     
     var confirma = confirm("Um marcador será adicionado nessas coordenadas: " + event.latLng);
     if(confirma == true){
      addMarker(event.latLng, map);
     }
  });

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
  marker.addListener('click', function(){
     alert("Marcador " +marcador+ "\nCoordenadas : " +marker.position); 
  });
}



        var bluedot = {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#6495ED',
              fillOpacity: 1,
              scale: 4,
              strokeColor: '#fff',
              strokeWeight: 1.5

        }
  

        var myloc = new google.maps.Marker({
          clickable: false,
          icon: bluedot,
          shadow: null,
          zIndex: 999,
          map: map
        });



        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
          var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          myloc.setPosition(latLng);
        }, function(error) {
          // ...
        });
        





        // var MyPosition = new google.maps.Marker({
        //     position: latLng,
        //     map: map,
        //     draggable:true,
        //     icon: circulo

        // });
        

        }, function(error){
          console.log("Could not get location");
        });
});
