app.controller('MapCtrl', function($scope, $ionicPopup, $rootScope, $cordovaGeolocation, $cordovaCamera, $state, mapService) {
  var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var posicaoAtual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var posicaoMarcador;
        var enderecoCompleto;
        var cidade;
        var estado;

        var mapOptions = {
          center: posicaoAtual,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);   

        var marcador = 0;

        function addMarker(location) {
            var marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            title: "Marcador " + marcador
          });
            
          google.maps.event.addListener(marker, 'dragend', function() 
          {
             atualizarPosicao();
          });  

          marcador++;
          map.panTo(marker.getPosition());
          map.setZoom(17);
          atualizarPosicao();

          function atualizarPosicao (){
              posicaoMarcador = marker.getPosition();
              getAddress(); 
          }
          
          $scope.sucesso = function () {
            
            $rootScope.publicacao.lat = posicaoMarcador.lat();
            $rootScope.publicacao.lng = posicaoMarcador.lng();
            $rootScope.publicacao.fotos = [$rootScope.foto];
            console.log($rootScope.publicacao);
            mapService.salvar($rootScope.publicacao).then(function (response) {

              var alertPopup = $ionicPopup.alert({
                title: 'Confirmação',
                template: 'Salvo com sucesso! :)'
              });

              alertPopup.then(function(res) {
                $state.go("app.postagens");
              });

            }, function (response) {

              

            })

          }   

        }

        google.maps.event.addDomListener(window, 'load', addMarker(posicaoAtual, map));



        function getAddress() {

           // This is making the Geocode request
           var geocoder = new google.maps.Geocoder();

           geocoder.geocode({ 'latLng': posicaoMarcador }, function (results, status) {
           // This is checking to see if the Geoeode Status is OK before proceeding
           if (status == google.maps.GeocoderStatus.OK) {

               enderecoCompleto = results[0].formatted_address;
               cidade = results[0].address_components[4].long_name;
               estado = results[0].address_components[5].long_name;

              $rootScope.publicacao.cidade = cidade;
              $rootScope.publicacao.estado = estado;
           }
          });
        }


        
  }, function(error){
    console.log("Could not get location");
  });

  $scope.apoiarPublicacaoDetalhada = function(publicacao) {
    if(!publicacao.apoiado) {
      mapService.apoiar(publicacao.idPublicacao).then(function() {
        publicacao.qtdApoiadores++;
        publicacao.apoiado = true;
      },
      function(){

      });
    }      

    }

    $scope.desapoiarPublicacaoDetalhada = function(publicacao) {
      if(publicacao.apoiado) {
      mapService.desapoiar(publicacao.idPublicacao).then(function() {
        publicacao.qtdApoiadores--;
        publicacao.apoiado = false;
      },
      function(){

      });
    }    
    }

});
