app.controller('postagensController', function($scope, $ionicPopup, $rootScope, $ionicLoading, $cordovaGeolocation, $state, $compile, $ionicModal, mapService, $timeout) {
  
  var infoWindowAnterior;
  var tempID;
  var idPublicacao;
  var markerClicked;
	
  var options = {timeout: 10000, enableHighAccuracy: true, EnableContinuousZoom: true};

  $scope.icones = [];

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var posicaoAtual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
        var mapOptions = {
          center: posicaoAtual,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        $scope.map = new google.maps.Map(document.getElementById("mapPostagens"), mapOptions);

        var bluedot = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#6495ED',
          fillOpacity: 5,
          scale: 8,
          strokeColor: '#fff',
          strokeWeight: 1.5
        }
  
        var localizacaoAtual = new google.maps.Marker({
          clickable: false,
          position: posicaoAtual,
          icon: bluedot,
          shadow: null,
          zIndex: 999,
          map: $scope.map
        });

        function atualizarPosicao(posicao){
          localizacaoAtual.setPosition(posicaoAtual);
        }

        setInterval(function() { 
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
          var posicao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          atualizarPosicao(posicao);
        }, function(error) {
          // ...
        });
          {
            enableHighAccuracy: true
          }
        }, 1);

        if ($scope.icones.length == 0)
        {
          mapService.getIcons().then(function (response) {
            $scope.icones = response.data;
            console.log($scope.icones);

            mapService.getMarkers().then(function (response) {
              $scope.marcadores = response.data;
              $scope.initMarkers();
            }, function (response) {

            });

          }, function (response) {

          });
        }


        $scope.doRefresh = function() {
          initMarkers();
          setMarkers();
        };


// ------------------INICIA OS MARKERS---------------        
        

        $scope.initMarkers = function()
        {
          var marcador;

          for (var i = 0; i < $scope.marcadores.length; i++) {
          
            (function(i){
                setTimeout(function(){

                marcador = {};
                marcador = $scope.marcadores[i];
                $scope.setMarkers(marcador);

              }, 250 * i)
             })(i);
          }

        }

// ------------------SETA OS ICONES DAS CATEGORIA NOS MAPAS---------------        

        $scope.setMarkers= function(marcador)
        {
          var icone = new Image();

          for (var i = 0; i < $scope.icones.length; i++)
          {
            if($scope.icones[i].categoria == marcador.categoria)
              icone.src = $scope.icones[i].foto;
          }   

          if (icone.src == "") return;
            var marker = new google.maps.Marker({
            position: new google.maps.LatLng(marcador.lat, marcador.lng),
            map: $scope.map,
            icon: icone.src,
            animation: google.maps.Animation.DROP,
            draggable: false
          });

// ------------------CHAMA A INFOWINDOW--------------------        
          
          marker.addListener('click', function(){

            $ionicLoading.show({template: '<ion-spinner icon="android"></ion-spinner>'});
            
            $timeout(function(){

              mapService.getPostMax(marcador.idPublicacao).then(function(response) {
                  $ionicLoading.hide();
                  $scope.postMax = response.data;
                  $ionicModal.fromTemplateUrl('modalPublicacao.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                  }).then(function(modal) {
                    $scope.modal = modal;
                  });
                  var htmlInfoWindow = '<div id="InfoWindow">'
                                +   '<div class="iw-title">'+ $scope.postMax.titulo +'</div>'

                                +   '<div class="iw-content item-image">'
                                +    '<img class="img-publicacao" ng-src="'+ $scope.postMax.fotos[0].foto +'" alt="">'
                                +   '</div>'

                                +   '<div class="iw-footer">'
                                +    '<div class="row">'

                                +       '<div class="apoiar">'

                                +         '<p>Apoiar</p>'
                            
                                +       '</div>'

                                +       '<div class="qtdApoiadores">'
                                +         '<p>'+ $scope.postMax.qtdApoiadores +' Apoiadores</p>'
                                +       '</div>'

                                +     '</div>'
                                +   '</div>'


                                +   '<div class="show-modal">'
                                +     '<button class="button button-block button-dark" ng-click="modal.show()"><h5>DETALHES</h5></button>'
                                +   '</div>'
                                +'</div>'            

                  var compilado = $compile(htmlInfoWindow)($scope)

                  var infowindow = new google.maps.InfoWindow({ 
                      content: compilado[0]
                  }); 

           
// ------------------FUNÇÃO RESPONSÁVEL POR FECHAR UMA INFOWINDOW AO CLICAR SOBRE OUTRO MARKER---------------        

                  if(infoWindowAnterior != null) {
                      if(infoWindowAnterior == infowindow) {
                        if(isInfoWindowOpen(infowindow)) { 
                          infoWindowAnterior = infowindow;
                          infowindow.close(); 
                        }
                        else{
                          infowindow.open($rootScope.map, marker);
                          infowindowAnterior = infowindow;
                        }
                      }
                      else {
                        infoWindowAnterior.close();
                        infoWindowAnterior = infowindow;
                        infowindow.open($rootScope.map, marker);    
                      }           
                  }   
                  else {
                    infoWindowAnterior = infowindow;
                    infowindow.open($rootScope.map, marker);
                  }  

              }, function(response){}); 

            });


          }, function(response) {

          });      
          
        }
         
    }, function(error){
      $state.go('app.connectionException');
  });

    isInfoWindowOpen = function(infoWindow){
      var map = infoWindow.getMap();
      return (map !== null && typeof map !== "undefined");
    }


});