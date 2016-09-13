app.controller('MapCtrl', function($scope, $cordovaGeolocation, $cordovaCamera) {
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

$scope.inserirPostagem = function(){
  var confirma = confirm("Deseja adicionar uma nova postagem?");
     if(confirma == true){   
      addMarker(posicaoAtual);
      console.log("marcador ok");
      takePicture();
      console.log("camera ok");
     }
};


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

function takePicture(){

  document.addEventListener("deviceready", function () {

          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
          correctOrientation:true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });

          }, false);

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
